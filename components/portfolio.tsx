"use client";

import React from "react";
import { Banknote, Wallet, TrendingUp } from "lucide-react";

const Portfolio = () => {
	const steps = [
		{
			id: "01",
			icon: <Wallet size={64} className="text-blue-400" />,
			title: "Connect Your Wallet",
			desc: "Securely connect your crypto wallet to start managing and tracking your digital assets in real time.",
		},
		{
			id: "02",
			icon: <Banknote size={64} className="text-green-400" />,
			title: "Choose Your Assets",
			desc: "Select your favorite cryptocurrencies and build your portfolio with advanced analytics and insights.",
		},
		{
			id: "03",
			icon: <TrendingUp size={64} className="text-purple-400" />,
			title: "Start Trading Instantly",
			desc: "Buy, sell, and trade crypto effortlessly with fast execution, transparent fees, and smart portfolio tracking.",
		},
	];

	return (
		<div className="min-h-screen bg-[#12132a] flex items-center justify-center px-6 sm:px-10 md:px-20 py-16 md:py-[8rem] text-white">
			<div className="max-w-4xl text-center">
				{/* TITLE + DESCRIPTION */}
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
					Automated Portfolio Tracking
				</h1>
				<p className="text-gray-400 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
					consequuntur doloremque aperiam sapiente velit fuga aut eius
					non, autem perferendis, magnam explicabo.
				</p>

				{/* STEPS GRID */}
				<div className="w-full flex justify-center items-center mt-16 md:mt-20">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
						{steps.map((step) => (
							<div
								key={step.id}
								className="border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl p-8 text-white flex flex-col items-center justify-start text-center hover:border-[#962f79] transition-all duration-300"
							>
								<div className="mb-6 mt-4 text-4xl">
									{step.icon}
								</div>
								<h1 className="text-xl sm:text-2xl font-semibold mb-3">
									{step.title}
								</h1>
								<p className="text-gray-400 text-sm sm:text-base leading-relaxed">
									{step.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
