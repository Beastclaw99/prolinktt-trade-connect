
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-prolink-blue to-prolink-blue-dark text-white">
      <div className="prolink-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of clients and professionals already using ProLinkTT to connect, collaborate, and complete projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register?type=client">
              <Button className="bg-white text-prolink-blue hover:bg-gray-100 font-semibold py-2 px-6 text-base">
                Sign Up as a Client
              </Button>
            </Link>
            <Link to="/register?type=professional">
              <Button className="bg-prolink-green hover:bg-prolink-green-dark text-white font-semibold py-2 px-6 text-base">
                Join as a Professional
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
