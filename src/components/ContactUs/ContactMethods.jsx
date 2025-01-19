import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { PhoneCall, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

const Section = styled.section`
  padding: 6rem 0;
  background: white;
  overflow: hidden;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const ContactCard = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: ${(props) => props.delay}ms;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  background: ${(props) => props.background || "var(--color-primary-light)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  transition: transform 0.3s ease;

  ${ContactCard}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  color: var(--color-secondary-dark);
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary-dark);
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MapFrame = styled.div`
  margin-top: 1rem;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  height: 150px;
  background: var(--color-surface);
  position: relative;
`;

const LiveChat = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }
`;

const ContactMethods = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

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

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, `item-${index}`]));
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

  const contactMethods = [
    {
      icon: <PhoneCall size={24} />,
      title: "Call or Message",
      content: (
        <>
          <ContactLink href="tel:+1234567890">+1 (234) 567-890</ContactLink>
          <ContactLink href="tel:+1234567891">+1 (234) 567-891</ContactLink>
          <InfoItem>Available for WhatsApp & SMS</InfoItem>
        </>
      ),
      background: "#4f46e5",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: (
        <>
          <ContactLink href="mailto:support@repaireze.com">
            support@repaireze.com
          </ContactLink>
          <ContactLink href="mailto:info@repaireze.com">
            info@repaireze.com
          </ContactLink>
          <LiveChat>
            <MessageSquare size={18} />
            Start Live Chat
          </LiveChat>
        </>
      ),
      background: "#7c3aed",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Our Store",
      content: (
        <>
          <InfoList>
            <InfoItem>
              <MapPin size={16} />
              123 Repair Street, Tech City
            </InfoItem>
            <InfoItem>
              <Clock size={16} />
              Mon-Sat: 9AM - 7PM
            </InfoItem>
          </InfoList>
          <MapFrame>
            <img
              src="/api/placeholder/300/150"
              alt="Store location map"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </MapFrame>
        </>
      ),
      background: "#06b6d4",
    },
  ];

  return (
    <Section>
      <Container>
        <Header ref={sectionRef} isVisible={visibleItems.has("header")}>
          <Title>Get in Touch</Title>
          <Subtitle>
            Choose your preferred way to connect with us. We&apos;re here to
            help and will respond as soon as possible.
          </Subtitle>
        </Header>

        <Grid>
          {contactMethods.map((method, index) => (
            <ContactCard
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              isVisible={visibleItems.has(`item-${index}`)}
              delay={index * 200}
            >
              <IconWrapper background={method.background}>
                {method.icon}
              </IconWrapper>
              <CardTitle>{method.title}</CardTitle>
              <CardContent>{method.content}</CardContent>
            </ContactCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactMethods;
