import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const langs = [
  { name: 'English', level: 'Full Professional Proficiency', pct: 90 },
  { name: 'Urdu',    level: 'Full Professional Proficiency', pct: 100 },
];

export default function Languages() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lang-header', {
        scrollTrigger: { trigger: '.lang-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });

      gsap.from('.lang-card', {
        scrollTrigger: { trigger: '.lang-grid', start: 'top 83%' },
        opacity: 0, y: 40, stagger: 0.2, duration: 0.8, ease: 'power3.out',
      });

      /* Animate language bars when they enter viewport */
      document.querySelectorAll('.lang-fill').forEach(bar => {
        const target = bar.dataset.pct;
        ScrollTrigger.create({
          trigger: bar,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(bar, { width: target + '%', duration: 1.5, ease: 'power2.out', delay: 0.2 });
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="languages" ref={ref}>
      <div className="container">
        <div className="lang-header">
          <span className="s-label">Communication</span>
          <h2 className="s-title" style={{ marginBottom: '44px' }}>
            Languages
          </h2>
        </div>

        <div className="lang-grid">
          {langs.map(({ name, level, pct }) => (
            <div key={name} className="lang-card glass card-hover">
              <div className="lang-name">{name}</div>
              <div className="lang-level">{level}</div>
              <div className="lang-bar">
                <div className="lang-fill" data-pct={pct} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
