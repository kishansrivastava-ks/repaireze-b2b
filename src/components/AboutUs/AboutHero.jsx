/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 1s ease-out;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/api/placeholder/about-info.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentInner = styled.div`
  max-width: 38rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: all 0.7s ease-out;
  transition-delay: 300ms;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: rgb(229, 231, 235);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: all 0.7s ease-out;
  transition-delay: 500ms;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: var(--color-primary);
  font-weight: 500;
`;

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <HeroContainer ref={containerRef} isVisible={isVisible}>
      <BackgroundImage />
      <Overlay />
      <ContentWrapper>
        <ContentInner>
          <Title isVisible={isVisible}>Our Journey of Excellence</Title>
          <Description isVisible={isVisible}>
            For over a decade, Repaireze has been the trusted name in tech
            repair, combining <Highlight>expertise</Highlight>,{" "}
            <Highlight>innovation</Highlight>, and{" "}
            <Highlight>dedication</Highlight> to deliver exceptional service.
            Our story is built on a foundation of technical excellence and an
            unwavering commitment to customer satisfaction. Discover the people,
            values, and mission that make us your reliable partner in keeping
            your devices running smoothly.
          </Description>
        </ContentInner>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default AboutHero;
