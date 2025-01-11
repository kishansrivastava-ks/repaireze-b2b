import ServicesCovered from "../../components/Services/PestControl/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function PestControl() {
  const content = {
    title:
      "Pest Control Service: Professional Solutions for a Pest-Free Environment",
    description:
      "Trust SecurePest for comprehensive pest management solutions that protect your space. Our certified pest control specialists employ targeted treatments and preventive measures to effectively eliminate pest problems while ensuring the safety of your family and pets.",
    bulletPoints: [
      "Professional inspection and customized treatment plans for all types of pests",
      "Safe, EPA-approved products and child/pet-friendly solutions",
      "Advanced pest detection and prevention techniques",
      "Regular monitoring and follow-up treatments to prevent re-infestation",
      "24/7 emergency response for urgent pest situations",
    ],
  };

  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro3.png"
        caption="Pest control services"
      />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default PestControl;
