import React from "react";

const Footer = () => {
	const footerData = [
		{
			title: "Product",
			links: [
				"Overview",
				"Pricing",
				"Features",
				"Releases",
				"Integrations",
				"API Docs",
			],
		},
		{
			title: "Company",
			links: [
				"About Us",
				"Careers",
				"Press",
				"Blog",
				"Contact",
				"Partners",
			],
		},
		{
			title: "Resource",
			links: [
				"Help Center",
				"Guides",
				"Community",
				"Tutorials",
				"Webinars",
				"Status",
			],
		},
		{
			title: "Social",
			links: [
				"LinkedIn",
				"Twitter",
				"Instagram",
				"Facebook",
				"YouTube",
				"Dribbble",
			],
		},
	];
	return (
		<footer className="relative overflow-hidden bg-gradient-to-b from-[#12132a] to-[#0f1025] text-white px-6 sm:px-10 md:px-20 py-16 border-t border-white/10">
			{/* glowing background elements */}
			<div className="absolute -top-32 -right-10 w-60 h-60 md:w-72 md:h-72 bg-[#00ffd5]/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-[#962f79]/20 rounded-full blur-3xl"></div>

			{/* Logo + Intro */}
			<div className="relative z-10 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-center md:text-left">
				<div className="flex flex-col items-center md:items-start">
					<h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">
						CryptoSphere
					</h2>
					<p className="text-gray-400 mt-2 max-w-md text-sm sm:text-base">
						Secure. Decentralized. Limitless. Empowering users
						through blockchain innovation and transparent finance.
					</p>
				</div>

				<div className="flex justify-center md:justify-end">
					<button className="bg-gradient-to-r from-[#962f79] to-[#00ffd5] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto">
						Join the Revolution
					</button>
				</div>
			</div>

			{/* footer links */}
			<div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left justify-items-center sm:justify-items-start items-center">
				{footerData.map((section, index) => (
					<div key={index}>
						<h3 className="text-[#00ffd5] font-semibold text-lg mb-4">
							{section.title}
						</h3>
						<ul className="space-y-2">
							{section.links.map((link, i) => (
								<li
									key={i}
									className="text-gray-400 hover:text-[#962f79] transition-all duration-300 cursor-pointer hover:translate-x-1"
								>
									{link}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* bottom line */}
			<div className="relative z-10 mt-14 border-t border-white/10 pt-6 text-center text-gray-500 text-xs sm:text-sm">
				© {new Date().getFullYear()}{" "}
				<span className="font-semibold text-[#00ffd5]">
					CryptoSphere Labs
				</span>
				. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
