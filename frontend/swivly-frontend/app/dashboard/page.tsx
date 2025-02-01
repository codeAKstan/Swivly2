"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Failed to load user data.</p>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
        <p className="text-gray-600 mb-6">Role: {user.role}</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <div className="flex space-x-4">
              <Link
                href="/profile/edit"
                className="text-blue-500 hover:underline"
              >
                Edit Profile
              </Link>
              <Link
                href="/change-password"
                className="text-blue-500 hover:underline"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/address-book"
            className="block bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            Address Book
          </Link>
          <Link
            href="/purchase-history"
            className="block bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            Purchase and Rent History
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="block w-full text-left bg-red-100 p-4 rounded-lg hover:bg-red-200 text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;