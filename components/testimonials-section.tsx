"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Dr. Elena Voss",
    role: "Neurosurgeon",
    company: "Quantum Medical Institute",
    content: "The NeuroLink Pro has revolutionized how I perform surgeries. The enhanced precision and real-time data overlay have improved patient outcomes by 340%. This is the future of medicine.",
    avatar: "EV",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "AI Researcher",
    company: "DeepMind Labs",
    content: "Integrating with NEXUS has accelerated my research capabilities exponentially. I can now process and analyze datasets that would have taken months in mere hours. Truly transformative.",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Sarah Blackwood",
    role: "Professional Athlete",
    company: "Olympic Committee",
    content: "CyberOptics has given me abilities I never thought possible. My reaction time improved by 200ms, and the tactical overlay during competitions is like having a coach in my head.",
    avatar: "SB",
  },
  {
    id: 4,
    name: "Dr. James Okonkwo",
    role: "CEO",
    company: "BioTech Innovations",
    content: "After integrating SynapseCore, my ability to manage complex business decisions while maintaining work-life balance has dramatically improved. It&apos;s like having a super-powered second brain.",
    avatar: "JO",
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="h-full p-6 lg:p-8 rounded-2xl glass-card flex flex-col">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-primary/50 mb-6" aria-hidden="true" />

      {/* Content */}
      <blockquote className="font-heading text-lg text-foreground leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="font-display text-sm font-bold text-primary-foreground">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <cite className="not-italic font-display text-base font-bold text-foreground block">
            {testimonial.name}
          </cite>
          <span className="font-heading text-sm text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </span>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, prefersReducedMotion])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-30" />

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
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Enhanced Lives
          </h2>
          <p className="font-heading text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hear from those who have already embraced the future of human evolution.
          </p>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onFocus={() => setIsAutoPlaying(false)}
          onBlur={() => setIsAutoPlaying(true)}
        >
          {/* Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-3xl mx-auto">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "w-8 bg-primary" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
