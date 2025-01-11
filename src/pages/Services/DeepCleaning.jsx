import ServicesCovered from "../../components/Services/DeepCleaning/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function DeepCleaning() {
  const content = {
    title:
      "Deep Cleaning Service: Transform Your Space with Professional Excellence",
    description:
      "Experience the difference of professional deep cleaning with Cleanex - your trusted partner for comprehensive cleaning solutions. Our skilled cleaning specialists use advanced techniques and premium products to restore and refresh your space, ensuring a healthier and more pleasant environment.",
    bulletPoints: [
      "Thorough deep cleaning of all surfaces, corners, and hard-to-reach areas",
      "Professional-grade equipment and eco-friendly cleaning solutions",
      "Specialized treatments for different surfaces and materials",
      "Detailed attention to high-touch areas and sanitization",
      "Flexible scheduling with regular and one-time service options",
    ],
  };

  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro3.png"
        caption="Deep Cleaning Services"
      />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default DeepCleaning;
