import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Wrench,
  Clock,
  CreditCard,
  Users,
  ChevronRight,
  BadgeHelp,
  PackageCheck,
  ShieldCheck,
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

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--color-secondary-dark);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  cursor: pointer;
  position: relative;
  border: 1px solid var(--color-border);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${(props) => props.delay}ms;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px -8px rgba(79, 70, 229, 0.15);
    border-color: var(--color-primary);

    ${(props) =>
      props.active &&
      `
      transform: translateY(0);
      box-shadow: 0 0 0 2px var(--color-primary);
    `}
  }

  ${(props) =>
    props.active &&
    `
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary);
  `}
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  background: ${(props) => props.color || "var(--color-primary-light)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  transition: all 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardDescription = styled.p`
  /* color: var(--color-secondary-dark); */
  color: var(--color-primary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ResponseTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  /* color: var(--color-muted); */
  color: var(--color-primary);

  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  color: var(--color-secondary-dark);
  transition: all 0.3s ease;

  ${Card}:hover & {
    background: var(--color-primary-light);
    color: white;
  }
`;

const ContactCategories = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => new Set([...prev, "header"]));
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

  const categories = [
    {
      icon: <Wrench size={20} />,
      title: "Technical Support",
      description:
        "Having issues with your repaired device or need technical assistance?",
      responseTime: "2-4 hours",
      tags: ["Troubleshooting", "Repairs", "Maintenance"],
      color: "#4f46e5",
    },
    {
      icon: <CreditCard size={20} />,
      title: "Billing & Payments",
      description:
        "Questions about your invoice, payment methods, or refund status?",
      responseTime: "1-2 hours",
      tags: ["Invoices", "Refunds", "Payment Plans"],
      color: "#7c3aed",
    },
    {
      icon: <PackageCheck size={20} />,
      title: "Warranty Claims",
      description: "Need to file a warranty claim or check warranty coverage?",
      responseTime: "4-6 hours",
      tags: ["Warranty", "Claims", "Coverage"],
      color: "#06b6d4",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Insurance & Protection",
      description:
        "Questions about device protection plans or insurance coverage?",
      responseTime: "2-3 hours",
      tags: ["Insurance", "Protection Plans", "Coverage"],
      color: "#0891b2",
    },
    {
      icon: <Users size={20} />,
      title: "Business Inquiries",
      description: "Looking to partner with us or need bulk repair services?",
      responseTime: "4-8 hours",
      tags: ["Partnerships", "Business", "Enterprise"],
      color: "#8b5cf6",
    },
    {
      icon: <BadgeHelp size={20} />,
      title: "General Support",
      description:
        "Can't find what you're looking for? Our general support team is here to help.",
      responseTime: "1-3 hours",
      tags: ["General", "Information", "Help"],
      color: "#6366f1",
    },
  ];

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <Section>
      <Container>
        <Header ref={sectionRef} isVisible={visibleItems.has("header")}>
          <Title>How Can We Help?</Title>
          <Subtitle>
            Select the department that best matches your inquiry for faster
            assistance and specialized support.
          </Subtitle>
        </Header>

        <Grid>
          {categories.map((category, index) => (
            <Card
              key={index}
              delay={index * 100}
              active={activeCard === index}
              onClick={() => handleCardClick(index)}
              isVisible={true}
            >
              <IconWrapper color={category.color}>{category.icon}</IconWrapper>
              <CardTitle>
                {category.title}
                <ChevronRight
                  size={20}
                  style={{
                    transform: activeCard === index ? "rotate(90deg)" : "none",
                    transition: "transform 0.3s ease",
                    color: "var(--color-muted)",
                  }}
                />
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
              <ResponseTime>
                <Clock size={16} />
                Average response time: {category.responseTime}
              </ResponseTime>
              <TagsContainer>
                {category.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </TagsContainer>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactCategories;
