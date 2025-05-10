"use client"

import { useState } from "react"
import SectionHeader from "./SectionHeader"
import { motion, AnimatePresence } from "framer-motion"

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-4 prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "What types of software licenses can I sell?",
      answer:
        "We purchase a wide range of enterprise software licenses including Microsoft (Office, Windows, Server), Adobe Creative Cloud, Autodesk, VMware, Oracle, SAP, and many others. If you have licenses from other vendors, please contact us for a custom evaluation.",
    },
    {
      question: "How much can I expect to get for my licenses?",
      answer:
        "The value depends on several factors including the software type, version, remaining term, and market demand. Typically, our clients recover 65-80% of the original value for licenses with significant remaining term. We provide free, no-obligation valuations so you'll know exactly what to expect.",
    },
    {
      question: "Is selling unused software licenses legal?",
      answer:
        "Yes, in most cases. The legality depends on the specific license agreement and jurisdiction. SoftSell has legal experts who review each case to ensure compliance with applicable laws and license terms. We only facilitate legal transfers and provide documentation for all transactions.",
    },
    {
      question: "How long does the entire process take?",
      answer:
        "Our streamlined process typically takes 2-5 business days from initial submission to payment. Valuation is usually provided within 24 hours, and once you accept our offer, payment is processed within 1-3 business days. Complex license packages may take slightly longer.",
    },
    {
      question: "How do you ensure the process is secure?",
      answer:
        "Security is our top priority. We use enterprise-grade encryption for all communications and data storage. Our platform complies with industry standards for data protection, and we sign comprehensive NDAs before any sensitive information is shared. All transactions are fully documented and traceable.",
    },
    {
      question: "What information do I need to provide about my licenses?",
      answer:
        "To get started, we need basic information such as the software vendor, product name, version, quantity, purchase date, and expiration date (if applicable). For a more accurate valuation, license keys or access to your license management portal may be required. All information is kept strictly confidential.",
    },
  ]

  return (
    <section id="faq" className="py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about selling your software licenses."
        />

        <div className="max-w-3xl mx-auto mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          >
            Contact Us
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default FAQ
