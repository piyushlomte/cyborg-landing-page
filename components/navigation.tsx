"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "AI Assistant", href: "#assistant" },
  { label: "About", href: "#stats" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.nav
      initial={prefersReducedMotion ? {} : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors" />
              <div className="absolute inset-1 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-display text-sm font-bold text-primary-foreground">CN</span>
              </div>
            </div>
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              CYBER<span className="text-primary">NEXUS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-heading text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="relative inline-flex items-center px-6 py-2 overflow-hidden font-heading text-sm font-semibold text-primary-foreground bg-primary rounded-lg group hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden glass"
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block font-heading text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-6 py-3 font-heading text-sm font-semibold text-primary-foreground bg-primary rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}
