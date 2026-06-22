import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';

const contacts = [
  { icon: <FaEnvelope />,     label: 'Email',    val: 'usama.poshnee@gmail.com',    href: 'mailto:usama.poshnee@gmail.com' },
  { icon: <FaPhone />,        label: 'Phone',    val: '03125069630',                href: 'tel:03125069630' },
  { icon: <FaMapMarkerAlt />, label: 'Location', val: 'Rawalpindi, Pakistan',       href: null },
  { icon: <FaLinkedinIn />,   label: 'LinkedIn', val: 'linkedin.com/in/usama-naeem',href: 'https://linkedin.com/in/usama-naeem-46b8892a8' },
];

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-header', {
        scrollTrigger: { trigger: '.ct-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.ct-left', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%' },
        opacity: 0, x: -60, duration: 1, ease: 'expo.out',
      });
      gsap.from('.ct-right', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%' },
        opacity: 0, x: 60, duration: 1, ease: 'expo.out',
      });
      gsap.from('.ct-item', {
        scrollTrigger: { trigger: '.ct-items', start: 'top 82%' },
        opacity: 0, y: 20, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <div className="ct-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="s-label">Let's Connect</span>
          <h2 className="s-title">Get In <span className="g-text">Touch</span></h2>
        </div>

        <div className="ct-grid">

          {/* Left: contact info */}
          <div className="ct-left">
            <p className="ct-intro">
              Whether you have a project in mind, need a WordPress expert for CRM integrations,
              WooCommerce, or custom web solutions — I'm always open to new opportunities and
              exciting collaborations.
            </p>

            <div className="ct-items">
              {contacts.map(({ icon, label, val, href }) => (
                <div key={label} className="ct-item">
                  <div className="ct-ico">{icon}</div>
                  <div>
                    <div className="ct-lbl">{label}</div>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="ct-val">{val}</a>
                      : <span className="ct-val">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA box */}
          <div className="ct-right">
            <div className="cta-box glass">
              <div className="cta-title">Open to Opportunities</div>
              <p className="cta-text">
                I'm currently available for freelance projects and full-time positions. If you're
                looking for a dedicated WordPress Developer with expertise in CRM integrations,
                WooCommerce, and custom web solutions — let's talk.
              </p>
              <a href="mailto:usama.poshnee@gmail.com" className="btn btn-primary">
                <FaPaperPlane /> Send Me an Email
              </a>
              <div className="cta-soc">
                <a href="https://linkedin.com/in/usama-naeem-46b8892a8" target="_blank" rel="noreferrer" className="soc-ico" title="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="mailto:usama.poshnee@gmail.com" className="soc-ico" title="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
