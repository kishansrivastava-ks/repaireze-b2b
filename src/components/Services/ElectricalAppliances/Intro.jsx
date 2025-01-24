/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { Zap } from "lucide-react";

const Section = styled.section`
  padding: 1rem 0;
  padding-top: 6rem;
  background: white;
  @media (max-width: 768px) {
    padding-top: 1rem;
  }
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
      /* font-size: 1.7rem; */
      line-height: 1.3;
      text-align: center;
      font-weight: 500;
    }
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    opacity: 0.8;
    @media (max-width: 768px) {
      text-align: center;
    }
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
          <h2>
            Repaireze covers your electrical& electronics repair and service in
            an integrated way!
          </h2>
          <p>
            With B2B Repairing Suites, we ensure your electrical appliances
            operate uninterrupted with minimal or zero downtime. Explore a new
            way of taking care of your business premises through our
            comprehensive plan for electrical and electronic appliances.
          </p>
        </IntroHeader>
      </Container>
    </Section>
  );
};

export default Intro;
