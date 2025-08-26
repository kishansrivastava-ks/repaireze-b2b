// Header Component
import styled from "styled-components";
import { Menu, X, Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 900;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: var(--color-primary);
  }
`;

const PageTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #f8fafc;
  font-size: 0.875rem;
  width: 240px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
`;

const NotificationButton = styled.button`
  background: none;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: var(--color-primary);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary), #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
`;

const WelcomeText = styled.span`
  font-weight: 500;
  color: #334155;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();

  const getUserInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes("/create-blog")) return "Create Blog";
    if (path.includes("/my-blogs")) return "My Blogs";
    if (path.includes("/profile")) return "Profile";
    return "Dashboard";
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <ToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </ToggleButton>
        <PageTitle>{getPageTitle()}</PageTitle>
      </LeftSection>

      <RightSection>
        <SearchContainer>
          <SearchIcon size={16} />
          <SearchInput type="text" placeholder="Search blogs..." />
        </SearchContainer>

        <NotificationButton>
          <Bell size={18} />
        </NotificationButton>

        <UserButton>
          <UserAvatar>{getUserInitials(user?.email)}</UserAvatar>
          <WelcomeText>
            {user ? `Welcome, ${user.email.split("@")[0]}` : "Welcome"}
          </WelcomeText>
        </UserButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
