import { Button } from "@/components/ui/button"
import { Linkedin, Github, Instagram, FileText } from "lucide-react" // Added FileText icon
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-4 bg-white text-gray-900 text-center">
      <div className="space-x-6">
        <Link href="https://www.linkedin.com/in/tarunmurugan" passHref>
          <Button variant="link" className="hover:text-blue-500">
            <Linkedin className="h-8 w-8 inline-block" />
          </Button>
        </Link>
        <Link href="https://github.com/tarunm20" passHref>
          <Button variant="link" className="hover:text-gray-800">
            <Github className="h-8 w-8 inline-block" />
          </Button>
        </Link>
        <Link href="https://www.instagram.com/murugantarun" passHref>
          <Button variant="link" className="hover:text-pink-500">
            <Instagram className="h-8 w-8 inline-block" />
          </Button>
        </Link>
        {/* Resume Link - Public Folder Version */}
        <Link href="/resume.pdf" passHref>
          <Button 
            variant="link" 
            className="hover:text-indigo-600"
            aria-label="Download Resume"
          >
            <FileText className="h-8 w-8 inline-block" />
          </Button>
        </Link>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Tarun Murugan. All rights reserved.
      </p>
    </footer>
  )
}