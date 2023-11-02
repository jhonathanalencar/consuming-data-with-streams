import { useState } from 'react';

import { useExecuteOnMount } from './useExecuteOnMount';

export function useImageUrlWithFallback(imageUrl: string, fallbackUrl: string) {
  const [imageUrlWithFallback, setImageUrlWithFallback] = useState(imageUrl);

  function checkImageAvailability() {
    fetch(imageUrl).catch(() => {
      setImageUrlWithFallback(fallbackUrl);
    });
  }

  useExecuteOnMount(checkImageAvailability);

  return { imageUrlWithFallback };
}
