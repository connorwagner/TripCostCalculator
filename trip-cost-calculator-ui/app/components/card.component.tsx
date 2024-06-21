import { MouseEventHandler, ReactNode } from "react";

export type CardProps = {
  colorClass?: string;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

export default function Card({
  colorClass,
  className,
  children,
  onClick,
}: CardProps) {
  return (
    <div
      className={`${colorClass ?? "bg-zinc-200"} rounded-xl p-4 ${
        className ?? ""
      }`}
      onClick={onClick}
      data-testid="card-container"
    >
      {children}
    </div>
  );
}
