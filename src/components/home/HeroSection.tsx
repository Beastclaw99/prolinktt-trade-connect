
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, User, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="prolink-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Connect with the Right <span className="text-prolink-blue">Trade Professionals</span> for Your Jobs
            </h1>
            <p className="text-xl text-gray-600">
              ProLinkTT simplifies finding skilled trade professionals for your projects or offering your expertise to clients who need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register?type=client">
                <Button className="btn-primary flex items-center gap-2 text-base">
                  <BriefcaseBusiness size={20} />
                  I'm a Client
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/register?type=professional">
                <Button className="btn-secondary flex items-center gap-2 text-base">
                  <User size={20} />
                  I'm a Professional
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-prolink-blue hover:underline">Log in here</Link>
            </p>
          </div>
          
          <div className="relative animate-slide-in">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Trade professionals at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium text-lg">
                  Access a network of qualified professionals ready to help with your projects
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-prolink-green/20 flex items-center justify-center">
                  <svg className="h-6 w-6 text-prolink-green-dark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">5,000+ Trade Pros</p>
                  <p className="text-sm text-gray-500">Ready to work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
