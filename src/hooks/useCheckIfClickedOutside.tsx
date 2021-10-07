import { MutableRefObject, useEffect, useRef } from 'react';

function useCheckIfClickedOutside(
  elementRef: MutableRefObject<HTMLElement>,
  callback: () => void,
  conditionToCheck: boolean
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        conditionToCheck &&
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [callback, elementRef, conditionToCheck]);
}

export default useCheckIfClickedOutside;
