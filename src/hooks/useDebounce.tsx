import { useEffect, useRef } from 'react';

function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const id = setTimeout(callback, delay);
    return () => {
      clearTimeout(id);
    };
  }, [...dependencies]);
}

export default useDebounce;
