
import { Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="prolink-container py-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <Link to="/" className="text-prolink-blue hover:text-prolink-blue-dark inline-flex items-center text-sm">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to home
                </Link>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Join ProLinkTT</h1>
              <p className="text-xl text-gray-600">
                Create an account to get started with accessing the best trade professionals or finding jobs that match your skills.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-prolink-blue p-4 rounded-md">
                <h3 className="font-medium text-prolink-blue-dark">Why join ProLinkTT?</h3>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-prolink-blue mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Access a network of skilled professionals
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-prolink-blue mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Secure payment processing
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-prolink-blue mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Streamlined communication
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-prolink-blue mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified reviews and ratings
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
