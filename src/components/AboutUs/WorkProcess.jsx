import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  PhoneCall,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// const slideUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
`;

const Section = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 3rem 1rem;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${fadeIn} 1s ease-out forwards;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 600;
  /* background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); */
  background-color: var(--color-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-primary);
  line-height: 1.8;
`;

const ProcessContainer = styled.div`
  position: relative;
  padding: 2rem;
`;

const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  position: relative;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressSegment = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% + 2rem);
  left: 26.5%;
  width: calc(100% - 8rem);
  width: calc(100%);
  height: 3px;
  background: ${(props) => (props.isActive ? "#4f46e5" : "#e2e8f0")};
  transform: translateY(-50%);
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
`;

const Step = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "40px")});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) => props.delay}ms;
`;

const IconContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 2;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
      : "white"};
  color: ${(props) => (props.isActive ? "white" : "#64748b")};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${(props) => (props.isActive ? pulse : "none")} 2s infinite;
  cursor: pointer;
  transform: ${(props) => (props.isActive ? "scale(1.1)" : "scale(1)")};

  &:hover {
    transform: scale(1.1);
  }
`;

const ContentCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: ${(props) =>
    props.isActive
      ? "0 20px 25px -5px rgba(79, 70, 229, 0.1)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"};
  transform: ${(props) => (props.isActive ? "translateY(-10px)" : "none")};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.1);
  }
`;

const StepNumber = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 0.5rem;
  display: block;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const WorkProcess = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  const steps = [
    {
      icon: <PhoneCall size={20} />,
      title: "Book Appointment",
      description:
        "Schedule a repair service through our online system or call us directly.",
      details: [
        "24/7 booking availability",
        "Instant confirmation",
        "Flexible scheduling",
        "Emergency services available",
      ],
    },
    {
      icon: <ClipboardCheck size={20} />,
      title: "Diagnosis",
      description:
        "Our expert technicians thoroughly examine your device to identify issues.",
      details: [
        "Complete device inspection",
        "Detailed problem report",
        "Upfront cost estimate",
        "Repair recommendations",
      ],
    },
    {
      icon: <Wrench size={20} />,
      title: "Expert Repair",
      description:
        "Certified technicians perform repairs using high-quality parts.",
      details: [
        "Genuine parts used",
        "Latest repair techniques",
        "Clean room environment",
        "Quality assurance checks",
      ],
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Testing",
      description:
        "We thoroughly test your device to ensure everything works perfectly.",
      details: [
        "Comprehensive testing",
        "Performance verification",
        "Safety checks",
        "Quality assurance",
      ],
    },
    {
      icon: <ThumbsUp size={20} />,
      title: "Satisfaction",
      description:
        "Get your fully repaired device back with our quality guarantee.",
      details: [
        "90-day warranty",
        "Service guarantee",
        "Follow-up support",
        "Repair documentation",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => new Set([...prev, "section"]));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers = stepsRef.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, `step-${index}`]));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <Section>
      <Container ref={sectionRef} isVisible={visibleItems.has("section")}>
        <Header>
          <Title>Our Process</Title>
          <Subtitle>
            Experience a seamless repair journey with our proven five-step
            process, designed to get your device back to perfect condition.
          </Subtitle>
        </Header>

        <ProcessContainer>
          {/* <ProgressLine activeStep={activeStep} /> */}
          <StepsWrapper>
            {steps.map((step, index) => (
              <Step
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                isVisible={visibleItems.has(`step-${index}`)}
                delay={index * 200}
                onMouseEnter={() => setActiveStep(index)}
              >
                <IconContainer>
                  <IconWrapper isActive={activeStep === index}>
                    {step.icon}
                  </IconWrapper>
                  {index < steps.length - 1 && (
                    <ProgressSegment isActive={activeStep > index} />
                  )}
                </IconContainer>

                <ContentCard isActive={activeStep === index}>
                  <StepNumber>Step {index + 1}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </ContentCard>
              </Step>
            ))}
          </StepsWrapper>
        </ProcessContainer>
      </Container>
    </Section>
  );
};

export default WorkProcess;
