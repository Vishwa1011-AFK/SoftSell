const Hero = () => {
    return (
      <section id="home" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Unlock Value from Your Unused Software Licenses
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto">
            SoftSell helps you easily turn surplus software licenses into cash. Fast, secure, and hassle-free.
          </p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => console.log('CTA clicked!')} 
          >
            Sell My Licenses Now
          </button>
        </div>
      </section>
    );
  };
  export default Hero;