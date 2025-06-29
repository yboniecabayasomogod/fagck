// 📁 src/pages/HomePage.js
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1536520002442-39764a41e5d9?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl max-w-xl text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            First Assembly of God Cell Group
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Welcome to our cell group family. We grow together in faith, worship, and service.
            Join us as we journey closer to God and each other.
          </p>
          <div className="space-x-4">
            <a
              href="/about"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              About Us
            </a>
            <a
              href="/members"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              View Members
            </a>
          </div>
        </div>
      </div>

      {/* Meeting Schedule */}
      <section className="bg-white py-8 px-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Next Meeting</h3>
        <p className="text-gray-600 text-lg">
          Friday at 7:00 PM – Youth Room, First Assembly of God
        </p>
      </section>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;