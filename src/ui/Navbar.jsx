import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 4rem;
  background-color: var(--color-surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    margin: 0 15rem;
    flex-basis: 60%;

    @media (max-width: 768px) {
      display: none;
    }

    a {
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-text);
      text-decoration: none;
      position: relative;
      padding: 0.5rem 0;

      &:hover {
        color: var(--color-primary);
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-primary);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.active {
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }

  .search-icon {
    font-size: 1rem;
    color: var(--color-text);
    cursor: pointer;
    border: 1px solid var(--color-primary);
    padding: 0.7rem;
    border-radius: 5px;

    &:hover {
      color: var(--color-primary);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LogoContainer = styled(NavLink)`
  height: 100%;

  @media (max-width: 768px) {
    transform: scale(0.9);
  }
`;

const Logo = styled.img`
  max-height: 3rem;
  transform: scale(1.4) translateY(3px);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background: var(--color-surface);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1001;
  padding: 2rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;

  a {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }

    &.active {
      color: var(--color-primary);
      font-weight: bold;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin-top: 2rem;

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
    background: transparent;
  }
`;

const ServicesDropDown = styled.div`
  height: auto;
  width: 16rem;
  background-color: white;
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateY(-1rem);
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
  padding-right: 2rem;
`;

const ServiceLink = styled(NavLink)`
  color: var(--color-text);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: #fff;
    transform: translateX(4px);
  }
`;
const OurServices = styled(NavLink)`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  position: relative;

  &:hover {
    color: var(--color-primary);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover ${ServicesDropDown} {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
`;

const OurServicesMobile = styled(NavLink)`
  /* border: 2px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const DropdownMobile = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  padding: 1rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform-origin: top;
  transform: scaleY(${(props) => (props.$isDropdownMobileOpen ? "1" : "0")});
  opacity: ${(props) => (props.$isDropdownMobileOpen ? "1" : "0")};
  max-height: ${(props) => (props.$isDropdownMobileOpen ? "max-content" : "0")};
  transition: all 0.3s ease;
`;
const StyledChevron = styled(ChevronDown)`
  transform: rotate(
    ${(props) => (props.$isDropdownMobileOpen ? "180deg" : "0deg")}
  );
  transition: transform 0.3s ease;
`;
const NavList = styled.nav`
  display: flex;
  flex-direction: column;
`;
const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  color: #1f2937;
  text-decoration: none;
  /* border-bottom: 1px solid #e5e7eb; */
  transition: background-color 0.3s;

  &:hover {
    background-color: #f3f4f6;
  }

  &:last-child {
    border-bottom: none;
  }
`;
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownMobileOpen, setIsDropdownMobileOpen] = useState(false);

  const services = [
    { name: "Electrical Appliances", path: "/services/electrical-appliances" },
    { name: "Deep Cleaning Service", path: "/services/deep-cleaning" },
    { name: "Pest Control Service", path: "/services/pest-control" },
    { name: "Plumbing Works", path: "/services/plumbing" },
    { name: "Carpentry Works", path: "/services/carpentry" },
    { name: "Electrical Works", path: "/services/electrical" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <StyledNavbar>
        <LogoContainer to="/">
          <Logo src="/logo.png" alt="Logo" />
        </LogoContainer>

        <div className="nav-links">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <OurServices to="/about">
            Our Services
            <ServicesDropDown>
              {services.map((service) => (
                <ServiceLink key={service.path} to={service.path}>
                  {service.name}
                </ServiceLink>
              ))}
            </ServicesDropDown>
          </OurServices>
          <NavLink to="/brands">Choose Brands</NavLink>
          <NavLink to="/contact">Blogs</NavLink>
          <NavLink to="/faq">FAQs</NavLink>
          <NavLink to="/contact">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>

        <div className="search-icon flex-center">
          <FaSearch />
        </div>

        <MobileMenuButton onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </MobileMenuButton>
      </StyledNavbar>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <MobileMenu isOpen={isOpen}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LogoContainer to="/" onClick={() => setIsOpen(false)}>
            <Logo src="/logo.png" alt="Logo" />
          </LogoContainer>
          <MobileMenuButton onClick={() => setIsOpen(false)}>
            <X size={24} />
          </MobileMenuButton>
        </div>

        <MobileSearchContainer>
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </MobileSearchContainer>

        <MobileNavLinks>
          <NavLink to="/" exact onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <OurServicesMobile
            onClick={() => setIsDropdownMobileOpen(!isDropdownMobileOpen)}
          >
            <span>Our Services</span>{" "}
            <StyledChevron
              size={20}
              $isDropdownMobileOpen={isDropdownMobileOpen}
            />
            <DropdownMobile $isDropdownMobileOpen={isDropdownMobileOpen}>
              <NavList>
                <StyledNavLink
                  to="/services/electrical-appliances"
                  onClick={() => setIsOpen(false)}
                >
                  Electrical Appliances
                </StyledNavLink>
                <StyledNavLink
                  to="/services/deep-cleaning"
                  onClick={() => setIsOpen(false)}
                >
                  Deep Cleaning
                </StyledNavLink>
                <StyledNavLink
                  to="/services/pest-control"
                  onClick={() => setIsOpen(false)}
                >
                  Pest Control
                </StyledNavLink>
                <StyledNavLink
                  to="/services/plumbing"
                  onClick={() => setIsOpen(false)}
                >
                  Plumbing
                </StyledNavLink>
                <StyledNavLink
                  to="/services/carpentry"
                  onClick={() => setIsOpen(false)}
                >
                  Carpentry
                </StyledNavLink>
                <StyledNavLink
                  to="/services/electrical"
                  onClick={() => setIsOpen(false)}
                >
                  Electrical
                </StyledNavLink>
              </NavList>
            </DropdownMobile>
          </OurServicesMobile>
          <NavLink to="/brands" onClick={() => setIsOpen(false)}>
            Choose brands
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Blogs
          </NavLink>
          <NavLink to="/faq" onClick={() => setIsOpen(false)}>
            FAQs
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact Us
          </NavLink>
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
}

export default Navbar;
