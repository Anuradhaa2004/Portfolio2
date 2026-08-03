import React from "react";
import ProjectCard from "./ProjectCard";
import "../css/Projects.css";
import cleanSightImg from "../assets/CleanSight-Ai.png";
import ecommerceImg from "../assets/E-commerce.jpg";

const PROJECTS = [
    {
        id: "healthbuddy-ai",
        title: "CleanSight AI",
        category: "Cleanliness",
        status: "Live",
        image: cleanSightImg,
        description: "To bridge the gap between authorities and citizens.",
        tech: ["MERN-Stack"],
        links: { demo: "https://clean-sight-ai-frontend.vercel.app/", github: "https://github.com/Anuradhaa2004/CleanSight-AI-frontend" },
    },
    {
        id: "fyntra",
        title: "E-Commerce Store",
        category: "E-Commerce",
        status: "Live",
        image: ecommerceImg,
        description: "A Full-Stack E-Commerce Platform built with React.js and Node.js.",
        tech: ["React", "Node.js", "MongoDB", "Express.js"],
        links: { demo: "www.ridhikaenterprises.in", github: "https://github.com/Anuradhaa2004/E-Commerce-backend" },
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
                </div>

                {/* ── grid of cards ───────────────────────── */}
                <div className="proj-grid" role="list">
                    {PROJECTS.map((p, i) => (
                        <div key={p.id} role="listitem">
                            <ProjectCard project={p} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}