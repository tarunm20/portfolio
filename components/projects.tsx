"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Github } from "lucide-react"

const projects = [
  {
    title: "Photon Mapping",
    description: "A photorealistic raytracer that uses photon mapping",
    techStack: ["C++", "OpenGL", "GLSL"],
    github: "https://github.com/tarunm20/CSE-168/blob/main/FinalProject/writeup.md",
    demo: "https://portfolio.vercel.app",
  },
  {
    title: "Anime Web-scraper",
    description: "A simple API to scrape any anime information",
    techStack: ["Javascript", "Axios", "Cheerio"],
    github: "https://github.com/tarunm20/4anime-scraper",
    demo: "https://task-tracker.vercel.app",
  },
  {
    title: "Cloth Simulation",
    description: "A real-time cloth simulator",
    techStack: ["C++", "OpenGL", "GLSL"],
    github: "https://github.com/tarunm20/animation",
    demo: "https://task-tracker.vercel.app",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>

      <div className="max-w-3xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <div className="p-6 border rounded-2xl shadow-sm bg-white flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                      <Github className="h-5 w-5 inline-block" />
                    </a>
                    {/* <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
                    >
                      Live Demo
                    </a> */}
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