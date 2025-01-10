import ApplianceServiceSection from "../../components/Services/ElectricalAppliances/ApplianceServiceSection";
import Intro from "../../components/Services/ElectricalAppliances/Intro";
import ServicesCovered from "../../components/Services/ElectricalAppliances/ServicesCovered";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function ElectricalAppliances() {
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
      <ApplianceServiceSection />
    </>
  );
}

export default ElectricalAppliances;
