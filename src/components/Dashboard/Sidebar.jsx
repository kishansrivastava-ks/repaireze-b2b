// Sidebar Component
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Edit3, Eye, LogOut, BookOpen, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarContainer = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  box-shadow: ${(props) =>
    props.isOpen ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none"};

  @media (max-width: 768px) {
    position: fixed;
    height: 100vh;
    z-index: 1000;
  }
`;

const LogoContainer = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  /* gap: 1rem; */
`;

const LogoText = styled.h1`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionLabel = styled.div`
  padding: 0 1.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  margin: 0.25rem 1rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: var(--color-primary);
    transform: translateX(4px);
  }

  &.active {
    background: linear-gradient(135deg, var(--color-primary), #06b6d4);
    color: white;
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);

    &::before {
      content: "";
      position: absolute;
      left: -1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 24px;
      background: var(--color-primary);
      border-radius: 0 4px 4px 0;
    }
  }
`;

const UserSection = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: white;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  truncate: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem;
  width: 100%;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
    border-color: #fecaca;
  }
`;

const Sidebar = ({ isOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const getUserInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <LogoContainer>
        <HomeButton onClick={() => navigate("/")}>
          <Home size={24} />
        </HomeButton>
        <LogoText>RPR_B2B BlogCMS</LogoText>
      </LogoContainer>

      <Nav>
        <NavSection>
          <SectionLabel>Dashboard</SectionLabel>
          <StyledNavLink to="/dashboard/profile">
            <User size={20} />
            Profile
          </StyledNavLink>
        </NavSection>

        <NavSection>
          <SectionLabel>Content</SectionLabel>
          <StyledNavLink to="/dashboard/create-blog">
            <Edit3 size={20} />
            Create Blog
          </StyledNavLink>
          <StyledNavLink to="/dashboard/my-blogs">
            <Eye size={20} />
            My Blogs
          </StyledNavLink>
        </NavSection>
      </Nav>

      <UserSection>
        <UserProfile>
          <UserAvatar>{getUserInitials(user?.email)}</UserAvatar>
          <UserInfo>
            <UserName>Current User</UserName>
            <UserEmail>{user?.email || "user@example.com"}</UserEmail>
          </UserInfo>
        </UserProfile>

        <LogoutButton onClick={logout}>
          <LogOut size={18} />
          Sign Out
        </LogoutButton>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  cursor: pointer;
  border-radius: 50%;

  &:hover {
    opacity: 0.8;
    background-color: white;
  }
`;
