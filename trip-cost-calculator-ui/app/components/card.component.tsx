import { MouseEventHandler, ReactNode } from "react";

export type CardProps = {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

export default function Card({ className, children, onClick }: CardProps) {
  return (
    <div
      className={`bg-zinc-200 rounded-xl p-4 ${className ?? ""}`}
      onClick={onClick}
      data-testid="card-container"
    >
      {children}
    </div>
  );
}
