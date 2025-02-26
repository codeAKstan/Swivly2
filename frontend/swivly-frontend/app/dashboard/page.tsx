"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

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
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user.profilePicture || "/images/default-profile.png"}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        </div>

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

        {/* Role-Specific Buttons/Sections */}
        {user.role === "seller" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Seller Actions</h2>
            <div className="flex space-x-4">
              <Link
                href="/add-product"
                className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors"
              >
                Add Product
              </Link>
              <Link
                href="/view-products"
                className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors"
              >
                View Added Products
              </Link>
            </div>
          </div>
        )}

        {user.role === "agent" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Agent Actions</h2>
            <div className="flex space-x-4">
              <Link
                href="/accommodation/list"
                className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors"
              >
                List Accommodation
              </Link>
              <Link
                href="/view-accommodation"
                className="bg-lime-400 text-black px-6 py-2 rounded-full hover:bg-lime-500 transition-colors"
              >
                View Listed Accommodation
              </Link>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <button
              onClick={() => setShowAddressModal(!showAddressModal)}
              className="block w-full text-left bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
            >
              Address Book
            </button>
            {showAddressModal && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Your default shipping address:</h3>
                <p>{user.name}</p>
                <p>{user.address || "Null"}</p>
                <p>{user.phone_number || "Null"}</p>
              </div>
            )}
          </div>

          <Link
            href="/purchase-history"
            className="block bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            Purchase and Rent History
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/login");
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