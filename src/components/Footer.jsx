import { Link } from 'react-router-dom'
import { RiLinkedinFill, RiInstagramLine, RiFacebookFill } from 'react-icons/ri'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__brand">
              <img src="/logo.png" alt="Tutorista Logo" className="footer__logo" />
              <span className="brand-text">Tutorista.</span>
            </div>
            <p className="footer__tagline">
              The leading digital infrastructure for private education in Lahore. 
              Bridging the gap between certified educators and ambitious students.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="LinkedIn"><RiLinkedinFill /></a>
              <a href="#" aria-label="Instagram"><RiInstagramLine /></a>
              <a href="#" aria-label="Facebook"><RiFacebookFill /></a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Ecosystem</h4>
            <ul>
              <li><Link to="/services">Matching Engine</Link></li>
              <li><Link to="/services">Virtual Classrooms</Link></li>
              <li><Link to="/services">Pricing Models</Link></li>
              <li><Link to="/about">Vetting Process</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <ul>
              <li><Link to="/contact">Inquiry Desk</Link></li>
              <li><a href="#">Arfa Technology Park</a></li>
              <li><a href="mailto:hello@tutorista.pk">hello@tutorista.pk</a></li>
              <li><a href="tel:+923001234567">+92 300 1234567</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Resources</h4>
            <ul>
              <li><a href="#">Tutor Dashboard</a></li>
              <li><a href="#">Parent Portal</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{year} Tutorista. All rights reserved. Lahore, Pakistan.</span>
          <div className="footer__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
