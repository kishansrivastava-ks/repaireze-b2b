import ContactCategories from "../components/ContactUs/ContactCategories";
import ContactHero from "../components/ContactUs/ContactHero";
import ContactMethods from "../components/ContactUs/ContactMethods";
import QueryForm from "../utils/QueryForm";

function ContactUs() {
  return (
    <>
      <ContactHero />
      <ContactMethods />
      <ContactCategories />
      <QueryForm />
    </>
  );
}

export default ContactUs;
