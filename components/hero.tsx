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
    
    // Store canvas dimensions for particle class access
    let canvasWidth = canvas.width
    let canvasHeight = canvas.height

    const setCanvasSize = () => {
      const heroSection = document.querySelector('section')
      if (!heroSection) return
      
      canvasWidth = canvas.width = heroSection.clientWidth
      canvasHeight = canvas.height = heroSection.clientHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      connections: number
      
      constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5)
        this.vy = (Math.random() - 0.5)
        this.radius = Math.random() * 2.5 + 1.5
        this.connections = 0
      }
      
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > canvasWidth) {
          this.vx *= -0.95
        }
        
        if (this.y < 0 || this.y > canvasHeight) {
          this.vy *= -0.95
        }
        
        this.x = Math.max(0, Math.min(this.x, canvasWidth))
        this.y = Math.max(0, Math.min(this.y, canvasHeight))
        
        if (Math.random() < 0.03) {
          this.vx += (Math.random() - 0.5) * 0.1
          this.vy += (Math.random() - 0.5) * 0.1
        }
        
        const maxVel = 0.6
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel
          this.vy = (this.vy / vel) * maxVel
        }
        
        this.connections = 0
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(160, 160, 160, 0.9)'
        ctx.fill()
      }
    }
    
    const createParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const particleCount = Math.min(100, Math.max(50, Math.floor(width * height / 12000)))
      const particles: Particle[] = []
      
      const gridCols = Math.ceil(Math.sqrt(particleCount))
      const gridRows = Math.ceil(particleCount / gridCols)
      const cellWidth = width / gridCols
      const cellHeight = height / gridRows
      
      let count = 0
      for (let i = 0; i < gridRows && count < particleCount; i++) {
        for (let j = 0; j < gridCols && count < particleCount; j++) {
          const particle = new Particle(ctx, width, height)
          particle.x = (j + 0.2 + Math.random() * 0.6) * cellWidth
          particle.y = (i + 0.2 + Math.random() * 0.6) * cellHeight
          particles.push(particle)
          count++
        }
      }
      
      // Add central particle
      const centralParticle = new Particle(ctx, width, height)
      centralParticle.x = width / 2
      centralParticle.y = height / 2
      centralParticle.radius = 3.5
      centralParticle.vx = 0
      centralParticle.vy = 0
      particles.push(centralParticle)
      
      return particles
    }
    
    const particles = createParticles(ctx, canvasWidth, canvasHeight)
    let animationFrameId: number
    
    const animate = () => {
      if (!canvas || !ctx) return
      
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      
      particles.forEach(particle => {
        particle.update(canvasWidth, canvasHeight)
        particle.draw(ctx)
      })
      
      // Draw connections between particles
      // ... (rest of your connection drawing code)
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
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
          className="text-5xl md:text-7xl font-bold mb-4 text-gray-800"
          initial={{ letterSpacing: '0.5em' }}
          animate={{ letterSpacing: '0.1em' }}
          transition={{ duration: 1.5 }}
        >
          Hi, I&apos;m Tarun <motion.span 
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block origin-bottom-right"
          >👋</motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          I&apos;m a full-stack developer who loves building random stuff
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
            <span className="mb-1 text-xl">↓</span>
            <span className="text-sm tracking-wider">SCROLL DOWN</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}