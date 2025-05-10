"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unlock Value from Your Unused Software Licenses
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-lg">
              SoftSell helps you easily turn surplus software licenses into cash. Fast, secure, and hassle-free.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out shadow-lg"
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              >
                Sell My Licenses Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
                onClick={() => document.getElementById("howitworks").scrollIntoView({ behavior: "smooth" })}
              >
                Learn How It Works
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
export default Hero
