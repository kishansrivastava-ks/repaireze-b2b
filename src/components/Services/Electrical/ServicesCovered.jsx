import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  Zap,
  X,
  Lightbulb,
  Shield,
  Wifi,
  AlarmCheck,
  Sun,
  //   Fan,
  Plug,
  Radio,
  Factory,
  //   Wrench,
  HardDrive,
  Construction,
} from "lucide-react";

// Services we cover data
const servicesOffered = [
  {
    icon: <Lightbulb size={24} />,
    title: "Lighting Installation",
    description:
      "Professional installation of indoor and outdoor lighting systems, fixtures, and controls",
  },
  {
    icon: <Shield size={24} />,
    title: "Safety Inspections",
    description:
      "Comprehensive electrical safety audits and code compliance inspections",
  },
  {
    icon: <Wifi size={24} />,
    title: "Smart Home Wiring",
    description:
      "Installation and setup of smart home electrical systems and automation",
  },
  {
    icon: <AlarmCheck size={24} />,
    title: "Emergency Services",
    description:
      "24/7 emergency electrical repair and troubleshooting services",
  },
  {
    icon: <Sun size={24} />,
    title: "Panel Upgrades",
    description: "Electrical panel replacement and circuit breaker upgrades",
  },
  {
    icon: <Plug size={24} />,
    title: "Outlet Installation",
    description:
      "New outlet installation, GFCI upgrades, and USB outlet integration",
  },
];

// Services we don't cover
const servicesNotOffered = [
  {
    icon: <Factory size={24} />,
    title: "Industrial Systems",
    description: "Large-scale industrial electrical infrastructure projects",
  },
  {
    icon: <Radio size={24} />,
    title: "Telecom Installation",
    description: "Telecommunication system installation and maintenance",
  },
  {
    icon: <HardDrive size={24} />,
    title: "Data Center Setup",
    description: "Data center electrical infrastructure and cooling systems",
  },
  {
    icon: <Construction size={24} />,
    title: "High Voltage Lines",
    description: "High-voltage power line installation and maintenance",
  },
];

const Section = styled.section`
  padding: 3rem 0;
  padding-bottom: 1rem;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: left;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;

  h2 {
    font-size: 2.5rem;
    color: ${(props) =>
      props.isNegative ? "#E63946" : "var(--color-primary)"};
    margin-bottom: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled.div`
  position: relative;
  padding: 1.5rem;
  background: ${(props) =>
    props.isNegative
      ? "linear-gradient(135deg, #FFF5F5 0%, #FED7D7 100%)"
      : "linear-gradient(135deg, #F0F4FF 0%, #E6E9F5 100%)"};
  border-radius: var(--border-radius-md);
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => props.delay}ms;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.isNegative
        ? "linear-gradient(135deg, #E63946 0%, #FF8B94 100%)"
        : "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)"};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover .content,
  &:hover .title,
  &:hover .description {
    color: white;
  }

  &:hover .icon {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isNegative ? "rgba(230, 57, 70, 0.1)" : "rgba(61, 82, 160, 0.1)"};
  border-radius: 8px;
  color: ${(props) => (props.isNegative ? "#E63946" : "var(--color-primary)")};
  transition: all 0.3s ease;
`;

const TextContent = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${(props) => (props.isNegative ? "#E63946" : "var(--color-primary)")};
  transition: color 0.3s ease;
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  color: ${(props) => (props.isNegative ? "#E63946" : "var(--color-primary)")};
  opacity: 0.8;
  transition: color 0.3s ease;
`;

const ServicesCovered = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRefs = useRef([]);

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
          <h2>
            <Zap size={32} /> Electrical Services
          </h2>
        </SectionHeader>

        <Grid>
          {servicesOffered.map((service, index) => (
            <ServiceCard
              key={index}
              ref={(el) => (sectionRefs.current[index + 1] = el)}
              isVisible={visibleItems.has(index + 1)}
              delay={index * 100}
            >
              <CardContent className="content">
                <IconWrapper className="icon">{service.icon}</IconWrapper>
                <TextContent>
                  <Title className="title">{service.title}</Title>
                  <Description className="description">
                    {service.description}
                  </Description>
                </TextContent>
              </CardContent>
            </ServiceCard>
          ))}
        </Grid>

        <SectionHeader
          isNegative
          isVisible={visibleItems.has(servicesOffered.length + 1)}
          ref={(el) => (sectionRefs.current[servicesOffered.length + 1] = el)}
        >
          <h2>
            <X size={32} /> Services Not Provided
          </h2>
        </SectionHeader>

        <Grid>
          {servicesNotOffered.map((service, index) => (
            <ServiceCard
              key={index}
              isNegative
              ref={(el) =>
                (sectionRefs.current[index + servicesOffered.length + 2] = el)
              }
              isVisible={visibleItems.has(index + servicesOffered.length + 2)}
              delay={index * 100}
            >
              <CardContent className="content">
                <IconWrapper className="icon" isNegative>
                  {service.icon}
                </IconWrapper>
                <TextContent>
                  <Title className="title" isNegative>
                    {service.title}
                  </Title>
                  <Description className="description" isNegative>
                    {service.description}
                  </Description>
                </TextContent>
              </CardContent>
            </ServiceCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ServicesCovered;
