import Image from "next/image";
import React from "react";

const Testimonials = () => {
	const testimonials = [
		{
			name: "Albert Flores",
			position: "CEO of Tokopedia",
			image: "/img/testimonials/one.png",
		},
		{
			name: "Courtney Henry",
			position: "Head of Product at Gojek",
			image: "/img/testimonials/two.png",
		},
		{
			name: "Dianne Russell",
			position: "Marketing Director at Traveloka",
			image: "/img/testimonials/2.png",
		},
	];
	return (
		<div className="min-h-screen bg-[#12132a] text-white px-6 sm:px-12 md:px-20 py-16 sm:py-24">
			{/* Heading */}
			<div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-16">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
					Testimonials
				</h1>
				<p className="max-w-xl sm:max-w-2xl text-gray-300 leading-relaxed text-sm sm:text-base">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Soluta doloremque dolor cum cumque quisquam officiis earum!
					Ratione, error minus. Aut ipsam necessitatibus laborum
					obcaecati! Vitae magnam quas iusto aliquid mollitia!
				</p>
			</div>

			{/* Testimonials Grid */}
			<div className="flex justify-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
					{testimonials.map((person, index) => (
						<div
							key={index}
							className="relative w-full max-w-[380px] mx-auto rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
						>
							<Image
								src={person.image}
								alt={person.name}
								width={400}
								height={400}
								className="object-cover rounded-lg"
							/>
							<div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm text-white p-4">
								<span className="block font-semibold text-lg">
									{person.name}
								</span>
								<span className="block text-sm text-gray-300">
									{person.position}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
