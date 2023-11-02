import { useEffect, useRef } from 'react';

export function useExecuteOnMount(callback: Function) {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) return;

    callback();

    return () => {
      isMountedRef.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
