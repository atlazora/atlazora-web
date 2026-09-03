import type { AnchorHTMLAttributes } from "react";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function TextLink({ className = "", ...props }: TextLinkProps) {
  const classes = ["atlazora-text-link", className].filter(Boolean).join(" ");

  return <a className={classes} {...props} />;
}
