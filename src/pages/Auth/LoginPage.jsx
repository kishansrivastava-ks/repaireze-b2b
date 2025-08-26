// src/pages/LoginPage.jsx
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  ArrowRight,
  Home,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main Container
const LoginPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(-45deg, #f8fafc, #e2e8f0, #f1f5f9, #e7e5e4);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23000" opacity="0.02"/><circle cx="75" cy="75" r="1" fill="%23000" opacity="0.02"/><circle cx="50" cy="10" r="1" fill="%23000" opacity="0.01"/><circle cx="80" cy="40" r="1" fill="%23000" opacity="0.02"/><circle cx="10" cy="80" r="1" fill="%23000" opacity="0.01"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Left Side - Branding
const BrandingSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), #06b6d4);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="30" r="1.5" fill="white" opacity="0.15"/><circle cx="40" cy="70" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="80" r="2.5" fill="white" opacity="0.05"/><circle cx="10" cy="60" r="1.5" fill="white" opacity="0.1"/></svg>');
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: 200px;
  }
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const BrandText = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const BrandSubtext = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  text-align: center;
  line-height: 1.6;
  max-width: 300px;
  margin-bottom: 2rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;

  &::before {
    content: "✓";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

// Right Side - Login Form
const LoginSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;

  &:hover {
    color: #6b7280;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-primary), #06b6d4);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      // Navigation is handled inside the login function in AuthContext
    } catch (error) {
      toast.error("Login Failed: " + (error.error || "Invalid credentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <HomeButton onClick={() => navigate("/")}>
        <Home size={20} />
      </HomeButton>
      <ContentContainer>
        <BrandingSide>
          <BrandLogo>
            <LogoIcon>
              <BookOpen size={30} color="white" />
            </LogoIcon>
            <BrandText>RepairEze B2B BlogCMS</BrandText>
          </BrandLogo>

          <BrandSubtext>
            The modern content management system built for creators and writers.
          </BrandSubtext>

          <FeatureList>
            <FeatureItem>Create and manage blog posts effortlessly</FeatureItem>
            <FeatureItem>Rich text editor with modern features</FeatureItem>
            <FeatureItem>SEO optimization and analytics</FeatureItem>
            <FeatureItem>Responsive design and mobile support</FeatureItem>
          </FeatureList>
        </BrandingSide>

        <LoginSide>
          <LoginForm onSubmit={handleSubmit}>
            <FormHeader>
              <Title>Welcome back</Title>
              <Subtitle>Sign in to access your dashboard</Subtitle>
            </FormHeader>

            <InputGroup>
              <InputLabel>Email Address</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} />}
            </LoginButton>

            <FormFooter>
              Secure admin access to your blog management system
            </FormFooter>
          </LoginForm>
        </LoginSide>
      </ContentContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;

const HomeButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 5;
  color: #ffffff;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
