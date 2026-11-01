import { useEffect, useRef, useState } from 'react';
import { observeActivity } from '../lib/observeActivity';

export function useViewportActivity({ rootMargin = '0px', releaseDelay = 0 } = {}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return observeActivity(ref.current, setIsActive, { rootMargin, releaseDelay });
  }, [rootMargin, releaseDelay]);

  return { ref, isActive };
}
