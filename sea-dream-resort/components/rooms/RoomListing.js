"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Star,
  ChevronRight,
  Eye,
  Waves,
  Sun,
  Shield,
  CheckCircle,
  X,
  ArrowRight,
  BedDouble,
  Maximize2,
} from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room",
    tagline: "Ocean Views & Private Balcony",
    category: "Deluxe",
    maxGuests: 2,
    bedType: "1 King Bed",
    size: "32 m²",
    floor: "2nd & 3rd Floor",
    view: "Ocean View",
    image: "/images/room-deluxe-double.jpg",
    gallery: ["/images/room-deluxe-double.jpg", "/images/hero-bg.jpg", "/images/about.png"],
    description:
      "Wake up to golden Sri Lankan sunrises from your private balcony. This elegantly furnished room blends traditional wooden craftsmanship with modern comforts. Floor-to-ceiling drapes frame a mesmerising ocean panorama that sets the tone for every morning.",
    shortDesc: "Spacious room with ocean view, comfortable king bed and private balcony.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Flat-screen TV", "Private Balcony", "En-suite Bathroom", "Minibar", "Coffee Maker", "Daily Housekeeping"],
    highlights: ["Ocean View", "Private Balcony", "King Bed"],
    rating: 4.9,
    reviews: 48,
    badge: "Most Popular",
    badgeColor: "bg-[#8A5218]",
  },
  {
    id: 2,
    name: "Deluxe Family Room",
    tagline: "Beach Access & Panoramic Sunset Views",
    category: "Deluxe",
    maxGuests: 4,
    bedType: "2 Queen Beds",
    size: "48 m²",
    floor: "Ground Floor",
    view: "Beachfront",
    image: "/images/room-deluxe-family.jpg",
    gallery: ["/images/room-deluxe-family.jpg", "/images/about.png", "/images/hero-bg.jpg"],
    description:
      "Perfect for families seeking space and direct beach access. Two plush queen beds, an expansive living area, and a sun-drenched terrace open directly onto the golden sands of Weligama Beach. Watch the coconut palms sway as the sun dips into the Indian Ocean.",
    shortDesc: "Premium room with direct beach access and stunning panoramic ocean views.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Flat-screen TV", "Beach Terrace", "En-suite Bathroom", "Minibar", "Coffee Maker", "Kids Amenities", "Daily Housekeeping", "Connecting Rooms Available"],
    highlights: ["Beachfront", "2 Queen Beds", "Private Terrace"],
    rating: 4.8,
    reviews: 32,
    badge: "Family Favourite",
    badgeColor: "bg-teal-600",
  },
  {
    id: 3,
    name: "Budget Double Room",
    tagline: "Comfort Meets Coastal Charm",
    category: "Budget",
    maxGuests: 2,
    bedType: "2 Single Beds",
    size: "24 m²",
    floor: "1st Floor",
    view: "Garden & Partial Sea",
    image: "/images/room-budget-double.jpg",
    gallery: ["/images/room-budget-double.jpg", "/images/hero-bg.jpg", "/images/about.png"],
    description:
      "Authentic Sri Lankan guesthouse warmth at an unbeatable price. Featuring traditional mosquito net canopy beds, hand-painted art, and a breezy balcony with hammock overlooking tropical gardens and a glimmer of the sea beyond.",
    shortDesc: "Comfortable budget-friendly option with charming tropical decor and quality amenities.",
    amenities: ["Ceiling Fan", "Free Wi-Fi", "Shared Balcony", "Shared Bathroom", "Coffee Maker", "Daily Housekeeping"],
    highlights: ["Garden View", "Tropical Decor", "Great Value"],
    rating: 4.6,
    reviews: 61,
    badge: "Best Value",
    badgeColor: "bg-green-600",
  },
  {
    id: 4,
    name: "Double Room With Private Bathroom",
    tagline: "Luxury En-Suite with Ocean Sunset",
    category: "Premium",
    maxGuests: 2,
    bedType: "1 King Bed",
    size: "38 m²",
    floor: "2nd Floor",
    view: "Oceanfront Sunset",
    image: "/images/room-private-bathroom.jpg",
    gallery: ["/images/room-private-bathroom.jpg", "/images/about.png", "/images/hero-bg.jpg"],
    description:
      "The pinnacle of private luxury at Sea Dream. A glass-walled en-suite bathroom with a freestanding soaking tub overlooks the Indian Ocean. Marble finishes, rainfall shower, and LED vanity mirrors create a spa-like sanctuary with dramatic sunset views.",
    shortDesc: "Luxurious room featuring a marble en-suite bathroom with soaking tub and premium fixtures.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "4K Flat-screen TV", "Private Balcony", "Marble En-suite Bathroom", "Soaking Tub", "Rainfall Shower", "Minibar", "Nespresso Machine", "Turndown Service", "Daily Housekeeping", "Bathrobes & Slippers"],
    highlights: ["Private Bathroom", "Soaking Tub", "Sunset View"],
    rating: 4.9,
    reviews: 27,
    badge: "Premium",
    badgeColor: "bg-purple-700",
  },
  {
    id: 5,
    name: "Large Single Room",
    tagline: "Peaceful Solo Retreat by the Sea",
    category: "Single",
    maxGuests: 1,
    bedType: "1 Large Single Bed",
    size: "28 m²",
    floor: "1st & 2nd Floor",
    view: "Ocean & Palm Garden",
    image: "/images/room-large-single.jpg",
    gallery: ["/images/room-large-single.jpg", "/images/hero-bg.jpg", "/images/about.png"],
    description:
      "A tranquil haven for the solo traveller or those seeking peaceful solitude. High vaulted ceilings, floor-to-ceiling windows flooding the room with golden light, and a cosy reading nook beside the ocean-facing terrace make this the perfect retreat.",
    shortDesc: "Spacious single accommodation with modern design, high ceilings and stunning beach views.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Flat-screen TV", "Private Terrace", "En-suite Bathroom", "Coffee Maker", "Work Desk", "Daily Housekeeping"],
    highlights: ["Ocean & Garden View", "High Ceilings", "Reading Nook"],
    rating: 4.7,
    reviews: 39,
    badge: null,
    badgeColor: null,
  },
];

