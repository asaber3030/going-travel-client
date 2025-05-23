import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";

type Props = ButtonProps & {
  href: string;
  children: React.ReactNode;
};

export const LinkBtn = ({ href, children, ...props }: Props) => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};
