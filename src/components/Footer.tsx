import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12 text-center">
          <Link href="/about-us" className="text-gray-700 hover:text-gray-900 text-sm sm:text-base">
            About Us
          </Link>
          <Link href="/customer-support" className="text-gray-700 hover:text-gray-900 text-sm sm:text-base">
            Customer Support
          </Link>
          <Link href="/terms-of-service" className="text-gray-700 hover:text-gray-900 text-sm sm:text-base">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="text-gray-700 hover:text-gray-900 text-sm sm:text-base">
            Privacy Policy
          </Link>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <div
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </div>
          <div
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </div>
          <div
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShowSpot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;