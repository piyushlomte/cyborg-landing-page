"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, Cpu, Zap } from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

function CyborgCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00F7FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Inner Core */}
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.6}
          wireframe
        />
      </Sphere>
      {/* Energy Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00FFAA" emissive="#00FFAA" emissiveIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#00F7FF" emissive="#00F7FF" emissiveIntensity={1.5} />
      </mesh>
    </Float>
  )
}

function NeuralParticles() {
  const count = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00F7FF" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F7FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
      <CyborgCore />
      <NeuralParticles />
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
    </>
  )
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden neural-grid">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Tagline */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-heading text-sm text-muted-foreground">
              Next-Gen Human Augmentation
            </span>
            <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="text-foreground">The Future Is</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Human + Machine
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Pioneering the next evolution of human potential through advanced neural interfaces, 
            AI integration, and cybernetic enhancement technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="group relative inline-flex items-center px-8 py-4 overflow-hidden font-heading text-base font-semibold text-primary-foreground bg-primary rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <span className="relative z-10">Begin Integration</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="#technology"
              className="inline-flex items-center px-8 py-4 font-heading text-base font-semibold text-foreground border border-border rounded-lg hover:border-primary hover:text-primary transition-all glass"
            >
              Explore Technology
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link
          href="#technology"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to technology section"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
