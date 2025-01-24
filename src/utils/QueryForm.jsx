import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Send } from "lucide-react";

const Section = styled.section`
  padding: 6rem 0;
  background: white;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Header = styled.div`
  text-align: center;

  h2 {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: var(--color-muted);

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FormContainer = styled.form`
  background: transparent;
  padding: 3rem;
  border-radius: var(--border-radius-lg);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;
const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${(props) => props.delay}ms;

  label {
    position: absolute;
    left: 1rem;
    top: -0.65rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    pointer-events: none;
    transform-origin: left top;
    transition: transform 0.3s ease, color 0.3s ease;
    background: white;
    padding: 0 0.5rem;
    border-radius: 10px;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label {
    transform: translateY(-1.4rem) scale(0.85);
    color: var(--color-primary);
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    background: white;
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-family: var(--font-family-primary);
    color: var(--color-primary);
    transition: all 0.3s ease;

    &::placeholder {
      color: transparent; // Hide placeholder since we're using floating labels
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 4px 12px rgba(61, 82, 160, 0.1);
    }
  }

  textarea {
    height: 150px;
    resize: vertical;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition-delay: 500ms;
  box-shadow: 0 4px 12px rgba(61, 82, 160, 0.2);

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(61, 82, 160, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(61, 82, 160, 0.2);
  }
`;

const QueryForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Section ref={sectionRef} isVisible={isVisible}>
      <Container>
        <Header>
          <h2>Have a Query?</h2>
          <p>Our team will be in touch with you soon</p>
        </Header>

        <FormContainer onSubmit={handleSubmit}>
          <InputGrid>
            <InputGroup isVisible={isVisible} delay={100}>
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" required />
            </InputGroup>

            <InputGroup isVisible={isVisible} delay={200}>
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" required />
            </InputGroup>

            <InputGroup isVisible={isVisible} delay={300}>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </InputGroup>

            <InputGroup isVisible={isVisible} delay={400}>
              <label>Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </InputGroup>
          </InputGrid>

          <InputGroup isVisible={isVisible} delay={500}>
            <label>Message</label>
            <textarea placeholder="Type your message here..." required />
          </InputGroup>

          <SubmitButton type="submit" isVisible={isVisible}>
            Submit Query <Send size={18} />
          </SubmitButton>
        </FormContainer>
      </Container>
    </Section>
  );
};

export default QueryForm;
