
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedCategories = () => {
  const categories = [
    {
      name: "Electrical",
      description: "Certified electricians for installations and repairs",
      image: "https://images.unsplash.com/photo-1621905251189-08b45249ff78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "1,240 professionals"
    },
    {
      name: "Plumbing",
      description: "Expert plumbers for all residential and commercial needs",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "890 professionals"
    },
    {
      name: "Carpentry",
      description: "Skilled carpenters for furniture and structural work",
      image: "https://images.unsplash.com/photo-1601055903217-bce9827348e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "760 professionals"
    },
    {
      name: "HVAC",
      description: "Heating, ventilation, and air conditioning specialists",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "520 professionals"
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="prolink-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the right professional for any trade category you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count}</span>
                  <Link 
                    to={`/category/${category.name.toLowerCase()}`}
                    className="text-prolink-blue hover:text-prolink-blue-dark font-medium text-sm"
                  >
                    View All
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories" className="text-prolink-blue hover:text-prolink-blue-dark font-semibold inline-flex items-center">
            View All Categories
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
