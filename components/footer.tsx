import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Slack } from "lucide-react";

const Footer = () => {
  const footerData = [
    {
      title: "Platform",
      links: [
        { label: "Markets", path: "/markets" },
        { label: "Categories", path: "/categories" },
        { label: "News Hub", path: "/news" },
        { label: "Academy", path: "/learn" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Contact Us", path: "/contact" },
        { label: "Watchlist", path: "/watchlist" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "API Docs", path: "#" },
        { label: "Help Center", path: "#" },
        { label: "Status Page", path: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#12132a] border-t border-white/[0.04] pt-20 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Glowing background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ffd5]/3 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#962f79]/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">
              CryptoSphere
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Modern cryptocurrency information platform for decentralized market research. Providing real-time metrics, historical charts, and trusted learning resources.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition"><Github size={18} /></a>
              <a href="#" className="hover:text-white transition"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-white transition"><Slack size={18} /></a>
            </div>
          </div>

          {/* Links Columns */}
          {footerData.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.path}
                      className="text-gray-400 hover:text-white text-sm transition-all duration-300 block hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CryptoSphere Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
