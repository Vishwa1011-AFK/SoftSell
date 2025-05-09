import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import HowItWorks from './components/HowItWorksSection';
import WhyChooseUs from './components/ChooseUsSection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer'; 
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
export default App