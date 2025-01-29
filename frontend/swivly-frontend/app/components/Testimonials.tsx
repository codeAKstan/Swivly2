"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emeka Onuoha",
      university: "University of Nigeria Nsukka",
      text: "I've always had a hard time selling my used items online because it has been so difficult to connect with trustworthy buyers. That's why I decided to try Swivly and it turned out to be the best decision! The platform is very user-friendly, within minutes, I was able to list some pre-loved furniture I did not need anymore. What amazed me was how quickly I started getting inquiries from interested buyers. The secure transaction process is really amazing, everything went smoothly. I really recommend this platform to other student sellers!",
      image: "/images/user.png",
    },
    {
      name: "Nzeakor Ujunwa",
      university: "Covenant University",
      text: "Finding a safe and affordable place near campus used to be stressful, especially with so many unreliable options out there. But Swivly completely changed the game for me. The platform's verified listings and detailed descriptions gave me peace of mind, knowing I was only viewing legitimate options. Within just a week, I found a perfect apartment close to campus with all the amenities I needed. The process was smooth, and the secure payment options made it even better. I couldn't be happier. Honestly, I really recommend this platform.",
      image: "/images/user.png",
    },
    {
      name: "Gerald Zebelone",
      university: "University of Lagos",
      text: "As a student agent, connecting with potential tenants and managing listings can be very overwhelming. Swivly has really made work so much easier. The trust ratings have also been a game changer, helping me build credibility and attract more clients. I've been able to successfully match tenants to properties quickly, which has boosted my reputation on campus. This platform has not only simplified my workflow but also strengthened my relationships with both landlords and students. It's a valuable resource for any student agent.",
      image: "/images/user.png",
    },
  ];

  return (
    <section className="bg-[#F8F9FC] text-black py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Your Trusted MarketPlace <br />
          The <span className="text-white bg-[#6850F5] px-2 rounded-md">Student</span> way
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-gray-600 max-w-3xl mx-auto"
        >
          At Swivly, we understand the unique challenges students face when searching for accommodations or reliable marketplaces.
          That’s why we’re committed to providing a unique platform that prioritizes trust, security, and convenience.
        </motion.p>

        {/* Testimonials */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="bg-[#6850F5] text-white p-6 rounded-lg max-w-sm relative shadow-lg"
            >
              <p className="text-sm">{item.text}</p>
              {/* User Info */}
              <div className="flex items-center mt-4">
                <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-full" />
                <div className="ml-3">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-gray-200">{item.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
