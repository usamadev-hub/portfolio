import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = ['about','experience','skills','projects','education','contact'];

export default function Navbar() {
  const [stuck,  setStuck]  = useState(false);
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState('');
  const navRef = useRef(null);

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-logo, .nav-links li, .nav-cta-wrap', {
        opacity: 0, y: -20, stagger: 0.07,
        duration: 0.7, ease: 'power3.out', delay: 0.2,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* Scroll: sticky glass + active section */
  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 50);

      const sections = links.map(id => document.getElementById(id)).filter(Boolean);
      const current = sections.findLast(s => s.getBoundingClientRect().top <= 120);
      setActive(current?.id || '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav id="navbar" ref={navRef} className={stuck ? 'stuck' : ''}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">
              <span className="g-text">UN</span><span style={{ color: 'var(--cyan)' }}>.</span>
            </a>

            <ul className="nav-links">
              {links.map(id => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'active' : ''}
                    onClick={e => { e.preventDefault(); scrollTo(id); }}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav-cta-wrap">
              <button className="nav-cta" onClick={() => scrollTo('contact')}>
                Let's Talk
              </button>
            </div>

            <button
              className={`hamburger ${open ? 'open' : ''}`}
              onClick={() => setOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        <ul>
          {links.map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
