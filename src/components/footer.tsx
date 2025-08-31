

import { Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-4 md:px-16 py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-20">
        <div className="flex flex-col lg:flex-row justify-start items-start gap-12 lg:gap-16">
          {/* Social Section */}
          <div className="flex-1 lg:max-w-2xl flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[#7D8187] text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5">
                  FOLLOW US
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://x.com/Webfluin" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:opacity-75 transition-opacity">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.youtube.com/@ViktorOddy" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:opacity-75 transition-opacity">
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-6">
            {/* First Column */}
            <div className="flex-1 flex flex-col gap-3">
              <Link to="/" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link to="/product" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Product
              </Link>
              <Link to="/pricing" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Pricing
              </Link>
              <Link to="/signin" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Sign Up
              </Link>
            </div>
            
            {/* Second Column */}
            <div className="flex-1 flex flex-col gap-3">
              <Link to="/privacy" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Terms of Use
              </Link>
              <a href="mailto:viktor@webfluin.com" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>

            {/* Third Column */}
            <div className="flex-1 flex flex-col gap-3">
              <Link to="/saas-templates" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors cursor-pointer">
                SaaS Templates
              </Link>
              <Link to="/all-framer-templates" className="text-white text-base font-normal leading-6 hover:text-gray-300 transition-colors cursor-pointer">
                Landing Pages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

