import BestInRepairs from "../components/Home/BestInRepairs";
import FAQ from "../components/Home/FAQ";
import GetToKnow from "../components/Home/GetToKnow";
import SearchServices from "../components/Home/SearchServices";
import ServicesSection from "../components/Home/ServicesSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import WhyRepaireze from "../components/Home/WhyRepaireze";

function Home() {
  return (
    <>
      <GetToKnow />
      <ServicesSection />
      <SearchServices />
      <WhyRepaireze />
      <BestInRepairs />
      <FAQ />
      <TestimonialsSection />
    </>
  );
}

export default Home;
