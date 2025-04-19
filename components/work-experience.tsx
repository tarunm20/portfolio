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
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const hoverVariants = {
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
        <section id="work-experience" className="py-20 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
            <motion.h2 
                className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Work Experience
            </motion.h2>
            
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Animated Timeline line */}
                    <motion.div 
                        className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-indigo-300 to-indigo-500 transform -translate-x-1/2"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    
                    {/* Experience items */}
                    <motion.div 
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {experiences.map((exp, index) => (
                            <motion.div 
                                key={index} 
                                className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                variants={itemVariants}
                            >
                                {/* Content with enhanced hover effects */}
                                <motion.div
                                    className={`
                                        w-full sm:w-5/12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 relative
                                        transition-all duration-300 ease-in-out
                                        ${index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}
                                    `}
                                    whileHover="hover"
                                    variants={hoverVariants}
                                >
                                    {/* Animated Circle */}
                                    <motion.div
                                        className={`
                                            absolute top-6 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full 
                                            transition-all duration-300 ease-in-out
                                            ${index % 2 === 0 ? 'sm:-right-7' : 'sm:-left-7'}
                                        `}
                                        whileHover={{ scale: 1.2, backgroundColor: "#818cf8" }}
                                    />
                                    
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                        {exp.title}
                                    </h3>
                                    <h4 className="text-md text-indigo-600 dark:text-indigo-400 mb-2 transition-colors duration-300">
                                        {exp.company}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.duration}</p>
                                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 mb-4">
                                        {exp.description}
                                    </p>
                                    
                                    {/* Tech Stack Badges with animation */}
                                    <motion.div 
                                        className="flex flex-wrap gap-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}