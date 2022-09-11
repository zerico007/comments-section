import styled from "styled-components";

import { Button } from "./Buttons";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 400px;
  height: 250px;
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  h3 {
    color: var(--dark-blue);
  }

  p {
    color: var(--grayish-blue);
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 475px) {
    width: 95%;
  }
`;

export default function Modal({
  isOpen,
  handleClose,
  handleConfirm,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <ModalBackground>
          <ModalBody>
            <h3>Delete Comment</h3>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and cannot be undone.
            </p>
            <div className="modal-buttons">
              <Button
                theme="tertiary"
                content="no, cancel"
                onClick={handleClose}
                width="140px"
              />
              <Button
                theme="danger"
                content="yes, delete"
                onClick={handleConfirm}
                width="140px"
              />
            </div>
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
}
