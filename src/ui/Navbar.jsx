// Navbar.js
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
  padding: 1rem 4rem;
  background-color: var(--color-surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .nav-links {
    display: flex;
    gap: 2rem;
    margin: 0 15rem;
    /* border: 1px solid red; */
    flex-basis: 60%;

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
    font-size: 1.5rem;
    color: var(--color-text);
    cursor: pointer;
    border: 1px solid var(--color-primary);
    padding: 0.5rem;
    border-radius: 5px;

    &:hover {
      color: var(--color-primary);
    }
  }
`;
const LogoContainer = styled(NavLink)`
  /* border: 2px solid red; */
  height: 100%;
`;
const Logo = styled.img`
  max-height: 3rem;
  transform: scale(1.4) translateY(3px);
`;

function Navbar() {
  return (
    <StyledNavbar>
      <LogoContainer to="/">
        <Logo src="/logo.png" />
      </LogoContainer>

      <div className="nav-links">
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/about">Our Services</NavLink>
        <NavLink to="/services">Get Free Quota</NavLink>
        <NavLink to="/contact">Blogs</NavLink>
        <NavLink to="/contact">FAQs</NavLink>
        <NavLink to="/contact">About Us</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </div>

      <div className="search-icon flex-center">
        <FaSearch />
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
