"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

const NetworkParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas to full window size
    const setCanvasSize = () => {
      const heroSection = document.querySelector('section')
      if (!heroSection) return
      
      canvas.width = heroSection.clientWidth
      canvas.height = heroSection.clientHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      connections: number
      constructor() {
        const heroSection = document.querySelector('section')
        if (!heroSection) {
          // Default values if heroSection not found
          this.x = 0
          this.y = 0
          this.vx = 0
          this.vy = 0
          this.radius = 0
          this.connections = 0
          return
        }
        
        this.x = Math.random() * heroSection.clientWidth
        this.y = Math.random() * heroSection.clientHeight
        this.vx = (Math.random() - 0.5) * 0.7
        this.vy = (Math.random() - 0.5) * 0.7
        this.radius = Math.random() * 2.5 + 1.5
        this.connections = 0
      }
      
      update() {
        const heroSection = document.querySelector('section')
        if (!heroSection) return
        
        this.x += this.vx
        this.y += this.vy
        
        // Bounce off edges with slight damping
        if (this.x < 0 || this.x > heroSection.clientWidth) {
          this.vx *= -0.95
        }
        
        if (this.y < 0 || this.y > heroSection.clientHeight) {
          this.vy *= -0.95
        }
        
        // Keep particles within bounds
        this.x = Math.max(0, Math.min(this.x, heroSection.clientWidth))
        this.y = Math.max(0, Math.min(this.y, heroSection.clientHeight))
        
        // Occasionally change direction slightly for more organic movement
        if (Math.random() < 0.03) {
          this.vx += (Math.random() - 0.5) * 0.1
          this.vy += (Math.random() - 0.5) * 0.1
        }
        
        // Limit velocity
        const maxVel = 0.6
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel
          this.vy = (this.vy / vel) * maxVel
        }
        
        // Reset connection count for next frame
        this.connections = 0
      }
      
      draw(ctx: CanvasRenderingContext2D) {  // Now accepts ctx as parameter
        if (!ctx) return
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(102, 126, 234, 0.9)' // Mild indigo particles
        ctx.fill()
      }
    }
    
    // Create particles evenly distributed across the canvas
    const createParticles = () => {
      const heroSection = document.querySelector('section')
      if (!heroSection) return []
      
      const particleCount = Math.min(100, Math.max(50, Math.floor(heroSection.clientWidth * heroSection.clientHeight / 12000)))
      const particles = []
      
      // Create grid-based distribution for more even coverage
      const gridCols = Math.ceil(Math.sqrt(particleCount))
      const gridRows = Math.ceil(particleCount / gridCols)
      const cellWidth = heroSection.clientWidth / gridCols
      const cellHeight = heroSection.clientHeight / gridRows
      
      let count = 0
      for (let i = 0; i < gridRows && count < particleCount; i++) {
        for (let j = 0; j < gridCols && count < particleCount; j++) {
          const particle = new Particle()
          
          // Position within cell with some randomness
          particle.x = (j + 0.2 + Math.random() * 0.6) * cellWidth
          particle.y = (i + 0.2 + Math.random() * 0.6) * cellHeight
          
          particles.push(particle)
          count++
        }
      }
      
      // Create one central particle with more connections
      const centralParticle = new Particle()
      centralParticle.x = heroSection.clientWidth / 2
      centralParticle.y = heroSection.clientHeight / 2
      centralParticle.radius = 3.5 // Increased size
      centralParticle.vx = 0
      centralParticle.vy = 0
      particles.push(centralParticle)
      
      // Create a few focal points for more visual interest
      for (let i = 0; i < 3; i++) {
        const focalPoint = new Particle()
        focalPoint.x = heroSection.clientWidth * (0.2 + Math.random() * 0.6)
        focalPoint.y = heroSection.clientHeight * (0.2 + Math.random() * 0.6)
        focalPoint.radius = 3 // Increased size
        focalPoint.vx = (Math.random() - 0.5) * 0.15
        focalPoint.vy = (Math.random() - 0.5) * 0.15
        particles.push(focalPoint)
      }
      
      return particles
    }
    
    // Create particles
    const particles = createParticles() || []
    
    // Pre-process initial connections (to ensure we start with a connected network)
    const preProcessConnections = () => {
      const heroSection = document.querySelector('section')
      if (!heroSection) return
      
      // Draw background first
      ctx.fillStyle = '#ffffff' // White background
      ctx.fillRect(0, 0, heroSection.clientWidth, heroSection.clientHeight)
      
      // Draw all particles
      particles.forEach(particle => {
        particle.draw(ctx)  // Pass ctx to draw method
      })
      
      // Find and connect reasonable number of particles
      const mainParticle = particles[particles.length - 4] // The central particle
      if (!mainParticle) return
      
      // First connect central particle
      for (let i = 0; i < particles.length - 4; i++) {
        const particle = particles[i]
        if (!particle) continue
        
        const dx = mainParticle.x - particle.x
        const dy = mainParticle.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < heroSection.clientWidth / 3) {
          ctx.strokeStyle = 'rgba(102, 126, 234, 0.4)' // Mild indigo connections
          ctx.lineWidth = 0.8 // Thicker lines
          ctx.beginPath()
          ctx.moveTo(mainParticle.x, mainParticle.y)
          ctx.lineTo(particle.x, particle.y)
          ctx.stroke()
          
          particle.connections++
          mainParticle.connections++
        }
      }
      
      // Then connect other particles to ensure we have a nicely populated network
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.4)' // Mild indigo connections
      ctx.lineWidth = 0.8 // Thicker lines
      
      for (let i = 0; i < particles.length; i++) {
        const particleA = particles[i]
        if (!particleA) continue
        
        for (let j = i + 1; j < particles.length; j++) {
          const particleB = particles[j]
          if (!particleB) continue
          
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const connectionDistance = heroSection.clientWidth / 8
          if (distance < connectionDistance && particleA.connections < 5 && particleB.connections < 5) {
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.4 * (1 - distance / connectionDistance)})`
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
            
            particleA.connections++
            particleB.connections++
          }
        }
      }
    }
    
    // Run the pre-processing once immediately
    preProcessConnections()
    
    // Animation loop
    const animate = () => {
      const heroSection = document.querySelector('section')
      if (!heroSection || !canvas) return
      
      // Clear canvas with white background
      ctx.fillStyle = '#ffffff' // White background
      ctx.fillRect(0, 0, heroSection.clientWidth, heroSection.clientHeight)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)  // Pass ctx to draw method
      })
      
      // Draw connections - central particles first (last 4 in the array)
      for (let k = Math.max(0, particles.length - 4); k < particles.length; k++) {
        const centralParticle = particles[k]
        if (!centralParticle) continue
        
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.4)' // Mild indigo connections
        ctx.lineWidth = 0.8 // Thicker lines
        
        for (let i = 0; i < particles.length - 4; i++) {
          const particle = particles[i]
          if (!particle) continue
          
          const dx = centralParticle.x - particle.x
          const dy = centralParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < heroSection.clientWidth / 3) {
            ctx.beginPath()
            ctx.moveTo(centralParticle.x, centralParticle.y)
            ctx.lineTo(particle.x, particle.y)
            ctx.stroke()
            
            particle.connections++
            centralParticle.connections++
          }
        }
      }
      
      // Draw connections between regular particles
      for (let i = 0; i < particles.length; i++) {
        const particleA = particles[i]
        if (!particleA || particleA.connections >= 5) continue
        
        for (let j = i + 1; j < particles.length; j++) {
          const particleB = particles[j]
          if (!particleB || particleB.connections >= 5) continue
          
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Only connect particles within a certain range
          const connectionDistance = heroSection.clientWidth / 8
          if (distance < connectionDistance) {
            // Make connections fade with distance
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.4 * (1 - distance / connectionDistance)})`
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
            
            particleA.connections++
            particleB.connections++
          }
        }
      }
      
      // Reset connection counts for next frame
      particles.forEach(particle => {
        if (particle) {
          particle.connections = 0
        }
      })
      
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10" 
    />
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden">
      <NetworkParticles />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ letterSpacing: '0.5em' }}
          animate={{ letterSpacing: '0.1em' }}
          transition={{ duration: 1.5 }}
        >
          Hi, I'm Tarun <motion.span 
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block origin-bottom-right"
          >👋</motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          I'm a full-stack developer who loves building random stuff
        </motion.p>
        
      </motion.div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            className="flex flex-col items-center"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xl text-indigo-600">↓</span>
              <span className="text-sm tracking-wider text-indigo-600">SCROLL DOWN</span>
            </div>
          </motion.div>
        </div>
    </section>
  )
}