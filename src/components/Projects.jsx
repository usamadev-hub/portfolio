import { useEffect, useRef, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import projects from '../data/projects';

const VISIBLE      = 3;
const INTERVAL_MS  = 4000;

export default function Projects() {
  const [startIdx, setStartIdx] = useState(0);
  const sectionRef  = useRef(null);
  const gridRef     = useRef(null);
  const intervalRef = useRef(null);
  const animating   = useRef(false);
  const idxRef      = useRef(0); // stays in sync for interval closures

  const total = projects.length;

  /* ── Slide transition ── */
  const transition = useCallback((nextIdx, dir = 1) => {
    if (animating.current) return;
    animating.current = true;
    idxRef.current = nextIdx;

    const outCards = gridRef.current?.querySelectorAll('.proj-card');

    const animateIn = () => {
      // flushSync forces React to commit the DOM before we query new cards
      flushSync(() => setStartIdx(nextIdx));

      const inCards = gridRef.current?.querySelectorAll('.proj-card');
      gsap.fromTo(
        inCards,
        { opacity: 0, x: dir * 60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.1, duration: 0.55, ease: 'power3.out',
          onComplete: () => { animating.current = false; },
        }
      );
    };

    if (outCards?.length) {
      gsap.to(outCards, {
        opacity: 0, x: dir * -60, scale: 0.95,
        stagger: 0.07, duration: 0.3, ease: 'power2.in',
        onComplete: animateIn,
      });
    } else {
      animateIn();
    }
  }, []);

  /* ── Auto-rotate — pause on hover ── */
  useEffect(() => {
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        transition((idxRef.current + 1) % total, 1);
      }, INTERVAL_MS);
    };
    const stopTimer = () => clearInterval(intervalRef.current);

    startTimer();
    const el = sectionRef.current;
    el?.addEventListener('mouseenter', stopTimer);
    el?.addEventListener('mouseleave', startTimer);

    return () => {
      stopTimer();
      el?.removeEventListener('mouseenter', stopTimer);
      el?.removeEventListener('mouseleave', startTimer);
    };
  }, [transition, total]);

  /* ── Section entrance (header + controls only — cards stay visible) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-header', {
        scrollTrigger: { trigger: '.proj-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.proj-controls', {
        scrollTrigger: { trigger: '.proj-controls', start: 'top 90%' },
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visibleProjects = Array.from({ length: VISIBLE }, (_, i) =>
    projects[(startIdx + i) % total]
  );

  const renderCard = (project) => (
    <div
      key={project.title}
      className="proj-card glass card-hover"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
        gsap.to(e.currentTarget, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power2.out', transformPerspective: 1200 });
      }}
      onMouseLeave={e => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
      }}
    >
      <div className="proj-img">
        <img src={project.img} alt={project.title} loading="lazy" />
        <span className="proj-badge">{project.badge}</span>
      </div>
      <div className="proj-body">
        <div className="proj-title">{project.title}</div>
        <p className="proj-desc">{project.desc}</p>
        <div className="proj-tags">
          {project.tags.slice(0, 3).map(t => <span key={t} className="proj-tag">{t}</span>)}
          {project.tags.length > 3 && (
            <span className="proj-tag proj-tag-more">+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">

        <div className="proj-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="s-label">My Work</span>
          <h2 className="s-title">Live <span className="g-text">Projects</span></h2>
          <p className="s-sub" style={{ margin: '14px auto 0' }}>
            Real websites I built, shipped, and delivered — each one
            live, client-approved, and results-driven.
          </p>
        </div>

        <div className="proj-grid" ref={gridRef}>
          {visibleProjects.map(renderCard)}
        </div>

        <div className="proj-controls">
          <button
            className="proj-nav-btn"
            onClick={() => transition((idxRef.current - 1 + total) % total, -1)}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <div className="proj-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`proj-dot${i === startIdx ? ' active' : ''}`}
                onClick={() => i !== startIdx && transition(i, i > startIdx ? 1 : -1)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="proj-nav-btn"
            onClick={() => transition((idxRef.current + 1) % total, 1)}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
}
