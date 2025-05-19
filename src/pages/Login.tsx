
import { Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
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
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-xl text-gray-600">
                Log in to access your ProLinkTT account and continue managing your jobs or finding work.
              </p>
              
              <div className="bg-green-50 border-l-4 border-prolink-green p-4 rounded-md">
                <h3 className="font-medium text-prolink-green-dark">Pro Tip</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Check your email regularly for notifications about new job opportunities, 
                  messages from clients, and important updates about your account.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
