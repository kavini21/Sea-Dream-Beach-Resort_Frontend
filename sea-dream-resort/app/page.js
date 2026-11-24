"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import AboutPreview from "@/components/home/AboutPreview";
import RoomCards from "@/components/home/RoomCards";
import Facilities from "@/components/home/Facilities";
import Testimonials from "@/components/home/Testimonials";

function HomeContent() {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const searchData = checkIn && checkOut ? { checkIn, checkOut, guests: Number(guests) || 1 } : null;

  return (
    <>
      <HeroSection />
      <SearchBar />
      <AboutPreview />
      <RoomCards searchData={searchData} />
      <Facilities />
      <Testimonials />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
