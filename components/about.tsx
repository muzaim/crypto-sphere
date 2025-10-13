import Image from "next/image";
import React from "react";

const About = () => {
	return (
		<div className="h-full bg-[#12132a] text-white px-6 sm:px-12 md:px-20 py-24 sm:py-32 md:py-40">
			{/* Heading Section */}
			<div className="flex flex-col items-center justify-center text-center px-2">
				<h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#962f79]">
					About Us
				</h3>
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
					We’re a distributed team
				</h1>
				<p className="max-w-xl sm:max-w-2xl text-gray-400 leading-relaxed text-sm sm:text-base">
					We have offices and teams all around the world.
				</p>
			</div>

			{/* Image Section */}
			<div className="w-full flex justify-center pt-12 sm:pt-16 md:pt-20">
				<div className="w-full sm:w-3/4 md:w-2/3 flex justify-center">
					<Image
						src="/img/Contents.png"
						alt="team"
						width={1200}
						height={1200}
						className="object-contain w-full h-auto"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
