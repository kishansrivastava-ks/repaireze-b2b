/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { Zap } from "lucide-react";

const Section = styled.section`
  padding: 1rem 0;
  padding-top: 6rem;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
`;

const IntroHeader = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;

  h2 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
`;

const Intro = () => {
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
        <IntroHeader isVisible>
          <h2>Got a broken appliance? Repaireze is here to help!</h2>
          <p>
            Repaireze specializes in repairing a wide range of home appliances.
            With our experienced team, we quickly diagnose and fix issues to get
            your appliances back in working order in no time. We provide repair
            services for all major appliances, including refrigerators, washing
            machines, ovens, dishwashers, and more.
          </p>
        </IntroHeader>
      </Container>
    </Section>
  );
};

export default Intro;
