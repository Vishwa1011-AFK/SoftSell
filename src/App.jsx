import Navbar from './components/Navbar';
import Hero from './components/HeroSection';
import HowItWorks from './components/HowItWorksSection';
import WhyChooseUs from './components/ChooseUsSection'; 

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs /> 
      </main>
    </>
  )
}
export default App