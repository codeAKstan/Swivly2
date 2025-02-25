"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";
import { User, Phone } from "lucide-react";

export default function UserDetail() {
  const params = useParams();
  const { userId } = params; // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch user details from the backend
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8000/user/api/users/${userId}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <>
      <Head>
        <title>Swivly - {user.username}</title>
        <meta name="description" content={`Details for ${user.username}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {/* User Details */}
            <h1 className="text-3xl font-bold mt-6">{user.username}</h1>

            {/* Phone Number */}
            <div className="flex items-center mt-4">
              <Phone size={20} className="mr-2" />
              <span>{user.phone_number}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}