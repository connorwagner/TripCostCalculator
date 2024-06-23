// This file can be removed if/when this PR closes:
// https://github.com/yuanqing/autosize-input/pull/24
declare module "autosize-input" {
  type AutosizeInputOptions = { minWidth?: boolean | string };
  type AutosizeInputCleanup = () => void;

  function autosizeInput(
    element: HTMLInputElement,
    options?: AutosizeInputOptions
  ): AutosizeInputCleanup;

  export = autosizeInput;
}
