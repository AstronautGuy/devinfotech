"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextScramble } from "@/components/TextScramble";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Social Media Icons for Footer
const TwitterIcon = () => (
  <svg
    role="img"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
const GithubIcon = () => (
  <svg
    role="img"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C7.325 19.35 6.75 19.036 6.75 19.036c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
  </svg>
);
const DribbbleIcon = () => (
  <svg
    role="img"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-1.33-17.298c-3.364.39-6.237 2.12-8.062 4.755a9.63 9.63 0 0 1 7.636-3.468c.148-.003.295-.01.44-.01.12 0 .23.004.346.007a.526.526 0 0 0 .151-.013c.09-.007.178-.02.268-.025a1.86 1.86 0 0 0 .13-.023c.12-.026.24-.05.36-.076a1.274 1.274 0 0 0 .113-.07c.073-.046.147-.09.218-.135.093-.06.186-.12.278-.184.05-.034.1-.067.148-.1.09-.064.18-.127.27-.19.044-.033.088-.066.13-.1.085-.062.17-.124.254-.187.042-.03.083-.062.124-.094.08-.06.158-.12.237-.18.04-.03.08-.06.118-.09.075-.057.148-.114.222-.172.037-.028.073-.057.11-.085.07-.054.14-.108.21-.162.034-.027.068-.054.102-.08.065-.05.13-.1.194-.15.032-.025.063-.05.095-.075.06-.048.12-.095.18-.142.03-.024.06-.048.09-.072.056-.045.112-.09.168-.135a.86.86 0 0 0 .04-.03c.05-.04.1-.08.15-.12.022-.018.045-.035.067-.053.05-.04.1-.08.148-.12.023-.02.046-.038.068-.058.046-.04.093-.08.14-.12.022-.02.045-.04.066-.06.044-.04.088-.08.132-.12.02-.018.04-.036.06-.054.04-.038.08-.076.12-.113.018-.018.037-.035.055-.053.038-.037.076-.074.113-.11.018-.018.036-.036.054-.054.036-.035.072-.07.108-.105.017-.017.034-.034.05-.05.034-.034.068-.068.102-.1.016-.016.032-.032.048-.048.032-.032.064-.064.096-.096.015-.015.03-.03.045-.045l.044-.044c.015-.015.03-.03.044-.044.028-.03.057-.058.085-.087.014-.014.028-.028.042-.042.028-.028.055-.056.083-.084.013-.014.027-.027.04-.04.027-.027.054-.054.08-.08.013-.013.026-.026.04-.04.025-.026.05-.052.076-.078.012-.012.024-.024.036-.036a10.05 10.05 0 0 0-8.92-5.462zM21.72 16.48c-1.572-4.08-4.7-6.27-7.29-6.726 3.035 1.014 5.107 3.514 5.92 6.53 1.013.24 1.74.54 1.37 1.196zm-10.33-11.45c-.295.01-.588.02-.88.04a11.08 11.08 0 0 1-2.224 9.115c.99 1.485 2.22 2.76 3.58 3.785 1.25-2.22 1.83-4.75 1.7-7.28-.43-2.61-1.74-4.81-3.176-6.66zM9.48 19.34c-1.336-.99-2.53-2.22-3.48-3.64-.17-.27-.34-.55-.5-.83 3.11 3.96 7.21 5.31 10.51 4.45-1.99 1.09-4.28 1.62-6.53 1.62z"></path>
  </svg>
);

const Footer = () => {
  const pathname = usePathname();

  const isContactPage = pathname === "/contact";

  // --- STATE MANAGEMENT ---
  const [currentTime, setCurrentTime] = useState("");

  // --- REFS FOR ANIMATION TARGETS ---
  const footerRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  // --- LIVE CLOCK FOR INDIA STANDARD TIME ---
  useEffect(() => {
    const updateTime = () => {
      const timeInIndia = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(`${timeInIndia} IST`);
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  // --- SCROLL-TRIGGERED ANIMATIONS ---
  useEffect(() => {
    if (!footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const footerElements = gsap.utils.toArray([
      ctaSectionRef.current,
      footerContentRef.current,
    ]);
    footerElements.forEach((el) => {
      gsap.fromTo(
        el as HTMLElement,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: "top 90%", // Animate when 90% of the element is in view
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  // --- STYLES FOR ANIMATIONS & EFFECTS ---
  const customStyles = `
        .animate-blob {
            animation: blob 7s infinite;
        }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-4000 {
            animation-delay: -4s;
        }
        .link-underline {
            position: relative;
            display: inline-block;
        }
        .link-underline::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--primary-accent);
            transition: width 0.3s ease-in-out;
        }
        .link-underline:hover::after {
            width: 100%;
        }
    `;

  return (
    <>
      <style>{customStyles}</style>
      <footer
        ref={footerRef}
        className={`relative bg-[#121214] pt-20 overflow-hidden text-[#F0F0F0] ${isContactPage ? "hidden" : "block"}`}
      >
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 z-0">
          <div className="absolute w-[800px] h-[800px] -left-[400px] -bottom-[400px] bg-[var(--primary-accent)] rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute w-[700px] h-[700px] -right-[350px] -bottom-[350px] bg-[var(--secondary-accent)] rounded-full opacity-20 blur-3xl animate-blob"></div>
        </div>

        {/* Call-to-Action Section */}
        <div
          ref={ctaSectionRef}
          className="relative z-10 container mx-auto px-6 py-16 mb-20 bg-[rgba(255,255,255,0.05)] rounded-2xl backdrop-blur-lg border border-white/10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s build something extraordinary together. Reach out and
            we&apos;ll turn your vision into a stunning digital reality.
          </p>
          <Link href={"/contact"}>
            <button className="group relative px-8 py-4 text-lg font-bold text-white bg-[var(--primary-accent)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--primary-accent)] hover:scale-105">
              <span className="relative">Start a Project</span>
            </button>
          </Link>
        </div>

        {/* Main Footer Content */}
        <div
          ref={footerContentRef}
          className="relative z-10 container mx-auto px-6 pb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="md:col-span-2 lg:col-span-2">
              <TextScramble className="text-2xl font-bold tracking-wider mb-4">
                devinfotech
              </TextScramble>
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Crafting the future of the web with precision, passion, and a
                touch of arcane magic.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="#"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href="#"
                  aria-label="Dribbble"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <DribbbleIcon />
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/press"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/web-development"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ui-ux"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/branding"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    Branding
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/seo-optimization"
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    SEO
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a
                    href="mailto:info@devinfotech.net"
                    className="hover:text-white transition-colors"
                  >
                    info@devinfotech.net
                  </a>
                </li>
                <li>
                  <a
                    href="tel:9825039020"
                    className="hover:text-white transition-colors"
                  >
                    +91 9825039020
                  </a>
                </li>
                <li>
                  <a
                    href="tel:6351559189"
                    className="hover:text-white transition-colors"
                  >
                    +91 6351559189
                  </a>
                </li>
                <li>Vadodara, Gujarat, India</li>
                <li className="font-mono pt-2 animate-pulse">{currentTime}</li>
              </ul>
            </div>
          </div>

          {/* Sub-Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} devinfotech. All rights
              reserved.
            </p>
            <p>
              made with <span className="text-red-500">♥</span> by &copy;
              Devolve Studio.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
