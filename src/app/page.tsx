import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <TechStackSection />
      <ContactSection />
    </>
  );
}
