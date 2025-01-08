import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  overflow: hidden;
  background-color: var(--color-surface);
  background-color: #fff;
  height: 88vh;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    width: 92%;
    padding: 0;
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
  }
`;

const Content = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => `translateX(${isVisible ? "0" : "-50px"})`};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  @media (max-width: 768px) {
    text-align: left;
    transform: ${({ isVisible }) => `translateY(${isVisible ? "0" : "30px"})`};
  }

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }

    @media (min-width: 769px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1rem;
    color: var(--color-muted);
    color: var(--color-primary);
    line-height: 1.5;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 1.25rem;
      opacity: 0.9;
    }

    @media (min-width: 769px) {
      font-size: 1.125rem;
    }
  }
`;

const ImageWrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => `translateX(${isVisible ? "0" : "50px"})`};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  height: 80%;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 4/3;
    transform: ${({ isVisible }) => `translateY(${isVisible ? "0" : "30px"})`};
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-out;
    object-fit: cover;

    @media (max-width: 768px) {
      border-radius: 0.75rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    &:hover {
      transform: scale(1.02);

      @media (max-width: 768px) {
        transform: scale(1.01); // Subtle scale on mobile
      }
    }
  }
`;

const GetToKnow = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const contentObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsContentVisible(true);
        contentObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const imageObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsImageVisible(true);
        imageObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (contentRef.current) contentObserver.observe(contentRef.current);
    if (imageRef.current) imageObserver.observe(imageRef.current);

    return () => {
      if (contentRef.current) contentObserver.unobserve(contentRef.current);
      if (imageRef.current) imageObserver.unobserve(imageRef.current);
    };
  }, []);

  return (
    <Section>
      <Container>
        <Content ref={contentRef} isVisible={isContentVisible}>
          <h2>About the company</h2>
          <p>
            REPAIREZE started its journey in 2021 in Electrical Appliances
            (service, repairing, Installation), Deep Cleaning Service, Pest
            Control Service, Plumbing Works, Carpentry Works, Electrical Works
            with affordable price and superior quality.
          </p>
          <p>
            Having proper service facility compendious marketing enabled us at
            REPAIREZE to deliver a proper, easy and optimum solution to our
            customers.
          </p>
          <p>
            Transparency, Quality and Customer Service is our main objective and
            motto.
          </p>
          <p>
            REPAIREZE stands strong with Expert, Talented and Experienced
            Technicians.
          </p>
          <p>
            We have proved that our prime focus is excellent quality and
            dedicated customer service.{" "}
          </p>
        </Content>
        <ImageWrapper ref={imageRef} isVisible={isImageVisible}>
          <img src="/about.png" alt="Our team at work" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default GetToKnow;
