/* eslint-disable react/prop-types */
import styled from "styled-components";

const Section = styled.section`
  padding: 5rem;
  background: #fff;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  min-width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.div``;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text);
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  text-align: left;
`;

const BulletItem = styled.li`
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const AboutService = ({ title, description, bulletPoints }) => {
  return (
    <Section>
      <Container>
        <Title>{title}</Title>
        <Description>
          <Paragraph>{description}</Paragraph>
          <BulletList>
            {bulletPoints.map((point, index) => (
              <BulletItem key={index}>{point}</BulletItem>
            ))}
          </BulletList>
        </Description>
      </Container>
    </Section>
  );
};

export default AboutService;
