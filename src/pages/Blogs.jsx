import BlogSection from "../components/Blogs/BlogSection";
import BlogsHero from "../components/Blogs/BlogsHero";
import PageTransition from "../utils/PageTransition";

function Blogs() {
  return (
    <PageTransition>
      <BlogsHero />
      <BlogSection />
    </PageTransition>
  );
}

export default Blogs;
