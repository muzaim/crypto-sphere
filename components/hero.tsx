import Image from "next/image";
import React from "react";

const Hero = () => {
	return (
		<div className="min-h-screen bg-[#12132a] flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-20 py-16 text-white relative overflow-hidden">
			{/* LEFT */}
			<div className="flex-1 relative text-center md:text-left">
				{/* 🔵 Glow biru */}
				<div className="absolute top-0 left-10 md:left-20 w-[15rem] md:w-[20rem] h-[15rem] md:h-[20rem] bg-blue-600 rounded-full blur-3xl opacity-40"></div>

				{/* 🩵 Arrow di kanan teks “Live and” */}
				<Image
					src="/img/acc/Arrow_03.png"
					alt="arrow"
					width={160}
					height={160}
					className="absolute hidden md:block top-[-6rem] right-[6rem] md:right-[10rem]"
				/>

				{/* 🧩 Konten teks */}
				<h1 className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-thin mb-6 leading-tight tracking-wider relative z-10">
					<span className="block">Live and</span>
					<span className="block">on-demand</span>
					<span className="block">trading</span>
				</h1>

				<p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0 relative z-10">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Iure debitis tenetur ipsam saepe illo laborum soluta, sed
					nostrum optio ipsum? Dolorum perferendis ex quidem repellat
					perspiciatis?
				</p>

				<button className="bg-transparent border-2 border-white px-8 sm:px-10 py-4 sm:py-5 font-semibold transition ease-in-out duration-300 relative z-10 hover:bg-white hover:text-[#12132a]">
					Explore Now
				</button>
			</div>

			{/* RIGHT */}
			<div className="flex-1 relative flex justify-center items-end h-[400px] sm:h-[500px] md:h-full mt-10 md:mt-0">
				{/* 🖐 Gambar utama */}
				<Image
					src="/img/Wood-Hand.png"
					width={480}
					height={480}
					alt="Hero image"
					className="object-contain relative z-10 w-[300px] sm:w-[400px] md:w-[640px]"
				/>

				{/* ✨ Bintang-bintang mengelilingi */}
				<Image
					src="/img/acc/Star_4.png"
					alt="star"
					width={60}
					height={60}
					className="absolute z-20 bottom-[25%] right-[8%] animate-twinkle hidden sm:block"
				/>
				<Image
					src="/img/acc/Star_5.png"
					alt="star"
					width={50}
					height={50}
					className="absolute top-[20%] right-[35%] animate-twinkle delay-1000 hidden sm:block"
				/>
				<Image
					src="/img/acc/Star_6.png"
					alt="star"
					width={40}
					height={40}
					className="absolute bottom-[30%] left-[10%] animate-twinkle delay-700 hidden sm:block"
				/>
			</div>
		</div>
	);
};

export default Hero;
