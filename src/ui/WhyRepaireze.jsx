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
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const Container = styled.div`
  width: 92%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  & > div {
    margin-bottom: 2rem;
    text-align: center;

    & > h2 {
      font-size: 2rem;
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
      text-align: left;
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
  grid-template-columns: 1fr;
  gap: 1.25rem;

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
  padding: 1.25rem;
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
    transform: none;
    opacity: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h3 {
    font-size: 1rem;
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
