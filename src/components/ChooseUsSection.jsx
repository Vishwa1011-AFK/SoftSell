import SectionHeader from './SectionHeader';

const BenefitTile = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center md:items-start md:text-left">
      <div className="text-blue-600 mb-5">{icon}</div> 
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3> 
      <p className="text-gray-700 leading-relaxed">{description}</p> 
    </div>
  );
};
  
  const WhyChooseUs = () => {
    const benefits = [
      {
        icon: "🚀",
        title: "Fast & Efficient",
        description: "Our streamlined process ensures you get a valuation and payment quickly."
      },
      {
        icon: "🛡️", 
        title: "Secure & Confidential",
        description: "We prioritize your data security and ensure all transactions are confidential."
      },
      {
        icon: "💡", 
        title: "Expert Valuation",
        description: "Benefit from our industry expertise for a fair and accurate license valuation."
      },
      {
        icon: "🤝", 
        title: "Trusted Partner",
        description: "We aim to be your reliable partner in monetizing your software assets."
      }
    ];
  
    return (
      <section id="whyus" className="py-16 lg:py-20 bg-white"> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
          <SectionHeader
            title="Why Choose SoftSell?"
            subtitle="We offer a compelling combination of speed, security, and expertise."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
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