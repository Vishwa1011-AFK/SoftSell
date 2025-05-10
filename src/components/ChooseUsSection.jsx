"use client"

import { useEffect } from "react"
import SectionHeader from "./SectionHeader"
import { BsSpeedometer2, BsShieldLockFill, BsLightbulbFill, BsPeopleFill } from "react-icons/bs"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const BenefitTile = ({ icon, title, description, index }) => {
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

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="text-emerald-600 dark:text-emerald-400 mb-5 text-5xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <BsSpeedometer2 />,
      title: "Fast & Efficient",
      description: "Our streamlined process ensures you get a valuation and payment quickly, often within 48 hours.",
    },
    {
      icon: <BsShieldLockFill />,
      title: "Secure & Confidential",
      description:
        "We prioritize your data security with enterprise-grade encryption and strict confidentiality protocols.",
    },
    {
      icon: <BsLightbulbFill />,
      title: "Expert Valuation",
      description: "Our team of software licensing experts ensures you get the maximum value for your unused licenses.",
    },
    {
      icon: <BsPeopleFill />,
      title: "Trusted Partner",
      description: "Join hundreds of satisfied businesses who've successfully monetized their software assets with us.",
    },
  ]

  return (
    <section id="whyus" className="py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose SoftSell?"
          subtitle="We offer a compelling combination of speed, security, and expertise."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16">
          {benefits.map((benefit, index) => (
            <BenefitTile
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default WhyChooseUs
