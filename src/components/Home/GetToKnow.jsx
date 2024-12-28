import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  /* padding: 8rem 0; */
  overflow: hidden;
  /* border: 2px solid red; */
  background-color: var(--color-surface);
  background-color: #fff;
`;

const Container = styled.div`
  width: 90%;
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
  }
  /* border: 2px solid red; */
`;

const Content = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => `translateX(${isVisible ? "0" : "-50px"})`};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.75;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }
`;

const ImageWrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => `translateX(${isVisible ? "0" : "50px"})`};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  /* border: 2px so lid green; */
  height: 80%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-out;

    &:hover {
      transform: scale(1.02);
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
          <h2>Get to know us</h2>
          <p>
            We are a forward-thinking company dedicated to delivering
            exceptional solutions that transform businesses. With years of
            expertise and a passion for innovation, our team works tirelessly to
            create meaningful impact for our clients.
          </p>
          <p>
            Our commitment to excellence and customer satisfaction drives
            everything we do. We believe in building lasting relationships and
            delivering value that extends beyond the immediate project scope.
          </p>
        </Content>
        <ImageWrapper ref={imageRef} isVisible={isImageVisible}>
          <img src="/gtn-img.jpg" alt="Our team at work" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default GetToKnow;
