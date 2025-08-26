import styled, { keyframes } from "styled-components";
import { useAuth } from "../../context/AuthContext";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProfileContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  strong {
    width: 120px;
    color: #475569;
  }

  span {
    color: #1e293b;
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <ProfileContainer>
      <PageTitle>My Profile</PageTitle>
      <ProfileCard>
        <InfoRow>
          <strong>Email:</strong>
          <span>{user?.email}</span>
        </InfoRow>
        <InfoRow>
          <strong>Status:</strong>
          <span>Active</span>
        </InfoRow>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
