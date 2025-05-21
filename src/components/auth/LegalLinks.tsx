
import React from "react";
import { Link } from "react-router-dom";

const LegalLinks: React.FC = () => {
  return (
    <div className="text-sm text-center">
      By signing up, you agree to our{" "}
      <Link to="#" className="text-prolink-blue hover:underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link to="#" className="text-prolink-blue hover:underline">
        Privacy Policy
      </Link>
      .
    </div>
  );
};

export default LegalLinks;
