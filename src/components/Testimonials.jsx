"use client"

import { useEffect } from "react"
import SectionHeader from "./SectionHeader"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const TestimonialCard = ({ quote, name, role, company, index }) => {
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
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="text-5xl text-emerald-500 dark:text-emerald-400 mb-4">"</div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full mr-4 bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold">
          {name.substring(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  const reviews = [
    {
      quote:
        "Selling our surplus licenses through SoftSell was surprisingly easy and fast. Their team was professional and offered a great price. We recovered 75% of our original investment on licenses we weren't using!",
      name: "Jane Doe",
      role: "IT Manager",
      company: "Innovatech Solutions",
    },
    {
      quote:
        "We had a batch of unused Microsoft licenses, and SoftSell helped us recover significant value. The process was transparent and efficient from start to finish. I highly recommend their service.",
      name: "John Smith",
      role: "CFO",
      company: "TechPro Services",
    },
  ]

  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Hear from businesses who've successfully partnered with SoftSell."
        />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              quote={review.quote}
              name={review.name}
              role={review.role}
              company={review.company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Testimonials
