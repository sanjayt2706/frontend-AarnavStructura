import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useSite } from "../content/SiteContent";
import { Img } from "./primitives";
import { useNav } from "./Header";
import { useServices } from "./sections";

export default function Footer() {
  const { content } = useSite();
  const services = useServices();
  const nav = useNav();
  const { footer, contact, brand } = content;
  const tel = (contact.phone || "").replace(/\s/g, "");
  const wa = (contact.whatsapp || "").replace(/\D/g, "");

  const socials = [
    [footer.instagram, FaInstagram, "Instagram"],
    [footer.facebook, FaFacebookF, "Facebook"],
    [footer.linkedin, FaLinkedinIn, "LinkedIn"],
    [footer.youtube, FaYoutube, "YouTube"],
    [wa && `https://wa.me/${wa}`, FaWhatsapp, "WhatsApp"]
  ].filter(([url]) => url);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Img src={brand.logoLight} alt={brand.companyName} />
            </Link>
            <p className="footer__tag">{footer.tagline}</p>
            {socials.length > 0 && (
              <div className="footer__social">
                {socials.map(([url, Icon, label]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="footer__h">Company</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Services</h2>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s._id || s.title}>
                  <Link to="/what-we-do">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Contact</h2>
            <ul>
              {contact.phone && <li><a href={`tel:${tel}`}>{contact.phone}</a></li>}
              {contact.email && <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
              {contact.address && <li>{contact.address}</li>}
              {contact.hours && <li>{contact.hours}</li>}
            </ul>
          </div>
        </div>
        <div className="footer__big" aria-hidden="true" data-text={brand.companyName} />
        <div className="footer__bottom">
          <span>{(footer.copyright || "").replace("{year}", new Date().getFullYear())}</span>
          <Link to="/contact">Start a project →</Link>
        </div>
      </div>
    </footer>
  );
}
