import ServicesCovered from "../../components/Services/Plumbing/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function Plumbing() {
  const content = {
    title: "Plumbing Services: Expert Solutions for All Your Plumbing Needs",
    description:
      "Count on FlowFix for reliable and efficient plumbing solutions. Our licensed plumbers deliver professional service for both emergency repairs and routine maintenance, using the latest tools and techniques to ensure your plumbing system runs smoothly and efficiently.",
    bulletPoints: [
      "24/7 emergency response for urgent plumbing issues and repairs",
      "Comprehensive diagnostics and leak detection with advanced equipment",
      "Installation and repair of all plumbing fixtures and systems",
      "Drain cleaning and preventive maintenance services",
      "Licensed, insured, and experienced plumbing professionals",
    ],
  };
  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro4.png"
        caption="Plumbing services"
      />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default Plumbing;
