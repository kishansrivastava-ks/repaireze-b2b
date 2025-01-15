import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const Section = styled.section`
  padding: 4rem 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-primary-light);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
`;

const CategoriesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  justify-content: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: 200ms;
`;

const CategoryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-md);
  background: ${(props) =>
    props.active ? "var(--color-primary)" : "var(--color-surface)"};
  color: ${(props) => (props.active ? "white" : "var(--color-secondary-dark)")};
  /* font-weight: ${(props) => (props.active ? "600" : "normal")}; */
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  font-size: 1rem;

  &:hover {
    background: ${(props) =>
      props.active ? "var(--color-primary)" : "var(--color-primary-light)"};
    transform: translateY(-2px);
    color: #fff;
  }
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FaqItem = styled.div`
  background: white;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => props.delay}ms;
  border: 1px solid var(--color-border);
`;

const FaqHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${(props) =>
    props.isOpen ? "var(--color-primary-light)" : "white"};
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: var(--color-primary-light);

    h3 {
      color: white;
    }

    button {
      color: white;
    }
  }
`;

const Question = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => (props.isOpen ? "#fff" : "var(--color-text)")};
  margin: 0;
  flex: 1;
  padding-right: 1rem;
  transition: color 0.3s ease;
  font-weight: 500;
  letter-spacing: 1px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${(props) =>
    props.isOpen ? "var(--color-primary)" : "var(--color-muted)"};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Answer = styled.div`
  padding: ${(props) => (props.isOpen ? "1.5rem" : "0 1.5rem")};
  color: var(--color-secondary-dark);
  line-height: 1.6;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.3s ease-out;
  overflow: hidden;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-muted);
  font-size: 1.1rem;
  grid-column: 1 / -1;
`;

const FaqSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState(new Set());
  const sectionRefs = useRef([]);

  const categories = [
    "All",
    "Repair Process",
    "Pricing",
    "Warranty",
    "Support",
    "Scheduling",
  ];

  const faqs = [
    {
      category: "Repair Process",
      question: "How long does a typical repair take?",
      answer:
        "Most repairs are completed within 24-48 hours. However, the exact duration depends on the device model and the complexity of the repair. We'll provide you with an estimated timeline when you drop off your device.",
    },
    {
      category: "Pricing",
      question: "Do you provide free diagnostics?",
      answer:
        "Yes, we offer free diagnostic services for all devices. Our technicians will thoroughly examine your device and provide a detailed quote before proceeding with any repairs.",
    },
    {
      category: "Warranty",
      question: "What warranty do you offer on repairs?",
      answer:
        "All our repairs come with a 90-day warranty covering both parts and labor. If you experience any issues related to our repair work during this period, we'll fix it at no additional cost.",
    },
    {
      category: "Support",
      question: "What happens if my device can't be repaired?",
      answer:
        "If we determine that your device cannot be repaired, we'll provide you with a detailed explanation and recommend possible alternatives. You'll only be charged for the diagnostic fee in such cases.",
    },
    {
      category: "Scheduling",
      question: "Do I need to make an appointment?",
      answer:
        "While walk-ins are welcome, we recommend scheduling an appointment to ensure minimal wait times. You can book an appointment through our website or by calling our service center.",
    },
    {
      category: "Repair Process",
      question: "Do you use original manufacturer parts?",
      answer:
        "Yes, we use genuine manufacturer parts whenever possible. In cases where OEM parts are not available, we use high-quality compatible parts that meet or exceed manufacturer specifications.",
    },
  ];

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section>
      <Container>
        <SearchContainer
          ref={(el) => (sectionRefs.current[0] = el)}
          isVisible={visibleItems.has(0)}
        >
          <SearchWrapper>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
        </SearchContainer>

        <CategoriesContainer
          ref={(el) => (sectionRefs.current[1] = el)}
          isVisible={visibleItems.has(1)}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoriesContainer>

        <FaqGrid>
          {filteredFaqs.length === 0 ? (
            <NoResults>
              No matching FAQs found. Try adjusting your search.
            </NoResults>
          ) : (
            filteredFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                ref={(el) => (sectionRefs.current[index + 2] = el)}
                isVisible={visibleItems.has(index + 2)}
                delay={index * 100}
              >
                <FaqHeader
                  isOpen={openItems.has(index)}
                  onClick={() => toggleItem(index)}
                >
                  <Question isOpen={openItems.has(index)}>
                    {faq.question}
                  </Question>
                  <IconButton isOpen={openItems.has(index)}>
                    {openItems.has(index) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </IconButton>
                </FaqHeader>
                <Answer isOpen={openItems.has(index)}>{faq.answer}</Answer>
              </FaqItem>
            ))
          )}
        </FaqGrid>
      </Container>
    </Section>
  );
};

export default FaqSection;
