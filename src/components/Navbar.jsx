import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import "../css/Navbar.css";

/**
 * NAV_ITEMS
 * Each entry maps a visible label to the section id it controls.
 * Keeping this as static data (outside the component) means it is
 * never re-created on render.
 */
const NAV_ITEMS = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
];

const SCROLL_THRESHOLD = 24; // px scrolled before navbar switches to "compact" state

export default function Navbar({ resumeUrl = "/resume.pdf" }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const toggleBtnRef = useRef(null);
    const navRef = useRef(null);

    /* ------------------------------------------------------------------ */
    /*  Scroll handling — sticky shrink / blur / shadow                    */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
                ticking = false;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ------------------------------------------------------------------ */
    /*  Active-section tracking via IntersectionObserver                   */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        const sections = NAV_ITEMS.map((item) =>
            document.getElementById(item.id)
        ).filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: "-45% 0px -45% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    /* ------------------------------------------------------------------ */
    /*  Mobile menu — close on outside click / escape / route change       */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                toggleBtnRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    /* ------------------------------------------------------------------ */
    /*  Handlers                                                            */
    /* ------------------------------------------------------------------ */
    const handleNavClick = useCallback((event, id) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const yOffset = -70;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setActiveSection(id);
        setIsMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    /** Ripple effect on the Resume CTA — pure DOM, no re-render triggered. */
    const handleRipple = useCallback((event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);

        ripple.className = "nav-ripple";
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    }, []);

    const navClassName = useMemo(
        () =>
            [
                "navbar",
                isScrolled ? "navbar--scrolled" : "",
                isMenuOpen ? "navbar--menu-open" : "",
            ]
                .filter(Boolean)
                .join(" "),
        [isScrolled, isMenuOpen]
    );

    return (
        <header ref={navRef} className={navClassName}>
            <nav className="navbar__inner" aria-label="Primary navigation">
                {/* ---------------------------------------------------------- */}
                {/* Logo                                                        */}
                {/* ---------------------------------------------------------- */}
                <a
                    href="#home"
                    className="navbar__logo"
                    aria-label="AG — Home"
                    onClick={(event) => handleNavClick(event, "home")}
                >
                    <span className="navbar__logo-ring">
                        <span className="navbar__logo-text">AG</span>
                    </span>
                </a>

                {/* ---------------------------------------------------------- */}
                {/* Desktop links                                               */}
                {/* ---------------------------------------------------------- */}
                <ul className="navbar__links" role="list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={
                                    "navbar__link" +
                                    (activeSection === item.id ? " navbar__link--active" : "")
                                }
                                aria-current={activeSection === item.id ? "page" : undefined}
                                onClick={(event) => handleNavClick(event, item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* ---------------------------------------------------------- */}
                {/* CTA — desktop                                               */}
                {/* ---------------------------------------------------------- */}
                <a
                    href={resumeUrl}
                    className="navbar__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseDown={handleRipple}
                >
                    <span>Resume</span>
                </a>

                {/* ---------------------------------------------------------- */}
                {/* Hamburger — mobile                                          */}
                {/* ---------------------------------------------------------- */}
                <button
                    ref={toggleBtnRef}
                    type="button"
                    className={
                        "navbar__hamburger" +
                        (isMenuOpen ? " navbar__hamburger--active" : "")
                    }
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    onClick={toggleMenu}
                >
                    <span className="navbar__hamburger-line" />
                    <span className="navbar__hamburger-line" />
                    <span className="navbar__hamburger-line" />
                </button>
            </nav>

            {/* -------------------------------------------------------------- */}
            {/* Mobile overlay + slide-in menu                                   */}
            {/* -------------------------------------------------------------- */}
            <div
                className={
                    "navbar__overlay" + (isMenuOpen ? " navbar__overlay--visible" : "")
                }
                aria-hidden={!isMenuOpen}
            />

            <aside
                id="mobile-menu"
                ref={menuRef}
                className={
                    "navbar__mobile-menu" +
                    (isMenuOpen ? " navbar__mobile-menu--open" : "")
                }
                aria-hidden={!isMenuOpen}
            >
                <ul className="navbar__mobile-list" role="list">
                    {NAV_ITEMS.map((item, index) => (
                        <li
                            key={item.id}
                            className="navbar__mobile-item"
                            style={{ "--stagger": `${index * 0.05}s` }}
                        >
                            <a
                                href={`#${item.id}`}
                                className={
                                    "navbar__mobile-link" +
                                    (activeSection === item.id
                                        ? " navbar__mobile-link--active"
                                        : "")
                                }
                                tabIndex={isMenuOpen ? 0 : -1}
                                onClick={(event) => handleNavClick(event, item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li
                        className="navbar__mobile-item"
                        style={{ "--stagger": `${NAV_ITEMS.length * 0.05}s` }}
                    >
                        <a
                            href={resumeUrl}
                            className="navbar__mobile-cta"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isMenuOpen ? 0 : -1}
                            onMouseDown={handleRipple}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resume
                        </a>
                    </li>
                </ul>
            </aside>
        </header>
    );
}