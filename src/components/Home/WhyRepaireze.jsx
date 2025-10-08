import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Heart, Wallet, Shield, UserCheck, Award, Box } from "lucide-react";

const features = [
  {
    icon: <Heart size={32} />,
    title: "100% Customer Satisfaction",
    description:
      "Service that exceeds expectations, every time",
  },
  {
    icon: <Wallet size={32} />,
    title: "Budget-Friendly",
    description: "Affordable pricing without compromising on quality",
  },
  {
    icon: <Shield size={32} />,
    title: "Priority on Safety",
    description:
      "Strict safety protocols for all works and environments",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Professional Technicians",
    description:
      "Certified, experienced experts for specialized services",
  },
  {
    icon: <Award size={32} />,
    title: "Warranty on Parts",
    description:
      "Coverage on repairs and parts for peace of mind",
  },
  {
    icon: <Box size={32} />,
    title: "Premium Parts",
    description:
      "We only use authentic, high-quality spare parts",
  },
];

const Section = styled.section`
  padding: 4rem 0; // Reduced padding on mobile
  background-color: #fff;

  @media (min-width: 768px) {
    padding: 6rem 0;
  }
`;

const Container = styled.div`
  width: 92%; // Slightly wider on mobile for better spacing
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; // Added padding for mobile

  & > div {
    margin-bottom: 2rem; // Added margin for better section spacing on mobile
    text-align: center; // Center align on mobile

    & > h2 {
      font-size: 2rem; // Smaller font on mobile
      font-weight: bold;
      color: var(--color-primary);
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    & > p {
      font-size: 1.125rem;
      color: var(--color-primary);
    }

    @media (min-width: 768px) {
      text-align: left; // Left align on desktop
      & > h2 {
        font-size: 3rem;
      }
      & > p {
        font-size: 1.5rem;
      }
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column on mobile
  gap: 1.25rem; // Reduced gap on mobile

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1.25rem; // Slightly reduced padding on mobile
  border-radius: 0.5rem;
  background: linear-gradient(
    to bottom right,
    var(--color-secondary-light),
    var(--color-secondary)
  );
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "20px")});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ delay }) => `${delay}ms`};
  cursor: pointer;

  @media (max-width: 767px) {
    transform: none; // Disable transform on mobile for better performance
    opacity: 1; // Always visible on mobile
  }

  // Rest of the Card styles remain the same
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem; // Reduced gap on mobile

  @media (max-width: 767px) {
    flex-direction: column; // Stack icon and text on mobile
    align-items: center;
    text-align: center;
  }

  h3 {
    font-size: 1rem; // Smaller font on mobile
    font-weight: bold;
    color: var(--color-primary);
    transition: color 0.5s ease-out;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  p {
    font-size: 0.875rem;
    color: var(--color-primary);
    line-height: 1.5;
    transition: color 0.5s ease-out;
  }
`;

const IconWrapper = styled.div`
  color: var(--color-primary);
  transition: color 0.5s ease-out;

  &:hover {
    color: #fff;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom right,
    var(--color-primary-light),
    var(--color-primary)
  );
  opacity: 0;
  transition: opacity 0.5s ease-out;
`;

// const Content = styled.div`
//   position: relative;
//   z-index: 10;
//   display: flex;
//   align-items: flex-start;
//   gap: 1rem;

//   h3 {
//     font-size: 1.125rem;
//     font-weight: bold;
//     color: var(--color-primary);
//     transition: color 0.5s ease-out;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     font-size: 0.875rem;
//     color: var(--color-muted);
//     line-height: 1.5;
//     transition: color 0.5s ease-out;
//     color: var(--color-primary);
//   }
// `;

const WhyRepaireze = () => {
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
        <div>
          <h2>Why Repaireze?</h2>
          <p>We help businesses save time, cut costs, and improve operational efficiency</p>
        </div>

        <Grid>
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              isVisible={visibleItems.has(index)}
              delay={index * 100}
            >
              <Content>
                <IconWrapper className="icon">{feature.icon}</IconWrapper>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Content>
              <Overlay className="overlay" />
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default WhyRepaireze;
