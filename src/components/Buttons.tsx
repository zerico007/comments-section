import { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

import { Icon, Icons } from ".";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "primary" | "secondary" | "tertiary" | "danger";
  content: string | ReactNode;
  width?: string;
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
  tertiary: css`
    background-color: var(--grayish-blue);
    color: var(--white);
    text-transform: uppercase;

    :hover {
      background-color: var(--dark-blue);
    }
  `,
  danger: css`
    background-color: var(--soft-red);
    color: var(--white);
    text-transform: uppercase;

    :hover {
      background-color: var(--soft-red-hover);
    }
  `,
};

const buttonColors = (theme: ButtonProps["theme"]) => styles[theme];

const StyledButton = styled.button<Omit<ButtonProps, "content">>`
  width: ${(props) => props.width || "80px"};
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  font-size: 14px;
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

const ActionButton = ({
  action,
  onClick,
}: {
  action: "Reply" | "Edit" | "Delete";
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
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

export const ReplyButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton onClick={onClick} action="Reply" />
);
export const EditButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton onClick={onClick} action="Edit" />
);
export const DeleteButton = ({ onClick }: { onClick?: () => void }) => (
  <ActionButton onClick={onClick} action="Delete" />
);
