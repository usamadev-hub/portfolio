import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaWordpress, FaPlug, FaFileAlt, FaTools } from 'react-icons/fa';

const skills = [
  {
    icon:  <FaCode />,
    title: 'Web Development',
    tags:  ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    icon:  <FaWordpress />,
    title: 'WordPress Expertise',
    tags:  ['Custom Theme Development', 'WooCommerce', 'Elementor Pro', 'WP Bakery', 'Divi', 'ACF'],
  },
  {
    icon:  <FaPlug />,
    title: 'Third-Party Integration',
    tags:  ['CRM Systems (EDM)', 'CallGrid', 'Ringba', 'API Integration'],
  },
  {
    icon:  <FaFileAlt />,
    title: 'Form Development',
    tags:  ['Custom Contact Forms', 'Dynamic Fields', 'User Info Submissions'],
  },
  {
    icon:  <FaTools />,
    title: 'Tools & Platforms',
    tags:  ['Webflow (Basic)', 'Git', 'cPanel', 'Hosting', 'Google Cloud (GCP)'],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header', {
        scrollTrigger: { trigger: '.skills-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.skill-card', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
        opacity: 0, y: 50, scale: 0.95,
        stagger: { amount: 0.5, from: 'start' },
        duration: 0.7, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="s-label">What I Know</span>
          <h2 className="s-title">Skills & <span className="g-text">Expertise</span></h2>
        </div>

        <div className="skills-grid">
          {skills.map(({ icon, title, tags }) => (
            <div key={title} className="skill-card glass card-hover">
              <div className="sk-ico">{icon}</div>
              <div className="sk-title">{title}</div>
              <div className="sk-tags">
                {tags.map(t => <span key={t} className="sk-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
