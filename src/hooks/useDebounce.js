import { useEffect, useState } from "react";

/**
 * Delays a value change until after a specified delay.
 * Used to debounce search input before triggering API call.
 */
export  function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timer); // cleanup on retype
  }, [value, delay]);

  return debounced;
}
