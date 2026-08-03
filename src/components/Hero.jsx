import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "../css/Hero.css";
import profileImageDefault from "../assets/Profile.jpg";
import resumeUrlDefault from "../assets/RESUME.pdf";

/**
 * ROTATING_ROLES
 * Static data — declared outside the component so it is never
 * re-created on render and can be safely used as an effect dependency
 * source without causing extra work.
 */
const ROTATING_ROLES = [
    "BCA AI/ML Student",
    "Frontend Developer",
    "Full-Stack Web Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Video Editor"
];

const SOCIAL_LINKS = [
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/Anuradhaa2004",
        icon: (
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
        ),
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/anuradha-gupta-66732632b/",
        icon: (
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
        ),
    },
    {
        id: "email",
        label: "Email",
        href: "mailto:anuradhagupta1829@gmail.com",
        icon: (
            <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h17A1.5 1.5 0 0 1 22 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 19.5v-15Zm2.2.5 7.8 6.24L19.8 5H4.2ZM20 6.9l-7.4 5.93a1 1 0 0 1-1.2 0L4 6.9V19h16V6.9Z" />
        ),
    },
];

/** Deterministic pseudo-random generator so particle layout is stable
 *  across renders without needing Math.random() inside render. */
function seededRandom(seed) {
    const x = Math.sin(seed * 999) * 10000;
    return x - Math.floor(x);
}

export default function Hero({
    name = "Anuradha Gupta",
    profileImage = profileImageDefault,
    resumeUrl = resumeUrlDefault,
    projectsTargetId = "projects",
}) {
    /* ------------------------------------------------------------------ */
    /*  Typing effect                                                       */
    /* ------------------------------------------------------------------ */
    const [wordIndex, setWordIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [caretVisible, setCaretVisible] = useState(true);

    const prefersReducedMotion = useMemo(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
        []
    );

    useEffect(() => {
        if (prefersReducedMotion) {
            // Simply cycle whole words without the letter-by-letter animation.
            const interval = setInterval(() => {
                setWordIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
            }, 2200);
            return () => clearInterval(interval);
        }

        const currentWord = ROTATING_ROLES[wordIndex];

        if (!isDeleting && subIndex === currentWord.length) {
            const pause = setTimeout(() => setIsDeleting(true), 1400);
            return () => clearTimeout(pause);
        }

        if (isDeleting && subIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
            return undefined;
        }

        const timeout = setTimeout(
            () => setSubIndex((prev) => prev + (isDeleting ? -1 : 1)),
            isDeleting ? 40 : 85
        );
        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, wordIndex, prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return undefined;
        const blink = setInterval(() => setCaretVisible((prev) => !prev), 500);
        return () => clearInterval(blink);
    }, [prefersReducedMotion]);

    const displayedRole = prefersReducedMotion
        ? ROTATING_ROLES[wordIndex]
        : ROTATING_ROLES[wordIndex].substring(0, subIndex);

    /* ------------------------------------------------------------------ */
    /*  Ambient particles — computed once, never recalculated              */
    /* ------------------------------------------------------------------ */
    const particles = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                left: `${(seededRandom(i + 1) * 100).toFixed(2)}%`,
                top: `${(seededRandom(i + 42) * 100).toFixed(2)}%`,
                size: (seededRandom(i + 7) * 3 + 2).toFixed(1),
                duration: (seededRandom(i + 13) * 6 + 6).toFixed(1),
                delay: (seededRandom(i + 21) * 5).toFixed(1),
            })),
        []
    );

    /* ------------------------------------------------------------------ */
    /*  Ripple effect for buttons (DOM-only, no re-render)                  */
    /* ------------------------------------------------------------------ */
    const handleRipple = useCallback((event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");

        ripple.className = "hero-ripple";
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    }, []);

    const handleViewProjects = useCallback(
        (event) => {
            handleRipple(event);
            const target = document.getElementById(projectsTargetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        },
        [handleRipple, projectsTargetId]
    );

    /* ------------------------------------------------------------------ */
    /*  Reveal-on-mount for the two content columns                        */
    /* ------------------------------------------------------------------ */
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const targets = [leftColRef.current, rightColRef.current].filter(Boolean);
        if (targets.length === 0) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="home" className="hero" aria-label="Introduction">
            {/* --------------------------------------------------------- */}
            {/* Ambient background layer — purely decorative                */}
            {/* --------------------------------------------------------- */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__grid" />
                <span className="hero__blob hero__blob--cyan" />
                <span className="hero__blob hero__blob--violet" />
                <span className="hero__blob hero__blob--soft" />
                <div className="hero__particles">
                    {particles.map((p) => (
                        <span
                            key={p.id}
                            className="hero__particle"
                            style={{
                                left: p.left,
                                top: p.top,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="hero__container">
                {/* ------------------------------------------------------- */}
                {/* Left column — copy, CTAs, socials, stats                  */}
                {/* ------------------------------------------------------- */}
                <div ref={leftColRef} className="hero__left">
                    <span className="hero__badge">
                        <span className="hero__badge-emoji" role="img" aria-label="Waving hand">
                            👋
                        </span>
                        Hello, I&apos;m
                    </span>

                    <h1 className="hero__name">{name}</h1>

                    <p className="hero__role" aria-live="polite">
                        <span className="hero__role-text">{displayedRole}</span>
                        <span
                            className={
                                "hero__caret" + (caretVisible ? " hero__caret--visible" : "")
                            }
                            aria-hidden="true"
                        />
                    </p>

                    <p className="hero__description">
                        I build fast, accessible interfaces with{" "}
                        <strong>React</strong> and bring intelligence to products with{" "}
                        <strong>Node</strong> and <strong>Express</strong>. I care about
                        clean UI, sharp problem solving, and modern web development that
                        feels effortless to use.
                    </p>

                    <div className="hero__actions">
                        <button
                            type="button"
                            className="hero__btn hero__btn--primary"
                            onClick={handleViewProjects}
                        >
                            <span>View Projects</span>
                        </button>

                        <a
                            href={resumeUrl}
                            className="hero__btn hero__btn--secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseDown={handleRipple}
                        >
                            <span>Download Resume</span>
                        </a>
                    </div>

                    <ul className="hero__socials" role="list" aria-label="Social profiles">
                        {SOCIAL_LINKS.map((social) => (
                            <li key={social.id} className="hero__social-item">
                                <a
                                    href={social.href}
                                    className="hero__social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        {social.icon}
                                    </svg>
                                    <span className="hero__tooltip">{social.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ------------------------------------------------------- */}
                {/* Right column — profile portrait                           */}
                {/* ------------------------------------------------------- */}
                <div ref={rightColRef} className="hero__right">
                    <div className="hero__portrait">
                        <span className="hero__portrait-glow" aria-hidden="true" />
                        <span className="hero__portrait-ring" aria-hidden="true" />
                        <span className="hero__portrait-glass" aria-hidden="true" />
                        <div className="hero__portrait-frame">
                            <img
                                src={profileImage}
                                alt={`Portrait of ${name}`}
                                className="hero__portrait-img"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}