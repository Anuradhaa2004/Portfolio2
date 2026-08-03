import React, { useEffect, useRef, useState } from "react";
import "../css/About.css";
import aboutImage from "../assets/About.png";

/**
 * AboutSection — premium developer portfolio "About Me" block
 * Stack: React + inline styles (no Tailwind build step required)
 * Drop this component anywhere in a dark-themed page.
 *
 * Usage:
 *   <AboutSection portraitSrc="/your-photo.png" resumeHref="/resume.pdf" />
 *
 * If no portraitSrc is passed, a placeholder silhouette gradient is shown
 * so the layout still looks right before you swap in your real photo.
 */

const PARTICLE_COUNT = 22;

function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return [ref, visible];
}

function Particles({ count = PARTICLE_COUNT }) {
    const particles = React.useMemo(
        () =>
            Array.from({ length: count }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                size: 1.5 + Math.random() * 2.5,
                delay: Math.random() * 8,
                duration: 9 + Math.random() * 10,
                opacity: 0.25 + Math.random() * 0.45,
                drift: (Math.random() - 0.5) * 60,
            })),
        [count]
    );

    return (
        <div style={styles.particleField} aria-hidden="true">
            {particles.map((p) => (
                <span
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: `${p.left}%`,
                        bottom: "-10%",
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: "#C9B8FF",
                        opacity: p.opacity,
                        boxShadow: "0 0 6px 1px rgba(160,120,255,0.6)",
                        animation: `about-particle-rise ${p.duration}s linear ${p.delay}s infinite`,
                        // custom property consumed by the keyframes for horizontal drift
                        "--drift": `${p.drift}px`,
                    }}
                />
            ))}
        </div>
    );
}

