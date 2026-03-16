"use client";

import { Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const NAV_ITEMS = [
  { label: "À Propos", href: "#apropos" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Thématiques", href: "#thematiques" },
  { label: "Programme", href: "#programme" },
  { label: "Inscription", href: "#inscription" },
];

const handleScroll = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer className="bg-djibouti-dark py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Logo & Info — lg:col-span-2 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {/* CLE logo */}
              <div className="bg-white rounded-xl px-3 py-2 flex-shrink-0 shadow-md">
                <img
                  src="/logos/cle.png"
                  alt="Logo CLE"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-white">BOOST 2026</span>
                <span className="block text-white/60 text-sm">Forum BOOST Entrepreneurship — Djibouti</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              Organisé par le <span className="text-djibouti-gold">CLE</span> – Centre de Leadership et de l&apos;Entrepreneuriat, République de Djibouti.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-djibouti-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/minist%C3%A8re-d%C3%A9l%C3%A9gu%C3%A9-charg%C3%A9-de-l-economie-num%C3%A9rique-et-de-l-innovation-mdeni/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-djibouti-green transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/p/Minist%C3%A8re-D%C3%A9l%C3%A9gu%C3%A9-charg%C3%A9-de-lEconomie-Num%C3%A9rique-et-de-lInnovation-MDENI-100086490678885/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-djibouti-green transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Liens rapides</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.href);
                    }}
                    className="text-white/60 hover:text-djibouti-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:djibouti.numerique@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-djibouti-gold transition-colors"
                >
                  <Mail size={18} />
                  djibouti.numerique@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+25321339231"
                  className="flex items-center gap-3 text-white/60 hover:text-djibouti-gold transition-colors"
                >
                  <Phone size={18} />
                  +253 21 33 92 31
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>
                  Ministère de l&apos;Économie Numérique<br />
                  Djibouti, République de Djibouti
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © 2026 MDENI – Tous droits réservés | République de Djibouti
          </p>
          <div className="flex gap-4 text-sm">
            <span className="text-djibouti-gold">#SmartNation</span>
            <span className="text-djibouti-green">#StartupDjibouti</span>
            <span className="text-white/60">#BoostEntrepreneurship</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
