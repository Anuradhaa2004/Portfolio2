import React, { useEffect, useRef, useState } from "react";
import AchievementCard from "./AchievementCard";
import "../css/Achievement.css";

import {
    TbSchool,
    TbChartHistogram,
    TbKarate,
    TbCertificate,
    TbCpu,
} from "react-icons/tb";
import { SiPython } from "react-icons/si";


/**
 * Achievements & Certifications section — standalone, drop into any page.
 * Dependency: react-icons  ->  npm install react-icons
 *
 * Usage:
 *   import Achievements from "./achievements/Achievements";
 *   <Achievements />
 */

const STATS = [
    { id: "certificates", label: "Certificates", value: 3, suffix: "+" },
    { id: "workshops", label: "Workshops", value: 1, suffix: "+" },
    { id: "achievements", label: "Achievements", value: 5, suffix: "+" },
    { id: "learning", label: "Learning", value: null, display: "Continuous" },
];

const TIMELINE = [
    {
        id: "bca-start",
        year: "2024",
        title: "Started BCA (AI/ML)",
        description: "Began my journey into software development.",
        icon: TbSchool,
    },
    {
        id: "ms-python",
        year: "2024",
        title: "Microsoft Python Certification",
        description: "Successfully completed Microsoft Python Certification.",
        icon: SiPython,
    },
    {
        id: "python-101",
        year: "2025",
        title: "Python 101 for Data Science",
        description: "Completed certification from AKS University.",
        icon: TbChartHistogram,
    },
    {
        id: "ibm-technovate",
        year: "2026",
        title: "IBM National Hack26",
        description: "Participated in IBM National Hackathon 2026.",
        icon: TbCpu,
    },
];

const CERTIFICATES = [
    {
        id: "cert-ms-python",
        title: "Microsoft Python Certification",
        organization: "Microsoft",
        year: "2024",
        status: "Verified",
        icon: TbCertificate,
        link: "https://www.linkedin.com/in/anuradha-gupta-66732632b/overlay/Certifications/257186381/treasury/?profileId=ACoAAFMp4i8BYi9rJHIrsHJpcpi-Sqx4L2Kc3G8",
    },
    {
        id: "cert-python-101",
        title: "Python 101 for Data Science",
        organization: "AKS University",
        year: "2025",
        status: "Verified",
        icon: TbCertificate,
        link: "https://www.linkedin.com/in/anuradha-gupta-66732632b/overlay/Certifications/600886555/treasury/?profileId=ACoAAFMp4i8BYi9rJHIrsHJpcpi-Sqx4L2Kc3G8",
    },
    {
        id: "cert-ibm",
        title: "IBM National hack26",
        organization: "IBM",
        year: "2026",
        status: "Verified",
        icon: TbCertificate,
        link: "#",
    },
];

function useReveal(threshold = 0.2) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

/** Animates a number from 0 to `target` once its container is visible. */
function useCountUp(target, visible, duration = 1400) {
    const [count, setCount] = useState(0);
    const frame = useRef(null);

    useEffect(() => {
        if (!visible || target == null) return undefined;

        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
                frame.current = requestAnimationFrame(tick);
            }
        };

        frame.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame.current);
    }, [visible, target, duration]);

    return count;
}

function StatCard({ stat, index }) {
    const [ref, visible] = useReveal(0.5);
    const count = useCountUp(stat.value, visible);

    return (
        <div
            ref={ref}
            className={`stat-card ${visible ? "stat-card--visible" : ""}`}
            style={{ "--reveal-delay": `${index * 100}ms` }}
        >
            <span className="stat-card__value">
                {stat.value != null ? `${count.toString().padStart(2, "0")}${stat.suffix}` : stat.display}
            </span>
            <span className="stat-card__label">{stat.label}</span>
        </div>
    );
}

function Particles({ count = 18 }) {
    const particles = React.useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                size: 1.5 + Math.random() * 2.5,
                delay: Math.random() * 10,
                duration: 11 + Math.random() * 12,
                drift: (Math.random() - 0.5) * 50,
            })),
        [count]
    );

    return (
        <div className="achievements-particles" aria-hidden="true">
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="achievements-particle"
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        "--drift": `${p.drift}px`,
                    }}
                />
            ))}
        </div>
    );
}

function TimelineColumn() {
    const [ref, visible] = useReveal(0.1);

    return (
        <div className="achievements-column">
            <h3 className="achievements-column__title">Achievements Timeline</h3>
            <ul ref={ref} className="timeline-list" role="list">
                {TIMELINE.map((item, index) => (
                    <AchievementCard
                        key={item.id}
                        variant="timeline"
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        year={item.year}
                        index={index}
                        isLast={index === TIMELINE.length - 1}
                        visible={visible}
                    />
                ))}
            </ul>
        </div>
    );
}

function CertificatesColumn() {
    const [ref, visible] = useReveal(0.1);

    return (
        <div className="achievements-column">
            <h3 className="achievements-column__title">Certifications</h3>
            <div ref={ref} className="cert-grid">
                {CERTIFICATES.map((cert, index) => (
                    <AchievementCard
                        key={cert.id}
                        variant="certificate"
                        icon={cert.icon}
                        title={cert.title}
                        organization={cert.organization}
                        year={cert.year}
                        status={cert.status}
                        link={cert.link}
                        index={index}
                        visible={visible}
                    />
                ))}
            </div>

            <a href="#certificates" className="view-certs-btn">
                <span className="view-certs-btn__border" aria-hidden="true" />
                View Certificates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
        </div>
    );
}

export default function Achievements() {
    const [headerRef, headerVisible] = useReveal(0.4);

    return (
        <section
            id="achievements"
            className="achievements-section"
            aria-labelledby="achievements-heading"
        >
            <div className="achievements-grid-texture" aria-hidden="true" />
            <div className="achievements-blob achievements-blob--purple" aria-hidden="true" />
            <div className="achievements-blob achievements-blob--cyan" aria-hidden="true" />
            <Particles />

            <div className="achievements-container">
                <div
                    ref={headerRef}
                    className={`achievements-header ${headerVisible ? "achievements-header--visible" : ""
                        }`}
                >
                    <span className="achievements-badge">ACHIEVEMENTS</span>
                    <h2 id="achievements-heading" className="achievements-heading">
                        <span className="achievements-heading__gradient">Achievements</span> &amp; Certifications
                    </h2>
                    <p className="achievements-subtitle">
                        My learning journey through certifications, competitions,
                        workshops, and continuous skill development.
                    </p>
                </div>

                <div className="stats-row">
                    {STATS.map((stat, index) => (
                        <StatCard key={stat.id} stat={stat} index={index} />
                    ))}
                </div>

                <div className="achievements-grid">
                    <TimelineColumn />
                    <CertificatesColumn />
                </div>
            </div>
        </section>
    );
}