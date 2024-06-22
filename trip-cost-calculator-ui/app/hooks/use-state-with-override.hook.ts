import { useEffect, useState } from "react";

export function useStateWithOverride<T>(
  propValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(propValue);

  useEffect(() => setValue(propValue), [propValue]);

  return [value, setValue];
}
