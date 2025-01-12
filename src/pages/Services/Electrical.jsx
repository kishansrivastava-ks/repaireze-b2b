import ServicesCovered from "../../components/Services/Electrical/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function Carpentry() {
  const content = {
    title: "Electrical Services: Safe and Reliable Power Solutions",
    description:
      "Trust PowerPro for all your electrical needs. Our certified electricians provide comprehensive electrical services with a focus on safety, reliability, and efficiency. From minor repairs to complete electrical system installations, we ensure your property's electrical infrastructure meets the highest standards of performance and safety.",
    bulletPoints: [
      "24/7 emergency electrical repairs and troubleshooting",
      "Complete electrical system installation and upgrades",
      "Smart home wiring and automation solutions",
      "Electrical safety inspections and preventive maintenance",
      "Licensed and insured electricians with extensive experience",
    ],
  };

  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro3.png"
        caption="Electrical services"
      />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default Carpentry;
