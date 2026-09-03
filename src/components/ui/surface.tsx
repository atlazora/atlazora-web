import type { HTMLAttributes } from "react";

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export function Surface({ className = "", ...props }: SurfaceProps) {
  const classes = ["atlazora-surface", className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}
