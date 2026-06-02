"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef, useState, useActionState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

type FormState = {
  status: "idle" | "submitting" | "success" | "error"
  message: string
}

async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))
  
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")
  
  // Basic validation
  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in all required fields.",
    }
  }

  // Simulate success (in production, this would call your API)
  return {
    status: "success",
    message: "Thank you for your message. Our team will contact you within 24 hours.",
  }
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [honeypot, setHoneypot] = useState("")
  
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    status: "idle",
    message: "",
  })

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-sm text-primary tracking-widest uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Begin Your
              <br />
              <span className="text-primary">Evolution</span>
            </h2>
            <p className="font-heading text-lg text-muted-foreground mb-8 text-pretty">
              Ready to transcend human limitations? Our integration specialists are standing by 
              to guide you through your enhancement journey. Take the first step toward becoming 
              the best version of yourself.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">Headquarters</h3>
                  <p className="font-heading text-muted-foreground">Neo Tokyo, Sector 7, Japan</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">Email</h3>
                  <p className="font-heading text-muted-foreground">connect@cybernexus.io</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">Neural Link</h3>
                  <p className="font-heading text-muted-foreground">Direct thought transmission available</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 lg:p-8 rounded-2xl glass-card cyber-border">
              {state.status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Message Received
                  </h3>
                  <p className="font-heading text-muted-foreground">
                    {state.message}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-6">
                  {/* Honeypot - hidden from users, catches bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block font-heading text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block font-heading text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest" className="block font-heading text-sm font-medium text-foreground mb-2">
                      Area of Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 font-heading text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="neural">Neural Interface</option>
                      <option value="vision">Cyber Vision</option>
                      <option value="ai">AI Integration</option>
                      <option value="enterprise">Enterprise Solutions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-heading text-sm font-medium text-foreground mb-2">
                      Message <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 font-heading text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="Tell us about your enhancement goals..."
                    />
                  </div>

                  {/* Error Message */}
                  {state.status === "error" && (
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive" role="alert">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="font-heading text-sm">{state.message}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-heading text-base font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="font-mono text-xs text-muted-foreground text-center">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
