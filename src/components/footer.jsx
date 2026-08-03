import React, { useState, useEffect, useCallback } from "react";
import "../css/footer.css";

const QUICK_LINKS = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
];

const SOCIAL_LINKS = [
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/Anuradhaa2004",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12C2.5 16.2 5.24 19.75 9.03 21C9.51 21.09 9.68 20.79 9.68 20.54C9.68 20.31 9.67 19.53 9.67 18.7C7 19.24 6.42 17.55 6.42 17.55C5.97 16.41 5.32 16.11 5.32 16.11C4.43 15.5 5.39 15.51 5.39 15.51C6.37 15.58 6.89 16.52 6.89 16.52C7.77 18.02 9.19 17.59 9.75 17.34C9.84 16.7 10.09 16.27 10.37 16.02C8.25 15.77 6.02 14.95 6.02 11.31C6.02 10.27 6.39 9.42 7 8.75C6.9 8.5 6.57 7.53 7.09 6.22C7.09 6.22 7.9 5.96 9.66 7.16C10.4 6.95 11.2 6.85 12 6.85C12.8 6.85 13.6 6.95 14.34 7.16C16.1 5.96 16.91 6.22 16.91 6.22C17.43 7.53 17.1 8.5 17 8.75C17.61 9.42 17.98 10.27 17.98 11.31C17.98 14.96 15.74 15.77 13.61 16.01C13.96 16.31 14.27 16.9 14.27 17.81C14.27 19.1 14.26 20.21 14.26 20.54C14.26 20.79 14.43 21.09 14.92 21C18.71 19.75 21.45 16.2 21.45 12C21.45 6.75 17.25 2.5 12 2.5Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/anuradha-gupta-66732632b/",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7.5 10V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="7.5" cy="7.2" r="1" fill="currentColor" />
                <path
                    d="M11 16.5V13C11 11.6193 12.1193 10.5 13.5 10.5C14.8807 10.5 16 11.6193 16 13V16.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
                <path d="M11 10.5V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "email",
        label: "Email",
        href: "mailto:anuradhagupta1829@gmail.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
                <path
                    d="M4 7L11.2529 12.4397C11.7011 12.7748 12.2989 12.7748 12.7471 12.4397L20 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function Footer() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleNavClick = useCallback((event, id) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const yOffset = -70;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, []);

    return (
        <footer className="footer" role="contentinfo" aria-label="Site footer">
            {/* Background effects */}
            <div className="footer__backdrop" aria-hidden="true">
                <div className="footer__grid" />
                <div className="footer__blob footer__blob--purple" />
                <div className="footer__blob footer__blob--cyan" />
                <div className="footer__particles">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <span
                            key={i}
                            className="footer__particle"
                            style={{
                                left: `${(i * 7.5 + 3) % 100}%`,
                                animationDelay: `${(i * 0.7) % 5}s`,
                                animationDuration: `${8 + (i % 5) * 2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="footer__inner">
                {/* Main 3-Column Layout */}
                <div className="footer__grid-layout">
                    {/* LEFT COLUMN */}
                    <div className="footer__col footer__col--brand">
                        <a
                            href="#home"
                            className="footer__logo-wrap"
                            onClick={(e) => handleNavClick(e, "home")}
                            aria-label="Anuradha Gupta Home"
                        >
                            <span className="footer__logo-ring">
                                <span className="footer__logo-text">AG</span>
                            </span>
                        </a>

                        <div className="footer__brand-info">
                            <h3 className="footer__author-name">Anuradha Gupta</h3>
                            <p className="footer__author-tagline">Full-Stack Developer | BCA (AI/ML) Student</p>
                            <p className="footer__author-desc">
                                &quot;I build modern, responsive, and user-focused web applications with clean code and creative design.&quot;
                            </p>
                        </div>

                        {/* Availability Badge */}
                        <div className="footer__badge">
                            <span className="footer__badge-dot" />
                            <span className="footer__badge-text">Open to Internship Opportunities</span>
                        </div>
                    </div>

                    {/* CENTER COLUMN */}
                    <div className="footer__col footer__col--links">
                        <h4 className="footer__col-title">Quick Links</h4>
                        <nav aria-label="Footer Navigation">
                            <ul className="footer__nav-list">
                                {QUICK_LINKS.map((link) => (
                                    <li key={link.id} className="footer__nav-item">
                                        <a
                                            href={`#${link.id}`}
                                            className="footer__nav-link"
                                            onClick={(e) => handleNavClick(e, link.id)}
                                        >
                                            <span className="footer__nav-link-text">{link.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="footer__col footer__col--social">
                        <h4 className="footer__col-title">Connect With Me</h4>
                        <p className="footer__social-desc">
                            Feel free to reach out on any of these platforms.
                        </p>
                        <div className="footer__social-links">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="footer__social-btn"
                                    aria-label={social.label}
                                    data-tooltip={social.label}
                                >
                                    <span className="footer__social-icon">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION WITH DIVIDER */}
                <div className="footer__bottom">
                    <div className="footer__divider" aria-hidden="true" />
                    <div className="footer__bottom-content">
                        <p className="footer__copyright">
                            &copy; 2026 Anuradha Gupta. All Rights Reserved.
                        </p>
                        <p className="footer__crafted">
                            Designed &amp; Developed with <span className="footer__heart" aria-label="love">❤️</span> using React.
                        </p>
                    </div>
                </div>
            </div>

            {/* Back To Top Button */}
            <button
                type="button"
                className={`footer__top-btn ${showTopBtn ? "footer__top-btn--visible" : ""}`}
                onClick={scrollToTop}
                aria-label="Back to top"
                title="Back to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 19V5M5 12L12 5L19 12"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </footer>
    );
}
