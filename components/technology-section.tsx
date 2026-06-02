"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Eye, Cpu, Atom } from "lucide-react"

const technologies = [
  {
    icon: Brain,
    title: "Neural Interface",
    description: "Direct brain-computer connection enabling seamless thought-to-action translation with 99.9% accuracy.",
    color: "from-primary to-primary/50",
    stats: "10ms latency",
  },
  {
    icon: Eye,
    title: "Cyber Vision",
    description: "Enhanced optical implants providing augmented reality overlay, night vision, and data streaming capabilities.",
    color: "from-secondary to-secondary/50",
    stats: "8K resolution",
  },
  {
    icon: Cpu,
    title: "AI Cortex",
    description: "Integrated artificial intelligence co-processor that enhances cognitive functions and decision-making.",
    color: "from-accent to-accent/50",
    stats: "100 TFLOPS",
  },
  {
    icon: Atom,
    title: "Quantum Processor",
    description: "Next-generation quantum computing core enabling parallel universe simulation and predictive analytics.",
    color: "from-primary via-secondary to-accent",
    stats: "1000 qubits",
  },
]

function TechCard({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-6 lg:p-8 rounded-2xl glass-card overflow-hidden hover:border-primary/50 transition-all duration-300">
        {/* Background Glow */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${tech.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        
        {/* Icon */}
        <div className={`relative z-10 inline-flex p-3 rounded-xl bg-gradient-to-br ${tech.color} mb-6`}>
          <tech.icon className="h-6 w-6 text-background" aria-hidden="true" />
        </div>

        {/* Content */}
        <h3 className="font-display text-xl font-bold text-foreground mb-3">{tech.title}</h3>
        <p className="font-heading text-muted-foreground mb-4 text-pretty">{tech.description}</p>
        
        {/* Stats Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 text-primary font-mono text-sm">
          {tech.stats}
        </div>

        {/* Hover Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.article>
  )
}

export function TechnologySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="technology" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 neural-grid opacity-50" />
      
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
            Core Technologies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Breakthrough Innovations
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our suite of cutting-edge technologies seamlessly integrate with human biology, 
            unlocking unprecedented capabilities.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {technologies.map((tech, index) => (
            <TechCard key={tech.title} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
