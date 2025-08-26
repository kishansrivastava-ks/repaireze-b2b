/* eslint-disable react/prop-types */
import styled from "styled-components";
import { X } from "lucide-react";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  &.confirm {
    background: var(--color-primary);
    color: white;
  }
  &.cancel {
    background: #e2e8f0;
    color: #475569;
  }
`;

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <div>{children}</div>
        <ModalActions>
          <Button className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="confirm" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
