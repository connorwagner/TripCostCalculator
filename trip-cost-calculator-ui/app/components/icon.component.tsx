export type IconProps = {
  name: string;
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined text-3xl inline-block size-fit ${
        className ?? ""
      }`}
      data-testid="icon"
    >
      {name}
    </span>
  );
}
