import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PageTransition from "../utils/PageTransition";

const Section = styled.section`
  padding: 5rem 0;
  background: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  @media (max-width: 480px) {
    width: 95%;
    padding: 0 0.5rem;
  }
`;

const TermsHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TermsContent = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "20px")});
  transition: all 0.8s ease-out;
  transition-delay: 200ms;
`;

const Section1 = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const SectionContent = styled.div`
  color: var(--color-primary);
  line-height: 1.8;

  p {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const BulletList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.8;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

function Terms() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <PageTransition>
      <Section>
        <Container>
          <TermsHeader
            ref={(el) => (sectionRefs.current[0] = el)}
            isVisible={visibleItems.has(0)}
          >
            <Title>Terms & Conditions</Title>
            <Subtitle>Privacy Policy</Subtitle>
          </TermsHeader>

          <TermsContent
            ref={(el) => (sectionRefs.current[1] = el)}
            isVisible={visibleItems.has(1)}
          >
            <Section1>
              <SectionTitle>1. Services Provided</SectionTitle>
              <SectionContent>
                <p>
                  RepairEze offers repair, maintenance, and installation
                  services for a wide range of home appliances including but not
                  limited to refrigerators, washing machines,
                  refrigerator&apos;s, ovens, air conditioners, and dryers. The
                  services will be performed at the location specified by the
                  customer at the time of booking.
                </p>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>2. Service Appointment and Fees</SectionTitle>
              <SectionContent>
                <BulletList>
                  <li>
                    <strong>Booking</strong>: Customers must schedule services
                    through our website or customer support.
                  </li>
                  <li>
                    <strong>Service Call Fee</strong>: An initial service call
                    fee will be charged for on-site diagnosis. This fee will be
                    applied toward the cost of repair if the service is approved
                    by the customer.
                  </li>
                  <li>
                    <strong>Pricing</strong>: Prices for repairs are determined
                    after diagnosis and are based on the type of appliance, the
                    extent of damage, and the parts required. Repair costs will
                    be provided upfront before commencing the repair.
                  </li>
                  <li>
                    <strong>Payment</strong>: All payments must be made upon
                    completion of services unless otherwise agreed upon.
                  </li>
                </BulletList>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>3. Warranty on Services and Parts</SectionTitle>
              <SectionContent>
                <BulletList>
                  <li>
                    <strong>Parts Warranty</strong>: Any parts provided and
                    installed by RepairEze come with a warranty for a period of
                    30 days from the date of service. If any part fails during
                    the warranty period, it will be replaced at no additional
                    charge.
                  </li>
                  <li>
                    <strong>Labor Warranty</strong>: RepairEze offers a 30-day
                    warranty on labor for repairs conducted. If the same issue
                    recurs within the warranty period, we will re-perform the
                    service free of charge.
                  </li>
                  <li>
                    <strong>Exclusions</strong>: Warranty does not cover issues
                    resulting from misuse, accidents, or unauthorized repairs.
                  </li>
                </BulletList>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>4. Customer Responsibilities</SectionTitle>
              <SectionContent>
                <BulletList>
                  <li>
                    <strong>Access</strong>: The customer must provide
                    unobstructed access to the appliance and any necessary
                    utilities such as electricity and water.
                  </li>
                  <li>
                    <strong>Accurate Information</strong>: Customers must
                    provide accurate information about the appliance and the
                    nature of the issue to help our technicians perform proper
                    diagnosis and repairs.
                  </li>
                  <li>
                    <strong>Payment</strong>: Payment for services is due
                    immediately upon completion unless other arrangements have
                    been made.
                  </li>
                </BulletList>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>5. Limitation of Liability</SectionTitle>
              <SectionContent>
                <p>
                  RepairEze&apos;s liability for any damages or loss arising
                  from its services is limited to the amount paid by the
                  customer for the service. The company is not liable for any
                  indirect, incidental, or consequential damages.
                </p>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>6. Cancellation Policy</SectionTitle>
              <SectionContent>
                <BulletList>
                  <li>
                    <strong>Cancellation</strong>: Customers may cancel or
                    reschedule a service appointment with at least 24
                    hours&apos; notice. Failure to do so may result in a
                    cancellation fee.
                  </li>
                  <li>
                    <strong>Missed Appointments</strong>: If the customer is
                    unavailable at the time of the scheduled service, RepairEze
                    reserves the right to charge a missed appointment fee.
                  </li>
                </BulletList>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>7. Privacy and Data Protection</SectionTitle>
              <SectionContent>
                <p>
                  RepairEze is committed to protecting your privacy. Any
                  personal information provided by the customer will only be
                  used for the purposes of scheduling and completing services.
                  We will not sell or share your personal information with third
                  parties without your consent, except as required by law.
                </p>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>8. Terms of Service Amendments</SectionTitle>
              <SectionContent>
                <p>
                  RepairEze reserves the right to modify or update these Terms
                  and Conditions at any time. Customers will be notified of any
                  significant changes, and the updated terms will be effective
                  immediately upon posting.
                </p>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>9. Dispute Resolution</SectionTitle>
              <SectionContent>
                <p>
                  Any disputes or claims arising out of or relating to these
                  Terms and Conditions shall be resolved through arbitration or
                  mediation, as applicable, in the jurisdiction where RepairEze
                  is located.
                </p>
              </SectionContent>
            </Section1>

            <Section1>
              <SectionTitle>10. Governing Law</SectionTitle>
              <SectionContent>
                <p>
                  These Terms and Conditions shall be governed by and construed
                  in accordance with the laws of Indian constitution, without
                  regard to its conflict of law principles.
                </p>
              </SectionContent>
            </Section1>
          </TermsContent>
        </Container>
      </Section>
    </PageTransition>
  );
}

export default Terms;
