import styled from "styled-components";
import {
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: max-content;
  padding: 2rem 10rem;
  background-color: var(--color-surface);
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 3rem;
  }

  & > div:first-child {
    flex-basis: 20%;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    height: 100%;

    @media (max-width: 768px) {
      align-items: center;
      text-align: center;
    }

    & > img {
      height: 4rem;
      width: auto;

      @media (max-width: 768px) {
        height: 3.5rem;
      }
    }

    .description {
      font-size: 0.9rem;
      color: var(--color-muted);
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

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }

    .social-icons {
      gap: 1.5rem;
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

    @media (max-width: 768px) {
      text-align: center;
    }

    .title {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-text);
      margin-bottom: 1rem;
    }

    .quick-links {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      @media (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem 1.5rem;
      }

      a {
        font-size: 0.9rem;
        color: var(--color-secondary-dark);
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
    height: 100%;

    @media (max-width: 768px) {
      flex-basis: 100%;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: row; /* or column, depending on your design */
    flex-wrap: wrap; /* to allow wrapping if needed */
    padding: 2rem 3rem; /* adjust padding for tablets */

    & > div:first-child {
      flex-basis: 30%; /* adjust as needed */
      align-items: center;
      text-align: center;
    }

    & > div:nth-child(2) {
      flex-basis: 30%; /* adjust as needed */
      text-align: center;
    }

    & > div:nth-child(3) {
      flex-basis: 100%; /* adjust as needed */
    }
  }
`;

const GetInTouch = styled.div`
  min-height: max-content;
  margin-bottom: 1rem;

  .heading {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);

    @media (max-width: 768px) {
      text-align: center;
      margin-bottom: 1rem;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }

    .container {
      flex: 1;
      text-align: left;
      padding: 1rem;
      color: var(--color-secondary-dark);
      transition: color 0.3s ease;

      &:not(:last-child) {
        border-right: 1px solid var(--color-border);

        @media (max-width: 768px) {
          border-right: none;
          border-bottom: 1px solid var(--color-border);
        }
      }

      &:hover {
        color: var(--color-primary);
        cursor: pointer;
      }
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      /* border: 1px solid red; */
      & > div {
        display: flex;
        align-items: flex-start;
        justify-content: start;
        gap: 0.5rem;
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .content {
      flex-direction: row;
      flex-wrap: wrap;

      .container {
        flex-basis: 45%;
        padding: 0.5rem;
        border-right: none;
        border-bottom: 1px solid var(--color-border);
      }
    }
  }
`;

const Services = styled.div`
  min-height: max-content;

  .heading {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  .services-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem 2rem;
  }
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
            <NavLink to="/faq">FAQs</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/terms">Terms and Conditions</NavLink>
            <NavLink to="/terms">Privacy Policy</NavLink>
          </div>
        </div>

        {/* Third Column (Placeholder for now) */}
        <div>
          <GetInTouch>
            <div className="heading">Get in Touch</div>
            <div className="content">
              <div className="container">
                <div>
                  <span>
                    <MapPin />
                  </span>
                  New Delhi Plot No. 320-A, Block P, Uttam Nagar East Delhi –
                  110059
                </div>
                <div>
                  <span>
                    <Phone />
                  </span>
                  9821212667
                </div>
              </div>
              <div className="container">
                <div>
                  <span>
                    <MapPin />
                  </span>
                  Varanasi 667 Dandupur Chandmari Shivpur Varanasi - 221003
                </div>
                <div>
                  <span>
                    <Phone />
                  </span>
                  8860887541
                </div>
              </div>
              {/* <div className="container">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae,
                corporis!
              </div> */}
            </div>
          </GetInTouch>
          <Services>
            <div className="heading">Services</div>
            <div className="services-list">
              <NavLink to="/services/electrical-appliances">
                Electrical Appliances
              </NavLink>
              <NavLink to="/services/deep-cleaning">Deep Cleaning</NavLink>
              <NavLink to="/services/pest-control">Pest Control</NavLink>
              <NavLink to="/services/plumbing">Plumbing</NavLink>
              <NavLink to="/services/carpentry">Carpentry</NavLink>
              <NavLink to="/services/electrical">Electrical</NavLink>
            </div>
          </Services>
        </div>
      </StyledFooter>
      <Copyright>
        Copyright &copy; 2025 | Mendt Technologies Pvt Ltd | All Rights Reserved
      </Copyright>
    </>
  );
}

export default Footer;
