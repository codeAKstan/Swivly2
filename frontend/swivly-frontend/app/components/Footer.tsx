"use client";

import { useState } from "react";
import { Mail, Instagram, Twitter, Facebook, Youtube, Github, Phone } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer
      className="text-white py-12 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.svg')" }} // Change to your actual image path
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-2xl font-bold">Ready to List Properties Faster?</h2>
          <p className="mt-2 text-gray-300">Subscribe to get the latest updates and offers.</p>
          <div className="mt-4 flex items-center bg-gray-800 p-2 rounded-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="bg-transparent outline-none flex-1 px-2 text-white"
            />
            <button className="bg-green-500 text-black p-2 rounded-lg">
              <Mail size={20} />
            </button>
          </div>
          <div className="mt-3 text-sm text-gray-400">
            <label className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" />
              <span>I agree to receive latest updates and offers.</span>
            </label>
            <label className="flex items-start space-x-2 mt-1">
              <input type="checkbox" className="mt-1" />
              <span>I understand that I can unsubscribe at any time</span>
            </label>
            <a href="#" className="text-white underline">Privacy Policy</a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg">About</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Marketplace</a></li>
              <li><a href="#">Accommodation</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Reviews</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="font-semibold text-lg">Join Us</h3>
          <div className="mt-3 flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white"><Instagram size={24} /></a>
            <a href="#" className="hover:text-white"><Twitter size={24} /></a>
            <a href="#" className="hover:text-white"><Facebook size={24} /></a>
            <a href="#" className="hover:text-white"><Youtube size={24} /></a>
            <a href="#" className="hover:text-white"><Github size={24} /></a>
          </div>
          <div className="mt-4 flex items-center text-gray-400">
            <Phone size={20} className="mr-2" />
            <span>+234 805 292 3367</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400">
          MADE WITH <span className="text-red-500">❤️</span> FROM US TO ALL NIGERIA STUDENTS
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-purple-400">BEHANCE</a>
          <a href="#" className="text-pink-400">INSTAGRAM</a>
          <a href="#" className="text-gray-400">GITHUB</a>
          <a href="#" className="text-green-400">WHATSAPP</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
