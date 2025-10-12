import Features from "@/components/features";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Partner from "@/components/partner";
import Portfolio from "@/components/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partner />
      <Portfolio />
      <Features />
    </>
  );
}
