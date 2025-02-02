"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Link from "next/link";

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profilePicture: "",
        role: "",
        address: "",
        phoneNumber: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

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
                setFormData({
                    name: data.name,
                    email: data.email,
                    profilePicture: data.profilePicture,
                    role: data.role,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
      
        try {
          const token = localStorage.getItem("token");
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("email", formData.email);
          formDataToSend.append("role", formData.role);
          formDataToSend.append("address", formData.address);
          formDataToSend.append("phoneNumber", formData.phoneNumber);
          if (formData.profilePicture instanceof File) {
            formDataToSend.append("profilePicture", formData.profilePicture);
          }
      
          const response = await fetch("http://localhost:8000/api/user/update/", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          });
      
          if (!response.ok) {
            throw new Error("Failed to update profile");
          }
      
          const data = await response.json();
          setUser(data);
          setSuccessMessage("Profile updated successfully!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000); // Redirect to dashboard after 2 seconds
        } catch (error) {
          setError(error.message || "Failed to update profile");
        }
      };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return null; // Prevent rendering the page if the user is redirected
    }

    return (
        <div>
            <Header />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setFormData({
                                        ...formData,
                                        profilePicture: file,
                                    });
                                }
                            }}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save Changes
                        </button>
                        <Link
                            href="/dashboard"
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;