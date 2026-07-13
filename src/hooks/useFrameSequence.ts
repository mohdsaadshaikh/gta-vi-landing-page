import { useEffect, useRef, useState } from "react";

interface UseFrameSequenceOptions {
  frameCount: number;
  getFramePath: (index: number) => string;
  priorityCount?: number;
}

interface UseFrameSequenceResult {
  readyToAnimate: boolean;
  getBestAvailableFrame: (index: number) => HTMLImageElement | null;
}

/**
 * Loads a numbered image sequence for scroll-scrubbing.
 * Priority frames load first and block until ready.
 * The rest load quietly in the background afterward.
 */
export function useFrameSequence({
  frameCount,
  getFramePath,
  priorityCount = 10, // how many frames must load before we say "ready"
}: UseFrameSequenceOptions): UseFrameSequenceResult {
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadedFlagsRef = useRef<boolean[]>(new Array(frameCount).fill(false));
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images = new Array<HTMLImageElement>(frameCount);
    imagesRef.current = images;

    function loadFrame(i: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (cancelled) return resolve();
          images[i] = img;
          loadedFlagsRef.current[i] = true;
          resolve();
        };
        img.onerror = () => resolve();
      });
    }

    async function run() {
      // 1. load the priority batch first, and wait for it
      const priorityIndices = Array.from(
        { length: Math.min(priorityCount, frameCount) },
        (_, i) => i
      );
      await Promise.all(priorityIndices.map(loadFrame));

      if (cancelled) return;
      setReadyToAnimate(true); // unblock GSAP setup now

      // 2. load the rest quietly, one by one, in the background
      for (let i = priorityCount; i < frameCount; i++) {
        if (cancelled) return;
        await loadFrame(i);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [frameCount, getFramePath, priorityCount]);

  /**
   * Returns the best available frame for a requested index.
   * If the exact frame isn't loaded yet, falls back to the
   * nearest earlier loaded frame instead of showing nothing.
   */
  function getBestAvailableFrame(index: number): HTMLImageElement | null {
    const images = imagesRef.current;
    const loaded = loadedFlagsRef.current;

    if (loaded[index]) return images[index] || null;

    for (let i = index; i >= 0; i--) {
      if (loaded[i]) return images[i] || null;
    }
    return null;
  }

  return { readyToAnimate, getBestAvailableFrame };
}