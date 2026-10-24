"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const RoamingCrystalShard: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsLoaded(false);
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

    let width = window.innerWidth;
    let height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.8);

    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Subtle atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const blueBackLight = new THREE.DirectionalLight(0x1d4ed8, 3.2);
    blueBackLight.position.set(-6, -4, -3);
    scene.add(blueBackLight);

    // Root Group for the Roaming Shard
    const shardRoot = new THREE.Group();
    scene.add(shardRoot);

    // Dedicated Point Lights attached to the shard for dynamic specular glints
    const shardGlowLight = new THREE.PointLight(0x60a5fa, 6.0, 12, 1.2);
    shardGlowLight.position.set(0.6, 0.8, 1.2);
    shardRoot.add(shardGlowLight);

    const silverRimLight = new THREE.PointLight(0xf8fafc, 4.5, 9, 1.5);
    silverRimLight.position.set(-0.8, -0.6, 1.0);
    shardRoot.add(silverRimLight);

    // 1. Steel Blue Physical Material (Matching Hero Crystal Logo)
    const steelBlueMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e3a5f"),
      emissive: new THREE.Color("#0c2d48"),
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      flatShading: true, // Distinct crystal facets!
    });

    // 2. Titanium Silver Chrome Material (Matching Logo Wing)
    const silverChromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f1f5f9"),
      emissive: new THREE.Color("#334155"),
      emissiveIntensity: 0.35,
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      flatShading: true,
    });

    // 3. Central Faceted Diamond Shard
    const coreGeom = new THREE.OctahedronGeometry(0.52, 0);
    coreGeom.computeVertexNormals();
    const coreMesh = new THREE.Mesh(coreGeom, steelBlueMat);
    coreMesh.scale.set(0.9, 1.25, 0.9);
    shardRoot.add(coreMesh);

    // 4. Companion Silver Crystal Wing / Spike attached to the shard
    const wingGeom = new THREE.ConeGeometry(0.32, 0.75, 5);
    wingGeom.computeVertexNormals();
    const wingMesh = new THREE.Mesh(wingGeom, silverChromeMat);
    wingMesh.position.set(0.32, 0.15, 0.08);
    wingMesh.rotation.z = -Math.PI / 3.8;
    wingMesh.rotation.x = Math.PI / 5;
    shardRoot.add(wingMesh);

    // 5. Orbiting Micro-Shards (3 satellites)
    const satelliteGroup = new THREE.Group();
    shardRoot.add(satelliteGroup);

    const microGeom = new THREE.OctahedronGeometry(0.085, 0);
    const satellites: {
      mesh: THREE.Mesh;
      radiusX: number;
      radiusZ: number;
      speed: number;
      angle: number;
      yOffset: number;
      tilt: number;
    }[] = [];

    for (let i = 0; i < 3; i++) {
      const isSilver = i % 2 === 0;
      const sMesh = new THREE.Mesh(microGeom, isSilver ? silverChromeMat : steelBlueMat);
      const radiusX = 0.95 + i * 0.32;
      const radiusZ = 0.75 + i * 0.25;
      const angle = (i * Math.PI * 2) / 3;
      const yOffset = (i - 1) * 0.22;
      const speed = (0.015 + i * 0.008) * (i % 2 === 0 ? 1 : -1);
      const tilt = (i * Math.PI) / 6;

      sMesh.scale.set(0.9, 1.4, 0.9);
      satelliteGroup.add(sMesh);
      satellites.push({ mesh: sMesh, radiusX, radiusZ, speed, angle, yOffset, tilt });
    }

    // Interactive mouse and scroll physics
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      targetMouseX = mouseX * 0.45;
      targetMouseY = mouseY * 0.35;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    handleScroll();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Initial position inside the Header Logo (Top-Left)
    // In camera space: Top is ~2.7, left logo position is ~ -2.7 on desktop
    const getHeaderOrigin = () => {
      const isMobile = window.innerWidth < 768;
      return {
        x: isMobile ? 1.35 : -2.65,
        y: 2.75,
        z: -1.2,
      };
    };

    const headerOrigin = getHeaderOrigin();
    let currentX = headerOrigin.x;
    let currentY = headerOrigin.y;
    let currentZ = headerOrigin.z;

    shardRoot.position.set(currentX, currentY, currentZ);
    shardRoot.scale.set(0.01, 0.01, 0.01);

    // Entrance animation timer ("wo header ke andr se nikle")
    let entranceTimer = 0;
    const entranceDuration = 1.7; // seconds

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const isMobile = window.innerWidth < 768;
      const baseScale = isMobile ? 0.38 : 0.95;

      // Calculate Header Emergence
      entranceTimer += delta;
      const rawEntrance = Math.min(entranceTimer / entranceDuration, 1.0);
      // Elastic / cubic ease-out
      const easeProgress = 1 - Math.pow(1 - rawEntrance, 3);

      // Scale expansion from header: shoots up with slight anticipatory overshoot
      let currentScale = 0;
      if (rawEntrance < 0.4) {
        const t = rawEntrance / 0.4;
        currentScale = THREE.MathUtils.lerp(0.01, baseScale * 1.2, t);
      } else {
        const t = (rawEntrance - 0.4) / 0.6;
        currentScale = THREE.MathUtils.lerp(baseScale * 1.2, baseScale, 1 - Math.pow(1 - t, 2));
      }
      shardRoot.scale.set(currentScale, currentScale, currentScale);

      // Light burst settling as it emerges from header
      shardGlowLight.intensity = THREE.MathUtils.lerp(7.5, 4.2, easeProgress);
      silverRimLight.intensity = THREE.MathUtils.lerp(5.5, 3.0, easeProgress);

      // Destination target on screen based on scroll & page section
      const p = scrollProgress;
      let destTargetX = 0;
      let destTargetY = 0;

      if (isMobile) {
        // Safe ambient companion on mobile: Top-right margin, gentle float, never cuts through center cards/text
        destTargetX = 1.35 + Math.sin(time * 0.45) * 0.12;
        destTargetY = 2.3 + Math.cos(time * 0.35) * 0.12;
      } else {
        const waypoints = [
          { p: 0.0, x: 2.7, y: 1.1 },   // Top / Hero: upper right
          { p: 0.18, x: 2.9, y: -0.4 }, // Work / Service intro: mid right
          { p: 0.36, x: -2.8, y: 0.5 }, // Section 2: floating left
          { p: 0.55, x: 2.6, y: -1.0 }, // Section 3: lower right
          { p: 0.72, x: -2.7, y: -0.6 },// Section 4: lower left
          { p: 0.88, x: 2.8, y: 0.6 },  // Section 5: mid-upper right
          { p: 1.0, x: 1.8, y: -1.2 },   // Bottom / Footer
        ];

        let idx = 0;
        for (let i = 0; i < waypoints.length - 1; i++) {
          if (p >= waypoints[i].p && p <= waypoints[i + 1].p) {
            idx = i;
            break;
          }
        }
        if (p >= waypoints[waypoints.length - 1].p) {
          idx = waypoints.length - 2;
        }

        const w1 = waypoints[idx];
        const w2 = waypoints[idx + 1];
        const segProgress = (p - w1.p) / Math.max(0.001, w2.p - w1.p);
        const smoothSeg = 0.5 - 0.5 * Math.cos(Math.min(Math.max(segProgress, 0), 1) * Math.PI);

        destTargetX = THREE.MathUtils.lerp(w1.x, w2.x, smoothSeg);
        destTargetY = THREE.MathUtils.lerp(w1.y, w2.y, smoothSeg);
      }

      // Ambient continuous orbital wandering ("har section pe ghumta rhe")
      const wanderX = Math.sin(time * 0.65) * 0.35 + Math.cos(time * 0.35) * 0.2;
      const wanderY = Math.cos(time * 0.55) * 0.3 + Math.sin(time * 0.45) * 0.18;
      const wanderZ = Math.sin(time * 0.8) * 0.25;

      let finalTargetX = destTargetX + targetMouseX * 0.5 + wanderX;
      let finalTargetY = destTargetY + targetMouseY * 0.4 + wanderY;
      let finalTargetZ = wanderZ;

      if (rawEntrance < 1.0) {
        // While emerging from header: arc outward into foreground then swoop into orbit
        const origin = getHeaderOrigin();
        const arcSwoop = Math.sin(easeProgress * Math.PI);
        finalTargetX = THREE.MathUtils.lerp(origin.x, finalTargetX, easeProgress) + arcSwoop * 0.4;
        finalTargetY = THREE.MathUtils.lerp(origin.y, finalTargetY, easeProgress) - arcSwoop * 0.65;
        finalTargetZ = THREE.MathUtils.lerp(origin.z, finalTargetZ, easeProgress) + arcSwoop * 0.9;
      }

      // Smooth lerp easing
      const lerpSpeed = rawEntrance < 1.0 ? 0.08 : 0.055;
      currentX += (finalTargetX - currentX) * lerpSpeed;
      currentY += (finalTargetY - currentY) * lerpSpeed;
      currentZ += (finalTargetZ - currentZ) * lerpSpeed;

      shardRoot.position.set(currentX, currentY, currentZ);

      // Continuous 3D multi-axis tumbling spin ("ghumta rhe")
      const spinBoost = rawEntrance < 1.0 ? 3.0 : 1.0;
      coreMesh.rotation.y += delta * 0.95 * spinBoost;
      coreMesh.rotation.x += delta * 0.6 * spinBoost;
      coreMesh.rotation.z += delta * 0.4 * spinBoost;

      wingMesh.rotation.y -= delta * 0.8 * spinBoost;

      // Subtle responsive tilt to mouse
      shardRoot.rotation.y += (targetMouseX - shardRoot.rotation.y) * 0.06;
      shardRoot.rotation.x += (-targetMouseY - shardRoot.rotation.x) * 0.06;

      // Update orbiting satellites
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.angle += sat.speed * (rawEntrance < 1.0 ? 2.5 : 1.0);
        const cosA = Math.cos(sat.angle);
        const sinA = Math.sin(sat.angle);

        sat.mesh.position.x = cosA * sat.radiusX;
        sat.mesh.position.z = sinA * sat.radiusZ;
        sat.mesh.position.y = sat.yOffset + Math.sin(time * 2.2 + i * 1.5) * 0.18;

        sat.mesh.rotation.x += 0.04;
        sat.mesh.rotation.y += 0.05;
        sat.mesh.rotation.z += 0.03;
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

      coreGeom.dispose();
      wingGeom.dispose();
      microGeom.dispose();
      steelBlueMat.dispose();
      silverChromeMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) return null;

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-30 transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
};
