"use client";

import Image from 'next/image'
import React from 'react'
import { Shield, Wallet, TrendingUp } from "lucide-react";



const Features = () => {
    const features = [
        {
            id: 1,
            title: "Secure Wallet Integration",
            desc: "Connect your crypto wallet with top-notch encryption and seamless access to manage your digital assets safely.",
            icon: <Wallet size={40} className="text-blue-400" />,
        },
        {
            id: 2,
            title: "Real-Time Analytics",
            desc: "Track your portfolio performance with live market data, advanced charts, and AI-powered insights.",
            icon: <TrendingUp size={40} className="text-green-400" />,
        },
        {
            id: 3,
            title: "Advanced Protection",
            desc: "Enjoy peace of mind with multi-layer security protocols ensuring your funds and transactions stay protected.",
            icon: <Shield size={40} className="text-purple-400" />,
        },
    ];

    return (
        <div className="h-full bg-[#12132a] flex items-center justify-center px-20 py-[8rem] text-white">
            <div className="flex-1 relative flex justify-center items-center">
                {/* 🔵 Glow / Bayangan biru */}
                <div
                    className="absolute w-[35rem] h-[35rem] blur-[120px] opacity-50"
                    style={{
                        background: "linear-gradient(135deg, #2563eb, #60a5fa, #1e3a8a)",
                        borderRadius: "45% 55% 60% 40% / 40% 60% 55% 45%",
                    }}
                ></div>


                {/* 🖼️ Gambar utama di atas glow */}
                <Image
                    src="/img/features.png"
                    alt="features"
                    width={300}
                    height={300}
                    className="relative z-10"
                />
            </div>

            <div className="flex-1 text-white px-10">
                <h3 className="uppercase text-blue-400 tracking-widest mb-3 text-xl">Features</h3>
                <h1 className="text-5xl font-semibold mb-10">Crypto Premium</h1>

                <ul className="space-y-8">
                    {features.map((feature) => (
                        <li
                            key={feature.id}
                            className="flex gap-6 items-start   rounded-2xl p-6  transition-all duration-300"
                        >
                            <div className="flex-shrink-0 bg-white/10 p-4 rounded-xl">{feature.icon}</div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Features
