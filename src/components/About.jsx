import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedinIn } from 'react-icons/fa';

const info = [
  { icon: <FaEnvelope />,    label: 'Email',    value: 'usama.poshnee@gmail.com', href: 'mailto:usama.poshnee@gmail.com' },
  { icon: <FaPhone />,       label: 'Phone',    value: '03125069630',             href: 'tel:03125069630' },
  { icon: <FaMapMarkerAlt />,label: 'Location', value: 'Rawalpindi, Pakistan',    href: null },
  { icon: <FaLinkedinIn />,  label: 'LinkedIn', value: 'usama-naeem',             href: 'https://linkedin.com/in/usama-naeem-46b8892a8' },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        scrollTrigger: { trigger: '.about-left', start: 'top 85%' },
        opacity: 0, y: 50, duration: 1, ease: 'expo.out',
      });
      gsap.from('.about-right .info-card', {
        scrollTrigger: { trigger: '.about-right', start: 'top 85%' },
        opacity: 0, y: 40,
        stagger: 0.12, duration: 0.8, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">

          {/* Left: text */}
          <div className="about-left">
            <span className="s-label">Who I Am</span>
            <h2 className="s-title">Passionate About<br /><span className="g-text">Web Development</span></h2>
            <div className="about-text">
              <p>
                I'm a <strong>WordPress Developer</strong> based in Rawalpindi, Pakistan, with
                <strong> 3+ years</strong> of hands-on experience building dynamic websites,
                third-party integrations, and WooCommerce solutions.
              </p>
              <p>
                I have proven expertise in crafting responsive websites using page builders like
                <strong> Elementor, WP Bakery, and Divi</strong>, collaborating closely with
                clients to customize layouts and deliver tailored marketing solutions.
              </p>
              <p>
                I'm adept at managing <strong>CRM integrations</strong> — including EDM,
                CallGrid, and Ringba — ensuring seamless data transfer between WordPress and
                external platforms via APIs.
              </p>
            </div>
          </div>

          {/* Right: contact info cards */}
          <div className="about-right">
            <div className="info-grid">
              {info.map(({ icon, label, value, href }) => (
                <div key={label} className="info-card glass card-hover">
                  <div className="info-ico">{icon}</div>
                  <div className="info-body">
                    <div className="info-lbl">{label}</div>
                    <div className="info-val">
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{value}</a>
                        : value
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
