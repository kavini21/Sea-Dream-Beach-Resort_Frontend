"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Rooms", href: "/rooms" },
  { name: "Facilities", href: "/facilities" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 z-50 w-full bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Sea Dream Beach Resort"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
              priority
            />
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${isActive ? "text-white" : "text-gray-200 hover:text-white"
                    }`}
                >
                  {link.name}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#8A5218] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Booking Button */}
          <Link href="/booking" className="hidden md:block">
            <button className="bg-[#8A5218] hover:bg-[#a8621e] text-white text-sm font-semibold px-6 py-2.5 rounded transition-all duration-300 tracking-wide shadow-lg hover:shadow-[#8A5218]/40 hover:scale-105">
              Booking Now
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-[#1a1a1a]/98 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-1 border-t border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 text-sm font-medium border-b border-white/5 transition-colors duration-200 ${isActive
                  ? "text-[#8A5218]"
                  : "text-gray-200 hover:text-[#8A5218]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/booking" onClick={() => setIsOpen(false)}>
            <button className="mt-4 w-full bg-[#8A5218] hover:bg-[#a8621e] text-white text-sm font-semibold py-3 rounded transition-all duration-300">
              Booking Now
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
