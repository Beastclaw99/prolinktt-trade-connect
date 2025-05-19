
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="prolink-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-gradient-to-r from-prolink-blue to-prolink-green p-1">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L4 9V21H20V9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 13H8V21H16V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">ProLinkTT</span>
            </Link>
            <p className="text-gray-600">
              Connecting trade professionals with clients for seamless project completion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-prolink-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-prolink-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-prolink-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-prolink-blue">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li><Link to="/post-job" className="text-gray-600 hover:text-gray-900">Post a Job</Link></li>
              <li><Link to="/browse-professionals" className="text-gray-600 hover:text-gray-900">Find Professionals</Link></li>
              <li><Link to="/how-it-works-client" className="text-gray-600 hover:text-gray-900">How It Works</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li><Link to="/find-jobs" className="text-gray-600 hover:text-gray-900">Find Jobs</Link></li>
              <li><Link to="/create-profile" className="text-gray-600 hover:text-gray-900">Create Profile</Link></li>
              <li><Link to="/how-it-works-professional" className="text-gray-600 hover:text-gray-900">How It Works</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ProLinkTT. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-gray-900 text-sm">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
