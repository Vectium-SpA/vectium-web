import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider-dark-to-light" />
      <AboutSection />
      <div className="section-divider-light-to-white" />
      <SolutionsSection />
      <div className="section-divider-white-to-dark" />
      <TechStackSection />
      <div className="section-divider-light-to-dark" />
      <ContactSection />
    </>
  );
}
