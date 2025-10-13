import React from "react";
import {
	Shield,
	Headphones,
	ShoppingCart,
	UserPlus,
	Package,
	CheckCircle,
} from "lucide-react";

const Support = () => {
	const features = [
		{
			icon: Headphones,
			title: "Support",
			description:
				"Our dedicated support team is always ready to help you resolve issues quickly, ensuring seamless operations for your business at any time.",
		},
		{
			icon: ShoppingCart,
			title: "Sales",
			description:
				"Boost your performance with tools designed to streamline your sales process, build stronger customer relationships, and close deals faster.",
		},
		{
			icon: UserPlus,
			title: "Onboarding",
			description:
				"Simplify the onboarding experience with step-by-step guidance that helps new users or team members adapt quickly and confidently.",
		},
		{
			icon: Package,
			title: "Product",
			description:
				"Deliver innovative products crafted with precision, designed to meet user needs while maintaining top-tier performance and usability.",
		},
		{
			icon: Shield,
			title: "Quality",
			description:
				"We prioritize quality at every stage — from design to delivery — ensuring that every solution exceeds expectations and builds trust.",
		},
		{
			icon: CheckCircle,
			title: "Result",
			description:
				"Our approach focuses on delivering tangible, measurable results that drive growth, improve efficiency, and sustain long-term success.",
		},
	];
	return (
		<div className="min-h-screen bg-[#12132a] text-white px-6 sm:px-10 md:px-20 py-20">
			{/* 🟣 Heading Section */}
			<div className="flex flex-col items-center justify-center text-center mb-16">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 leading-snug">
					Make every step user-centric
				</h1>
				<p className="max-w-2xl text-gray-300 leading-relaxed text-sm sm:text-base px-2 sm:px-0">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Soluta doloremque dolor cum cumque quisquam officiis earum!
					Ratione, error minus. Aut ipsam necessitatibus laborum
					obcaecati! Vitae magnam quas iusto aliquid mollitia!
				</p>
			</div>

			{/* 🔵 Features Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
				{features.map((feature, index) => {
					const Icon = feature.icon;
					return (
						<div
							key={index}
							className="p-6 rounded-2xl bg-[#1a1b3a] hover:bg-[#1f2148] transition-all duration-300 shadow-lg"
						>
							<Icon
								size={48}
								className="text-purple-400 mx-auto mb-4"
							/>
							<h2 className="font-semibold text-xl sm:text-2xl mb-2">
								{feature.title}
							</h2>
							<p className="text-gray-400 text-sm sm:text-base leading-relaxed">
								{feature.description}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Support;
