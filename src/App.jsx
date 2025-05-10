import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import HowItWorks from './components/HowItWorksSection';
import WhyChooseUs from './components/ChooseUsSection';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer'; 
import ChatWidget from './components/ChatWidget';
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
      <ChatWidget />
    </>
  )
}
export default App