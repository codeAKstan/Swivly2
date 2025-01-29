"use client";

import React from "react";
import Head from "next/head";
import Header from "./components/Header";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image"; 
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>Swivly - Campus Marketplace</title>
        <meta name="description" content="Search accommodations, buy, sell your new or used properties and connect with ease the student way." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <section className="relative text-center py-20 bg-cover bg-[center_10%] bg-[url('/images/bgg.webp')]">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold">
              <Typewriter
                words={["Campus Marketplace For Accommodations And More"]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={30}
              />
            </h1>
            <p className="mt-4 text-lg">
              Search accommodations, buy, sell your new or used properties and connect with ease the student way.
            </p>

            <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
              <button className="bg-lime-500 text-black font-semibold py-3 px-6 rounded-lg w-3/4 sm:w-auto">
                List Your Property
              </button>
              <button className="bg-white text-blue-400 font-semibold py-3 px-6 rounded-lg w-3/4 sm:w-auto">
                Explore Now
              </button>
            </div>

          </div>
        </section>

        <section className="bg-[#6850F5] text-white py-12">
  <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
    {/* Sidebar */}
    <aside className="w-full md:w-1/4 bg-[#4D37C3] p-6 rounded-lg text-left">
      <h2 className="text-lg font-bold text-black bg-lime-400 p-2 rounded-md">SHOP BY</h2>

      {/* Categories */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg">Categories</h3>
        <div className="mt-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="category" defaultChecked className="accent-lime-400" />
            <span>All</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="category" className="accent-lime-400" />
            <span>Marketplace</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="category" className="accent-lime-400" />
            <span>Accommodation</span>
          </label>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg">By Location</h3>
        <select className="mt-2 w-full bg-white text-black p-2 rounded-md">
          <option>Select a university in Nigeria</option>
        </select>
        <input type="text" placeholder="Region in the University" className="mt-2 w-full bg-white text-black p-2 rounded-md" />
      </div>
    </aside>

    {/* Main Content */}
    <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md flex-1">
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <input 
          type="text" 
          placeholder="Search items and accommodation" 
          className="w-full md:w-1/2 p-2 rounded-full text-black border border-gray-300" 
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Spring Mattress", price: "₦75,000.00", img: "/images/mattress.png" },
          { name: "Table", price: "₦45,700.00", img: "/images/table.png" },
          { name: "Gas cooker", price: "₦110,000.00", img: "/images/gas.png" },
          { name: "Laptop Internal SSD", price: "₦35,000.00", img: "/images/harddisk.png" },
          { name: "Laptop", price: "₦15,432.00", img: "/images/laptop.png" },
          { name: "Hair Clipper", price: "₦26,564.00", img: "/images/clipper.png" },
          { name: "Office Chair", price: "₦211,600.00", img: "/images/chair.png" },
          { name: "Desktop Fan", price: "₦26,000.00", img: "/images/fan.png" },
          { name: "Flash Drive", price: "₦2,600.00", img: "/images/flashdrive.png" },
        ].map((item, index) => (
          <div key={index} className="bg-white text-black px-6 py-6 rounded-lg shadow-md relative">
            <Image 
              src={item.img} 
              alt={item.name} 
              width={200} 
              height={200} 
              className="w-full h-40 object-contain rounded-md" 
            />
            <h3 className="mt-2 font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.price}</p>
            <button className="absolute top-2 right-2 bg-lime-400 text-black px-5 py-2 text-sm rounded-full">
              SHOP NOW
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-end mt-6">
        <button className="text-lime-400 text-lg font-bold flex items-center">
          See more <span className="ml-2">➡</span>
        </button>
      </div>
    </div>
  </div>
</section>
{/* Testimonials section */}
<Testimonials />



      </main>
    </>
  );
}
