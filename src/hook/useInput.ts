import { useState } from "react";

const useInput = (): [
  string,
  React.ChangeEventHandler<HTMLInputElement>,
  () => void
] => {
  const [value, setValue] = useState<string>("");
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  const clear = (): void => {
    setValue("");
  };
  return [value, handler, clear];
};

export default useInput;
