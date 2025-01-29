"use client";

import React from "react";
import Head from "next/head";
import Header from "./components/Header";
import { Typewriter } from "react-simple-typewriter";

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
            <p className="mt-4 text-lg">Search accommodations, buy, sell your new or used properties and connect with ease the student way.</p>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="bg-lime-500 text-black font-semibold py-2 px-6 rounded-lg">List Your Property</button>
              <button className="bg-white text-blue-400 font-semibold py-2 px-6 rounded-lg">Explore Now</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
