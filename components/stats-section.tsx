"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, Link2, Globe, Cpu } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 2400000,
    suffix: "+",
    label: "Connected Users",
    description: "Active neural link subscribers",
  },
  {
    icon: Link2,
    value: 847,
    suffix: "M",
    label: "Neural Links",
    description: "Daily data transmissions",
  },
  {
    icon: Globe,
    value: 142,
    suffix: "",
    label: "Global Reach",
    description: "Countries with active users",
  },
  {
    icon: Cpu,
    value: 99.97,
    suffix: "%",
    label: "AI Processing",
    description: "System uptime reliability",
  },
]

function AnimatedCounter({ 
  value, 
  suffix, 
  isVisible 
}: { 
  value: number
  suffix: string
  isVisible: boolean 
}) {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isVisible) return

    if (prefersReducedMotion) {
      setCount(value)
      return
    }

    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible, value, prefersReducedMotion])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "")
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "")
    }
    return num.toFixed(value % 1 !== 0 ? 2 : 0)
  }

  return (
    <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
      {formatNumber(count)}
      {value >= 1000000 && "M"}
      {value >= 1000 && value < 1000000 && "K"}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index, isVisible }: { 
  stat: typeof stats[0]
  index: number
  isVisible: boolean 
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 lg:p-8 rounded-2xl glass-card text-center group"
    >
      {/* Icon */}
      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-6 group-hover:scale-110 transition-transform">
        <stat.icon className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>

      {/* Animated Value */}
      <div className="mb-2">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
      </div>

      {/* Label */}
      <h3 className="font-display text-lg font-bold text-foreground mb-1">
        {stat.label}
      </h3>
      <p className="font-heading text-sm text-muted-foreground">
        {stat.description}
      </p>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.article>
  )
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="stats" className="relative py-24 lg:py-32 overflow-hidden bg-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 neural-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-sm text-primary tracking-widest uppercase mb-4">
            Global Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Numbers That Define Us
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join millions of enhanced humans who have already taken the next step in evolution.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
