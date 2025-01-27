import AboutHero from "../components/AboutUs/AboutHero";
import AboutIntro from "../components/AboutUs/AboutIntro";
import WorkProcess from "../components/AboutUs/WorkProcess";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import WhyRepaireze from "../ui/WhyRepaireze";
import PageTransition from "../utils/PageTransition";

function AboutUs() {
  return (
    <PageTransition>
      <AboutHero />
      <AboutIntro />
      <WorkProcess />
      <WhyRepaireze />
      <TestimonialsSection />
    </PageTransition>
  );
}

export default AboutUs;
