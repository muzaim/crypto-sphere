import Image from "next/image";
import React from "react";

const Member = () => {
	return (
		<div className="min-h-screen bg-[#12132a] flex flex-col md:flex-row items-center justify-center px-6 sm:px-10 md:px-20 py-16 md:py-[8rem] text-white">
			{/* LEFT SECTION */}
			<div className="flex-1 text-center md:text-left md:pr-10">
				<h1 className="text-3xl sm:text-4xl md:text-[5rem] font-light mb-6 leading-snug md:leading-tight">
					Invite team members & enlarge your groups
				</h1>
				<p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Dolores tenetur, ipsa exercitationem, labore assumenda
					voluptate tempore, fugiat quaerat expedita aperiam eligendi.
					Unde sapiente repellendus inventore voluptatibus ipsa quis
					doloribus voluptas minima aliquid omnis, aut suscipit
					placeat necessitatibus, dolor expedita laborum rem.
					Voluptatem numquam eaque similique, earum nihil saepe
					necessitatibus tempore.
				</p>
				<button className="bg-transparent border-2 border-white px-8 sm:px-10 py-3 sm:py-5 font-semibold transition ease-in-out duration-300 hover:bg-white hover:text-[#12132a]">
					Explore Now
				</button>
			</div>

			{/* RIGHT SECTION */}
			<div className="flex-1 flex flex-col md:block items-center justify-center mt-10 md:mt-0 relative">
				{/* Wrapper biar gambar tampil baik di semua ukuran */}
				<div className="relative w-full flex flex-col items-center justify-center gap-5 md:block md:h-[500px]">
					{/* Gambar atas */}
					<Image
						src="/img/Member.png"
						alt="member"
						width={400}
						height={400}
						className="object-contain w-[250px] sm:w-[320px] md:w-[400px] 
                   md:absolute md:top-0 md:left-0 md:z-10"
					/>
					{/* Gambar bawah */}
					<Image
						src="/img/Comments.png"
						alt="comments"
						width={400}
						height={400}
						className="object-contain w-[250px] sm:w-[320px] md:w-[400px] 
                   md:absolute md:bottom-0 md:right-0 md:z-20 md:-translate-x-10 md:-translate-y-10"
					/>
				</div>
			</div>
		</div>
	);
};

export default Member;
