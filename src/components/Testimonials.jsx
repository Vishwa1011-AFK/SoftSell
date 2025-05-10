"use client"

import { useEffect, useState } from "react"
import SectionHeader from "./SectionHeader"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const TestimonialCard = ({ quote, name, role, company, index, image }) => {
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
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0">
          {image ? (
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200 dark:border-emerald-800"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold text-xl">
              {name.substring(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div className="ml-4">
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {role}, {company}
          </p>
        </div>
        <div className="ml-auto">
          <div className="text-yellow-400 flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Verified Customer</span>
        <span>3 months ago</span>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const totalTestimonials = 4 

  const reviews = [
    {
      quote:
        "Selling our surplus licenses through SoftSell was surprisingly easy and fast. Their team was professional and offered a great price. We recovered 75% of our original investment on licenses we weren't using!",
      name: "Jane Doe",
      role: "IT Manager",
      company: "Innovatech Solutions",
      image: "https://avatar-placeholder.iran.liara.run/",
    },
    {
      quote:
        "We had a batch of unused Microsoft licenses, and SoftSell helped us recover significant value. The process was transparent and efficient from start to finish. I highly recommend their service.",
      name: "John Smith",
      role: "CFO",
      company: "TechPro Services",
      image: "https://avatar-placeholder.iran.liara.run/",
    },
    {
      quote:
        "As a growing startup, we needed to optimize our software expenses. SoftSell not only helped us sell our excess licenses but also connected us with better options for our needs. Their expertise saved us thousands.",
      name: "Michael Chen",
      role: "Operations Director",
      company: "NexGen Innovations",
      image: "/placeholder.svg?height=56&width=56",
    },
    {
      quote:
        "After a company merger, we had duplicate software licenses across departments. SoftSell's valuation was fair and their process was straightforward. The transaction was completed within a week.",
      name: "Sarah Johnson",
      role: "IT Director",
      company: "Global Systems Inc.",
      image: "/placeholder.svg?height=56&width=56",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalTestimonials)
    }, 8000)
    return () => clearInterval(interval)
  }, [totalTestimonials])

  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Join hundreds of satisfied businesses who've successfully monetized their software assets with SoftSell."
        />

        <div className="mt-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {reviews.slice(0, 2).map((review, index) => (
              <TestimonialCard
                key={index}
                quote={review.quote}
                name={review.name}
                role={review.role}
                company={review.company}
                image={review.image}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-md">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium mr-2">4.9</span>
              <div className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">from 128 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Testimonials
