import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import ContactSection from "@/components/ContactSection";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <ScrollDepthTracker />
      <Hero />
      <ExperienceSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}
