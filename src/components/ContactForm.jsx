"use client"

import { useState, useEffect } from "react"
import SectionHeader from "./SectionHeader"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    quantity: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimatedValue, setEstimatedValue] = useState(null)

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

  const licenseTypes = [
    "Microsoft (e.g., Office, Windows Server)",
    "Adobe (e.g., Creative Cloud)",
    "Autodesk (e.g., AutoCAD)",
    "VMware",
    "Salesforce",
    "Oracle",
    "SAP",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }

    // Calculate estimated value when both license type and quantity are provided
    if ((name === "licenseType" || name === "quantity") && formData.licenseType && formData.quantity) {
      calculateEstimatedValue(
        name === "licenseType" ? value : formData.licenseType,
        name === "quantity" ? value : formData.quantity,
      )
    }
  }

  const calculateEstimatedValue = (licenseType, quantity) => {
    // This is a simplified estimation logic - in a real app, this would be more sophisticated
    const baseValues = {
      "Microsoft (e.g., Office, Windows Server)": 200,
      "Adobe (e.g., Creative Cloud)": 300,
      "Autodesk (e.g., AutoCAD)": 500,
      VMware: 400,
      Salesforce: 350,
      Oracle: 600,
      SAP: 700,
      Other: 250,
    }

    const baseValue = baseValues[licenseType] || 0
    const numQuantity = Number.parseInt(quantity, 10) || 0

    if (baseValue && numQuantity) {
      // Apply volume discount
      let discount = 0
      if (numQuantity > 50) discount = 0.25
      else if (numQuantity > 20) discount = 0.15
      else if (numQuantity > 10) discount = 0.1

      const totalValue = baseValue * numQuantity * (1 - discount)
      const recoveryRate = 0.7 // 70% recovery rate

      setEstimatedValue({
        min: Math.round(totalValue * recoveryRate * 0.9),
        max: Math.round(totalValue * recoveryRate * 1.1),
      })
    } else {
      setEstimatedValue(null)
    }
  }

  const validate = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Name is required."
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid."
    }
    if (!formData.company.trim()) tempErrors.company = "Company name is required."
    if (!formData.licenseType) tempErrors.licenseType = "Please select a license type."
    if (!formData.quantity.trim()) tempErrors.quantity = "Quantity is required."
    else if (isNaN(Number.parseInt(formData.quantity)) || Number.parseInt(formData.quantity) <= 0) {
      tempErrors.quantity = "Please enter a valid number."
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required."

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(false)
    if (validate()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Form data submitted:", formData)
        setIsSubmitted(true)
        setIsSubmitting(false)
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          company: "",
          licenseType: "",
          quantity: "",
          message: "",
        })
        setEstimatedValue(null)
      }, 1500)
    } else {
      console.log("Form validation failed", errors)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="contact" className="py-20 lg:py-24 bg-emerald-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get Your Free Quote"
          subtitle="Find out how much your unused licenses are worth - no obligation."
        />

        <div className="grid md:grid-cols-5 gap-8 mt-16">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Sell With Us?</h3>

              <ul className="space-y-4">
                {[
                  {
                    title: "Best Value Guarantee",
                    description: "We match or beat any legitimate competitor offer.",
                    icon: (
                      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Fast & Secure Process",
                    description: "Get paid within 5 business days of acceptance.",
                    icon: (
                      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "No Hidden Fees",
                    description: "The quote we provide is what you'll receive.",
                    icon: (
                      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Compliance Guaranteed",
                    description: "All transfers are legally compliant and documented.",
                    icon: (
                      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 font-medium text-emerald-800 dark:text-emerald-200">Limited Time Offer</span>
                </div>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                  Get an additional 5% bonus for quotes requested before the end of the month.
                </p>
              </div>
            </div>
          </div>

          <motion.div ref={ref} initial="hidden" animate={controls} variants={formVariants} className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Thank you! Your quote request has been received. We'll contact you within 24 hours with a
                      valuation.
                    </span>
                  </div>
                </motion.div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.company ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="licenseType"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      License Type*
                    </label>
                    <select
                      name="licenseType"
                      id="licenseType"
                      value={formData.licenseType}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.licenseType ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    >
                      <option value="" disabled>
                        Select a license type
                      </option>
                      {licenseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.licenseType && <p className="mt-1 text-xs text-red-500">{errors.licenseType}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Quantity*
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.quantity ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Number of licenses"
                    />
                    {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Additional Details*
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Please include any relevant details about your licenses (e.g., version, purchase date, expiration)"
                    ></textarea>
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>
                </div>

                {estimatedValue && (
                  <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Estimated Value Range:</h4>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${estimatedValue.min.toLocaleString()} - ${estimatedValue.max.toLocaleString()}
                    </div>
                    <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                      This is just an estimate. Our team will provide a precise valuation after reviewing your
                      submission.
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <input
                      id="privacy-policy"
                      type="checkbox"
                      className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                      required
                    />
                    <label htmlFor="privacy-policy" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      I agree to the{" "}
                      <a href="#" className="text-emerald-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-emerald-600 hover:underline">
                        Terms of Service
                      </a>
                    </label>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Get My Free Quote"
                  )}
                </motion.button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  No obligation. We'll contact you within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
