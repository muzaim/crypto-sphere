"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menus = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Categories", path: "/categories" },
    { name: "News", path: "/news" },
    { name: "Learn", path: "/learn" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#12132a]/80 backdrop-blur-lg border-b border-white/[0.04] py-4"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent cursor-pointer hover:opacity-95 transition-all duration-300">
              CryptoSphere
            </h2>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden xl:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link
                href={menu.path}
                className={`px-4 py-2 rounded-xl transition-all duration-300 block ${
                  isActive(menu.path)
                    ? "text-[#00ffd5] bg-white/[0.03] border border-white/[0.06] shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                {menu.name}
              </Link>
            </li>
          ))}

          <li className="ml-4">
            <Link href="/contact">
              <button className="border border-white/10 bg-white/[0.02] hover:bg-white hover:text-[#12132a] hover:border-white px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Contact Us
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation Trigger */}
        <button
          type="button"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/10 xl:hidden cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-[72px] left-0 w-full px-5 sm:px-8 xl:hidden transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-[#12132ab3] backdrop-blur-xl p-5 shadow-2xl">
          <ul className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  href={menu.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(menu.path)
                      ? "text-[#00ffd5] bg-white/[0.04] border border-white/[0.06]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="mt-4 w-full border border-white/10 bg-white/[0.02] hover:bg-white hover:text-[#12132a] py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
