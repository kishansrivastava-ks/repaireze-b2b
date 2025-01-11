import Intro from "../../components/Services/ElectricalAppliances/Intro";
import ServicesCovered from "../../components/Services/ElectricalAppliances/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function ElectricalAppliances() {
  const content = {
    title:
      "Electrical Appliance Service: Professional Care for Your Home Essentials",
    description:
      `Experience top-tier electrical appliance service with Repaireze{" "}
            {` -
      `}
            your trusted expert for all your home appliance needs. Our team of
            experienced professionals is committed to providing exceptional
            service and support for all your electrical appliances.`,
    bulletPoints: [
      "Expert repairs and maintenance for all major household appliances",
      "Fast response time with same-day service availability",
      "Certified technicians with years of specialized experience",
      "Comprehensive service warranty on all repairs",
    ],
  };
  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro2.jpg"
        caption="Delivering expert appliance repair solutions, one home at a time."
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
