import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Plus, Minus } from "lucide-react";

const Section = styled.section`
  padding: var(--spacing-xl) 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: var(--spacing-xl);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all var(--transition-slow);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--color-primary);
  font-weight: bold;
  margin-bottom: var(--spacing-md);

  @media (max-width: 768px) {
    font-size: 1.7rem;
    letter-spacing: 1px;
    /* border: 1px solid red; */
    text-align: center;
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const FAQItem = styled.div`
  border-radius: var(--border-radius-lg);
  background: var(--color-secondary-light);
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all var(--transition-slow);
  transition-delay: ${(props) => props.delay}ms;

  &:hover {
    box-shadow: var(--shadow-medium);
  }
`;

const Question = styled.button`
  width: 100%;
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.1rem;
  text-align: left;

  &:hover {
    background: transparent;
  }

  svg {
    transition: transform var(--transition-medium);
    color: var(--color-primary);
    min-width: 24px;
  }
`;

const Answer = styled.div`
  padding: 0 var(--spacing-lg);
  color: var(--color-muted);
  line-height: 1.6;
  max-height: ${(props) => (props.isOpen ? props.height + "px" : "0")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all var(--transition-medium);
  overflow: hidden;

  p {
    padding-bottom: var(--spacing-lg);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
  transition: transform var(--transition-medium);
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [heights, setHeights] = useState({});
  const answerRefs = useRef({});
  const sectionRef = useRef(null);

  const faqData = [
    {
      question: "Do you offer any discounts or promotions on Services?",
      answer:
        "We don’t offer direct discounts, but we help businesses find cost-effective solutions tailored to their needs. Share your requirements and we’ll recommend the most budget-friendly service plans",
    },
    {
      question: "What types of services do you deliver?",
      answer:
        "We provide a wide range of services including Electrical Appliances (Installation, Service & Repair), Pest Control, Deep Cleaning, Carpentry, Plumbing, and Electrical Works",
    },
    {
      question: "Do you offer post service coverage?",
      answer:
        "Yes! All services include a 45-day warranty on spare parts and 15-day labor coverage. If issues reoccur within this period, we’ll fix them at no extra cost",
    },
    {
      question: "What are your payment options?",
      answer:
        "We accept all major credit/debit cards, UPI, cash, and bank transfers. For corporate clients, flexible billing and payment terms are available.",
    },
    {
      question: "Can you handle multi-location service requests?",
      answer:
        "Yes, we specialize in managing multi-city B2B repair projects across India.",
    },
    {
      question: "Do you provide Annual Maintenance Contracts (AMC)? ",
      answer:
        "Absolutely! Our AMC plans cover all your repair and maintenance needs with priority service, predictable costs, and dedicated support.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Calculate heights for answers
    Object.keys(answerRefs.current).forEach((key) => {
      if (answerRefs.current[key]) {
        setHeights((prev) => ({
          ...prev,
          [key]: answerRefs.current[key].scrollHeight,
        }));
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section ref={sectionRef}>
      <Container>
        <Header isVisible={isVisible}>
          <Title>Frequently Asked Questions</Title>
        </Header>
        <FAQContainer>
          {faqData.map((item, index) => (
            <FAQItem key={index} isVisible={isVisible} delay={index * 100}>
              <Question
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeIndex === index}
              >
                {item.question}
                <IconWrapper isOpen={activeIndex === index}>
                  {activeIndex === index ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </IconWrapper>
              </Question>
              <Answer
                ref={(el) => (answerRefs.current[index] = el)}
                isOpen={activeIndex === index}
                height={heights[index]}
              >
                <p>{item.answer}</p>
              </Answer>
            </FAQItem>
          ))}
        </FAQContainer>
      </Container>
    </Section>
  );
};

export default FAQ;
