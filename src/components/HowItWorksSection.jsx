"use client"

import { useEffect } from "react"
import SectionHeader from "./SectionHeader"
import { FaFileUpload, FaSearchDollar, FaHandHoldingUsd } from "react-icons/fa"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Step = ({ title, description, icon, index }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileUpload />,
      title: "Upload License Details",
      description: "Securely submit your software license information through our easy-to-use portal.",
    },
    {
      icon: <FaSearchDollar />,
      title: "Get a Fair Valuation",
      description: "Our experts assess your licenses and provide a transparent, competitive quote.",
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Get Paid Quickly",
      description: "Once you accept, receive prompt payment. It's that simple!",
    },
  ]

  return (
    <section id="howitworks" className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Selling your unused software licenses with SoftSell is a straightforward three-step process."
        />

        <div className="relative mt-16">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 dark:bg-emerald-800 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} description={step.description} icon={step.icon} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default HowItWorks
