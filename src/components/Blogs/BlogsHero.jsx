import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  BookOpen,
  Clock,
  Filter,
  Lightbulb,
  Newspaper,
  Wrench,
} from "lucide-react";

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 24rem;
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 1s ease-out;
  background: linear-gradient(
    to right,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    padding: 6rem 1.5rem;
  }
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
  max-width: 40rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? "0" : "-20px")});
  transition: all 0.7s ease-out;
  transition-delay: 500ms;
  line-height: 1.6;
  max-width: 40rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.7s ease-out;
  transition-delay: 700ms;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .icon {
    color: rgba(255, 255, 255, 0.9);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .label {
    font-size: 0.875rem;
    opacity: 0.9;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? "0" : "20px")});
  transition: all 0.7s ease-out;
  transition-delay: 900ms;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  background: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "var(--color-primary)" : "white")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: ${(props) =>
      props.active ? "white" : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
  }
`;

const BlogsHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filters = [
    { id: "all", label: "All Posts", icon: <Filter size={16} /> },
    { id: "repairs", label: "Repair Guides", icon: <Wrench size={16} /> },
    { id: "tips", label: "Tech Tips", icon: <Lightbulb size={16} /> },
    { id: "news", label: "Industry News", icon: <Newspaper size={16} /> },
  ];

  return (
    <HeroContainer ref={containerRef} isVisible={isVisible}>
      <ContentWrapper>
        <Title isVisible={isVisible}>Tech Insights & Repair Guides</Title>
        <Description isVisible={isVisible}>
          Discover the latest repair guides, tech tips, and industry insights
          from our expert technicians. Stay informed about device maintenance,
          troubleshooting, and tech innovations.
        </Description>

        <StatsContainer isVisible={isVisible}>
          <StatItem>
            <BookOpen className="icon" size={24} />
            <div className="content">
              <span className="value">200+</span>
              <span className="label">Articles Published</span>
            </div>
          </StatItem>
          <StatItem>
            <Clock className="icon" size={24} />
            <div className="content">
              <span className="value">Weekly</span>
              <span className="label">New Content</span>
            </div>
          </StatItem>
        </StatsContainer>

        <FilterContainer isVisible={isVisible}>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon}
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default BlogsHero;
