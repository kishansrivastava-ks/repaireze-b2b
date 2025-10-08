import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Zap, Brush, Bug, Wrench, Hammer, Power } from "lucide-react";
import { NavLink } from "react-router-dom";

const serviceCards = [
  {
    icon: <Power size={40} />,
    title: "Electrical Appliances",
    path: "/services/electrical-appliances",
    description: "xttqsw;d",
  },
  {
    icon: <Brush size={40} />,
    title: "Deep Cleaning",
    path: "/services/deep-cleaning",
    description: "xttqsw;d",
  },
  {
    icon: <Bug size={40} />,
    title: "Pest Control",
    path: "/services/pest-control",
    description: "xttqsw;d"
  },
  { icon: <Wrench size={40} />, title: "Plumbing", path: "/services/plumbing" ,description: "xttqsw;d"
},
  
  {
    icon: <Hammer size={40} />,
    title: "Carpentry",
    path: "/services/carpentry",
    description: "xttqsw;d",
  },
  {
    icon: <Zap size={40} />,
    title: "Electrical",
    path: "/services/electrical",
    description: "xttqsw;d",
  },
];

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

  @media (max-width: 768px) {
    padding: 0.5rem 0 2rem;
    margin: 1rem 0;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    width: 95%;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 1px;
    }

    @media (min-width: 769px) {
      font-size: 3rem;
    }
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    margin: 0 -1rem; // Extend slightly beyond container
    width: calc(100% + 2rem);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4rem;
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      width: 2rem;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;

const CardList = styled.div`
  display: flex;
  gap: 1.5rem;
  animation: scroll 40s linear infinite;
  will-change: transform;
  padding: 1rem 0.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    animation: scroll 30s linear infinite; // Slightly faster on mobile
    padding: 0.5rem;
  }

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

const Card = styled(NavLink)`
  flex: none;
  width: 280px; // Fixed width for consistency
  aspect-ratio: 3/3;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(20px)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.3s ease-out;
  transition-delay: ${({ delay }) => `${delay}ms`};
  z-index: 1;

  @media (max-width: 768px) {
    width: 200px;
    padding: 1.25rem;
    border-radius: 0.5rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

    @media (max-width: 768px) {
      transform: scale(1.02); // Subtle scale on mobile
    }
  }

  .icon {
    color: var(--color-primary);
    margin-bottom: 1rem;

    svg {
      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 0.75rem;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    text-align: center;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.8125rem;
      margin-top: 0.25rem;
    }
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
            <Card
              key={index}
              isVisible={isVisible}
              delay={index * 100}
              to={service.path}
            >
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Card>
          ))}
        </CardList>
      </CardContainer>
    </Section>
  );
};

export default ServicesSection;
