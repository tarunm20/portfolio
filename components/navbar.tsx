"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "about") {
      // Special handling for About section to ensure it goes to exact top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    scrollToSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "work-experience", "projects", "contact"];
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      // At very top of page
      if (scrollPosition < 10) {
        setActiveSection("about");
        return;
      }

      // At bottom of page
      if (scrollPosition + windowHeight >= documentHeight - 10) {
        setActiveSection("contact");
        return;
      }

      // Check sections
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionTop = offsetTop - 100; // 100px buffer
          const sectionBottom = offsetTop + offsetHeight - 100;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "work-experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-md z-50 px-8 py-4">
      <ul className="flex gap-8">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`relative px-2 py-1 hover:text-indigo-600 transition-colors ${
                activeSection === item.id ? "text-indigo-600 font-medium" : "text-gray-700"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}