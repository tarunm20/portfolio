"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "NeuroLeaf",
    description: "An AI-powered flashcard learning platform that generates personalized study materials from documents and provides adaptive testing with spaced repetition.",
    techStack: ["Gemini API", "TypeScript", "Next.js", "React"],
    demo: "https://neuroleaf.ai/",
    highlights: [
      "AI-powered flashcard generation from documents",
      "Adaptive testing with spaced repetition",
      "Personalized study recommendations",
      "Document upload and processing",
      "Progress tracking and analytics"
    ]
  },
  {
    title: "BlueTurtle.ai - Chat with Your Data",
    description: "An enterprise-grade AI analytics platform that enables teams to query databases using natural language, automatically generating SQL queries, visualizations, and actionable insights without requiring technical expertise.",
    techStack: ["AI/ML", "Natural Language Processing", "SQL Generation", "Data Visualization", "Enterprise Security"],
    github: null,
    demo: "https://blueturtle.ai",
    highlights: [
      "Natural language to SQL query translation",
      "Multi-database support (PostgreSQL, MySQL, SQL Server)",
      "Automatic chart generation and data visualization",
      "Enterprise-grade security with on-premise data",
      "Real-time insights without data team bottlenecks"
    ]
  },
  {
    title: "Synth - AI Flashcard Generator",
    description: "A production-ready web application that automatically generates flashcards from uploaded documents using Claude AI, featuring intelligent study modes, progress tracking, and spaced repetition for effective learning.",
    techStack: ["Spring Boot", "Next.js", "PostgreSQL", "Claude AI", "Docker", "JWT", "TypeScript"],
    github: "https://github.com/tarunm20/synth",
    demo: null,
    highlights: [
      "AI-powered flashcard generation",
      "Spaced repetition algorithm",
      "Progress tracking & analytics",
      "Secure JWT authentication",
      "Production-ready Docker deployment"
    ]
  },
  {
    title: "Photon Mapping Raytracer",
    description: "A photorealistic raytracer implementing advanced rendering techniques including photon mapping for global illumination, developed as part of UCSD's CSE 168 computer graphics course.",
    techStack: ["C++", "OpenGL", "GLSL"],
    github: "https://github.com/tarunm20/CSE-168/blob/main/FinalProject/writeup.md",
    demo: null,
    highlights: [
      "Global illumination with photon mapping",
      "Caustics and light transport simulation",
      "Multiple material types (dielectric, metals, plastic)",
      "AABB tree spatial acceleration structure",
      "Advanced camera effects (depth of field, motion blur)"
    ]
  },
  {
    title: "4Anime Web Scraper",
    description: "A comprehensive Node.js package for extracting anime data from 4anime.to, featuring search functionality, episode information, and video download capabilities with robust error handling.",
    techStack: ["Node.js", "Axios", "Cheerio", "NPM Package"],
    github: "https://github.com/tarunm20/4anime-scraper",
    demo: null,
    highlights: [
      "Published NPM package with 100s downloads",
      "Comprehensive anime metadata extraction",
      "Video download functionality",
      "Search and episode management",
      "RESTful API design with error handling"
    ]
  },
  {
    title: "Real-Time Cloth Simulation",
    description: "A physics-based cloth simulation using mass-spring-damper systems with real-time rendering, featuring interactive controls and realistic cloth behavior with collision detection.",
    techStack: ["C++", "OpenGL", "GLSL", "Physics Engine"],
    github: "https://github.com/tarunm20/animation",
    demo: null,
    highlights: [
      "Mass-spring-damper physics model",
      "Real-time collision detection",
      "Interactive controls for physics parameters",
      "Verlet integration for stable simulation",
      "Realistic fabric behavior with wind/gravity forces"
    ]
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>

      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <div className="p-6 border rounded-2xl shadow-sm bg-white flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  
                  {/* Key Highlights for featured projects */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}