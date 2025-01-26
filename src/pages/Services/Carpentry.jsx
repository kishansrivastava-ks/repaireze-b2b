import ServicesCovered from "../../components/Services/Carpentry/ServicesCovered";
import AboutService from "../../ui/AboutService";
import InfoImageContainer from "../../ui/InfoImageContainer";
import WhyRepaireze from "../../ui/WhyRepaireze";
import QueryForm from "../../utils/QueryForm";

function Carpentry() {
  const content = {
    title: "Crafting Excellence in Wood and Design",
    description:
      "Choose WoodMasters for exceptional carpentry that combines traditional craftsmanship with modern techniques. Our skilled carpenters specialize in both aesthetic and structural woodwork, delivering custom solutions that enhance the beauty and functionality of your space.",
    bulletPoints: [
      "Custom furniture design and creation to match your unique style",
      "Professional cabinetry installation and kitchen woodwork",
      "Structural repairs and renovations with premium materials",
      "Trim work, crown molding, and architectural woodwork",
      "Deck construction and outdoor wooden structure installation",
    ],
  };

  return (
    <>
      <InfoImageContainer
        imageSrc="/api/placeholder/intro3.png"
        caption="Carpentry services"
      />
      <ServicesCovered />
      <WhyRepaireze />
      <QueryForm />
      <AboutService {...content} />
    </>
  );
}

export default Carpentry;
