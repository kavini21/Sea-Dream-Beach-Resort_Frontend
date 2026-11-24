"use client";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import Button from "@/components/common/Button";

const WHATSAPP_OWNER_NUMBER = "94768251792";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim()))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const message = [
      "Hello Sea Dream Beach Resort, I have a question.",
      "",
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim() || "Not provided"}`,
      "",
      "Message:",
      formData.message.trim(),
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_OWNER_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((previous) => ({ ...previous, [e.target.name]: "" }));
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">We&apos;d love to hear from you</p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Send us a message
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              This opens a WhatsApp message to the resort. Please tap Send in
              WhatsApp to deliver it.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Continue to WhatsApp
              </Button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">
                      Sea Dream Beach Resort, Weligama, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a
                      href="tel:0740123790"
                      className="text-gray-600 hover:text-primary"
                    >
                      074 012 3790
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:Shanushvaththage@gmail.com"
                      className="text-gray-600 hover:text-primary"
                    >
                      Shanushvaththage@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Find Us</h2>
              <div className="h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126819.94652328454!2d80.3586466!3d5.9752594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13e7a5d3b9e7d%3A0x9a8c5e2b4f3a1c6!2sWeligama%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="#"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                f
              </a>
              <a
                href="#"
                className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500"
              >
                𝕏
              </a>
              <a
                href="#"
                className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700"
              >
                ⊚
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
