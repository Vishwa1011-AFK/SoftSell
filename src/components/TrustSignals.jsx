"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const TrustSignals = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const logos = [
    { name: "Microsoft", class: "w-32" },
    { name: "Adobe", class: "w-24" },
    { name: "Oracle", class: "w-28" },
    { name: "Autodesk", class: "w-32" },
    { name: "VMware", class: "w-28" },
  ]

  const stats = [
    { value: "$12M+", label: "Recovered for clients" },
    { value: "500+", label: "Businesses served" },
    { value: "98%", label: "Client satisfaction" },
    { value: "24h", label: "Average response time" },
  ]

  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h2 variants={itemVariants} className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Trusted by businesses worldwide to sell these license types
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12"
          >
            {logos.map((logo, index) => (
              <div key={index} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <div
                  className={`${logo.class} h-10 bg-contain bg-center bg-no-repeat`}
                  style={{
                    backgroundImage: `url(/placeholder.svg?height=40&width=${Number.parseInt(logo.class.slice(1)) * 4})`,
                  }}
                  aria-label={`${logo.name} logo`}
                ></div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSignals
