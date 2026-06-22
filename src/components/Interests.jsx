import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tags = [
  'WordPress',
  'WooCommerce',
  'Frontend Developer',
  'HTML',
  'CSS',
  'PHP',
  'MySQL',
  'PostgreSQL',
  'Bootstrap',
  'JavaScript',
  'React.js',
  'Laravel',
  'Elementor',
  'API Integration',
  'Git',
  'GitHub',
];

export default function Interests() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.int-header', {
        scrollTrigger: { trigger: '.int-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });

      gsap.fromTo(
        '.int-tag',
        { opacity: 0, y: 18, scale: 0.88 },
        {
          scrollTrigger: { trigger: '.int-cloud', start: 'top 85%' },
          opacity: 1, y: 0, scale: 1,
          stagger: { amount: 0.6, from: 'start' },
          duration: 0.55, ease: 'back.out(1.5)',
          clearProps: 'all',
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="interests" ref={ref}>
      <div className="container">
        <div className="int-header" style={{ marginBottom: '44px' }}>
          <span className="s-label">Passions</span>
          <h2 className="s-title">Interests & <span className="g-text">Technologies</span></h2>
        </div>

        <div className="int-cloud">
          {tags.map(tag => (
            <span
              key={tag}
              className="int-tag glass"
              style={{ border: '1px solid var(--border)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
