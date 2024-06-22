import { useStateWithOverride } from "~/hooks/use-state-with-override.hook";

export type InputProps<T> = {
  value: T;
  onChange: (newValue: T) => void;
  isEditable: boolean;
  className?: string;
};

export default function Input<T extends string | number>({
  value: valueProp,
  onChange,
  isEditable,
  className,
}: InputProps<T>) {
  const [value, setValue] = useStateWithOverride(valueProp.toString());

  const isNumberType = typeof valueProp === "number";
  const inputType = isNumberType ? "number" : "text";

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    setValue(rawValue);

    const coercedValue = (isNumberType ? parseFloat(rawValue) : rawValue) as T;
    onChange(coercedValue);
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1">
      <input
        type={inputType}
        disabled={!isEditable}
        value={value}
        onChange={changeHandler}
        size={0}
        className={`text-center border-none bg-transparent focus:outline-none ${
          isEditable ? "underline" : ""
        } underline-offset-4 ${className ?? ""}`}
        data-testid="input"
      />
    </div>
  );
}
