"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Services3DViewerProps {
  activeIndex: number; // 0: Web, 1: App, 2: SEO, 3: Marketing
  className?: string;
}

export const Services3DViewer: React.FC<Services3DViewerProps> = ({
  activeIndex,
  className = "",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
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
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 15);
    cyanLight.position.set(-3, 2, 4);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x1d4ed8, 3.0, 15);
    blueLight.position.set(3, -2, 2);
    scene.add(blueLight);

    // Shared groups for each service:
    // 0: Influencer Marketing
    // 1: Website Development
    // 2: App Development
    // 3: SEO & Digital Marketing
    const groups: THREE.Group[] = [
      new THREE.Group(), // 0: Influencer Marketing
      new THREE.Group(), // 1: Website Development
      new THREE.Group(), // 2: App Development
      new THREE.Group(), // 3: SEO & Digital Marketing
    ];

    groups.forEach((g) => scene.add(g));

    // ==========================================
    // 0. INFLUENCER MARKETING: Studio Ring Light & 9:16 Reel Camera
    // ==========================================
    const infGroup = groups[0];
    // Studio Ring Light
    const ringLightGeom = new THREE.TorusGeometry(1.6, 0.12, 16, 64);
    const ringLightMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#fffbeb"),
      emissive: new THREE.Color("#fef08a"),
      emissiveIntensity: 1.4,
      metalness: 0.1,
      roughness: 0.1,
    });
    const ringLight = new THREE.Mesh(ringLightGeom, ringLightMat);
    ringLight.position.set(0, 0, -0.4);
    infGroup.add(ringLight);

    // Vertical 9:16 Creator Phone Screen
    const reelPhoneGeom = new THREE.BoxGeometry(1.7, 3.2, 0.12);
    const reelPhoneMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#09101d"),
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const reelPhone = new THREE.Mesh(reelPhoneGeom, reelPhoneMat);
    reelPhone.position.set(0, 0, 0.2);

    // Video Reel Display Screen
    const reelScreenGeom = new THREE.PlaneGeometry(1.5, 2.9);
    const reelScreenMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1e1b4b"),
    });
    const reelScreen = new THREE.Mesh(reelScreenGeom, reelScreenMat);
    reelScreen.position.z = 0.07;
    reelPhone.add(reelScreen);

    // Floating Play Triangle & Engagement Badge
    const playGeom = new THREE.ConeGeometry(0.28, 0.45, 3);
    const playMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const playBadge = new THREE.Mesh(playGeom, playMat);
    playBadge.rotation.z = -Math.PI / 2;
    playBadge.position.set(0, 0, 0.12);
    reelPhone.add(playBadge);

    // Floating Metric Tag
    const tagGeom = new THREE.BoxGeometry(1.1, 0.35, 0.04);
    const tagMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ec4899"),
      emissive: new THREE.Color("#db2777"),
      emissiveIntensity: 0.4,
    });
    const tag = new THREE.Mesh(tagGeom, tagMat);
    tag.position.set(0.6, -1.0, 0.2);
    reelPhone.add(tag);
    infGroup.add(reelPhone);

    // ==========================================
    // 1. WEBSITE DEVELOPMENT: Browser Glass Panels
    // ==========================================
    const webGroup = groups[1];
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e293b"),
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
      clearcoat: 0.8,
    });
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#38bdf8"),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const panelGeom = new THREE.BoxGeometry(3.2, 2.1, 0.08);
    const mainBrowser = new THREE.Mesh(panelGeom, glassMaterial);
    const mainFrame = new THREE.Mesh(panelGeom, frameMaterial);
    mainBrowser.add(mainFrame);
    webGroup.add(mainBrowser);

    // Floating secondary code panels
    const codeGeom = new THREE.BoxGeometry(1.6, 1.2, 0.05);
    const codePanel1 = new THREE.Mesh(codeGeom, glassMaterial);
    codePanel1.position.set(-1.4, 0.8, 0.6);
    codePanel1.rotation.y = 0.25;
    webGroup.add(codePanel1);

    const codePanel2 = new THREE.Mesh(codeGeom, glassMaterial);
    codePanel2.position.set(1.4, -0.6, 0.8);
    codePanel2.rotation.y = -0.3;
    webGroup.add(codePanel2);

    // Browser header dots
    [-1.3, -1.15, -1.0].forEach((x, idx) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0xef4444 : idx === 1 ? 0xf59e0b : 0x10b981,
        })
      );
      dot.position.set(x, 0.9, 0.05);
      mainBrowser.add(dot);
    });

    // ==========================================
    // 2. APP DEVELOPMENT: 3D Smartphone
    // ==========================================
    const appGroup = groups[2];
    const phoneBodyGeom = new THREE.BoxGeometry(2.0, 3.8, 0.22);
    const phoneBodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#09101d"),
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1.0,
    });
    const phone = new THREE.Mesh(phoneBodyGeom, phoneBodyMat);

    // Phone Screen
    const screenGeom = new THREE.PlaneGeometry(1.8, 3.5);
    const screenMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0f172a"),
    });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.z = 0.12;
    phone.add(screen);

    // Floating UI Card layers
    const cardGeom = new THREE.BoxGeometry(1.5, 0.8, 0.05);
    const cardMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1e3a5f"),
      metalness: 0.5,
      roughness: 0.3,
    });
    const card1 = new THREE.Mesh(cardGeom, cardMat);
    card1.position.set(0, 0.6, 0.35);
    phone.add(card1);

    const card2 = new THREE.Mesh(cardGeom, cardMat);
    card2.position.set(0, -0.5, 0.45);
    phone.add(card2);

    appGroup.add(phone);

    // ==========================================
    // 3. SEO & DIGITAL MARKETING: Rising Chart + Funnel Rings
    // ==========================================
    const seoMktGroup = groups[3];
    const barWidth = 0.32;
    const barSpacing = 0.48;
    const barHeights = [1.2, 1.8, 2.5, 3.4, 4.2];

    barHeights.forEach((h, i) => {
      const barGeom = new THREE.BoxGeometry(barWidth, h, barWidth);
      const isTop = i === barHeights.length - 1;
      const barMat = new THREE.MeshPhysicalMaterial({
        color: isTop ? new THREE.Color("#38bdf8") : new THREE.Color("#1e3a5f"),
        emissive: isTop ? new THREE.Color("#0284c7") : new THREE.Color("#0c2d48"),
        emissiveIntensity: isTop ? 0.7 : 0.2,
        metalness: 0.8,
        roughness: 0.2,
      });
      const bar = new THREE.Mesh(barGeom, barMat);
      bar.position.set((i - 2.0) * barSpacing - 0.4, -1.8 + h / 2, 0);
      seoMktGroup.add(bar);
    });

    // Glowing Funnel Ring
    const mktRingGeom = new THREE.TorusGeometry(1.4, 0.06, 12, 48);
    const mktRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#38bdf8"),
      emissive: new THREE.Color("#0ea5e9"),
      emissiveIntensity: 0.5,
    });
    const mktRing = new THREE.Mesh(mktRingGeom, mktRingMat);
    mktRing.rotation.x = Math.PI / 2.3;
    mktRing.position.set(0.6, 0.5, 0.3);
    seoMktGroup.add(mktRing);

    // Initial scale/visibility setup
    groups.forEach((g, idx) => {
      const isActive = idx === activeIndexRef.current;
      g.scale.setScalar(isActive ? 1 : 0.001);
      g.visible = isActive;
    });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Intersection Observer to pause rendering when not in view
    let isVisibleOnScreen = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleOnScreen = entry.isIntersecting;
    });
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisibleOnScreen) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const currentActive = activeIndexRef.current;

      // Smooth transition between groups
      groups.forEach((g, idx) => {
        const isTarget = idx === currentActive;
        const targetScale = isTarget ? 1 : 0.001;
        g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        if (g.scale.x < 0.05) {
          g.visible = false;
        } else {
          g.visible = true;
        }
      });

      // Object-specific animations
      if (infGroup.visible) {
        infGroup.rotation.y = Math.sin(time * 0.6) * 0.25;
        ringLight.rotation.z += 0.005;
        reelPhone.rotation.y = Math.sin(time * 0.8) * 0.15;
        reelPhone.position.y = Math.cos(time * 1.5) * 0.08;
      }

      if (webGroup.visible) {
        webGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
        webGroup.rotation.x = Math.cos(time * 0.4) * 0.1;
        codePanel1.position.z = 0.6 + Math.sin(time * 1.5) * 0.15;
        codePanel2.position.z = 0.8 + Math.cos(time * 1.5) * 0.15;
      }

      if (appGroup.visible) {
        phone.rotation.y = Math.sin(time * 0.8) * 0.35 + 0.1;
        phone.rotation.x = Math.cos(time * 0.6) * 0.15;
        card1.position.z = 0.35 + Math.sin(time * 2) * 0.1;
        card2.position.z = 0.45 + Math.cos(time * 2) * 0.1;
      }

      if (seoMktGroup.visible) {
        seoMktGroup.rotation.y = Math.sin(time * 0.4) * 0.25;
        mktRing.rotation.z += 0.01;
        mktRing.position.y = 0.5 + Math.sin(time * 1.8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[380px] lg:min-h-[500px] flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    />
  );
};
