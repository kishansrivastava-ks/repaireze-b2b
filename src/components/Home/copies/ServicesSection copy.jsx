import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Briefcase,
  Code,
  Database,
  Globe,
  Layout,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";

const serviceCards = [
  { icon: <Layout size={40} />, title: "Web Design" },
  { icon: <Code size={40} />, title: "Development" },
  { icon: <Smartphone size={40} />, title: "Mobile Apps" },
  { icon: <Database size={40} />, title: "Cloud Solutions" },
  { icon: <Shield size={40} />, title: "Cybersecurity" },
  { icon: <Users size={40} />, title: "IT Consulting" },
  { icon: <Globe size={40} />, title: "Digital Marketing" },
  { icon: <Briefcase size={40} />, title: "Business Analysis" },
];

// Double the cards array for seamless infinite scroll
const allCards = [...serviceCards, ...serviceCards];

const Section = styled.section`
  padding: 1rem 0;
  padding-bottom: 3rem;
  margin: 2rem 0;
  overflow: hidden;
  background-color: transparent;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  /* border: 2px solid red; */
`;

const Container = styled.div`
  /* border: 2px solid green; */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  /* overflow-x: hidden; */
  /* border: 2px solid red; */
`;

const CardList = styled.div`
  display: flex;
  gap: 1.5rem;
  animation: scroll 40s linear infinite;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const Card = styled.div`
  flex: none;
  /* width: 16rem; */
  aspect-ratio: 4 / 3;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(20px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
  transition-delay: ${({ delay }) => `${delay}ms`};
  z-index: 1;

  &:hover {
    transform: scale(1.05);
  }

  .icon {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-primary);
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    text-align: center;
  }
`;

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section ref={sectionRef} isVisible={isVisible}>
      <Container>
        <h2>Our Services</h2>
      </Container>

      <CardContainer>
        <CardList>
          {allCards.map((service, index) => (
            <Card key={index} isVisible={isVisible} delay={index * 100}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>Innovative solutions tailored to your needs</p>
            </Card>
          ))}
        </CardList>
      </CardContainer>
    </Section>
  );
};

export default ServicesSection;
