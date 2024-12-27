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
  /* border-top: 1px solid var(--color-border); */
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
    flex-basis: 18%;
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
        color: var(--color-secondary-dark);
        /* color: var(color-primary-light); */
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
    flex-basis: 62%;
    /* border: 2px solid red; */
    height: 100%;
  }
`;
const GetInTouch = styled.div`
  /* border: 2px solid var(--color-primary-light); */
  min-height: max-content;
  margin-bottom: 1rem;

  .heading {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
  }

  .content {
    display: flex;
    justify-content: space-between;

    .container {
      flex: 1;
      text-align: center;
      padding: 1rem;
      color: var(--color-secondary-dark);
      transition: color 0.3s ease;

      &:not(:last-child) {
        border-right: 1px solid var(--color-border);
      }
      &:hover {
        color: var(--color-primar);
        cursor: pointer;
      }
    }
  }
`;
const Services = styled.div`
  /* border: 2px solid var(--color-secondary-light); */
  min-height: max-content;

  .heading {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 1rem;
    /* text-align: left; */
  }

  .services-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    a {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      /* font-weight: bold; */
      letter-spacing: 1px;
      color: var(--color-text);
      text-decoration: none;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background-color: var(--color-surface);
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: var(--color-primary);
        color: var(--color-surface);
      }

      &.active {
        background-color: var(--color-primary-dark);
        color: var(--color-surface);
      }
    }
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
        <div>
          <GetInTouch>
            <div className="heading">Get in Touch</div>
            <div className="content">
              <div className="container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, suscipit!
              </div>
              <div className="container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                inventore!
              </div>
              <div className="container">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae,
                corporis!
              </div>
            </div>
          </GetInTouch>
          <Services>
            <div className="heading">Services</div>
            <div className="services-list">
              <NavLink to="/insurance">Insurance</NavLink>
              <NavLink to="/games">Games</NavLink>
              <NavLink to="/logicboard">Logicboard</NavLink>
              <NavLink to="/data-recovery">Data Recovery</NavLink>
              <NavLink to="/laptop">Laptop</NavLink>
              <NavLink to="/macbook">Macbook</NavLink>
              <NavLink to="/liquid-damage">Liquid Damage</NavLink>
              <NavLink to="/unlocking">Unlocking</NavLink>
            </div>
          </Services>
        </div>
      </StyledFooter>
      <Copyright>
        Copyright &copy; 2024 Repaireze for Business | All Rights Reserved
      </Copyright>
    </>
  );
}

export default Footer;
