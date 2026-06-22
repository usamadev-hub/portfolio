import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import personalProjects from '../data/personalProjects';

export default function PersonalProjects() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.per-header', {
        scrollTrigger: { trigger: '.per-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.per-card', {
        scrollTrigger: { trigger: '.per-grid', start: 'top 82%' },
        opacity: 0, y: 50,
        stagger: 0.2, duration: 0.85, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="personal" ref={ref}>
      <div className="container">
        <div className="per-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="s-label">Specialized Work</span>
          <h2 className="s-title">Technical <span className="g-text">Builds</span></h2>
        </div>

        <div className="per-grid">
          {personalProjects.map(({ icon: Icon, title, desc, bullets }) => (
            <div key={title} className="per-card glass card-hover">
              <div className="per-ico"><Icon /></div>
              <div className="per-title">{title}</div>
              <p className="per-desc">{desc}</p>
              <ul className="per-list">
                {bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
