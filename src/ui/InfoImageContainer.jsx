/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 2rem 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.7s ease-out;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px; // Minimum height to prevent collapse during loading
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: #f9fafb; // Light background for image container
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: auto; // Allow height to adjust based on aspect ratio
  max-height: 80vh; // Prevent excessive vertical height
  object-fit: contain; // Show entire image
  object-position: center;
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

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const Caption = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

// Entire functional component remains unchanged
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
