import { useState } from "react";

export type InputProps<T> = {
  value: T;
  onChange: (newValue: T) => void;
  isEditable: boolean;
};

export default function Input<T extends string | number>({
  value: valueProp,
  onChange,
  isEditable,
}: InputProps<T>) {
  const [value, setValue] = useState(valueProp.toString());

  const isNumberType = typeof value === "number";
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
        className={`border-none bg-transparent focus:outline-none ${
          isEditable ? "underline" : ""
        } underline-offset-4`}
      />
    </div>
  );
}