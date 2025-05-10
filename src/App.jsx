import Navbar from "./components/Navbar"
import Hero from "./components/HeroSection"
import TrustSignals from "./components/TrustSignals"
import HowItWorks from "./components/HowItWorksSection"
import WhyChooseUs from "./components/ChooseUsSection"
import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"
import ChatWidget from "./components/ChatWidget"
import CookieConsent from "./components/CookieConsent"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSignals />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </>
  )
}
export default App
