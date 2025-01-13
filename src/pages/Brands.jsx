import BrandCategories from "../components/Brands/BrandCategories";
import BrandsHero from "../components/Brands/BrandsHero";
import QueryForm from "../utils/QueryForm";

function Brands() {
  return (
    <>
      <BrandsHero />
      <BrandCategories />
      <QueryForm />
    </>
  );
}

export default Brands;
