const Step = ({ number, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 md:p-6">
      <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {icon ? <span className="text-3xl">{icon}</span> : number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: "📄", 
      title: "Upload License Details",
      description: "Securely submit your software license information through our easy-to-use portal.",
    },
    {
      number: 2,
      icon: "🔍", 
      title: "Get a Fair Valuation",
      description: "Our experts assess your licenses and provide a transparent, competitive quote.",
    },
    {
      number: 3,
      icon: "💰", 
      title: "Get Paid Quickly",
      description: "Once you accept, receive prompt payment. It's that simple!",
    },
  ];

  return (
    <section id="howitworks" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Selling your unused software licenses with SoftSell is a straightforward three-step process.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;