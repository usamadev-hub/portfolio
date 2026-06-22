import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaSchool, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const degrees = [
  {
    icon:   <FaGraduationCap />,
    degree: 'BS Software Engineering',
    school: 'National University of Modern Languages (NUML)',
    meta:   [
      { icon: <FaCalendarAlt />, text: '01/2018 — 02/2022' },
      { icon: <FaMapMarkerAlt />, text: 'Islamabad' },
      { icon: <FaStar />,        text: 'CGPA: 2.99' },
    ],
  },
  {
    icon:   <FaSchool />,
    degree: 'FSC — Pre-Engineering',
    school: 'BISE Rawalpindi',
    meta:   [
      { icon: <FaCalendarAlt />, text: '02/2016 — 04/2018' },
    ],
  },
];

export default function Education() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-header', {
        scrollTrigger: { trigger: '.edu-header', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'expo.out',
      });
      gsap.from('.edu-card, .fyp-card', {
        scrollTrigger: { trigger: '.edu-list', start: 'top 82%' },
        opacity: 0, x: -50,
        stagger: 0.18, duration: 0.85, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={ref}>
      <div className="container">
        <div className="edu-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="s-label">Academic Background</span>
          <h2 className="s-title">My <span className="g-text">Education</span></h2>
        </div>

        <div className="edu-list">
          {degrees.map(({ icon, degree, school, meta }) => (
            <div key={degree} className="edu-card glass card-hover">
              <div className="edu-ico">{icon}</div>
              <div>
                <div className="edu-degree">{degree}</div>
                <div className="edu-school">{school}</div>
                <div className="edu-meta">
                  {meta.map(({ icon: ic, text }) => (
                    <span key={text}>{ic} {text}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Year Project */}
        <div className="fyp-card glass">
          <div className="fyp-lbl">Final Year Project</div>
          <div className="fyp-name">Gym Management System</div>
          <div className="fyp-cat">Category: Database Management / GYM</div>
          <p className="fyp-desc">
            A comprehensive database system providing structured information for all departments
            of a gym — trainers, classes, supplements, and member management — streamlining
            daily operations and improving data accessibility across the facility.
          </p>
        </div>
      </div>
    </section>
  );
}
