import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Wrench, Shield, Clock, Medal } from "lucide-react";

const Section = styled.section`
  padding: 5rem 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    display: block;
    font-size: 1.125rem;
    color: var(--color-secondary-dark);
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.div`
  /* color: var(--color-primary); */
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
    color: var(--color-primary);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: 200ms;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: var(--color-primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  /* color: var(--color-primary); */
  color: #fff;
`;

const StatTitle = styled.h4`
  font-size: 1rem;
  color: var(--color-secondary-dark);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
`;

const AboutIntro = () => {
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

  const stats = [
    {
      icon: <Wrench size={24} />,
      title: "Expert Technicians",
      value: "20+ Certified",
    },
    {
      icon: <Shield size={24} />,
      title: "Service Guarantee",
      value: "100% Assured",
    },
    {
      icon: <Clock size={24} />,
      title: "Repair Locations",
      value: "3 Stores",
    },
    {
      icon: <Medal size={24} />,
      title: "Customer Trust",
      value: "5000+ Served",
    },
  ];

  return (
    <Section>
      <Container>
        <ContentWrapper>
          <TextContent
            ref={(el) => (sectionRefs.current[0] = el)}
            isVisible={visibleItems.has(0)}
          >
            <Title>
              <span>Welcome to Repaireze</span>
              Your Trusted Destination for Device Repairs
            </Title>
            <Description>
              <p>
                With over three stores across Australia, Repaireze has become
                synonymous with reliable and expert repair services. Our journey
                is rooted in a commitment to excellence and a passion for
                technology.
              </p>
              <p>
                Our team of skilled technicians specializes in repairing a wide
                range of devices, from smartphones to tablets and more. What
                sets us apart is not just our technical expertise, but our
                dedication to customer satisfaction. We understand the
                significance of your devices in your daily life.
              </p>
              <p>
                At Repaireze, we take pride in using genuine parts and
                industry-leading practices to guarantee the longevity of your
                devices. Because we don&apos;t just fix devices; we restore
                connections and enhance experiences.
              </p>
            </Description>
          </TextContent>

          <StatsGrid
            ref={(el) => (sectionRefs.current[1] = el)}
            isVisible={visibleItems.has(1)}
          >
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <IconWrapper>{stat.icon}</IconWrapper>
                <StatTitle>{stat.title}</StatTitle>
                <StatValue>{stat.value}</StatValue>
              </StatCard>
            ))}
          </StatsGrid>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default AboutIntro;
