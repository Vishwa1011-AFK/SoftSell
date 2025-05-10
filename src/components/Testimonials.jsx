import SectionHeader from "./SectionHeader";

const TestimonialCard = ({ quote, name, role, company }) => {
  return (
    <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
      <div className="text-5xl text-blue-500 mb-4">“</div>
      <p className="text-gray-700 italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full mr-4 bg-blue-200 flex items-center justify-center text-blue-700 font-semibold"> 
          {name.substring(0,1).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
}
  
  const Testimonials = () => {
    const reviews = [
      {
        quote: "Selling our surplus licenses through SoftSell was surprisingly easy and fast. Their team was professional and offered a great price. Highly recommended!",
        name: "Jane Doe",
        role: "IT Manager",
        company: "Innovatech Solutions",
      },
      {
        quote: "We had a batch of unused Microsoft licenses, and SoftSell helped us recover significant value. The process was transparent and efficient from start to finish.",
        name: "John Smith",
        role: "CFO",
        company: "TechPro Services",
      }
    ];
  
    return (
      <section id="testimonials" className="py-16 lg:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Our Customers Say"
            subtitle="Hear from businesses who've successfully partnered with SoftSell."
          />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {reviews.map((review, index) => (
              <TestimonialCard
                key={index}
                quote={review.quote}
                name={review.name}
                role={review.role}
                company={review.company}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  export default Testimonials;