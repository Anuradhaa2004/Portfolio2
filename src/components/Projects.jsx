import React, { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import "../css/Projects.css";

const PROJECTS = [
    {
        id: "healthbuddy-ai",
        title: "HealthBuddy AI",
        category: "AI / Healthcare",
        status: "Live",
        image: "/projects/healthbuddy-ai.png",
        description: "AI-powered healthcare chatbot for symptom guidance, disease awareness, and bilingual support.",
        tech: ["React", "Python", "Flask", "Groq API"],
        links: { demo: "#", github: "#" },
    },
    {
        id: "fyntra",
        title: "Fyntra E-Commerce",
        category: "E-Commerce",
        status: "Live",
        image: "/projects/fyntra.png",
        description: "Full-stack e-commerce platform with authentication, cart, product filtering, and REST API.",
        tech: ["React", "Node.js", "MongoDB", "Express.js"],
        links: { demo: "#", github: "#" },
    },
    {
        id: "glamify-ai",
        title: "Glamify AI",
        category: "AI / Beauty Tech",
        status: "Coming Soon",
        image: "/projects/glamify-ai.png",
        description: "AI virtual makeup app letting users preview beauty products digitally before buying.",
        tech: ["React", "Python", "AI", "CSS"],
        links: { demo: null, github: "#" },
    },
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        category: "Personal Portfolio",
        status: "Live",
        image: "/projects/portfolio-website.png",
        description: "Premium portfolio with smooth animations, responsive design, and modern UI/UX.",
        tech: ["React", "Vite", "CSS", "JavaScript"],
        links: { demo: "#", github: "#" },
    },
];

export default function Projects() {
    const trackRef = useRef(null);
    const [canLeft,  setCanLeft]  = useState(false);
    const [canRight, setCanRight] = useState(true);

    const updateArrows = () => {
        const t = trackRef.current;
        if (!t) return;
        setCanLeft(t.scrollLeft > 8);
        setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
    };

    useEffect(() => {
        const t = trackRef.current;
        if (!t) return;
        updateArrows();
        t.addEventListener("scroll", updateArrows, { passive: true });
        return () => t.removeEventListener("scroll", updateArrows);
    }, []);

    const scroll = (dir) => {
        const t = trackRef.current;
        if (t) t.scrollBy({ left: dir * 360, behavior: "smooth" });
    };

    return (
        <section id="projects" className="proj-section" aria-labelledby="proj-heading">
            <div className="proj-bg-blob proj-bg-blob--a" aria-hidden="true" />
            <div className="proj-bg-blob proj-bg-blob--b" aria-hidden="true" />

            <div className="proj-inner">
                {/* ── header ───────────────────────────────── */}
                <div className="proj-header">
                    <span className="proj-eyebrow">MY PROJECTS</span>
                    <h2 id="proj-heading" className="proj-heading">
                        <span className="proj-heading__grad">Featured</span> Projects
                    </h2>
                    <p className="proj-sub">
                        A collection of real-world projects showcasing my frontend
                        development, AI/ML, and problem-solving skills.
                    </p>

                    {/* arrow controls */}
                    <div className="proj-controls" aria-label="Scroll projects">
                        <button
                            className={`proj-arrow ${!canLeft ? "proj-arrow--dim" : ""}`}
                            onClick={() => scroll(-1)}
                            aria-label="Scroll left"
                            disabled={!canLeft}
                        >
                            ←
                        </button>
                        <button
                            className={`proj-arrow ${!canRight ? "proj-arrow--dim" : ""}`}
                            onClick={() => scroll(1)}
                            aria-label="Scroll right"
                            disabled={!canRight}
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* ── horizontal scroll track ───────────────── */}
                <div className="proj-track-wrap">
                    <div
                        ref={trackRef}
                        className="proj-track"
                        role="list"
                    >
                        {PROJECTS.map((p, i) => (
                            <div key={p.id} role="listitem">
                                <ProjectCard project={p} index={i} />
                            </div>
                        ))}
                    </div>
                    {/* fade edges */}
                    <div className="proj-fade proj-fade--left"  aria-hidden="true" />
                    <div className="proj-fade proj-fade--right" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}