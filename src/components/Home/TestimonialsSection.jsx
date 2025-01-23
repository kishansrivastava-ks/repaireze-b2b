import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

const Section = styled.section`
  background: white;
  padding: 6rem 0;
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const MainHeading = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 4rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.75rem;
    text-align: center;
    font-size: 1.7rem;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    /* border: 1px solid red; */
  }
`;
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    /* border: 1px solid red; */
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 5/6;
  aspect-ratio: 4.5/3;
  opacity: ${(props) => (props.isAnimating ? 0 : 1)};
  transform: translateX(
    ${(props) =>
      props.isAnimating ? (props.direction === "next" ? "-20px" : "20px") : "0"}
  );
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  @media (max-width: 768px) {
    /* aspect-ratio: 16/9; */
    max-width: 98%;
    /* border: 2px solid blue; */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  @media (max-width: 768px) {
    /* border: 2px solid blue; */
  }
`;

const QuoteCircle = styled.div`
  position: absolute;
  top: -1.75rem;
  right: -1.75rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    top: -1.25rem;
    right: -1.25rem;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${(props) => (props.isAnimating ? 0 : 1)};
  transform: translateX(
    ${(props) =>
      props.isAnimating ? (props.direction === "next" ? "20px" : "-20px") : "0"}
  );
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const TestimonialHeading = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.125rem;
  color: var(--color-muted);
  margin-bottom: 2rem;
  line-height: 2;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const ReviewerName = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ReviewerRole = styled.p`
  color: var(--color-muted);
  font-size: 0.95rem;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 3.5rem;
    height: 1.5rem;
    color: var(--color-primary);
    transition: color 0.2s ease;

    @media (max-width: 768px) {
      width: 2rem;
      height: 1rem;
    }
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechVision Inc.",
    heading: "Exceptional Service & Results",
    review:
      "Working with the team has been nothing short of extraordinary. Their attention to detail and commitment to excellence transformed our digital presence completely. The results have exceeded our expectations in every way possible.",
    image: "/api/placeholder/user1.jpg",
  },
  {
    id: 2,
    name: "Michael Chang",
    role: "Director of Operations, CloudFlow",
    heading: "Professional & Innovative",
    review:
      "The level of professionalism and innovation we experienced was remarkable. They didn't just meet our requirements - they anticipated our needs and delivered solutions that put us ahead of the curve.",
    image: "/api/placeholder/user2.jpg",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Founder, Digital Dynamics",
    heading: "Outstanding Support",
    review:
      "Their dedication to client success is unmatched. The team went above and beyond to ensure our project was delivered perfectly. The ongoing support and responsiveness have been invaluable to our business.",
    image: "/api/placeholder/user3.jpg",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
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
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Section ref={sectionRef} isVisible={isVisible}>
      <Container>
        <MainHeading>
          What Our Customers
          <br />
          Are Saying
        </MainHeading>

        <TestimonialGrid>
          <ImageContainer isAnimating={isAnimating} direction={direction}>
            <Image src={testimonials[currentIndex].image} alt="Customer" />
            <QuoteCircle>
              <Quote size={18} fill="white" />
            </QuoteCircle>
          </ImageContainer>

          <ContentColumn isAnimating={isAnimating} direction={direction}>
            <TestimonialHeading>
              {testimonials[currentIndex].heading}
            </TestimonialHeading>
            <TestimonialText>
              {testimonials[currentIndex].review}
            </TestimonialText>
            <div>
              <ReviewerName>{testimonials[currentIndex].name}</ReviewerName>
              <ReviewerRole>{testimonials[currentIndex].role}</ReviewerRole>
            </div>
          </ContentColumn>
        </TestimonialGrid>

        <NavigationContainer>
          <NavButton onClick={handlePrev} disabled={isAnimating}>
            <ArrowLeft strokeWidth={1.5} />
          </NavButton>
          <NavButton onClick={handleNext} disabled={isAnimating}>
            <ArrowRight strokeWidth={1.5} />
          </NavButton>
        </NavigationContainer>
      </Container>
    </Section>
  );
};

export default TestimonialsSection;
