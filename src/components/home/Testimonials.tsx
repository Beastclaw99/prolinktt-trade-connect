
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      content: "ProLinkTT helped me find a reliable electrician for my renovation project within hours. The quality of work was exceptional and the entire process was smooth.",
      author: "Sarah Johnson",
      role: "Homeowner",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      content: "As a plumber, ProLinkTT has been instrumental in connecting me with clients in my area. The platform is easy to use and has dramatically increased my business.",
      author: "Michael Chen",
      role: "Professional Plumber",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      content: "I've hired multiple professionals through ProLinkTT for our construction company. The verification process ensures we always get qualified tradespeople.",
      author: "David Rodriguez",
      role: "Construction Manager",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="prolink-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What People Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our community of clients and professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-prolink-blue opacity-80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11H6C4.9 11 4 10.1 4 9V6C4 4.9 4.9 4 6 4H10C11.1 4 12 4.9 12 6V9C12 10.1 11.1 11 10 11ZM10 15H6C4.9 15 4 15.9 4 17V20C4 21.1 4.9 22 6 22H10C11.1 22 12 21.1 12 20V17C12 15.9 11.1 15 10 15ZM20 11H16C14.9 11 14 10.1 14 9V6C14 4.9 14.9 4 16 4H20C21.1 4 22 4.9 22 6V9C22 10.1 21.1 11 20 11ZM20 15H16C14.9 15 14 15.9 14 17V20C14 21.1 14.9 22 16 22H20C21.1 22 22 21.1 22 20V17C22 15.9 21.1 15 20 15Z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{testimonial.content}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
