import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Heart, Wallet, Shield, UserCheck, Award, Box } from "lucide-react";

const features = [
  {
    icon: <Heart size={32} />,
    title: "100% Customer Satisfaction",
    description:
      "Committed to delivering exceptional service that exceeds expectations.",
  },
  {
    icon: <Wallet size={32} />,
    title: "Budget-Friendly",
    description: "Quality repairs at competitive prices to suit every budget.",
  },
  {
    icon: <Shield size={32} />,
    title: "Priority on Safety",
    description:
      "Rigorous safety protocols ensure your device's security and integrity.",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Professional Technicians",
    description:
      "Expert certified technicians with years of specialized experience.",
  },
  {
    icon: <Award size={32} />,
    title: "Warranty on Parts",
    description:
      "Comprehensive warranty coverage for peace of mind on all repairs.",
  },
  {
    icon: <Box size={32} />,
    title: "Premium Parts",
    description:
      "Only the highest quality authentic parts used in every repair.",
  },
];

const Section = styled.section`
  padding: 6rem 0;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--color-muted);
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 3rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(20px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  transition-delay: ${({ delay }) => `${delay}ms`};

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-0.5rem);
  }

  .icon {
    color: var(--color-primary);
    margin-bottom: 1rem;
    transition: transform 0.3s ease-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.5;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

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
          <p>Elevating Your Devices through Precision Repairs!</p>
        </div>

        <Grid>
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              isVisible={visibleItems.has(index)}
              delay={index * 100}
            >
              <Flex>
                <div className="icon">{feature.icon}</div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default WhyRepaireze;
