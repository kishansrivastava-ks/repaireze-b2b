import ContactCategories from "../components/ContactUs/ContactCategories";
import ContactHero from "../components/ContactUs/ContactHero";
import ContactMethods from "../components/ContactUs/ContactMethods";
import PageTransition from "../utils/PageTransition";
import QueryForm from "../utils/QueryForm";

function ContactUs() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactMethods />
      <ContactCategories />
      <QueryForm />
    </PageTransition>
  );
}

export default ContactUs;
