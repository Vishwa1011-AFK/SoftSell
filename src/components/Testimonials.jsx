
const TestimonialCard = ({ quote, name, role, company, avatar }) => {
    return (
      <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
        <div className="text-5xl text-blue-500 mb-4">“</div>
        <p className="text-gray-700 italic mb-6 leading-relaxed">"{quote}"</p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-gray-500 font-semibold">
            {name.substring(0,1)} 
          </div>
          <div>
            <p className="font-bold text-gray-900">{name}</p>
            <p className="text-sm text-gray-600">{role}, {company}</p>
          </div>
        </div>
      </div>
    );
  };
  
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
      <section id="testimonials" className="py-16 bg-blue-50"> 
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from businesses who've successfully partnered with SoftSell.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
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