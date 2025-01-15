/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: url("/api/placeholder/search-service-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/api/placeholder/search-service-bg.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: 0;
  }

  @media (max-width: 768px) {
    height: 80vh;
    background: white;
    /* border: 2px solid red; */

    &::before {
      display: none;
    }

    background-image: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
`;

const Container = styled.div`
  width: 90%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-heavy);
  transform: translateY(${(props) => (props.isVisible ? "0" : "30px")});
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all var(--transition-slow);
  z-index: 2;

  @media (max-width: 768px) {
    width: 95%;
    padding: var(--spacing-lg);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: var(--spacing-lg);

  &:hover {
    select {
      border-color: var(--color-primary);
    }

    svg {
      color: var(--color-primary);
    }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-md);
  padding-right: var(--spacing-xl);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: white;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  appearance: none;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-muted);
  transition: color var(--transition-fast);
`;

const Button = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-medium);
  margin-top: var(--spacing-xl);

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform var(--transition-fast);
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const SearchServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate();

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const brands = [
    { name: "Select Your Service", link: "" },
    {
      name: "Electrical Appliances",
      link: "/services/electrical-appliances",
    },
    { name: "Deep Cleaning Service", link: "/services/deep-cleaning" },
    { name: "Pest Control Service", link: "/services/pest-control" },
    { name: "Plumbing Works", link: "/services/plumbing" },
    { name: "Carpentry Works", link: "/services/carpentry" },
    { name: "Electrical Works", link: "/services/electrical-works" },
  ];

  const handleSearch = () => {
    const brandLink = brands.find(
      (brand) => brand.name === selectedBrand
    )?.link;

    if (brandLink) {
      navigate(brandLink);
    } else {
      alert("Please select a valid service to search.");
    }
  };

  return (
    <Section>
      <Overlay />
      <Container ref={containerRef} isVisible={isVisible}>
        <Title>Search Services</Title>

        <SelectWrapper>
          <Select
            defaultValue={brands[0].name}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((brand, index) => (
              <option key={index} value={brand.name} disabled={index === 0}>
                {brand.name}
              </option>
            ))}
          </Select>
          <IconWrapper>
            <ChevronDown size={20} />
          </IconWrapper>
        </SelectWrapper>

        <Button onClick={handleSearch}>
          <Search size={20} />
          Search Services
        </Button>
      </Container>
    </Section>
  );
};

export default SearchServices;
