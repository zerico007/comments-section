import { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

import { Icon, Icons } from ".";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "primary" | "secondary";
  content: string | ReactNode;
}

const styles = {
  primary: css`
    background-color: var(--moderate-blue);
    color: var(--white);
    text-transform: uppercase;

    :hover {
      background-color: var(--moderate-blue-hover);
    }
  `,
  secondary: css`
    background-color: var(--white);
    color: var(--moderate-blue);

    :hover {
      background-color: var(--very-light-gray);
    }
  `,
};

const buttonColors = (theme: ButtonProps["theme"]) => styles[theme];

const StyledButton = styled.button<Omit<ButtonProps, "content">>`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  ${(props) => buttonColors(props.theme)}
`;

const actionIcons: Record<string, keyof typeof Icons> = {
  Reply: "replyIcon",
  Edit: "editIcon",
  Delete: "deleteIcon",
};

export function Button({ theme, content, ...props }: ButtonProps) {
  return (
    <StyledButton theme={theme} {...props}>
      {content}
    </StyledButton>
  );
}

const ActionButton = ({ action }: { action: "Reply" | "Edit" | "Delete" }) => {
  return (
    <Button
      theme="secondary"
      content={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "70px",
            color: action === "Delete" ? "var(--soft-red)" : undefined,
          }}
        >
          <Icon name={actionIcons[action]} />
          {action}
        </div>
      }
    />
  );
};

export const ReplyButton = () => <ActionButton action="Reply" />;
export const EditButton = () => <ActionButton action="Edit" />;
export const DeleteButton = () => <ActionButton action="Delete" />;
