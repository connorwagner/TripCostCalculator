import { MouseEventHandler, ReactNode, Ref, forwardRef } from "react";

export type CardElement = HTMLDivElement;

export type CardProps = {
  colorClass?: string;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

export default forwardRef<CardElement, CardProps>(function Card(
  { colorClass, className, children, onClick },
  ref
) {
  return (
    <div
      className={`${colorClass ?? "bg-zinc-200"} rounded-xl p-4 ${
        className ?? ""
      }`}
      onClick={onClick}
      ref={ref}
      data-testid="card-container"
    >
      {children}
    </div>
  );
});
