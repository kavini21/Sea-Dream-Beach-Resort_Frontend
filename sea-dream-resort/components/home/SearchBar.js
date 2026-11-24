"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search, CalendarDays, Users } from "lucide-react";
import Button from "../common/Button";

const SearchBar = () => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date");
      return;
    }
    setError("");

    const params = new URLSearchParams({
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      guests: guests.toString(),
    });

    router.push(`/?${params.toString()}#rooms`);

    // Scroll to rooms section smoothly
    setTimeout(() => {
      const roomsSection = document.getElementById("rooms");
      if (roomsSection) {
        roomsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto -mt-16 relative z-20 mb-12 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-bold text-primary">Find Available Rooms</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Check In */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <CalendarDays className="w-4 h-4 text-gold" />
            Check In
          </label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => {
              setCheckIn(date);
              if (checkOut && date >= checkOut) setCheckOut(null);
              setError("");
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-sm"
            placeholderText="Select date"
            minDate={new Date()}
            dateFormat="MMM dd, yyyy"
          />
        </div>

        {/* Check Out */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <CalendarDays className="w-4 h-4 text-gold" />
            Check Out
          </label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => {
              setCheckOut(date);
              setError("");
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-sm"
            placeholderText="Select date"
            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
            dateFormat="MMM dd, yyyy"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Users className="w-4 h-4 text-gold" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-sm"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-transparent select-none">Search</label>
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#8A5218] hover:bg-[#6e3f12] text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <Search className="w-4 h-4" />
            Check Rates
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-4 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
