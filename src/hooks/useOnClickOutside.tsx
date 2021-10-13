import { MutableRefObject, useEffect, useRef } from 'react';
import { InteractionEvent } from '../models/interactionEvent.model';

function useOnClickOutSide<T extends HTMLElement>(
  elementRef: MutableRefObject<T>,
  callback: (e: InteractionEvent) => void
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: InteractionEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        callback(e);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    document.addEventListener('touchstart', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
      document.removeEventListener('touchstart', checkIfClickedOutside);
    };
  }, [callback, elementRef]);
}

export default useOnClickOutSide;
