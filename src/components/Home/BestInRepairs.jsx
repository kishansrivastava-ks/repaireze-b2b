import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Product data
const products = [
  { name: "Smartphones", image: "/api/placeholder/smartphone.avif" },
  { name: "Tablets", image: "/api/placeholder/tablet.jpg" },
  { name: "Laptops", image: "/api/placeholder/laptop.avif" },
  { name: "Gaming Consoles", image: "/api/placeholder/console.jpg" },
  { name: "Smart Watches", image: "/api/placeholder/smartwatch.avif" },
  { name: "Desktop PCs", image: "/api/placeholder/desktop.jpg" },
  { name: "Audio Devices", image: "/api/placeholder/audio.jpg" },
  { name: "Cameras", image: "/api/placeholder/camera.avif" },
  { name: "Washing Machine", image: "/api/placeholder/wm.jpg" },
];

// Styled Components
const Section = styled.section`
  /* padding: 4rem 0; */
  background: #ffffff;
  /* border: 0.5rem solid red; */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 0 1rem; */
  /* border: 0.2rem solid blue; */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  gap: 1.5rem;
  transform: scale(0.8);
`;

const ProductCardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  /* aspect-ratio: 1; */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateY(${(props) => (props.visible ? "0" : "20px")});
  transition: all 0.5s ease-out ${(props) => props.delay || "0ms"};
  /* border: 2px solid red; */
  height: 90%;
  width: 100%;
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to b, transparent, rgba(0, 0, 0, 0.5));
  opacity: 1;
  transition: opacity 0.5s;
  z-index: 1;

  ${ProductCardContainer}:hover & {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  object-position: center;
  transition: transform 0.7s;
  transform: scale(0.8);

  ${ProductCardContainer}:hover & {
    transform: scale(1);
  }
`;

const CardContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  z-index: 2;
  /* border: 1px solid var(--color-muted); */
  border-radius: 0.75rem;

  & > h3 {
    font-size: 1rem;
    /* font-weight: 600; */
    letter-spacing: 1px;
    color: #ffffff; /* Text color to ensure readability */
    background: rgba(61, 82, 160, 0.8); /* Translucent blue background */
    padding: 0.5rem 2rem;
    border-radius: 50px; /* Capsule shape */
    opacity: 0;
    transform: translateY(2rem);
    transition: all 0.5s;
    white-space: nowrap; /* Prevent wrapping */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for better visibility */

    ${ProductCardContainer}:hover & {
      opacity: 1;
      transform: translateY(1rem);
    }
  }
`;

const HighlightCard = styled.div`
  position: relative;
  border-radius: 0.75rem;
  padding: 2rem;
  /* aspect-ratio: 1; */
  height: 90%;
  width: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 255, 0.1),
    rgba(0, 0, 255, 0.05)
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateX(${(props) => (props.visible ? "0" : "-40px")});
  transition: all 0.5s ease-out ${(props) => props.delay || "0ms"};

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    color: var(--color-primary);
    line-height: 1.75;
  }
`;

// Component
const BestInRepairs = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
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
        <Grid>
          {products.map((product, index) => {
            const isHighlight = index === 3; // Highlight card in the second row, center column
            return isHighlight ? (
              <HighlightCard
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                visible={visibleItems.has(index)}
                delay={`${index * 100}ms`}
              >
                <h2>Best In Repairs</h2>
                <p>
                  Experience unmatched repair services for all your devices. Our
                  expert technicians deliver precision repairs with guaranteed
                  satisfaction and quick turnaround times.
                </p>
              </HighlightCard>
            ) : (
              <ProductCardContainer
                className="flex-center"
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                visible={visibleItems.has(index)}
                delay={`${index * 100}ms`}
              >
                <GradientBackground />
                <Image src={product.image} alt={product.name} />
                <CardContent>
                  <h3>{product.name}</h3>
                </CardContent>
              </ProductCardContainer>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default BestInRepairs;
