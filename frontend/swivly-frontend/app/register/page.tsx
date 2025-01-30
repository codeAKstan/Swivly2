"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../services/auth";
import Header from "../components/Header";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register(formData);
      console.log("Registration successful:", response);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
        <Header />
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create An Account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Create an account with Swivly for free!
        </p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-500 transition text-white font-semibold py-3 rounded-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already Have An Account?{" "}
          <a href="/login" className="text-green-500 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
