import SectionHeader from './SectionHeader';
import { FaFileUpload, FaSearchDollar, FaHandHoldingUsd } from 'react-icons/fa';

const Step = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl"> 
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileUpload />, 
      title: "Upload License Details",
      description: "Securely submit your software license information through our easy-to-use portal.",
    },
    {
      icon: <FaSearchDollar />, 
      title: "Get a Fair Valuation",
      description: "Our experts assess your licenses and provide a transparent, competitive quote.",
    },
    {
      icon: <FaHandHoldingUsd />, 
      title: "Get Paid Quickly",
      description: "Once you accept, receive prompt payment. It's that simple!",
    },
  ];

  return (
    <section id="howitworks" className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Selling your unused software licenses with SoftSell is a straightforward three-step process."
        />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <Step
              key={index}
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
