import { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  {
    id: 1,
    url: "/api/placeholder/intro1.png",
    alt: "Innovation at work",
    caption:
      "Manage your Repairing needs with our comprehensive B2B Maintenance solutions",
    // subCaption: "Innovative solutions for tomorrow's challenges",
  },
  {
    id: 2,
    url: "/api/placeholder/intro2.jpg",
    alt: "Modern solutions",
    caption: "Building Tomorrow's Technology Today",
    // subCaption: "Advanced solutions powering digital transformation",
  },
  {
    id: 3,
    url: "/api/placeholder/intro3.png",
    alt: "Creative workspace",
    caption:
      "Let us go Green to get our planet clean \n With REPAIREZE Deep Cleaning Services ",
    // subCaption: "Delivering quality through innovation and dedication",
  },
  // {
  //   id: 4,
  //   url: "/api/placeholder/intro4.png",
  //   alt: "Technology focus",
  //   caption: "Got a leak? We'll take a peek! With REPAIREZE Plumber Service",
  //   // subCaption: "Strategic solutions for sustainable growth",
  // },
  {
    id: 5,
    url: "/api/placeholder/intro5.png",
    alt: "Future forward",
    caption:
      "Precision Carpentry, Impeccable Results With REPAIREZE Carpenter service",
    // subCaption: "Pioneering the future of technology and innovation",
  },
];

const Section = styled.section`
  background: white;
  padding: 2rem 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 23/9;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    aspect-ratio: 16/9;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SlideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: scale(${(props) => (props.active ? 1 : 1.05)});
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 0.75rem;
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Dot = styled.button`
  width: 2.5rem;
  height: 3px;
  border: none;
  background-color: ${(props) =>
    props.active ? "var(--color-primary)" : "#CBD5E1"};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    width: 1.75rem;
    height: 2px;
  }

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--color-primary)" : "#94A3B8"};
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
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

  @media (max-width: 768px) {
    padding: 0.35rem;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 2.5rem;
    height: 1rem;
    color: var(--color-primary);
    transition: color 0.2s ease;

    @media (max-width: 768px) {
      width: 2rem;
      height: 0.875rem;
    }

    &:hover {
      color: var(--color-primary-dark);
    }
  }
`;

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 4rem 3rem 2rem;
  color: white;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: translateY(${(props) => (props.active ? "0" : "20px")});
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;

  @media (max-width: 768px) {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);

    padding: 2rem 1.5rem 0;
  }
`;

const Caption = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--color-surface);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    /* margin-bottom: 0.25rem; */
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const SubCaption = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  color: var(--color-surface);

  @media (max-width: 768px) {
    font-size: 0.875rem;
    opacity: 0.95;
    line-height: 1.4;
  }
`;

const IntroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const slideInterval = useRef(null);

  const startSlideTimer = useCallback(() => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
  }, []);

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

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

  useEffect(() => {
    if (!isPaused) {
      startSlideTimer();
    }
    return () => stopSlideTimer();
  }, [isPaused, startSlideTimer]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsPaused(true);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsPaused(true);
  };

  return (
    <Section ref={sectionRef} isVisible={isVisible}>
      <Container>
        <CarouselContainer
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {images.map((image, index) => (
            <SlideContainer key={image.id} active={currentSlide === index}>
              <Image src={image.url} alt={image.alt} />
              <CaptionOverlay active={currentSlide === index}>
                <Caption>{image.caption}</Caption>
                <SubCaption>{image.subCaption}</SubCaption>
              </CaptionOverlay>
            </SlideContainer>
          ))}
        </CarouselContainer>

        <Controls>
          <DotsContainer>
            {images.map((_, index) => (
              <Dot
                key={index}
                active={currentSlide === index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </DotsContainer>

          <NavigationContainer>
            <NavButton onClick={handlePrev}>
              <ArrowLeft strokeWidth={1.5} />
            </NavButton>
            <NavButton onClick={handleNext}>
              <ArrowRight strokeWidth={1.5} />
            </NavButton>
          </NavigationContainer>
        </Controls>
      </Container>
    </Section>
  );
};

export default IntroCarousel;
