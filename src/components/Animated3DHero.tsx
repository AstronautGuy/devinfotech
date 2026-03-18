"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Animated3DHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Clear out any existing canvases (Fast Refresh protection)
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    // Move camera further back to ensure it's not clipping into the object
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // performance optimization
    currentMount.appendChild(renderer.domElement);

    // Group for object manipulation
    const group = new THREE.Group();
    scene.add(group);

    // Outer Wireframe Icosahedron
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, // Tailwind sky-500
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    group.add(icosahedron);

    // Inner Solid Object
    const innerGeo = new THREE.IcosahedronGeometry(1.8, 0);
    const innerMat = new THREE.MeshNormalMaterial({
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Particles/Stars around the globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Random positions inside a large cube area
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop & interactivity
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation
      icosahedron.rotation.x += 0.0015;
      icosahedron.rotation.y += 0.003;

      innerMesh.rotation.x -= 0.002;
      innerMesh.rotation.y += 0.004;

      // Mouse interactivity target
      const targetX = mouseX * 0.5;
      const targetY = mouseY * 0.5;

      // Smooth interpolation for mouse movement
      group.rotation.x += 0.05 * (targetY - group.rotation.x);
      group.rotation.y += 0.05 * (targetX - group.rotation.y);

      // Rotate particles slowly
      particlesMesh.rotation.y -= 0.0008;
      particlesMesh.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[400px] lg:min-h-[600px] absolute inset-0 mix-blend-screen opacity-90" />;
}
