import styled from "styled-components";
import * as Avatars from "../images/avatars";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
  username: AvatarUsername;
}

export type AvatarUsername = keyof typeof Avatars;

const AvatarContainer = styled.div<AvatarProps>`
  width: ${({ small }) => (small ? "32px" : "48px")};
  height: ${({ small }) => (small ? "32px" : "48px")};
  border-radius: 50%;
  background-image: url(${({ username }) => Avatars[username]});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Avatar({ username, small, ...rest }: AvatarProps) {
  return <AvatarContainer username={username} small={small} {...rest} />;
}
