"use client"
import { motion } from "framer-motion"

const experiences = [
    {
        title: "Software Engineer",
        company: "UCSD ITS",
        duration: "Oct 2022 - Mar 2025",
        description: "Worked on UCSD Mobile App, TritonGPT, Airflow data workflows, and internal billing tools.",
        techStack: ["Flutter", "Python", "Airflow", "Selenium"],
    },
    {
        title: "Cybersecurity Intern",
        company: "CyberSecurityWorks",
        duration: "Oct 2020 - Aug 2021",
        description: "Developed an automated vulnerability report workflow for Google Cloud Platform containers. Created a library of CVE webscrapers.",
        techStack: ["Python", "GCP", "Selenium", "BeautifulSoup"],
    },
    {
        title: "Machine Learning Intern",
        company: "nFactorial Analytical Services",
        duration: "Sep 2020 - Dec 2020",
        description: "Researched a variety of methods to extract emotion from audio samples.",
        techStack: ["Tensorflow", "Python"],
    },
    {
        title: "Software Engineering Intern",
        company: "Ventuno Technologies",
        duration: "Jun 2019 - Aug 2019",
        description: "Implemented a REST API for customer data.",
        techStack: ["Django", "Flask", "Python"],
    },
];

export default function WorkExperience() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            borderColor: "#818cf8",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="work-experience" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <motion.h2 
                className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Work Experience
            </motion.h2>
            
            <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {experiences.map((exp, index) => (
                    <motion.div 
                        key={index} 
                        className="mb-12"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left side - Always visible */}
                            <div className="md:w-1/3">
                                <motion.div 
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                                    whileHover={cardHoverVariants.hover}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {exp.title}
                                    </h3>
                                    <h4 className="text-indigo-600 dark:text-indigo-400">
                                        {exp.company}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {exp.duration}
                                    </p>
                                </motion.div>
                            </div>
                            
                            {/* Right side - Always visible */}
                            <div className="md:w-2/3">
                                <motion.div 
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                                    whileHover={cardHoverVariants.hover}
                                >
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {exp.description}
                                    </p>
                                    
                                    <motion.div 
                                        className="flex flex-wrap gap-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {exp.techStack.map((tech, techIndex) => (
                                            <motion.span
                                                key={techIndex}
                                                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    backgroundColor: "#e0e7ff",
                                                    color: "#4f46e5"
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}