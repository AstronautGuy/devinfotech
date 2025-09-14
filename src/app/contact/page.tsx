"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

// SVG Icon components for details section
const MailIcon = () => (
  <svg
    className="w-6 h-6 mr-4 text-[var(--primary-accent)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);
const PhoneIcon = () => (
  <svg
    className="w-6 h-6 mr-4 text-[var(--primary-accent)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    ></path>
  </svg>
);
const LocationIcon = () => (
  <svg
    className="w-6 h-6 mr-4 text-[var(--primary-accent)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
  </svg>
);

const ContactPage = () => {
  // --- STATE MANAGEMENT ---
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // --- REFS FOR ANIMATION & 3D CANVAS ---
  const pageRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // --- REALISTIC & INTEGRATED GLOBE ---
  useEffect(() => {
    if (!globeContainerRef.current) return;

    const mouse = { x: 0, y: 0 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    globeContainerRef.current.appendChild(renderer.domElement);

    camera.position.z = 2.5;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Earth
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("./textures/earth_lights_2048.png");
    const earthGeometry = new THREE.SphereGeometry(1.2, 2048, 2048);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Clouds
    const cloudTexture = textureLoader.load("./textures/earth_clouds_1024.png");
    const cloudGeometry = new THREE.SphereGeometry(1.22, 1024, 1024);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.7,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.0005;
      clouds.rotation.y += 0.0006;
      stars.rotation.y += 0.0001;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (globeContainerRef.current) {
        globeContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // --- PAGE LOAD ANIMATIONS ---
  useEffect(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    )
      .fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        detailsRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1",
      );
  }, []);

  // --- FORM SUBMISSION HANDLER ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 5000); // Reset after 5 seconds
    }, 2000);
  };

  return (
    <div
      ref={pageRef}
      className="bg-black/90 text-[#F0F0F0] min-h-screen relative overflow-hidden"
    >
      <div
        ref={globeContainerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></div>

      <div className="relative z-10 container mx-auto px-[5%] py-28 min-h-screen flex flex-col justify-center">
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            We&apos;re here to help and answer any question you might have. We look
            forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] p-8 rounded-2xl backdrop-blur-lg border border-white/10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-3 bg-[#1a1a1e] border border-gray-700 rounded-lg text-[#F0F0F0] focus:outline-none focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[var(--primary-accent)]/50 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(157,0,255,0.3)]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 bg-[#1a1a1e] border border-gray-700 rounded-lg text-[#F0F0F0] focus:outline-none focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[var(--primary-accent)]/50 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(157,0,255,0.3)]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full p-3 bg-[#1a1a1e] border border-gray-700 rounded-lg text-[#F0F0F0] focus:outline-none focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[var(--primary-accent)]/50 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(157,0,255,0.3)]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full p-3 bg-[#1a1a1e] border border-gray-700 rounded-lg text-[#F0F0F0] focus:outline-none focus:border-[var(--primary-accent)] focus:ring-2 focus:ring-[var(--primary-accent)]/50 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(157,0,255,0.3)]"
              ></textarea>
            </div>
            <div className="h-12">
              {formStatus === "success" ? (
                <p className="text-center text-green-400">
                  Message sent successfully! We&apos;ll be in touch soon.
                </p>
              ) : formStatus === "error" ? (
                <p className="text-center text-red-400">
                  Something went wrong. Please try again.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-3 text-lg font-bold text-white bg-[var(--primary-accent)] rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_var(--primary-accent)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              )}
            </div>
          </form>

          <div ref={detailsRef} className="space-y-8">
            <div className="p-8 rounded-2xl bg-[rgba(16,16,18,0.6)] backdrop-blur-md border border-white/10 space-y-4">
              <div className="flex items-center">
                <MailIcon />
                <a
                  href="mailto:contact@devinfotech.com"
                  className="hover:text-[var(--primary-accent)] transition-colors"
                >
                  contact@devinfotech.com
                </a>
              </div>
              <div className="flex items-center">
                <PhoneIcon />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-start">
                <LocationIcon />
                <span>
                  Manjalpur, Vadodara, <br />
                  Gujarat 390011, India
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59085.6496464459!2d73.1558509424883!3d22.25868826798036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a95b867c27%3A0x855423812d3128d5!2sManjalpur%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1663156948554!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
