// MainLayout.js
// import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
      <Navbar />
      <MainBody>
        <Outlet />
      </MainBody>
      <Footer>&copy; 2024 MyWebsite. All Rights Reserved.</Footer>
    </LayoutWrapper>
  );
}

export default MainLayout;
