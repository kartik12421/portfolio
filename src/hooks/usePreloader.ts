import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolioData';

/**
 * Drives the boot loader that lives in index.html.
 *
 * The markup and its styles are inlined in index.html so the animation
 * paints on the first frame — before the JS bundle has finished loading.
 * This hook picks the overlay up once React mounts, ticks the percentage
 * and progress bar along, and dismisses it only when the portfolio behind
 * it is genuinely ready: fonts loaded, critical images fetched, window
 * load fired, and a minimum display time so the animation isn't a flash.
 *
 * @returns `true` once the page behind the loader should be revealed.
 */

/** Minimum time the animation stays on screen, so it never just flickers. */
const MIN_DISPLAY_MS = 1500;

/** Hard ceiling — never leave a visitor staring at the loader. */
const MAX_WAIT_MS = 8000;

/** Matches the overlay's 0.6s fade in index.html (+ a little slack). */
const FADE_MS = 800;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** Faces used across the site — fetched up front so text doesn't swap in
 *  with a fallback font right after the reveal. */
const CRITICAL_FONTS = [
  '400 16px Inter',
  '500 16px Inter',
  '600 16px Inter',
  '400 48px Fraunces',
  '600 48px Fraunces',
  '700 48px Fraunces',
  '400 11px "JetBrains Mono"',
  '500 11px "JetBrains Mono"',
];

/** Runs once per page load (guards React StrictMode's double effect). */
let started = false;

export function usePreloader(): boolean {
  const [isReady, setIsReady] = useState(
    () => typeof document === 'undefined' || !document.getElementById('preloader')
  );

  useEffect(() => {
    if (started) return;
    started = true;

    const el = document.getElementById('preloader');
    if (!el || el.dataset.state === 'done') {
      setIsReady(true);
      return;
    }
    el.dataset.state = 'active';

    const count = el.querySelector<HTMLElement>('[data-pl-count]');
    const fill = el.querySelector<HTMLElement>('[data-pl-fill]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let progress = 0;
    let isLoaded = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafId);
      el.dataset.state = 'done';
      el.classList.add('is-done'); // triggers the CSS fade
      document.documentElement.classList.remove('is-loading'); // unlock scroll
      setIsReady(true); // mount the portfolio behind the overlay
      window.setTimeout(() => el.remove(), FADE_MS);
    };

    const tick = () => {
      // Ease towards 90% while loading, then snap to 100% once ready —
      // honest at the end, alive the whole way through.
      const target = isLoaded ? 100 : 90;
      progress += (target - progress) * (isLoaded ? 0.16 : 0.03) + 0.3;
      if (progress > target) progress = target;

      if (count) count.textContent = String(Math.floor(progress));
      if (fill) fill.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;

      if (isLoaded && progress >= 99.5) {
        if (count) count.textContent = '100';
        if (fill) fill.style.transform = 'scaleX(1)';
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    // ── Readiness signals, raced against a safety timeout ──────────────
    const waitForLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });

    const waitForFonts = document.fonts
      ? Promise.all([
          ...CRITICAL_FONTS.map((face) => document.fonts.load(face).catch(() => [])),
          document.fonts.ready,
        ]).then(() => undefined)
      : Promise.resolve();

    // The hero portrait is the one eager image — fetch it during the
    // animation so it doesn't pop in a beat after the reveal.
    const waitForImages = Promise.all(
      [personalInfo.profileImage].map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = src;
          })
      )
    );

    const waitForMinDisplay = sleep(reduceMotion ? 400 : MIN_DISPLAY_MS);

    Promise.race([
      Promise.all([waitForMinDisplay, waitForLoad, waitForFonts, waitForImages]),
      sleep(MAX_WAIT_MS),
    ]).then(() => {
      isLoaded = true;
      // rAF can be throttled (background tab, headless, low-power mode), so
      // never let dismissal depend on it alone — finish from a timer too.
      window.setTimeout(() => {
        if (finished) return;
        if (count) count.textContent = '100';
        if (fill) fill.style.transform = 'scaleX(1)';
        finish();
      }, 750);
    });

    rafId = requestAnimationFrame(tick);
  }, []);

  return isReady;
}

export default usePreloader;
