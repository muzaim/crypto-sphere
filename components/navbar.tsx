"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState("Home");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const menus = ["Home", "About", "Service", "Event"];

	const handleMenuClick = (menu: string) => {
		setActiveMenu(menu);
		setIsMobileMenuOpen(false);
	};

	return (
		<nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
			<div className="flex items-center justify-between px-5 py-6 sm:px-8 md:px-20 md:py-8">
				<div className="flex items-center gap-3">
					<h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">
						CryptoSphere
					</h2>
				</div>

				<ul className="hidden md:flex items-center gap-10 lg:gap-16 text-sm capitalize tracking-wider">
					{menus.map((menu) => (
						<li
							key={menu}
							onClick={() => handleMenuClick(menu)}
							className={`cursor-pointer relative pb-1 transition-all duration-300 ${
								activeMenu === menu
									? "text-white after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0"
									: "text-gray-400 hover:text-white"
							}`}
						>
							{menu}
						</li>
					))}

					<li>
						<button className="ml-2 border border-white px-6 py-3 text-white transition-all duration-300 hover:bg-blue-500 hover:text-white lg:px-10">
							Sign In
						</button>
					</li>
				</ul>

				<button
					type="button"
					aria-label={
						isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
					}
					aria-expanded={isMobileMenuOpen}
					onClick={() => setIsMobileMenuOpen((prev) => !prev)}
					className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:hidden"
				>
					{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			<div
				className={`px-5 sm:px-8 md:hidden transition-all duration-300 ${
					isMobileMenuOpen
						? "pointer-events-auto translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-2 opacity-0"
				}`}
			>
				<div className="rounded-3xl border border-white/10 bg-[#12132a]/95 p-5 shadow-2xl backdrop-blur-md">
					<ul className="flex flex-col gap-5 text-sm capitalize tracking-wider">
						{menus.map((menu) => (
							<li
								key={menu}
								onClick={() => handleMenuClick(menu)}
								className={`cursor-pointer border-b border-white/10 pb-3 transition-all duration-300 last:border-b-0 last:pb-0 ${
									activeMenu === menu
										? "text-white"
										: "text-gray-400 hover:text-white"
								}`}
							>
								{menu}
							</li>
						))}
					</ul>

					<button className="mt-6 w-full border border-white px-6 py-3 text-white transition-all duration-300 hover:bg-blue-500 hover:text-white">
						Sign In
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
