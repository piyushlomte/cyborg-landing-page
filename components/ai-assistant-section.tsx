"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

const demoConversation = [
  {
    role: "assistant",
    content: "Hello! I'm NEXUS, your AI integration assistant. How can I help enhance your human experience today?",
  },
  {
    role: "user",
    content: "Tell me about the neural interface installation process.",
  },
  {
    role: "assistant",
    content: "The NeuroLink installation is a minimally invasive 45-minute procedure. Our bioengineers use nano-scale probes that integrate seamlessly with your neural pathways. You'll experience enhanced cognitive functions within 24 hours, with full integration completing in approximately 2 weeks.",
  },
  {
    role: "user",
    content: "Is it safe?",
  },
  {
    role: "assistant",
    content: "Absolutely. Our technology has achieved a 99.97% success rate across 2.4 million installations worldwide. The procedure is FDA-approved and covered by most enhanced healthcare plans. Would you like to schedule a consultation?",
  },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        className="w-2 h-2 rounded-full bg-primary"
      />
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="w-2 h-2 rounded-full bg-primary"
      />
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="w-2 h-2 rounded-full bg-primary"
      />
    </div>
  )
}

function ChatMessage({ message, index, isVisible }: { 
  message: typeof demoConversation[0]
  index: number
  isVisible: boolean 
}) {
  const prefersReducedMotion = useReducedMotion()
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? "bg-secondary" : "bg-gradient-to-br from-primary to-accent"
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-secondary-foreground" aria-hidden="true" />
        ) : (
          <Bot className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
        isUser 
          ? "bg-secondary text-secondary-foreground rounded-tr-md" 
          : "glass-card rounded-tl-md"
      }`}>
        <p className="font-heading text-sm leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  )
}

export function AIAssistantSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (isInView && visibleMessages < demoConversation.length) {
      const isNextAssistant = demoConversation[visibleMessages]?.role === "assistant"
      
      if (isNextAssistant && visibleMessages > 0) {
        setIsTyping(true)
        const typingTimeout = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages((prev) => prev + 1)
        }, prefersReducedMotion ? 100 : 1500)
        return () => clearTimeout(typingTimeout)
      } else {
        const timeout = setTimeout(() => {
          setVisibleMessages((prev) => prev + 1)
        }, prefersReducedMotion ? 100 : 800)
        return () => clearTimeout(timeout)
      }
    }
  }, [isInView, visibleMessages, prefersReducedMotion])

  return (
    <section id="assistant" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-sm text-primary tracking-widest uppercase mb-4">
              AI Integration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Meet NEXUS
              <br />
              <span className="text-primary">Your AI Partner</span>
            </h2>
            <p className="font-heading text-lg text-muted-foreground mb-8 text-pretty">
              NEXUS is more than an assistant—it&apos;s an extension of your consciousness. 
              Powered by quantum neural networks, NEXUS learns your patterns, anticipates your needs, 
              and enhances your decision-making capabilities.
            </p>
            
            <ul className="space-y-4">
              {[
                "24/7 cognitive support and enhancement",
                "Real-time health monitoring and optimization",
                "Seamless integration with all Cyber Nexus products",
                "Continuous learning and adaptation to your needs",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-heading text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl glass-card overflow-hidden cyber-border">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-card" aria-label="Online" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">NEXUS AI</h3>
                  <p className="font-mono text-xs text-accent">Online • Quantum Core Active</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 h-80 overflow-y-auto space-y-4" role="log" aria-live="polite">
                {demoConversation.slice(0, visibleMessages).map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                    index={index}
                    isVisible={index < visibleMessages}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </div>

              {/* Chat Input */}
              <div className="px-4 py-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <label htmlFor="chat-input" className="sr-only">Type your message</label>
                  <input
                    id="chat-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask NEXUS anything..."
                    className="flex-1 px-4 py-3 rounded-xl bg-muted/50 font-heading text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
