"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Moon,
  CheckCircle,
  Calendar,
  Star,
  Eye,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Waves,
  Sun,
  BedDouble,
  Maximize2,
  ArrowRight,
  ChevronRight,
  X,
} from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room",
    tagline: "Ocean Views & Private Balcony",
    maxGuests: 2,
    bedType: "1 King Bed",
    size: "32 m²",
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
    maxGuests: 4,
    bedType: "2 Queen Beds",
    size: "48 m²",
    view: "Beachfront",
    image: "/images/room-deluxe-family.jpg",
    gallery: ["/images/room-deluxe-family.jpg", "/images/about.png", "/images/hero-bg.jpg"],
    description:
      "Perfect for families seeking space and direct beach access. Two plush queen beds, an expansive living area, and a sun-drenched terrace open directly onto the golden sands of Weligama Beach. Watch the coconut palms sway as the sun dips into the Indian Ocean.",
    shortDesc: "Premium room with direct beach access and stunning panoramic ocean views.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Flat-screen TV", "Beach Terrace", "En-suite Bathroom", "Minibar", "Coffee Maker", "Kids Amenities", "Daily Housekeeping"],
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
    maxGuests: 2,
    bedType: "2 Single Beds",
    size: "24 m²",
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
    maxGuests: 2,
    bedType: "1 King Bed",
    size: "38 m²",
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
    maxGuests: 1,
    bedType: "1 Large Single Bed",
    size: "28 m²",
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

