"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  Users,
  Award,
  TrendingUp,
  Target,
  Heart,
  Star,
  Zap,
  CheckCircle,
  ArrowUp,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  prefix?: string;
  color: string;
  bgColor: string;
}

interface CompanyStatsProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString(),
  );

  return (
    <motion.div ref={countRef} className="flex items-baseline">
      <span className="text-inherit">{prefix}</span>
      <motion.span className="text-inherit">{displayValue}</motion.span>
      <span className="text-inherit">{suffix}</span>
    </motion.div>
  );
}

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.2,
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      className={cn(
        "relative group p-8 rounded-2xl border border-border/20 backdrop-blur-sm",
        "bg-gradient-to-br from-background/80 to-background/40",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        "overflow-hidden cursor-pointer",
      )}
    >
      {/* Background gradient overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          stat.bgColor,
        )}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/30"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
      />

      {/* Icon container */}
      <motion.div
        className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative",
          stat.bgColor,
        )}
        whileHover={{
          rotate: [0, -10, 10, -5, 0],
          scale: 1.1,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={cn("text-2xl", stat.color)}
          initial={{ scale: 0 }}
          animate={
            isInView
              ? {
                  scale: 1,
                  transition: {
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  },
                }
              : {}
          }
        >
          {stat.icon}
        </motion.div>

        {/* Icon glow effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20",
            stat.bgColor,
          )}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Value */}
      <motion.div
        className="text-4xl font-bold text-foreground mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: index * 0.2 + 0.4,
                  type: "spring",
                  stiffness: 150,
                },
              }
            : {}
        }
      >
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-muted-foreground font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.2 + 0.5,
                  duration: 0.5,
                },
              }
            : {}
        }
      >
        {stat.label}
      </motion.p>

      {/* Hover indicator */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300",
          stat.bgColor,
        )}
      />

      {/* Corner decoration */}
      <motion.div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function CompanyStats({
  stats = [
    {
      icon: <Heart className="w-6 h-6" />,
      value: 50000,
      label: "Happy Customers",
      suffix: "+",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: 1250,
      label: "Projects Completed",
      suffix: "+",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 150,
      label: "Team Members",
      suffix: "+",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: 15,
      label: "Years Experience",
      suffix: "",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: 98,
      label: "Success Rate",
      suffix: "%",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: 4.9,
      label: "Customer Rating",
      suffix: "/5",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ],
  title = "Our Achievements",
  subtitle = "Numbers That Tell Our Story",
  description = "We're proud of what we've accomplished together with our amazing clients and team members.",
  className,
}: CompanyStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-24 px-4 bg-gradient-to-t from-white to-gray-300 relative overflow-hidden",
        className,
      )}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/20"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-secondary/20"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Company Statistics
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Growing every day with our amazing community</span>
            <ArrowUp className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
