import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Smartphone, Laptop, Gamepad, Tablet } from "lucide-react";

const Section = styled.section`
  padding: 4rem 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;

  h2 {
    font-size: 2.5rem;
    color: var(--color-primary);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: var(--color-secondary-dark);
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: linear-gradient(135deg, #f0f4ff 0%, #e6e9f5 100%);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => props.delay}ms;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const BrandList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BrandTag = styled.span`
  background: rgba(61, 82, 160, 0.1);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
`;

const BrandCategories = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRefs = useRef([]);

  const categories = [
    {
      icon: <Smartphone size={28} />,
      title: "Smartphones",
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    },
    {
      icon: <Laptop size={28} />,
      title: "Laptops",
      brands: ["Dell", "HP", "Lenovo", "ASUS", "MacBook"],
    },
    {
      icon: <Gamepad size={28} />,
      title: "Gaming Consoles",
      brands: ["PS4", "PS5", "Xbox", "Nintendo"],
    },
    {
      icon: <Tablet size={28} />,
      title: "Tablets",
      brands: ["iPad", "Samsung Tab", "Surface", "Lenovo Tab"],
    },
  ];

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <Section>
      <Container>
        <SectionHeader
          isVisible={visibleItems.has(0)}
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <h2>Choose your Brand for Repair At TechCity</h2>
          <p>
            We provide expert repair services for a wide range of brands across
            different device categories. Our certified technicians are trained
            to handle repairs for all major brands, ensuring your devices get
            the care they deserve.
          </p>
        </SectionHeader>

        <BrandGrid>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              ref={(el) => (sectionRefs.current[index + 1] = el)}
              isVisible={visibleItems.has(index + 1)}
              delay={index * 100}
            >
              <IconWrapper>{category.icon}</IconWrapper>
              <CategoryTitle>{category.title}</CategoryTitle>
              <BrandList>
                {category.brands.map((brand, i) => (
                  <BrandTag key={i}>{brand}</BrandTag>
                ))}
              </BrandList>
            </CategoryCard>
          ))}
        </BrandGrid>
      </Container>
    </Section>
  );
};

export default BrandCategories;
