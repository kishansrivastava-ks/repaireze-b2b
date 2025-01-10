// import { useEffect, useRef, useState } from "react";
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
  /* text-align: center; */
  /* border: 2px solid red; */
  min-width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.div`
  /* max-width: 800px; */
  margin: 0 auto;
  /* text-align: center; */
`;

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
  /* border: 2px solid green; */
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

const ApplianceServiceSection = () => {
  return (
    <Section>
      <Container>
        <Title>
          Electrical Appliance Service: Professional Care for Your Home
          Essentials
        </Title>
        <Description>
          <Paragraph>
            Experience top-tier electrical appliance service with Repaireze{" "}
            {`-`}
            your trusted expert for all your home appliance needs. Our team of
            experienced professionals is committed to providing exceptional
            service and support for all your electrical appliances.
          </Paragraph>
          <BulletList>
            <BulletItem>
              Expert repairs and maintenance for all major household appliances
            </BulletItem>
            <BulletItem>
              Fast response time with same-day service availability
            </BulletItem>
            <BulletItem>
              Certified technicians with years of specialized experience
            </BulletItem>
            <BulletItem>
              Comprehensive service warranty on all repairs
            </BulletItem>
          </BulletList>
        </Description>
      </Container>
    </Section>
  );
};

export default ApplianceServiceSection;
