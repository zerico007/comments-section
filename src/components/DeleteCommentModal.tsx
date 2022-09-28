import { RefObject } from "react";
import styled from "styled-components";

import { Button } from "./Buttons";

interface ModalProps {
  handleConfirm: () => void;
  reference: RefObject<HTMLDialogElement>;
}

export const openModal = (ref: RefObject<HTMLDialogElement>) => {
  if (!ref.current) return;
  const dialog = ref?.current as HTMLDialogElement;
  dialog.showModal();
};

const ModalContainer = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  ::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: 250px;
  background-color: var(--white);
  padding: 20px;
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

export default function Modal({ handleConfirm, reference }: ModalProps) {
  const handleClose = () => {
    if (!reference.current) return;
    const dialog = reference?.current as HTMLDialogElement;
    dialog.close();
  };

  const confirmDelete = () => {
    handleConfirm();
    handleClose();
  };
  return (
    <ModalContainer ref={reference} className="delete-modal">
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
            onClick={confirmDelete}
            width="140px"
          />
        </div>
      </ModalBody>
    </ModalContainer>
  );
}
