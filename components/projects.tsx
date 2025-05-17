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
    title: "BlueTurtle",
    description: "A LLM-powered chat interface for users to connect their database and get detailed query results. All with natural language.",
    techStack: ["AWS", "TypeScript", "Next.js", "React", "Python", "NLP"],
    demo: "https://www.blueturtle.ai/",
  },
  {
    title: "Photon Mapping",
    description: "A photorealistic raytracer that uses photon mapping",
    techStack: ["C++", "OpenGL", "GLSL"],
    github: "https://github.com/tarunm20/CSE-168/blob/main/FinalProject/writeup.md",
  },
  {
    title: "Anime Web-scraper",
    description: "A simple API to scrape any anime information",
    techStack: ["Javascript", "Axios", "Cheerio"],
    github: "https://github.com/tarunm20/4anime-scraper",
  },
  {
    title: "Cloth Simulation",
    description: "A real-time cloth simulator",
    techStack: ["C++", "OpenGL", "GLSL"],
    github: "https://github.com/tarunm20/animation",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Projects</h2>

      <div className="max-w-3xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <div className="p-6 border rounded-2xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-gray-800 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
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