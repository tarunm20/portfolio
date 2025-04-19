"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

const NetworkParticles = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctx = canvas.getContext('2d')
    
    // Set canvas to full window size
    const setCanvasSize = () => {
      const heroSection = document.querySelector('section')
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
        this.x = Math.random() * heroSection.clientWidth
        this.y = Math.random() * heroSection.clientHeight
        this.vx = (Math.random() - 0.5)
        this.vy = (Math.random() - 0.5)
        this.radius = Math.random() * 2.5 + 1.5
        this.connections = 0
      }
      
      update() {
        const heroSection = document.querySelector('section')
        this.x += this.vx
        this.y += this.vy
        
        // Bounce off edges
        if (this.x < 0 || this.x > heroSection.clientWidth) {
          this.vx *= -0.95
        }
        
        if (this.y < 0 || this.y > heroSection.clientHeight) {
          this.vy *= -0.95
        }
        
        this.x = Math.max(0, Math.min(this.x, heroSection.clientWidth))
        this.y = Math.max(0, Math.min(this.y, heroSection.clientHeight))
        
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
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(129, 140, 248, 0.9)' // Mild indigo particles
        ctx.fill()
      }
    }
    
    // Create particles
    const createParticles = () => {
      const heroSection = document.querySelector('section')
      const particleCount = Math.min(100, Math.max(50, Math.floor(heroSection.clientWidth * heroSection.clientHeight / 12000)))
      const particles = []
      
      const gridCols = Math.ceil(Math.sqrt(particleCount))
      const gridRows = Math.ceil(particleCount / gridCols)
      const cellWidth = heroSection.clientWidth / gridCols
      const cellHeight = heroSection.clientHeight / gridRows
      
      let count = 0
      for (let i = 0; i < gridRows && count < particleCount; i++) {
        for (let j = 0; j < gridCols && count < particleCount; j++) {
          const particle = new Particle()
          particle.x = (j + 0.2 + Math.random() * 0.6) * cellWidth
          particle.y = (i + 0.2 + Math.random() * 0.6) * cellHeight
          particles.push(particle)
          count++
        }
      }
      
      // Central particle
      const centralParticle = new Particle()
      centralParticle.x = heroSection.clientWidth / 2
      centralParticle.y = heroSection.clientHeight / 2
      centralParticle.radius = 3.5
      centralParticle.vx = 0
      centralParticle.vy = 0
      particles.push(centralParticle)
      
      // Focal points
      for (let i = 0; i < 3; i++) {
        const focalPoint = new Particle()
        focalPoint.x = heroSection.clientWidth * (0.2 + Math.random() * 0.6)
        focalPoint.y = heroSection.clientHeight * (0.2 + Math.random() * 0.6)
        focalPoint.radius = 3
        focalPoint.vx = (Math.random() - 0.5) * 0.15
        focalPoint.vy = (Math.random() - 0.5) * 0.15
        particles.push(focalPoint)
      }
      
      return particles
    }
    
    const particles = createParticles()
    
    const preProcessConnections = () => {
      const heroSection = document.querySelector('section')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, heroSection.clientWidth, heroSection.clientHeight)
      
      particles.forEach(particle => {
        particle.draw()
      })
      
      const mainParticle = particles[particles.length - 4]
      
      // Mild indigo connection colors
      for (let i = 0; i < particles.length - 4; i++) {
        const dx = mainParticle.x - particles[i].x
        const dy = mainParticle.y - particles[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < heroSection.clientWidth / 3) {
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)' // Mild indigo connections
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(mainParticle.x, mainParticle.y)
          ctx.lineTo(particles[i].x, particles[i].y)
          ctx.stroke()
          
          particles[i].connections++
          mainParticle.connections++
        }
      }
      
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)' // Mild indigo connections
      ctx.lineWidth = 0.8
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const connectionDistance = heroSection.clientWidth / 8
          if (distance < connectionDistance && particles[i].connections < 5 && particles[j].connections < 5) {
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.4 * (1 - distance / connectionDistance)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            
            particles[i].connections++
            particles[j].connections++
          }
        }
      }
    }
    
    preProcessConnections()
    
    const animate = () => {
      const heroSection = document.querySelector('section')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, heroSection.clientWidth, heroSection.clientHeight)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Draw connections with mild indigo
      for (let k = particles.length - 4; k < particles.length; k++) {
        const centralParticle = particles[k]
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)'
        ctx.lineWidth = 0.8
        
        for (let i = 0; i < particles.length - 4; i++) {
          const dx = centralParticle.x - particles[i].x
          const dy = centralParticle.y - particles[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < heroSection.clientWidth / 3) {
            ctx.beginPath()
            ctx.moveTo(centralParticle.x, centralParticle.y)
            ctx.lineTo(particles[i].x, particles[i].y)
            ctx.stroke()
            
            particles[i].connections++
            centralParticle.connections++
          }
        }
      }
      
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].connections >= 5) continue
        
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].connections >= 5) continue
          
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const connectionDistance = heroSection.clientWidth / 8
          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.4 * (1 - distance / connectionDistance)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            
            particles[i].connections++
            particles[j].connections++
          }
        }
      }
      
      particles.forEach(particle => {
        particle.connections = 0
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
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
          className="text-5xl md:text-7xl font-bold mb-4 text-gray-800"
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
          className="text-xl md:text-2xl max-w-xl text-gray-600"
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
            <span className="mb-1 text-xl">↓</span>
            <span className="text-sm tracking-wider">SCROLL DOWN</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}