export default function AboutSection({
    portraitSrc = aboutImage,
    resumeHref = "/RESUME.pdf",
    name = "Anuradha Gupta",
}) {
    const [headingRef, headingVisible] = useReveal();
    const [bodyRef, bodyVisible] = useReveal();
    const [portraitRef, portraitVisible] = useReveal();

    return (
        <section id="about" style={styles.section}>
            <GlobalStyles />

            {/* ambient background layer */}
            <div style={styles.gridTexture} aria-hidden="true" />
            <div style={styles.blobPurple} aria-hidden="true" />
            <div style={styles.blobBlue} aria-hidden="true" />
            <div style={styles.radialVignette} aria-hidden="true" />

            <div className="about-section-container" style={styles.container}>
                {/* ---------------- LEFT: PORTRAIT ---------------- */}
                <div
                    ref={portraitRef}
                    style={{
                        ...styles.portraitCol,
                        opacity: portraitVisible ? 1 : 0,
                        transform: portraitVisible
                            ? "translateY(0) scale(1)"
                            : "translateY(24px) scale(0.98)",
                    }}
                >
                    <div style={styles.portraitGlowWrap}>
                        <div style={styles.portraitGlowPurple} aria-hidden="true" />
                        <div style={styles.portraitGlowBlue} aria-hidden="true" />
                        <Particles />

                        <div style={styles.portraitFloat}>
                            {portraitSrc ? (
                                <img
                                    src={portraitSrc}
                                    alt="Anuradha Gupta"
                                    style={styles.portraitImg}
                                />
                            ) : (
                                <div style={styles.portraitPlaceholder} aria-hidden="true">
                                    <svg
                                        viewBox="0 0 200 400"
                                        style={{ width: "70%", height: "auto", opacity: 0.35 }}
                                    >
                                        <ellipse cx="100" cy="70" rx="42" ry="50" fill="#B9A6FF" />
                                        <path
                                            d="M40 400 C40 260 60 210 100 210 C140 210 160 260 160 400 Z"
                                            fill="#8B7FE0"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ---------------- RIGHT: CONTENT ---------------- */}
                <div style={styles.contentCol}>
                    <div
                        ref={headingRef}
                        style={{
                            opacity: headingVisible ? 1 : 0,
                            transform: headingVisible ? "translateY(0)" : "translateY(18px)",
                            transition:
                                "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                        }}
                    >
                        <span style={styles.eyebrow}>ABOUT ME</span>

                        <h2 style={styles.heading}>
                            <span style={styles.headingGradientWord}>Creativity</span>
                            <br />
                            Is My Passion
                        </h2>
                    </div>

                    <div
                        ref={bodyRef}
                        style={{
                            opacity: bodyVisible ? 1 : 0,
                            transform: bodyVisible ? "translateY(0)" : "translateY(18px)",
                            transition:
                                "opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
                        }}
                    >
                        <p style={styles.description}>
                            I'm a passionate React Developer and BCA (AI/ML) student who
                            loves building modern, user-friendly web applications. Focused
                            on clean code, intuitive UI/UX, and continuous learning, I'm
                            always exploring new technologies to create impactful digital
                            experiences.
                        </p>

                        <a
                            href={resumeHref}
                            className="about-resume-btn"
                            style={styles.resumeBtn}
                        >
                            <span style={styles.resumeBtnGlow} aria-hidden="true" />
                            <span style={styles.resumeBtnLabel}>
                                Download Resume
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ marginLeft: 10 }}
                                    className="about-resume-arrow"
                                >
                                    <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function GlobalStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap');

      @keyframes about-particle-rise {
        0%   { transform: translate(0, 0); opacity: 0; }
        10%  { opacity: var(--p-op, 0.5); }
        90%  { opacity: var(--p-op, 0.5); }
        100% { transform: translate(var(--drift), -420px); opacity: 0; }
      }

      @keyframes about-float {
        0%, 100% { transform: translateY(0px); }
        50%      { transform: translateY(-16px); }
      }

      @keyframes about-glow-pulse {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50%      { opacity: 0.85; transform: scale(1.08); }
      }

      @keyframes about-glow-pulse-slow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50%      { opacity: 0.65; transform: scale(1.06); }
      }

      @keyframes about-border-spin {
        to { transform: rotate(360deg); }
      }

      .about-resume-btn {
        position: relative;
        overflow: hidden;
        transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
      }
      .about-resume-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -12px rgba(139,92,246,0.55), 0 0 0 1px rgba(255,255,255,0.08);
      }
      .about-resume-btn:hover .about-resume-arrow {
        transform: translateX(4px);
      }
      .about-resume-arrow {
        transition: transform 0.3s ease;
      }
      .about-resume-btn::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: 999px;
        padding: 1px;
        background: conic-gradient(from 0deg, #8B5CF6, #3B82F6, #C084FC, #8B5CF6);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: about-border-spin 6s linear infinite;
        opacity: 0.9;
      }

      @media (max-width: 860px) {
        .about-section-container {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
          text-align: center;
        }
        .about-section-container > div:first-child {
          order: 1;
          min-height: 380px !important;
        }
        .about-section-container > div:last-child {
          order: 2;
          align-items: center !important;
        }
        .about-section-container p {
          margin-left: auto;
          margin-right: auto;
        }
      }

      @media (max-width: 480px) {
        .about-resume-btn {
          padding: 15px 26px !important;
        }
      }
    `}</style>
    );
}

const styles = {
    section: {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#050816",
        overflow: "hidden",
        padding: "40px 24px 60px 24px",
        scrollMarginTop: "70px",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    },

    gridTexture: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
        WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
        pointerEvents: "none",
    },

    blobPurple: {
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "560px",
        height: "560px",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
    },

    blobBlue: {
        position: "absolute",
        bottom: "-15%",
        right: "-8%",
        width: "620px",
        height: "620px",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0) 70%)",
        filter: "blur(70px)",
        pointerEvents: "none",
    },

    radialVignette: {
        position: "absolute",
        inset: 0,
        background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139,92,246,0.06), transparent 70%)",
        pointerEvents: "none",
    },

    container: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: "1200px",
        display: "grid",
        gridTemplateColumns: "45% 55%",
        gap: "48px",
        alignItems: "center",
    },

    // ---------- portrait ----------
    portraitCol: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "560px",
        transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
    },

    portraitGlowWrap: {
        position: "relative",
        width: "100%",
        maxWidth: "450px",
        height: "560px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    },

    portraitGlowPurple: {
        position: "absolute",
        width: "420px",
        height: "420px",
        left: "50%",
        top: "18%",
        transform: "translateX(-50%)",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(139,92,246,0) 70%)",
        filter: "blur(50px)",
        animation: "about-glow-pulse 6s ease-in-out infinite",
        pointerEvents: "none",
    },

    portraitGlowBlue: {
        position: "absolute",
        width: "360px",
        height: "360px",
        left: "62%",
        top: "38%",
        transform: "translateX(-50%)",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)",
        filter: "blur(55px)",
        animation: "about-glow-pulse-slow 7s ease-in-out infinite 1s",
        pointerEvents: "none",
    },

    particleField: {
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
    },

    portraitFloat: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "about-float 7s ease-in-out infinite",
    },

    portraitImg: {
        width: "95%",
        maxWidth: "420px",
        height: "auto",
        maxHeight: "510px",
        objectFit: "contain",
        marginTop: "0px",
        filter:
            "drop-shadow(0 30px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 60px rgba(139,92,246,0.25))",
        userSelect: "none",
    },

    portraitPlaceholder: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    },

    // ---------- content ----------
    contentCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0",
    },

    eyebrow: {
        display: "inline-block",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        marginBottom: "18px",
        backgroundImage: "linear-gradient(90deg, #A78BFA, #60A5FA)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
    },

    heading: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(40px, 6vw, 72px)",
        lineHeight: 1.05,
        fontWeight: 700,
        color: "#F8FAFC",
        margin: "0 0 28px 0",
        letterSpacing: "-0.02em",
    },

    headingGradientWord: {
        backgroundImage: "linear-gradient(90deg, #A78BFA 0%, #60A5FA 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
    },

    description: {
        fontSize: "18px",
        lineHeight: 1.75,
        color: "#94A3B8",
        maxWidth: "520px",
        marginBottom: "40px",
        fontWeight: 400,
    },

    resumeBtn: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        padding: "18px 34px",
        borderRadius: "999px",
        textDecoration: "none",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow:
            "0 8px 32px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
    },

    resumeBtnGlow: {
        position: "absolute",
        inset: "-30%",
        background:
            "radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)",
        filter: "blur(20px)",
        zIndex: -1,
    },

    resumeBtnLabel: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "#F8FAFC",
        letterSpacing: "0.01em",
    },
};