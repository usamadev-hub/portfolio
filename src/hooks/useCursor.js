import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power2.out' });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'var(--violet)', duration: 0.25 });
      gsap.to(dot,  { scale: 0, duration: 0.25 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(139,92,246,0.55)', duration: 0.25 });
      gsap.to(dot,  { scale: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove);

    const targets = document.querySelectorAll('a, button, .card-hover');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return { dotRef, ringRef };
}
