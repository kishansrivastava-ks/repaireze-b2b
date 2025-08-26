// src/components/DashboardLayout.jsx
import { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen} />
      <MainContent>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
