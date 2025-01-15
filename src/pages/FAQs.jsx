import FaqAbout from "../components/FAQs/FaqAbout";
import FaqHero from "../components/FAQs/FaqHero";
import FaqSection from "../components/FAQs/FaqSection";
import QueryForm from "../utils/QueryForm";

function FAQs() {
  return (
    <>
      <FaqHero />
      <FaqAbout />
      <FaqSection />
      <QueryForm />
    </>
  );
}

export default FAQs;
