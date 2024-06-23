import { useStateWithOverride } from "~/hooks/use-state-with-override.hook";
import AutosizeInput, { AutosizeInputElement } from "./input/autosize-input";
import { useLayoutEffect, useRef } from "react";

export type InputProps<T> = {
  value: T;
  onChange: (newValue: T) => void;
  isEditable: boolean;
  valueFormatter?: (value: T) => string;
  className?: string;
};

export default function Input<T extends string | number>({
  value: valueProp,
  onChange,
  isEditable,
  valueFormatter,
  className,
}: InputProps<T>) {
  const inputRef = useRef<AutosizeInputElement | null>(null);

  const formattedValueProp = valueFormatter
    ? valueFormatter(valueProp)
    : valueProp.toString();
  const [value, setValue] = useStateWithOverride(formattedValueProp);

  const isNumberType = typeof valueProp === "number";

  const cursorPosition = useRef<CursorPosition>({
    start: 0,
    end: null,
    automaticallyAddedChars: 0,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.currentTarget.value;
    let coercedValue = rawValue as T;
    if (isNumberType) {
      rawValue = rawValue.replaceAll(/[^0-9\.]/g, "");

      let parsedValue = parseFloat(rawValue);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
      coercedValue = parsedValue as T;
    }

    if (valueFormatter) {
      rawValue = valueFormatter(coercedValue);
    }

    let automaticallyAddedChars = rawValue.length - value.length;
    if (automaticallyAddedChars > 0) {
      automaticallyAddedChars -= 1;
    } else {
      automaticallyAddedChars += 1;
    }

    cursorPosition.current = {
      start: event.currentTarget.selectionStart,
      end: event.currentTarget.selectionEnd,
      automaticallyAddedChars,
    };

    setValue(rawValue);
    onChange(coercedValue);
  };

  useLayoutEffect(() => {
    // Any time we format a value the cursor will get jumped
    // to the end of the line. We can manually reset the cursor
    // to the position it was previously in before the render
    // completes.
    let { start, end, automaticallyAddedChars } = cursorPosition.current;

    if (start) {
      start += automaticallyAddedChars;
    }

    if (end) {
      end += automaticallyAddedChars;
    }

    inputRef.current?.setSelectionRange(start, end);
  }, [value]);

  return (
    <AutosizeInput
      type="text"
      disabled={!isEditable}
      value={value}
      onChange={changeHandler}
      className={`bg-transparent border-none focus:outline-none row-span-full col-span-full ${
        isEditable ? "underline" : ""
      } underline-offset-4 ${className ?? ""}`}
      ref={inputRef}
      data-testid="input"
    />
  );
}

type CursorPosition = {
  start: number | null;
  end: number | null;
  automaticallyAddedChars: number;
};
