// src/components/WhyChooseUs.jsx

const BenefitTile = ({ icon, title, description }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-blue-500 text-4xl mb-4">{icon}</div> {/* Placeholder for icon */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
  };
  
  const WhyChooseUs = () => {
    const benefits = [
      {
        icon: "🚀", // Rocket for speed
        title: "Fast & Efficient",
        description: "Our streamlined process ensures you get a valuation and payment quickly."
      },
      {
        icon: "🛡️", // Shield for security
        title: "Secure & Confidential",
        description: "We prioritize your data security and ensure all transactions are confidential."
      },
      {
        icon: "💡", // Lightbulb for expert valuation
        title: "Expert Valuation",
        description: "Benefit from our industry expertise for a fair and accurate license valuation."
      },
      {
        icon: "🤝", // Handshake for trusted partner
        title: "Trusted Partner",
        description: "We aim to be your reliable partner in monetizing your software assets."
      }
    ];
  
    return (
      <section id="whyus" className="py-16 bg-white"> {/* Alternating background color */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Why Choose SoftSell?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer a compelling combination of speed, security, and expertise.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitTile
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyChooseUs;