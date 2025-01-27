/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 30rem; */
  height: 90vh;
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 1s ease-out;
  @media (max-width: 480px) {
    height: 90dvh;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/api/placeholder/contact.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 480px) {
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
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
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
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
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: rgb(229, 231, 235);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: all 0.7s ease-out;
  transition-delay: 500ms;
  line-height: 1.6;
  font-weight: 600;
  letter-spacing: 1px;
`;

const QuickInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: all 0.7s ease-out;
  transition-delay: 700ms;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .icon {
    /* color: var(--color-primary); */
    color: #fff;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .value {
    font-size: 1rem;
    font-weight: 500;
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.5rem;

    .icon {
      size: 20px;
    }

    .label {
      font-size: 0.75rem;
    }

    .value {
      font-size: 0.875rem;
    }
  }
`;

const ContactHero = () => {
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
          <Title isVisible={isVisible}>Get in Touch</Title>
          <Description isVisible={isVisible}>
            Have a question or need assistance? We&apos;re here to help! Reach
            out to our friendly team through any of the following channels, and
            we&apos;ll get back to you as soon as possible.
          </Description>
          <QuickInfoContainer isVisible={isVisible}>
            <InfoItem>
              <MapPin className="icon" size={24} />
              <div className="content">
                <span className="label">Visit Us</span>
                <span className="value">320A, Uttam Nagar, Delhi</span>
              </div>
            </InfoItem>
            <InfoItem>
              <Phone className="icon" size={24} />
              <div className="content">
                <span className="label">Call Us</span>
                <span className="value">+91 8860887541</span>
              </div>
            </InfoItem>
            <InfoItem>
              <Mail className="icon" size={24} />
              <div className="content">
                <span className="label">Email Us</span>
                <span className="value">support@repaireze.com</span>
              </div>
            </InfoItem>
            <InfoItem>
              <Clock className="icon" size={24} />
              <div className="content">
                <span className="label">Working Hours</span>
                <span className="value">Mon-Sat: 9AM - 7PM</span>
              </div>
            </InfoItem>
          </QuickInfoContainer>
        </ContentInner>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default ContactHero;
