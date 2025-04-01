"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // EmailJS sender
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_KEY!, // ID Service
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE!, // ID Template
        formData,
        process.env.NEXT_PUBLIC_USER_PUBLIC_ID! // ID User
      );

      setFormStatus(
        "Thank you for contacting us! We will get back to you shortly."
      );
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus(
        "Sorry, there was an issue submitting your form. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#D99F2B] mb-6">Contact Us</h1>

        {/* Contact Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Our Contact Information
          </h2>
          <p className="text-gray-600 mt-4">
            You can reach us via email or through our phone number:
          </p>
          <ul className="mt-4">
            <li className="text-gray-700">📧 Email: contact@gameidstore.com</li>
            <li className="text-gray-700">📞 Phone: +123 456 7890</li>
            <li className="text-gray-700">
              🌍 Address: 123 Game St., Game City, World
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D99F2B]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D99F2B]"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D99F2B]"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D99F2B]"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Form Status Message */}
        {formStatus && (
          <div className="mt-4 text-green-600 text-center">
            <p>{formStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;





