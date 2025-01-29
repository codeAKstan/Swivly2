"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I sign up for an account?",
    answer:
      "Registering on Swivly is simple and tailored to your role. Start by clicking on the Sign Up icon located at the top right corner of the homepage. A dropdown menu will appear, prompting you to select your role: Agent, Buyer or Seller. Choose the role that fits your purpose, and you’ll be redirected to a registration form. Fill in your details and provide any additional information specific to your role. Once completed, click the Submit button to create your profile. You’ll receive a confirmation email to verify your account and after verification, you can log in and start exploring the platform.",
  },
  {
    question: "How can I communicate with sellers or landlords?",
    answer:
      "You can communicate with sellers or landlords through Swivly's secure messaging system. Once you find a listing that interests you, simply click on the 'Contact Seller' or 'Message Landlord' button to start a conversation. Swivly ensures safe and verified communication between users.",
  },
  {
    question: "Are the listings verified?",
    answer:
      "Yes! Swivly ensures that listings are verified to maintain trust and security. We conduct checks on listed properties and sellers to provide users with a safe experience. Look for the verified badge on listings for added assurance.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Swivly supports multiple payment methods including bank transfers, credit/debit cards, and mobile payments. Our secure transaction process ensures safe and hassle-free payments.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#6850F5] text-white py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold"
        >
          How It Works? <span className="text-[#F8F9FC]">Answered</span>
        </motion.h2>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white text-black rounded-lg shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between text-left px-6 py-4 font-bold text-lg ${
                  openIndex === index ? "bg-[#C4D79B]" : "bg-white"
                } rounded-lg`}
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronUp size={24} />
                </motion.div>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 py-4 bg-[#C4D79B] rounded-b-lg text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
