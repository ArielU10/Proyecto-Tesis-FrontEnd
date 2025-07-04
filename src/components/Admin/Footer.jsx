import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa6';

import '../../styles/components/footer.css';

const socialLinks = [
  {
    href: 'https://wa.me/593999999999',
    icon: <FaWhatsapp />,
    tooltip: 'Contáctanos por WhatsApp'
  },
  {
    href: 'https://facebook.com/UnidadEducativaJesusDeNazareth',
    icon: <FaFacebookF />,
    tooltip: 'Visítanos en Facebook'
  },
  {
    href: 'https://twitter.com',
    icon: <FaXTwitter />,
    tooltip: 'Síguenos en X'
  },
  {
    href: 'https://instagram.com',
    icon: <FaInstagram />,
    tooltip: 'Míranos en Instagram'
  },
  {
    href: 'https://tiktok.com',
    icon: <FaTiktok />,
    tooltip: 'Síguenos en TikTok'
  }
];

const Footer = ({ variant }) => {
  return (
    <footer className={`admin-footer ${variant === 'compact' ? 'footer-compact' : ''}`}>
      <div className="footer-content">
        {/* 👇 Primero los íconos */}
        <div className="footer-icons">
          {socialLinks.map(({ href, icon, tooltip }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip={tooltip}
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};


export default Footer;
