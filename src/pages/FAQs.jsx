import FaqAbout from "../components/FAQs/FaqAbout";
import FaqHero from "../components/FAQs/FaqHero";
import FaqSection from "../components/FAQs/FaqSection";
import PageTransition from "../utils/PageTransition";
import QueryForm from "../utils/QueryForm";

function FAQs() {
  return (
    <PageTransition>
      <FaqHero />
      <FaqAbout />
      <FaqSection />
      <QueryForm />
    </PageTransition>
  );
}

export default FAQs;
