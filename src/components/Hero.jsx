import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaLinkedinIn, FaEnvelope, FaEye, FaPaperPlane, FaWordpress, FaDatabase } from 'react-icons/fa';
import { SiWoocommerce, SiReact } from 'react-icons/si';

const ROLES = [
  'WordPress Developer',
  'WooCommerce Expert',
  'CRM Integration Specialist',
  'Frontend Developer',
];

function useTypewriter(words) {
  const [idx,      setIdx]      = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused,   setPaused]   = useState(false);

  useEffect(() => {
    if (paused) return;
    const word  = words[idx];
    const speed = deleting ? 42 : 78;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setCharIdx(c => c + 1);
        } else {
          setPaused(true);
          setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setIdx(i => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, paused, idx, words]);

  return words[idx].slice(0, charIdx);
}

export default function Hero() {
  const ref   = useRef(null);
  const typed = useTypewriter(ROLES);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.hero-badge',   { opacity: 1, y: 0,   duration: 0.8, ease: 'back.out(1.7)' }, 0.3)
        .to('.hero-pre',     { opacity: 1, y: 0,   duration: 0.7 }, 0.55)
        .to('.name-inner',   { opacity: 1, y: '0%',duration: 0.9, stagger: 0.12, ease: 'expo.out' }, 0.7)
        .to('.hero-role',    { opacity: 1, duration: 0.6 }, 1.1)
        .to('.hero-desc',    { opacity: 1, y: 0,   duration: 0.8 }, 1.3)
        .to('.hero-actions', { opacity: 1, y: 0,   duration: 0.7, ease: 'back.out(1.4)' }, 1.5)
        .to('.hero-socials', { opacity: 1, duration: 0.6 }, 1.65)
        .to('.hero-stats',   { opacity: 1, y: 0,   duration: 0.7 }, 1.8)
        /* Right column visual */
        .to('.hero-visual',  { opacity: 1, x: 0,   duration: 1.1, ease: 'expo.out' }, 0.5);

      /* Card and badges animate independently */
      gsap.to('.hv-card', {
        opacity: 1, scale: 1,
        duration: 1.0, ease: 'back.out(1.3)',
        delay: 0.9,
      });
      gsap.to('.hv-badge', {
        opacity: 1, y: 0,
        stagger: 0.14, duration: 0.7,
        ease: 'back.out(1.6)',
        delay: 1.2,
      });

      /* Counter animation */
      const counters = [
        { el: '#stat-projects', to: 20 },
        { el: '#stat-crm',      to: 5 },
      ];
      counters.forEach(({ el, to }) => {
        const target = document.querySelector(el);
        if (!target) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: to, duration: 1.8, delay: 2.2, ease: 'power2.out',
          onUpdate: () => { target.textContent = Math.round(obj.val); },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  /* Back to top button */
  useEffect(() => {
    const btt = document.querySelector('.btt');
    if (!btt) return;
    const onScroll = () => btt.classList.toggle('show', window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" ref={ref}>
      {/* Background */}
      <div className="hero-dots" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="container">
        <div className="hero-inner">

          {/* ── LEFT: Text content ── */}
          <div className="hero-content">

            <div className="hero-badge" style={{ transform: 'translateY(-20px)' }}>
              <span className="avail-dot" />
              Available for New Projects
            </div>

            <p className="hero-pre" style={{ transform: 'translateY(20px)' }}>Hi, I'm</p>

            <h1 className="hero-name">
              <span className="name-line">
                <span className="name-inner">Usama</span>
              </span>
              <span className="name-line">
                <span className="name-inner g-text">Naeem</span>
              </span>
            </h1>

            <div className="hero-role">
              <span className="typed-text">{typed}</span>
              <span className="typed-cursor" />
            </div>

            <p className="hero-desc" style={{ transform: 'translateY(20px)' }}>
              A detail-oriented <strong>WordPress Developer</strong> with <strong>3+ years</strong> of
              hands-on experience building dynamic websites, seamless CRM integrations, and
              WooCommerce solutions that perform beautifully across all devices.
            </p>

            <div className="hero-actions" style={{ transform: 'translateY(20px)' }}>
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <FaEye /> View My Work
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <FaPaperPlane /> Get In Touch
              </a>
            </div>

            <div className="hero-socials">
              <span className="lbl">Connect</span>
              <div className="links">
                <a href="https://linkedin.com/in/usama-naeem-46b8892a8" target="_blank" rel="noreferrer" className="soc-ico" title="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="mailto:usama.poshnee@gmail.com" className="soc-ico" title="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div className="hero-stats" style={{ transform: 'translateY(20px)' }}>
              <div>
                <div className="stat-num">3+</div>
                <div className="stat-lbl">Years Experience</div>
              </div>
              <div>
                <div className="stat-num"><span id="stat-projects">0</span>+</div>
                <div className="stat-lbl">Live Projects</div>
              </div>
              <div>
                <div className="stat-num"><span id="stat-crm">0</span>+</div>
                <div className="stat-lbl">CRM Platforms</div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Visual card ── */}
          <div className="hero-visual">
            <div className="hv-glow" />
            <div className="hv-glow-ring" />
            <div className="hv-glow-ring hv-glow-ring-2" />

            {/* Floating tech badges */}
            <div className="hv-badge hv-b1">
              <FaWordpress style={{ color: '#a855f7', fontSize: '15px' }} />
              WordPress
            </div>
            <div className="hv-badge hv-b2">
              <SiWoocommerce style={{ color: '#8b5cf6', fontSize: '15px' }} />
              WooCommerce
            </div>
            <div className="hv-badge hv-b3">
              <FaDatabase style={{ color: '#22d3ee', fontSize: '14px' }} />
              CRM Expert
            </div>
            <div className="hv-badge hv-b4">
              <SiReact style={{ color: '#61dafb', fontSize: '15px' }} />
              React.js
            </div>

            {/* Center profile card */}
            <div className="hv-card glass">
              <div className="hv-avatar">UN</div>
              <div className="hv-info-name">Usama Naeem</div>
              <div className="hv-info-role">WordPress Developer</div>
              <div className="hv-avail">
                <span className="avail-dot" />
                Available for Work
              </div>
              <div className="hv-divider" />
              <div className="hv-mini-stats">
                <div className="hv-mstat">
                  <span className="hv-mnum">3+</span>
                  <span className="hv-mlbl">Years</span>
                </div>
                <div className="hv-mstat">
                  <span className="hv-mnum">20+</span>
                  <span className="hv-mlbl">Projects</span>
                </div>
                <div className="hv-mstat">
                  <span className="hv-mnum">5+</span>
                  <span className="hv-mlbl">CRM Tools</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button className="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        ↑
      </button>
    </section>
  );
}
