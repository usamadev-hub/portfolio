import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot">
          <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="foot-logo">
            <span className="g-text">Usama</span>{' '}
            <span style={{ color: 'var(--text-2)' }}>Naeem</span>
          </a>

          <p className="foot-copy">© Usama Naeem. All rights reserved.</p>

          <div className="foot-links">
            <a href="https://linkedin.com/in/usama-naeem-46b8892a8" target="_blank" rel="noreferrer"
              className="soc-ico" title="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="mailto:usama.poshnee@gmail.com" className="soc-ico" title="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
