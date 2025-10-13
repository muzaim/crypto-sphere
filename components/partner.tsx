import Image from "next/image";
import React from "react";

const Partner = () => {
	const partners = [
		"/img/partner/1.png",
		"/img/partner/2.png",
		"/img/partner/3.png",
		"/img/partner/4.png",
		"/img/partner/5.png",
	];

	return (
		<div className="w-full bg-[#162446] py-10 flex justify-center items-center">
			<div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-20 px-6 sm:px-10 md:px-20">
				{partners.map((src, index) => (
					<Image
						key={index}
						src={src}
						alt={`partner-${index + 1}`}
						width={140}
						height={140}
						className="opacity-80 hover:opacity-100 transition-all duration-300 object-contain"
					/>
				))}
			</div>
		</div>
	);
};

export default Partner;
