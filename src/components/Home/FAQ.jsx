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
      question: "What types of devices do you repair?",
      answer:
        "We repair a wide range of devices including smartphones, tablets, laptops, gaming consoles, smartwatches, and other electronic devices. Our expert technicians are trained to handle various brands and models with precision and care.",
    },
    {
      question: "How long does a typical repair take?",
      answer:
        "Most repairs are completed within 24-48 hours, depending on the type of repair and parts availability. Simple repairs like screen replacements can often be done the same day. We'll provide you with a specific timeframe when you bring in your device.",
    },
    {
      question: "Do you offer warranty on repairs?",
      answer:
        "Yes, we provide a comprehensive warranty on all our repairs. Parts are covered for 90 days, and our labor comes with a 30-day warranty. If you experience any issues related to our repair work, we'll fix it at no additional cost.",
    },
    {
      question: "What are your payment options?",
      answer:
        "We accept all major credit cards, debit cards, cash, and mobile payment solutions. For business clients, we also offer invoicing options. Payment is only required once the repair is successfully completed.",
    },
    {
      question: "Do you offer on-site repairs?",
      answer:
        "Yes, we provide on-site repair services for business clients and special cases. Additional charges may apply based on location and urgency. Please contact us for more information about our on-site repair services.",
    },
    {
      question: "What happens if my device can't be repaired?",
      answer:
        "If we determine that your device cannot be repaired, we'll explain the reason why and discuss alternative options with you. You won't be charged for our diagnostic service in such cases, and we can provide recommendations for replacement options.",
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
