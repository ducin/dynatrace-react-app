import { useState } from "react";

export const useToggle = (init = false) => {
  // private API
  const [value, setValue] = useState(init);
  const toggleValue = () => {
    setValue((prev) => !prev);
  }
  // public API
  return [ value, toggleValue ] as const
  // return { value, toggleValue }
}
