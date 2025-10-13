import About from "@/components/about";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Group from "@/components/group";
import Hero from "@/components/hero";
import Member from "@/components/member";
import Navbar from "@/components/navbar";
import Partner from "@/components/partner";
import Portfolio from "@/components/portfolio";
import Support from "@/components/support";
import Testimonials from "@/components/testimonials";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Partner />
			<Portfolio />
			<Features />
			<Member />
			<Support />
			<Group />
			<Testimonials />
			<About />
			<Footer />
		</>
	);
}
