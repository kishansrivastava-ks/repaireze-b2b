import styled from "styled-components";
import {
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  height: max-content;
  padding: 2rem 10rem;
  background-color: var(--color-surface);
  gap: 2rem;

  & > div:first-child {
    flex-basis: 20%;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    /* border: 2px solid red; */
    height: 100%;

    & > img {
      height: 4rem;
      width: auto;
    }

    .description {
      font-size: 0.9rem;
      color: var(--color-muted);
      /* margin-bottom: 1rem; */
      text-align: center;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text);
      justify-content: center;
      width: 100%;
      .icon {
        font-size: 1.2rem;
        color: var(--color-primary);
      }
    }

    .social-icons {
      gap: 1rem;
      width: 100%;

      a {
        font-size: 1.2rem;
        color: var(--color-muted);
        transition: color 0.3s ease;

        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }

  & > div:nth-child(2) {
    flex-basis: 20%;
    text-align: left;

    .title {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-text);
      margin-bottom: 1rem;
    }

    .quick-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      a {
        font-size: 0.9rem;
        color: var(--color-muted);
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: var(--color-primary);
        }

        &.active {
          color: var(--color-primary);
          font-weight: bold;
        }
      }
    }
  }
  & > div:nth-child(3) {
    flex-basis: 60%;
    border: 2px solid red;
  }
`;

const Copyright = styled.footer`
  background-color: var(--color-primary-light);
  color: var(--color-surface);
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  letter-spacing: 1px;
`;

function Footer() {
  return (
    <>
      <StyledFooter className="flex-center">
        {/* First Column */}
        <div>
          <img src="/logo.png" alt="logo" />
          <div className="description">
            Providing the best repair services for your appliances.
          </div>
          <div className="contact">
            <FaEnvelope className="icon" />
            <span>contact@repaireze.com</span>
          </div>
          <div className="social-icons flex-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Second Column */}
        <div>
          <div className="title">Quick Links</div>
          <div className="quick-links">
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/repair">Repair</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/faqs">FAQs</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/terms">Terms and Conditions</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
          </div>
        </div>

        {/* Third Column (Placeholder for now) */}
        <div>box 3</div>
      </StyledFooter>
      <Copyright>
        Copyright &copy; 2024 Repaireze for Business | All Rights Reserved
      </Copyright>
    </>
  );
}

export default Footer;
