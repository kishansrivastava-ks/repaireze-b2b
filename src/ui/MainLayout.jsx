// MainLayout.js
// import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Navbar = styled.nav`
  background-color: var(--color-primary);
  color: var(--color-surface);
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nav-links {
    display: flex;
    gap: 1rem;

    a {
      color: var(--color-surface);
      text-decoration: none;
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const MainBody = styled.main`
  flex: 1;
  background-color: var(--color-bg);
  padding: 2rem;
  overflow-y: auto;
`;

const Footer = styled.footer`
  background-color: var(--color-secondary-dark);
  color: var(--color-surface);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
`;

function MainLayout() {
  return (
    <LayoutWrapper>
      <Navbar>
        <div className="logo">MyWebsite</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </Navbar>
      <MainBody>
        <Outlet />
      </MainBody>
      <Footer>&copy; 2024 MyWebsite. All Rights Reserved.</Footer>
    </LayoutWrapper>
  );
}

export default MainLayout;
