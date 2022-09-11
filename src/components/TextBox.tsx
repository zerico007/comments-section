import styled from "styled-components";

const StyledTextBox = styled.textarea`
  width: 70%;
  height: 100px;
  border: 2px solid var(--light-gray);
  border-radius: 8px;
  padding: 10px;

  :focus {
    outline: none;
    border: 2px solid var(--moderate-blue);
  }
`;

export default function TextBox({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <StyledTextBox {...props} />;
}
