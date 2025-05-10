"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-900 text-white py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-6">
              Trusted by <span className="font-bold">500+</span> businesses worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn Unused Software Licenses Into <span className="text-yellow-300">Real Cash</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 max-w-lg">
              SoftSell helps you easily monetize surplus software licenses. Fast, secure, and hassle-free.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-3xl font-bold text-yellow-300">
                  <CountUp end={75} suffix="%" duration={2.5} />
                </div>
                <div className="text-sm">Average Recovery Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-3xl font-bold text-yellow-300">
                  <CountUp end={48} suffix="h" duration={2.5} />
                </div>
                <div className="text-sm">Typical Turnaround Time</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out shadow-lg"
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              >
                Get Your Free Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
                onClick={() => document.getElementById("howitworks").scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400 dark:bg-teal-700 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-300 dark:bg-emerald-600 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {["Adobe", "Microsoft", "Autodesk", "Oracle"].map((brand, index) => (
                    <div key={index} className="bg-white/10 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-1">{brand}</div>
                      <div className="text-sm opacity-80">Licenses</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Average Recovery</span>
                    <span className="font-bold">65-80%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-300/20 border border-yellow-300/30 p-3 rounded-lg text-yellow-100">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm">
                      <span className="font-semibold block mb-1">Limited Time Offer</span>
                      Get an additional 5% bonus for licenses valued over $10,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  )
}
export default Hero
