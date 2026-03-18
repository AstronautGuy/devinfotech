"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WelcomeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.main
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={
        "flex flex-col lg:flex-row items-center justify-evenly bg-gradient-to-b from-slate-50 to-slate-200 py-32 px-6 lg:px-[5%] relative overflow-hidden"
      }
    >
      {/* Decorative Floating SVG Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 opacity-30 pointer-events-none hidden lg:block text-[var(--primary-accent)]"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 opacity-20 pointer-events-none hidden lg:block text-blue-500"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="10" stroke="currentColor" strokeWidth="2" transform="rotate(20 50 50)" />
          <rect x="30" y="30" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" transform="rotate(-15 50 50)" />
        </svg>
      </motion.div>


      <motion.div variants={itemVariants} className="flex flex-col items-center justify-center lg:h-screen cursor-default select-none mb-16 lg:mb-0">
        <div className="flex pl-6 flex-col items-center">
          {/* Number */}
          <p className="text-8xl font-black text-slate-300 drop-shadow-sm">01</p>

          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-1 bg-gradient-to-b from-slate-400 to-transparent my-6 rounded-full"
          ></motion.div>

          {/* Vertical Text */}
          <p className="font-black text-slate-400 tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180">
            About Us
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col justify-start lg:w-1/2 space-y-6 z-10 px-4 lg:px-0">
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-5xl font-black uppercase text-slate-900 leading-tight">
            Welcome to <span className="text-[var(--primary-accent)]">Dev Infotech</span>
          </h1>
          <h2 className="text-2xl font-bold text-slate-500 uppercase mt-2">
            Your Complete IT Solutions Partner
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-32 h-2 bg-gradient-to-r from-[var(--primary-accent)] to-cyan-400 rounded-full my-6 drop-shadow-md"
        ></motion.div>

        <motion.div variants={itemVariants} className="space-y-6 text-slate-700 text-lg leading-relaxed">
          <p className="font-bold text-xl text-slate-800">A Complete IT Solutions Partner</p>
          <p>
            At Dev Infotech, we specialize in delivering end-to-end IT solutions
            tailored for individuals, professionals, and businesses.
            Whether you’re looking to buy a new computer, need custom PC builds,
            or require expert repair and maintenance services, we are your trusted partner for all
            things tech.
          </p>
          <p>
            Established in 1999, Dev Infotech was founded with a clear vision — to
            provide affordable, reliable, and cutting-edge IT services under one roof. With our years of experience, we’ve
            become a go-to destination for computer sales, service, and customized IT solutions in Vadodara and
            surrounding areas.
          </p>
          <p>
            We’ve built our reputation on trust, quality service, and customer
            satisfaction. From home users to corporate clients, we cater to a wide range of customers by staying up to date
            with the latest technology trends.
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="relative mt-16 lg:mt-0 w-full lg:w-auto flex justify-center lg:block">
        <div className="bg-sky-500/20 blur-[100px] h-[300px] w-[300px] lg:w-[400px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <Image
            src="/images/computer-repair.webp"
            alt="computer repair image"
            aria-hidden={true}
            width={500}
            height={500}
            loading={"lazy"}
            className="object-cover w-full max-w-[400px] lg:max-w-[500px]"
          />
          {/* Animated Float Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-accent)] to-cyan-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                25+
              </div>
              <div>
                <p className="text-slate-800 font-bold text-sm leading-tight">Years of</p>
                <p className="text-[var(--primary-accent)] font-black text-md leading-tight uppercase">Excellence</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
