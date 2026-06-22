import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const jobs = [
  {
    title:   'WordPress Developer',
    company: 'Poshnee Tech Digital Marketing Agency',
    date:    '01/2022 — Present',
    loc:     { icon: <FaMapMarkerAlt />, text: 'Rawalpindi' },
    logo:    null,
    desc:    'Developed and managed multiple responsive websites using WordPress and WooCommerce to create user-friendly e-commerce solutions. Created custom one-page contact forms using HTML, CSS, Bootstrap, PHP, and JavaScript; integrated them with CRM systems for automatic lead processing.',
    bullets: [
      'Collaborated with clients to customize page layouts using Elementor, WP Bakery, and Divi, delivering tailored solutions for their marketing needs.',
      'Handled API integration using Postman, ensuring seamless data flow between WordPress forms and external CRMs including EDM, CallGrid, and Ringba.',
      'Provided ongoing maintenance — plugin updates, theme customization, and bug fixes — ensuring optimal website performance.',
      'Worked with core PHP and MySQL for custom back-end functionalities and CRUD operations.',
    ],
  },
  {
    title:   'Senior WordPress Developer',
    company: 'Kiwi Logics',
    date:    '3 Months',
    loc:     { icon: <FaMapMarkerAlt />, text: 'Haidri Chowk, Markaz Plaza, Saidpur Road, Rawalpindi' },
    logo:    null,
    desc:    null,
    bullets: [
      'Led development and customization of WordPress websites for multiple clients using Elementor, WP Bakery, and custom theme configurations.',
      'Integrated third-party plugins and REST APIs to extend site functionality as per specific client requirements.',
      'Optimized website performance, page speed, and mobile responsiveness across all delivered projects.',
      'Collaborated with the design and marketing teams to deliver polished, client-ready web solutions on schedule.',
    ],
  },
  {
    title:   'Web Development Intern',
    company: 'Eziline Software House',
    date:    '3-Month Internship',
    loc:     { icon: <FaPhone />, text: '+92 335 9699659' },
    logo:    null,
    desc:    null,
    bullets: [
      'Completed a 3-month internship learning web development basics and assisting in small-scale projects using HTML, CSS, and Bootstrap.',
      'Supported the senior development team with minor bug fixes and website maintenance tasks.',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-header', {
        scrollTrigger: { trigger: '.exp-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.tl-item', {
        scrollTrigger: { trigger: '.tl', start: 'top 85%' },
        opacity: 0, y: 40,
        stagger: 0.2, duration: 0.9, ease: 'expo.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <div className="exp-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="s-label">Career Journey</span>
          <h2 className="s-title">Work <span className="g-text">Experience</span></h2>
        </div>

        <div className="tl">
          {jobs.map((job, i) => (
            <div key={i} className="tl-item glass card-hover">
              <div className="tl-dot" />

              <div className="tl-head">
                <div className="tl-title">{job.title}</div>
                <span className="tl-badge">{job.date}</span>
              </div>

              {/* Company row — shows logo if available */}
              <div className="tl-company-row">
                {job.logo && (
                  <span
                    className="tl-logo-box"
                    style={{ '--logo-color': job.logo.fallbackColor }}
                  >
                    <img
                      src={job.logo.src}
                      alt={job.company}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <span className="tl-logo-initials">{job.logo.initials}</span>
                  </span>
                )}
                <div className="tl-company">{job.company}</div>
              </div>

              <div className="tl-loc">
                {job.loc.icon} {job.loc.text}
              </div>

              {job.desc && <p className="tl-desc">{job.desc}</p>}

              <ul className="tl-list">
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