const amenityIcons = {
  "Air Conditioning": Wind,
  "Ceiling Fan": Wind,
  "Free Wi-Fi": Wifi,
  "Flat-screen TV": Tv,
  "4K Flat-screen TV": Tv,
  "En-suite Bathroom": Bath,
  "Marble En-suite Bathroom": Bath,
  "Shared Bathroom": Bath,
  "Coffee Maker": Coffee,
  "Nespresso Machine": Coffee,
  "Private Balcony": Sun,
  "Shared Balcony": Sun,
  "Beach Terrace": Waves,
  "Private Terrace": Sun,
};

const categories = ["All", "Deluxe", "Premium", "Budget", "Single"];

function RoomModal({ room, onClose }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <div className="relative h-72 md:h-96 overflow-hidden rounded-t-2xl">
          <img
            src={room.gallery[activeImg]}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          {room.badge && (
            <span className={`absolute top-4 left-4 ${room.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
              {room.badge}
            </span>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {room.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-14 h-9 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#8A5218] scale-110" : "border-white/50 opacity-70"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <p className="text-[#8A5218] text-sm font-semibold uppercase tracking-widest mb-1">{room.tagline}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2332] mb-3">{room.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(room.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{room.rating}</span>
                <span className="text-sm text-gray-400">({room.reviews} reviews)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{room.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Bed Type", value: room.bedType, icon: BedDouble },
                  { label: "Room Size", value: room.size, icon: Maximize2 },
                  { label: "Max Guests", value: `${room.maxGuests} Guest${room.maxGuests > 1 ? "s" : ""}`, icon: Users },
                  { label: "View", value: room.view, icon: Eye },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#8A5218]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#8A5218]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Room Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {room.amenities.map((a) => {
                    const Icon = amenityIcons[a] || CheckCircle;
                    return (
                      <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon size={14} className="text-[#8A5218] flex-shrink-0" />
                        {a}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:w-64 flex-shrink-0">
              <div className="bg-[#1a2332] text-white rounded-2xl p-6 sticky top-6">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(room.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{room.rating} ({room.reviews})</span>
                </div>

                <div className="space-y-2 mb-6">
                  {room.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={13} className="text-[#8A5218]" />
                      {h}
                    </div>
                  ))}
                </div>

                <Link href={`/booking?room=${room.id}`}>
                  <button
                    id={`book-room-${room.id}-modal`}
                    className="w-full bg-[#8A5218] hover:bg-[#a8621e] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Book This Room
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3">Free cancellation · No prepayment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room, onViewDetails }) {
  return (
    <div
      id={`room-card-${room.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {room.badge && (
          <span className={`absolute top-3 left-3 ${room.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`}>
            {room.badge}
          </span>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
          <Eye size={10} />
          {room.view}
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
          <Star size={10} className="fill-white" />
          {room.rating}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-[#8A5218] text-xs font-semibold uppercase tracking-widest mb-1">{room.tagline}</p>
        <h3 className="text-lg font-bold text-[#1a2332] mb-2 group-hover:text-[#8A5218] transition-colors duration-300">
          {room.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{room.shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <BedDouble size={12} className="text-[#8A5218]" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-[#8A5218]" />
            Up to {room.maxGuests}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} className="text-[#8A5218]" />
            {room.size}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 4).map((a) => {
            const Icon = amenityIcons[a] || CheckCircle;
            return (
              <span key={a} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full">
                <Icon size={9} />
                {a}
              </span>
            );
          })}
          {room.amenities.length > 4 && (
            <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-full">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 mt-auto pt-4 flex gap-2">
          <button
            id={`view-details-${room.id}`}
            onClick={() => onViewDetails(room)}
            className="flex-1 border border-[#8A5218] text-[#8A5218] hover:bg-[#8A5218] hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            View Details
            <ChevronRight size={14} />
          </button>
          <Link href={`/booking?room=${room.id}`} className="flex-1">
            <button
              id={`book-room-${room.id}`}
              className="w-full bg-[#8A5218] hover:bg-[#6e3f12] text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#8A5218]/30"
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const RoomListing = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const filtered =
    activeCategory === "All"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-80 md:h-[420px] overflow-hidden">
        <img
          src="/images/room-deluxe-double.jpg"
          alt="Sea Dream Rooms"
          className="w-full h-full object-cover scale-105"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#d4a96a] text-sm font-semibold uppercase tracking-widest mb-3">
            Sea Dream Beach Resort · Weligama, Sri Lanka
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            Our Accommodation
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            Each of our rooms is thoughtfully crafted to bring you closer to the beauty of Weligama Beach.
          </p>
          <div className="flex items-center gap-2 text-white/60 text-sm mt-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Rooms</span>
          </div>
        </div>
      </section>

      {/* Intro Strip */}
      <section className="bg-white py-14">
        <div className="container-custom text-center">
          <div className="text-sm text-[#8A5218] font-semibold uppercase tracking-widest mb-3">Stay with us</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4">Refined Accommodation</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Each of our five carefully curated room types offers a unique way to experience the magic of coastal Sri Lanka — from budget-friendly charm to ocean-view luxury.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#f9f6f1] border-y border-[#e8dcc8] py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: "Free Cancellation", sub: "On most room types" },
              { icon: Waves, label: "Beachfront Access", sub: "Direct beach steps away" },
              { icon: Star, label: "Top Rated", sub: "4.8 on Booking.com" },
              { icon: Wifi, label: "Free Wi-Fi", sub: "High-speed in all rooms" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#8A5218]/10 rounded-2xl flex items-center justify-center">
                  <Icon size={22} className="text-[#8A5218]" />
                </div>
                <p className="text-sm font-bold text-[#1a2332]">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#8A5218] text-white shadow-lg shadow-[#8A5218]/30 scale-105"
                    : "bg-white text-gray-600 hover:bg-[#8A5218]/10 hover:text-[#8A5218] border border-gray-200"
                }`}
              >
                {cat}
                {cat === "All" && (
                  <span className="ml-1.5 text-[10px] font-bold">
                    ({rooms.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((room) => (
              <RoomCard key={room.id} room={room} onViewDetails={setSelectedRoom} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No rooms found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#1a2332] py-20">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/room-deluxe-family.jpg')" }}
        />
        <div className="relative container-custom text-center">
          <p className="text-[#d4a96a] text-sm font-semibold uppercase tracking-widest mb-3">Limited Availability</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Dream Getaway?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Book directly with us for the best rates, free cancellation on select rooms, and personalised service from our team in Weligama.
          </p>
          <Link href="/booking">
            <button
              id="rooms-cta-book-btn"
              className="inline-flex items-center gap-2 bg-[#8A5218] hover:bg-[#a8621e] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl shadow-[#8A5218]/30 text-sm tracking-wide"
            >
              Book Your Stay Now
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
};

export default RoomListing;
