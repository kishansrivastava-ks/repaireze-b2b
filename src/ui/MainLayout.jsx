// MainLayout.js
// import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

function MainLayout() {
  return (
    <LayoutWrapper>
      <Navbar />
      <MainBody>
        <Outlet />
      </MainBody>
      <Footer />
    </LayoutWrapper>
  );
}

export default MainLayout;
