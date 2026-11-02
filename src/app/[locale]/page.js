import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import ContactSection from "@/components/ContactSection";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

export default function HomePage() {
  const now = new Date();
  const experienceYears =
    now.getUTCFullYear() -
    2020 -
    (now.getUTCMonth() < 2 ? 1 : 0);

  return (
    <div className="space-y-8 md:space-y-12">
      <ScrollDepthTracker />
      <Hero years={experienceYears} />
      <ExperienceSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}