function getNights(checkIn, checkOut) {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function RoomModal({ room, searchData, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const nights = searchData ? getNights(searchData.checkIn, searchData.checkOut) : null;
  const bookingHref = searchData
    ? `/booking?room=${room.id}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${searchData.guests}`
    : `/booking?room=${room.id}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="home-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-700" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
          <img
            src={room.gallery[activeImg]}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          {room.badge && (
            <span className={`absolute top-4 left-4 ${room.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
              {room.badge}
            </span>
          )}

          {/* Available badge when searching */}
          {searchData && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <CheckCircle className="w-3 h-3" />
              Available
            </div>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {room.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-[#8A5218] scale-110" : "border-white/50 opacity-70 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">

            {/* ── Left: Room Info ── */}
            <div className="flex-1 min-w-0">
              <p className="text-[#8A5218] text-xs font-semibold uppercase tracking-widest mb-1">{room.tagline}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2332] mb-3">{room.name}</h2>

              {/* Stars & reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(room.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{room.rating}</span>
                <span className="text-sm text-gray-400">({room.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">{room.description}</p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Bed Type", value: room.bedType, icon: BedDouble },
                  { label: "Room Size", value: room.size, icon: Maximize2 },
                  { label: "Max Guests", value: `${room.maxGuests} Guest${room.maxGuests > 1 ? "s" : ""}`, icon: Users },
                  { label: "View", value: room.view, icon: Eye },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#8A5218]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#8A5218]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {room.amenities.map((a) => {
                    const Icon = amenityIcons[a] || CheckCircle;
                    return (
                      <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon size={13} className="text-[#8A5218] flex-shrink-0" />
                        {a}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right: Booking Card ── */}
            <div className="md:w-60 flex-shrink-0">
              <div className="bg-[#1a2332] text-white rounded-2xl p-5 sticky top-4">
                {/* Search pricing */}
                {searchData && nights && (
                  <div className="bg-white/10 rounded-xl p-3 mb-4 border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(searchData.checkIn)} → {formatDate(searchData.checkOut)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Moon size={11} />
                        {nights} night{nights > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(room.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{room.rating} ({room.reviews})</span>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-5">
                  {room.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={12} className="text-[#8A5218]" />
                      {h}
                    </div>
                  ))}
                </div>

                <Link href={bookingHref}>
                  <button
                    id={`home-book-room-${room.id}-modal`}
                    className="w-full bg-[#8A5218] hover:bg-[#a8621e] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                  >
                    {searchData ? "Book This Room" : "Book Now"}
                    <ArrowRight size={15} />
                  </button>
                </Link>
                <p className="text-center text-[10px] text-gray-500 mt-2">Free cancellation · No prepayment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Room Card ─────────────────────────────────────────────────────────────────
const RoomCard = ({ room, searchData, isLarge, onViewDetails }) => {
  const nights = searchData ? getNights(searchData.checkIn, searchData.checkOut) : null;

  const bookingHref = searchData
    ? `/booking?room=${room.id}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${searchData.guests}`
    : `/booking?room=${room.id}`;

  return (
    <div
      id={`home-room-card-${room.id}`}
      className={`relative ${isLarge ? "h-80" : "h-64"} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group`}
    >
      {/* Background Image */}
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />

      {/* Badge */}
      {room.badge && (
        <span className={`absolute top-3 left-3 ${room.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`}>
          {room.badge}
        </span>
      )}

      {/* Available Badge (when searching) */}
      {searchData && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
          <CheckCircle className="w-3 h-3" />
          Available
        </div>
      )}

      {/* Rating chip (when not searching) */}
      {!searchData && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <Star size={9} className="fill-white" />
          {room.rating}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Title */}
        <h3 className={`font-bold mb-0.5 ${isLarge ? "text-2xl" : "text-xl"}`}>{room.name}</h3>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-white/70 text-xs mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            Up to {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="w-3 h-3" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {room.view}
          </span>
        </div>

        {/* Search result info */}
        {searchData ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1 text-white/80">
                <Calendar className="w-3 h-3" />
                {formatDate(searchData.checkIn)} → {formatDate(searchData.checkOut)}
              </span>
              <span className="flex items-center gap-1 text-white/80">
                <Moon className="w-3 h-3" />
                {nights} night{nights > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ) : null}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            id={`home-view-details-${room.id}`}
            onClick={() => onViewDetails(room)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold rounded-xl transition-all duration-300"
          >
            View Details
            <ChevronRight size={13} />
          </button>
          <Link href={bookingHref} className="flex-1">
            <button
              id={`home-book-room-${room.id}`}
              className="w-full py-2 bg-[#8A5218] hover:bg-[#a8621e] text-white text-xs font-semibold rounded-xl transition-all duration-300 active:scale-95"
            >
              {searchData ? "Book This Room" : "Book Now"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Main RoomCards Section ────────────────────────────────────────────────────
const RoomCards = ({ searchData }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const availableRooms = searchData
    ? rooms.filter((r) => r.maxGuests >= searchData.guests)
    : rooms;

  const hasSearch = !!searchData;

  return (
    <>
      <section id="rooms" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container-custom">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="text-sm text-gold font-semibold uppercase tracking-wider mb-2">
              Our Accommodations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {hasSearch ? "Available Rooms" : "Sea Dream Rooms"}
            </h2>

            {hasSearch ? (
              <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-3 shadow-sm text-sm text-gray-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  <strong>Check-in:</strong> {formatDate(searchData.checkIn)}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  <strong>Check-out:</strong> {formatDate(searchData.checkOut)}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gold" />
                  <strong>{searchData.guests}</strong> Guest{searchData.guests > 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-gold" />
                  <strong>{getNights(searchData.checkIn, searchData.checkOut)}</strong> Night{getNights(searchData.checkIn, searchData.checkOut) > 1 ? "s" : ""}
                </span>
              </div>
            ) : (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Experience comfort and luxury in our beautifully designed rooms with stunning views
              </p>
            )}

            {hasSearch && (
              <p className="text-gray-500 text-sm mt-2">
                {availableRooms.length} room{availableRooms.length !== 1 ? "s" : ""} available for your stay
              </p>
            )}
          </div>

          {/* Room Cards */}
          {availableRooms.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-primary mb-2">No Rooms Available</h3>
              <p className="text-gray-500 mb-6">
                No rooms can accommodate {searchData.guests} guests. Try fewer guests.
              </p>
              <Link href="/">
                <button className="px-6 py-3 bg-[#8A5218] text-white font-semibold rounded-lg hover:bg-[#6e3f12] transition-colors">
                  Modify Search
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {availableRooms.slice(0, 3).map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    searchData={searchData}
                    isLarge={false}
                    onViewDetails={setSelectedRoom}
                  />
                ))}
              </div>

              {/* Bottom 2 */}
              {availableRooms.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-5xl lg:mx-auto">
                  {availableRooms.slice(3, 5).map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      searchData={searchData}
                      isLarge={true}
                      onViewDetails={setSelectedRoom}
                    />
                  ))}
                </div>
              )}

              {/* View All Rooms link */}
              {!hasSearch && (
                <div className="text-center mt-12">
                  <Link href="/rooms">
                    <button
                      id="view-all-rooms-btn"
                      className="inline-flex items-center gap-2 border-2 border-[#8A5218] text-[#8A5218] hover:bg-[#8A5218] hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      Explore All Rooms
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          searchData={searchData}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </>
  );
};

export default RoomCards;
