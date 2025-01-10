/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 2rem 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.7s ease-out;
  background: #ffffff;

  @media (min-width: 768px) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 21/9;
  overflow: hidden;
  border-radius: 0.75rem;
  /* box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); */

  @media (min-width: 768px) {
    aspect-ratio: 23/9;
  }
`;

const LoadingSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background-color: #e5e7eb;
  border-radius: 0.75rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-out;
`;

const CaptionOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  padding: 5rem 1.5rem 2rem;
  transform: translateY(${(props) => (props.isVisible ? "0" : "1rem")});
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.7s ease-out;
  transition-delay: 100ms;

  @media (min-width: 768px) {
    padding: 5rem 2.5rem 2rem;
  }
`;

const Caption = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const InfoImageContainer = ({ imageSrc, caption, alt = "Featured Image" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Section ref={containerRef} isVisible={isVisible}>
      <Container>
        <ImageWrapper>
          {isLoading && <LoadingSkeleton />}

          <StyledImage
            src={imageSrc}
            alt={alt}
            onLoad={handleImageLoad}
            isLoaded={!isLoading}
          />

          {caption && (
            <CaptionOverlay isVisible={isVisible}>
              <Caption>{caption}</Caption>
            </CaptionOverlay>
          )}
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default InfoImageContainer;
