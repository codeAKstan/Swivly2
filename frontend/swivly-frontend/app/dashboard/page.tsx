"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking localStorage for a token)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        <p className="text-center text-gray-700">
          Welcome to your dashboard! You are now logged in.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;