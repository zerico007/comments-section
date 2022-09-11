import * as Icons from "./all";

interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: keyof typeof Icons;
}

export default function Icon({ name, ...props }: IconProps) {
  return <img src={Icons[name]} alt={name} {...props} />;
}
