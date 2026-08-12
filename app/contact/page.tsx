"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, Twitter, Github, CheckCircle2, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      
      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };

  const generalFaqs = [
    {
      question: "Does this platform collect transaction data?",
      answer: "No. CryptoSphere is purely a Crypto Information Platform for educational and market data research. We do not provide trading terminals, broker services, financial exchange integrations, or real crypto wallet deposit options."
    },
    {
      question: "Where is the coin price data obtained from?",
      answer: "All listed coin data (100 assets) are simulated using realistically calibrated mock datasets modeled after actual global cryptocurrency market movements to maintain layout authenticity."
    },
    {
      question: "How does the Watchlist feature work?",
      answer: "The Watchlist feature saves your selected coin identifiers locally within your browser using localStorage. This data persists unless you clear your browser cookies, site data, or cache."
    },
    {
      question: "Are the educational guides on the Learn page free to access?",
      answer: "Yes. All learning modules from Beginner to Advanced difficulties are provided free of charge to promote digital asset and financial literacy."
    }
  ];

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in relative">
      
      {/* Vercel-style Toast Alert */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1a1b3a] border border-[#00ffd5]/40 px-5 py-3.5 rounded-2xl shadow-2xl animate-fade-in">
          <CheckCircle2 className="text-[#00ffd5] flex-shrink-0" size={18} />
          <div>
            <p className="font-bold text-xs text-white">Message Sent</p>
            <p className="text-[10px] text-gray-500 mt-0.5">We will respond to your feedback shortly.</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Contact Support</span>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Get in Touch</h1>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Have feedback about the platform or want to ask a question? Contact our support team today.
          </p>
        </div>

        {/* Form & Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact details sidebar (1/3 width) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#962f79]/3 rounded-full blur-xl pointer-events-none"></div>
              <h3 className="text-sm font-bold border-b border-white/[0.04] pb-2 uppercase tracking-wider text-gray-400">Contact Information</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex gap-3.5 items-start">
                  <div className="bg-[#12132a] p-2 rounded-xl border border-white/5 flex-shrink-0">
                    <MapPin className="text-[#00ffd5]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Headquarters</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Sudirman Central Business District, 42nd Floor, Jakarta, Indonesia</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="bg-[#12132a] p-2 rounded-xl border border-white/5 flex-shrink-0">
                    <Mail className="text-blue-400" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Support Email</p>
                    <p className="text-[10px] text-gray-500 mt-1">support@cryptosphere.io</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="bg-[#12132a] p-2 rounded-xl border border-white/5 flex-shrink-0">
                    <Phone className="text-[#962f79]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Phone Line</p>
                    <p className="text-[10px] text-gray-500 mt-1">+62 (21) 5082-8400</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-white/[0.04]">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-3">Community Channels</span>
                <div className="flex gap-2">
                  <a
                    href="https://twitter.com/cryptosphere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center py-2 bg-[#12132a] border border-white/10 hover:border-white rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Twitter size={14} />
                  </a>
                  <a
                    href="https://github.com/cryptosphere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center py-2 bg-[#12132a] border border-white/10 hover:border-white rounded-xl text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form container (2/3 width) */}
          <div className="lg:col-span-8 border border-white/[0.04] bg-[#1a1b3a]/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl relative">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-[#00ffd5]" size={18} /> Send Feedback
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name..."
                  className="w-full bg-[#12132a]/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#962f79] focus:ring-1 focus:ring-[#962f79]/20 transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com..."
                  className="w-full bg-[#12132a]/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#962f79] focus:ring-1 focus:ring-[#962f79]/20 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Your Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-[#12132a]/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#962f79] focus:ring-1 focus:ring-[#962f79]/20 transition resize-none"
              />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#12132a] disabled:bg-[#1a1b3a] disabled:text-gray-500 disabled:border-white/10 border border-transparent disabled:cursor-not-allowed font-bold px-6 py-3 rounded-xl cursor-pointer text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Feedback <Send size={12} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Platforms FAQ Accordion */}
        <div className="border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-light mb-6 flex items-center gap-2">
            <HelpCircle className="text-[#00ffd5]" size={20} /> General Platform FAQ
          </h2>
          
          <div className="space-y-4">
            {generalFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-white/[0.04] pb-4 last:border-b-0 last:pb-0">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2.5 cursor-pointer group"
                  >
                    <span className="font-semibold text-white group-hover:text-[#00ffd5] transition text-sm">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-500 transition-all duration-300 ${isOpen ? "rotate-180 text-[#00ffd5]" : ""}`} 
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden text-gray-400 text-xs sm:text-sm leading-relaxed ${
                      isOpen ? "max-h-[300px] mt-2 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="bg-[#12132a]/60 p-4 rounded-2xl border border-white/[0.04]">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
