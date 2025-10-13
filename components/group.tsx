"use client";

import Image from "next/image";
import React from "react";
import { Shield, Wallet, TrendingUp } from "lucide-react";

const Group = () => {
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
		<div className="min-h-screen bg-[#12132a] flex flex-col md:flex-row items-center justify-center px-6 sm:px-10 md:px-20 py-20 text-white overflow-hidden">
			{/* 🔵 Gambar + Glow */}
			<div className="flex-1 relative flex justify-center items-center order-2 md:order-1">
				{/* Glow biru di belakang */}
				<div
					className="absolute w-[20rem] sm:w-[25rem] md:w-[35rem] h-[20rem] sm:h-[25rem] md:h-[35rem] blur-[100px] opacity-50"
					style={{
						background:
							"linear-gradient(135deg, #2563eb, #60a5fa, #1e3a8a)",
						borderRadius: "45% 55% 60% 40% / 40% 60% 55% 45%",
					}}
				></div>

				{/* Gambar utama */}
				<Image
					src="/img/group.png"
					alt="features"
					width={450}
					height={450}
					className="relative z-10 w-[280px] sm:w-[380px] md:w-[500px] lg:w-[550px] h-auto"
				/>
			</div>

			{/* 🟣 Bagian Teks */}
			<div className="flex-1 text-center md:text-left px-4 sm:px-8 md:px-10 mt-10 md:mt-0 relative z-10 order-1 md:order-2">
				<h3 className="uppercase text-[#962f79] tracking-widest mb-3 text-lg sm:text-xl">
					How it works
				</h3>
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-snug">
					Viewing long-term and short-term forecast
				</h1>

				<p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Fugit, molestias commodi sunt aut odit maxime voluptatibus
					necessitatibus rerum pariatur veritatis magnam obcaecati
					officiis quia. Reprehenderit sed labore at dignissimos
					sequi. Vitae nobis provident animi voluptas repudiandae ea
					reiciendis labore perspiciatis!
				</p>

				<button className="bg-transparent border-2 border-white px-8 sm:px-10 py-3 sm:py-4 font-semibold rounded-lg hover:bg-white hover:text-[#12132a] transition-all duration-300">
					Explore Now
				</button>
			</div>
		</div>
	);
};

export default Group;
