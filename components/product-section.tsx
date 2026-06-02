"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Shield, Zap, Wifi } from "lucide-react"

const products = [
  {
    id: 1,
    name: "NeuroLink Pro",
    category: "Neural Interface",
    description: "Our flagship brain-computer interface with quantum processing capabilities.",
    features: ["Thought-to-Action", "Memory Enhancement", "Dream Recording"],
    icon: Shield,
    gradient: "from-primary via-primary/80 to-primary/40",
  },
  {
    id: 2,
    name: "CyberOptics X",
    category: "Visual Enhancement",
    description: "Next-generation ocular implants with integrated AR display and infrared vision.",
    features: ["AR Overlay", "Night Vision", "Zoom 50x"],
    icon: Zap,
    gradient: "from-secondary via-secondary/80 to-secondary/40",
  },
  {
    id: 3,
    name: "SynapseCore",
    category: "AI Co-Processor",
    description: "Neural co-processor that augments cognitive functions and enables parallel thinking.",
    features: ["100 TFLOPS", "AI Assistant", "Instant Learning"],
    icon: Wifi,
    gradient: "from-accent via-accent/80 to-accent/40",
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative h-full p-6 lg:p-8 rounded-2xl glass-card overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Product Visual Placeholder */}
        <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-muted/30">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-primary/30"
              />
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-secondary/30"
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <product.icon className="h-12 w-12 text-primary" aria-hidden="true" />
              </div>
            </div>
          </div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={prefersReducedMotion ? {} : { y: ["0%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/3 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
            />
          </div>
        </div>

        {/* Category */}
        <span className="inline-block font-mono text-xs text-primary tracking-widest uppercase mb-2">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-heading text-muted-foreground mb-6 text-pretty">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 rounded-full bg-muted/50 text-sm font-heading text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary hover:gap-3 transition-all group/btn"
          aria-label={`Learn more about ${product.name}`}
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}

export function ProductSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden bg-muted/20">
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
            Product Line
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Augment Your Reality
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our revolutionary product line designed to enhance every aspect of human capability.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
