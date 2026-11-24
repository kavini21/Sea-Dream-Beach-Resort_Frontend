"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@/components/common/Button";

const WHATSAPP_OWNER_NUMBER = "94768251792";
const ROOM_NAMES = {
  1: "Deluxe Double Room",
  2: "Deluxe Family Room",
  3: "Budget Double Room",
  4: "Double Room With Private Bathroom",
  5: "Large Single Room",
};

function parseDateParam(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
}

function formatBookingDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingPageContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const requestedGuests = Number(searchParams.get("guests"));

  const [bookingData, setBookingData] = useState({
    checkIn: parseDateParam(searchParams.get("checkIn")),
    checkOut: parseDateParam(searchParams.get("checkOut")),
    guests:
      Number.isInteger(requestedGuests) && requestedGuests >= 1 && requestedGuests <= 6
        ? requestedGuests
        : 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!bookingData.checkOut)
      newErrors.checkOut = "Check-out date is required";
    if (
      bookingData.checkIn &&
      bookingData.checkOut &&
      bookingData.checkOut <= bookingData.checkIn
    ) {
      newErrors.checkOut = "Check-out must be after check-in";
    }
    if (!bookingData.name.trim()) newErrors.name = "Name is required";
    const email = bookingData.email.trim();
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email is invalid";
    if (!bookingData.phone.trim())
      newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const nights = Math.ceil(
      (bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24),
    );
    const message = [
      "Hello, I would like to check availability for a stay at Sea Dream Beach Resort.",
      "",
      `Room: ${ROOM_NAMES[roomId] || "Not selected"}`,
      `Check-in: ${formatBookingDate(bookingData.checkIn)}`,
      `Check-out: ${formatBookingDate(bookingData.checkOut)}`,
      `Nights: ${nights}`,
      `Guests: ${bookingData.guests}`,
      `Name: ${bookingData.name.trim()}`,
      `Email: ${bookingData.email.trim()}`,
      `Phone: ${bookingData.phone.trim()}`,
      `Special requests: ${bookingData.specialRequests.trim() || "None"}`,
      "",
      "Please let me know if the room is available. Thank you!",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_OWNER_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleDateChange = (field, date) => {
    setBookingData((previous) => {
      const updated = { ...previous, [field]: date };
      if (
        field === "checkIn" &&
        date &&
        updated.checkOut &&
        updated.checkOut <= date
      ) {
        updated.checkOut = null;
      }
      return updated;
    });
    setErrors((previous) => ({
      ...previous,
      [field]: "",
      ...(field === "checkIn" ? { checkOut: "" } : {}),
    }));
  };

  const handleChange = (e) => {
    setBookingData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((previous) => ({ ...previous, [e.target.name]: "" }));
    }
  };

  return (
    <div className="pt-16">
      <div className="bg-primary text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Book Your Stay
          </h1>
          <p className="text-lg">Reserve your dream beach getaway</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                Booking Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Check In *</label>
                  <DatePicker
                    selected={bookingData.checkIn}
                    onChange={(date) => handleDateChange("checkIn", date)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholderText="Select date"
                    minDate={new Date()}
                  />
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.checkIn}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Check Out *
                  </label>
                  <DatePicker
                    selected={bookingData.checkOut}
                    onChange={(date) => handleDateChange("checkOut", date)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholderText="Select date"
                    minDate={bookingData.checkIn || new Date()}
                  />
                  {errors.checkOut && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.checkOut}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  rows="3"
                  value={bookingData.specialRequests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any special requests or requirements?"
                ></textarea>
              </div>

              <p className="mb-3 text-center text-sm text-gray-500">
                This sends an availability request to the resort owner. Your
                booking is not confirmed until they reply.
              </p>
              <Button type="submit" variant="gold" className="w-full">
                Continue to WhatsApp
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">
                Booking Summary
              </h3>
              <div className="space-y-3 mb-4 pb-4 border-b">
                {roomId && ROOM_NAMES[roomId] && (
                  <div className="flex justify-between gap-4">
                    <span>Room</span>
                    <span className="text-right">{ROOM_NAMES[roomId]}</span>
                  </div>
                )}
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="flex justify-between">
                    <span>Number of Nights</span>
                    <span>
                      {Math.ceil(
                        (bookingData.checkOut - bookingData.checkIn) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      nights
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                * No prepayment required. Pay at the property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
