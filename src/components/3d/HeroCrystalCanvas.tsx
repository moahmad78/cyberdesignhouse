"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const HeroCrystalCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 1.8);

    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Ambient & Rim Lighting for Faceted Steel Blue & Silver Look
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(5, 6, 6);
    scene.add(mainLight);

    const crystalRimLight = new THREE.PointLight(0xffffff, 4.0, 18, 1.2);
    crystalRimLight.position.set(-4, -2, 3);
    scene.add(crystalRimLight);

    const blueBackLight = new THREE.DirectionalLight(0x1d4ed8, 3.0);
    blueBackLight.position.set(-6, 4, -4);
    scene.add(blueBackLight);

    const silverRimLight = new THREE.PointLight(0xe2e8f0, 2.5, 12, 1.5);
    silverRimLight.position.set(4, -3, 2);
    scene.add(silverRimLight);

    // Root Group (Positioned on the right to complement left-aligned hero text)
    const rootGroup = new THREE.Group();
    const updateLayout = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      if (isMobile) {
        rootGroup.scale.set(0.5, 0.5, 0.5);
        return 1.8;
      } else if (isTablet) {
        rootGroup.scale.set(0.7, 0.7, 0.7);
        return 1.6;
      } else {
        rootGroup.scale.set(1.0, 1.0, 1.0);
        return 2.1;
      }
    };
    let baseX = updateLayout();
    rootGroup.position.x = baseX;
    scene.add(rootGroup);

    // 1. Faceted Polygonal Crystal Logo Object
    // Create Custom Hexagonal Faceted "C" Shape Geometry
    const shape = new THREE.Shape();
    // Outer hexagonal profile
    shape.moveTo(-1.8, -1.2);
    shape.lineTo(-1.8, 1.2);
    shape.lineTo(-0.8, 1.9);
    shape.lineTo(1.2, 1.9);
    shape.lineTo(1.8, 1.3);
    shape.lineTo(0.9, 0.6);
    shape.lineTo(-0.2, 1.1);
    shape.lineTo(-1.0, 0.7);
    shape.lineTo(-1.0, -0.7);
    shape.lineTo(-0.2, -1.1);
    shape.lineTo(0.9, -0.6);
    shape.lineTo(1.8, -1.3);
    shape.lineTo(1.2, -1.9);
    shape.lineTo(-0.8, -1.9);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.65,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 2, // Low poly faceted look!
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    geometry.computeVertexNormals();

    // Steel Blue Physical Material (Left side feeling)
    const steelBlueMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e3a5f"),
      emissive: new THREE.Color("#0c2d48"),
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      flatShading: true, // Crucial for low-poly crystal facets!
    });

    // Titanium Silver / Chrome Physical Material (Right facet feeling)
    const silverChromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e2e8f0"),
      emissive: new THREE.Color("#334155"),
      emissiveIntensity: 0.25,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });

    // Split into faceted dual-toned crystal
    const crystalMesh1 = new THREE.Mesh(geometry, steelBlueMat);
    crystalMesh1.position.set(-0.2, 0, 0);
    crystalMesh1.scale.set(0.95, 0.95, 0.95);
    rootGroup.add(crystalMesh1);

    // Companion faceted diamond facet on the opening (representing the silver crystal wing)
    const facetWingGeom = new THREE.ConeGeometry(0.9, 1.8, 5);
    facetWingGeom.computeVertexNormals();
    const crystalWing = new THREE.Mesh(facetWingGeom, silverChromeMat);
    crystalWing.position.set(1.15, 0, 0.1);
    crystalWing.rotation.z = -Math.PI / 4;
    crystalWing.rotation.x = Math.PI / 6;
    rootGroup.add(crystalWing);

    // 2. Floating Crystal Shards (Section 7)
    const shardsCount = 36;
    const shardsGroup = new THREE.Group();
    rootGroup.add(shardsGroup);

    const shardGeom = new THREE.OctahedronGeometry(0.12, 0);
    const shardData: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      yOffset: number;
      rotSpeed: { x: number; y: number; z: number };
    }[] = [];

    for (let i = 0; i < shardsCount; i++) {
      const isSilver = i % 2 === 0;
      const shardMesh = new THREE.Mesh(shardGeom, isSilver ? silverChromeMat : steelBlueMat);
      const radius = 2.4 + Math.random() * 2.2;
      const angle = (i / shardsCount) * Math.PI * 2 + Math.random() * 0.5;
      const yOffset = (Math.random() - 0.5) * 3.5;

      shardMesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      const scale = 0.4 + Math.random() * 0.8;
      shardMesh.scale.set(scale, scale * 1.5, scale);

      shardsGroup.add(shardMesh);
      shardData.push({
        mesh: shardMesh,
        radius,
        speed: 0.003 + Math.random() * 0.006,
        angle,
        yOffset,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.04,
          y: (Math.random() - 0.5) * 0.04,
          z: (Math.random() - 0.5) * 0.04,
        },
      });
    }

    // 3. Mouse Parallax & Scroll Drift
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
      targetRotY = mouseX * 0.45;
      targetRotX = mouseY * 0.35;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      baseX = updateLayout();
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Base idle spin
      crystalMesh1.rotation.y = Math.sin(time * 0.35) * 0.25;
      crystalMesh1.rotation.x = Math.cos(time * 0.28) * 0.15;
      crystalWing.rotation.y = -Math.sin(time * 0.4) * 0.3;

      // Gentle floating bob
      rootGroup.position.y = Math.sin(time * 1.2) * 0.15;

      // Scroll-driven drift: crystal shifts to side and recedes as user scrolls past hero
      const scrollFactor = Math.min(scrollY / 800, 1.5);
      rootGroup.position.x = baseX + scrollFactor * 2.2;
      rootGroup.position.z = -scrollFactor * 1.5;
      rootGroup.rotation.z = scrollFactor * 0.4;

      // Shards orbit
      for (let i = 0; i < shardData.length; i++) {
        const item = shardData[i];
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = item.yOffset + Math.sin(time * 2 + i) * 0.25;
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      steelBlueMat.dispose();
      silverChromeMat.dispose();
      shardGeom.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <img
          src="/images/cd-mark.png"
          alt="Cyber Design House Crystal"
          className="w-72 h-72 object-contain animate-pulse"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
};
