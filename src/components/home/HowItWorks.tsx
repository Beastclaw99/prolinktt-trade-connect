
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, Search, UserCheck, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="h-10 w-10 text-prolink-blue" />,
      title: "Post your job",
      description: "Describe your project, set your budget, and specify required skills.",
      color: "bg-blue-50"
    },
    {
      icon: <Search className="h-10 w-10 text-prolink-blue" />,
      title: "Find professionals",
      description: "Browse profiles, reviews, and portfolios of qualified trade professionals.",
      color: "bg-blue-50"
    },
    {
      icon: <UserCheck className="h-10 w-10 text-prolink-blue" />,
      title: "Hire the best match",
      description: "Compare proposals, communicate directly, and select the right professional.",
      color: "bg-blue-50"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-prolink-blue" />,
      title: "Pay securely",
      description: "Only pay when you're satisfied with the completed work.",
      color: "bg-blue-50"
    }
  ];

  const proSteps = [
    {
      icon: <ClipboardList className="h-10 w-10 text-prolink-green" />,
      title: "Create your profile",
      description: "Showcase your skills, experience, and portfolio to stand out.",
      color: "bg-green-50"
    },
    {
      icon: <Search className="h-10 w-10 text-prolink-green" />,
      title: "Browse opportunities",
      description: "Find jobs that match your skills, location, and availability.",
      color: "bg-green-50"
    },
    {
      icon: <UserCheck className="h-10 w-10 text-prolink-green" />,
      title: "Submit proposals",
      description: "Send competitive bids and communicate with potential clients.",
      color: "bg-green-50"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-prolink-green" />,
      title: "Get paid",
      description: "Receive secure payments for your completed projects.",
      color: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="prolink-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How ProLinkTT Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is designed to make connecting clients with trade professionals seamless and efficient.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">For Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${step.color} p-4 rounded-full mb-4`}>
                  {step.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register?type=client">
              <Button className="btn-primary">Get Started as a Client</Button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">For Professionals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {proSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${step.color} p-4 rounded-full mb-4`}>
                  {step.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register?type=professional">
              <Button className="btn-secondary">Join as a Professional</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
