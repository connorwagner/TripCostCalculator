export type IconProps = {
  name: string;
};

export default function Icon({ name }: IconProps) {
  return (
    <span className="material-symbols-outlined text-5xl inline-block size-fit">
      {name}
    </span>
  );
}
