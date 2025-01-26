import Intro from "../../components/Services/ElectricalAppliances/Intro";
import ServicesCovered from "../../components/Services/ElectricalAppliances/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function ElectricalAppliances() {
  const content = {
    title: "Professional Care of Your Business Premise",
    description:
      "Experience top-tier electrical appliance service with Repaireze your trusted expert for all your home appliance needs. Our team of experienced professionals is committed to providing exceptional service and support for all your electrical appliances.",
    bulletPoints: [
      "Expert repairs and maintenance for all major appliances",
      "Fast response time with “Get Quotation within 2 hours” after site investigation",
      "Certified technicians with years of specialized experience",
      "Comprehensive service warranty on all repairs",
    ],
  };
  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/elec-app.png"
        caption="Buy the love your electrical appliances need, in the form of AMC+"
      />
      <Intro />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default ElectricalAppliances;
