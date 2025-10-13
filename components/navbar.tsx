"use client";
import React, { useState } from "react";

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState("Home");

	const menus = ["Home", "About", "Service", "Event"];
	return (
		<nav className="absolute top-0 left-0 z-50 w-full h-30 bg-transparent  flex items-center justify-between px-20">
			{/* Kiri - Logo */}
			<div className="flex items-center gap-3">
				<h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">
					CryptoSphere
				</h2>
			</div>

			{/* Kanan - Menu */}
			<ul className="flex items-center gap-20 text-sm capitalize tracking-wider">
				{menus.map((menu) => (
					<li
						key={menu}
						onClick={() => setActiveMenu(menu)}
						className={`cursor-pointer relative pb-1 transition-all duration-300
              ${
					activeMenu === menu
						? "text-white after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0"
						: "text-gray-400 hover:text-white"
				}`}
					>
						{menu}
					</li>
				))}

				<li>
					<button className="ml-6 px-10 py-3 border border-white text-white hover:bg-blue-500 hover:text-white transition-all duration-300">
						Sign In
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
