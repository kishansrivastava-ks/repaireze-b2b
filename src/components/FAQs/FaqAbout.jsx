/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MessageCircle } from "lucide-react";

const Section = styled.section`
  padding: 4rem 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const ContentWrapper = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--color-secondary-dark);
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: 200ms;
`;

const ContactPrompt = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--color-primary-light);
  border-radius: var(--border-radius-md);
  color: #fff;
  letter-spacing: 1px;
  font-weight: 500;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: 400ms;

  svg {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    gap: 0.5rem;
    letter-spacing: 0.5px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const FaqAbout = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Section>
      <Container>
        <ContentWrapper ref={sectionRef} isVisible={isVisible}>
          <Title isVisible={isVisible}>
            Repaireze FAQ: Your Guide to Expert Tech Repair Solutions
          </Title>
          <Description isVisible={isVisible}>
            Welcome to Repaireze&apos;s FAQ section, your comprehensive resource
            for understanding our repair services and solutions. We&apos;ve
            compiled detailed answers to common questions about our repair
            processes, warranty coverage, and service guarantees. Our commitment
            to transparency means you&apos;ll find clear, straightforward
            information about how we work and what you can expect. From
            troubleshooting basics to complex repair queries, we&apos;ve
            designed this section to help you make informed decisions about your
            device repairs.
          </Description>
          <ContactPrompt isVisible={isVisible}>
            <MessageCircle size={24} />
            Can&apos;t find your answer? Our support team is just a message
            away!
          </ContactPrompt>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default FaqAbout;
