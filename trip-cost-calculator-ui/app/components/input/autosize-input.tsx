import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import autosizeInput from "autosize-input";

export type AutosizeInputElement = HTMLInputElement;

export type AutosizeInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default forwardRef<AutosizeInputElement, AutosizeInputProps>(
  function AutosizeInput({ children, ...props }, forwardRef) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardRef, () => inputRef.current!, [inputRef]);

    useEffect(() => {
      if (inputRef.current) {
        const cleanupAutosizeInput = autosizeInput(inputRef.current, {
          minWidth: true,
        });
        return cleanupAutosizeInput;
      }
    }, [inputRef.current]);

    useEffect(() => {
      // autosize-input listens to input events on the input element.
      // Those events fire on user input but not when React changes
      // the value, so we need to fire an input event on value change.
      inputRef.current?.dispatchEvent(new InputEvent("input"));
    }, [props.value]);

    return (
      <input {...props} ref={inputRef}>
        {children}
      </input>
    );
  }
);
