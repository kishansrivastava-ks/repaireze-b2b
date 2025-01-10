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
    font-size: 2rem;
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
        "We don't offer discount or promotions. However, we can help you find discounts or promotions for specific service if you provide more details. Let us know what you're looking for, and we will assist you in finding the best deals on services!",
    },
    {
      question: "What types of services do you deliver?",
      answer:
        "We deliver wide range of services incliuding Electrical Appliences( Installation, Service & Repair), Pest Control Services, Deep Cleaning Services, Carpentery Services, Plumber Services, Electrical Works.",
    },
    {
      question: "Do you offer post service coverage?",
      answer:
        "Yes, we provide a comprehensive post service coverage on all our services. Spare Parts are covered for 45 days, and our labor work comes with a 15-days post service coverage. If you experience any issues related to our service, we'll fix it at no additional cost.",
    },
    {
      question: "What are your payment options?",
      answer:
        "We accept all major credit cards, debit cards, cash, and UPI’s. For business clients, we also offer directly Bank Transfer options. Payment is only required once the service is successfully done.",
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
