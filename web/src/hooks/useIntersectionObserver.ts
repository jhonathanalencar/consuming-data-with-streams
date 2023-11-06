import { useCallback, useRef } from 'react';

export function useIntersectionObserver() {
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastRef = useCallback((playlist: HTMLDivElement) => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
    }

    intersectionObserver.current = new IntersectionObserver((data) => {
      if (data[0].isIntersecting) {
      }
    });

    if (playlist) {
      intersectionObserver.current.observe(playlist);
    }
  }, []);

  return lastRef;
}
