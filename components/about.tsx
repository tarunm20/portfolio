"use client"
import { motion } from "framer-motion"

export default function About() {
    return (
        <section className="relative py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Decorative elements */}
            <motion.div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full bg-indigo-200 dark:bg-indigo-900 opacity-20 blur-xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-pink-200 dark:bg-pink-900 opacity-20 blur-xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            
            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 dark:from-indigo-400 dark:to-pink-400">
                        About Me
                    </h2>
                    
                    <div className="space-y-4 text-sm sm:text-base">
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Computer Science graduate</span> from UC San Diego with a passion for <span className="font-semibold text-pink-600 dark:text-pink-400">0 → 1 project development</span> and graphics programming.
                        </motion.p>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            When I discover an interesting project, it becomes an <span className="italic">obsession</span> — I love diving deep into complex problems and emerging with elegant solutions.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="pt-4"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                Beyond Coding
                            </h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['Cooking', 'Weightlifting', 'Basketball', 'Film/TV', 'Gaming'].map((hobby, i) => (
                                    <motion.span
                                        key={hobby}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            type: "spring",
                                            delay: 0.7 + (i * 0.1)
                                        }}
                                        className="inline-block px-3 py-1 bg-white dark:bg-gray-700 rounded-full shadow-sm text-xs sm:text-sm"
                                    >
                                        {hobby}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}