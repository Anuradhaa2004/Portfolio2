import React, { useRef, useState } from "react";

const STATUS_CONFIG = {
    Live:           { label: "● Live",         cls: "pc-badge--live" },
    "Coming Soon":  { label: "◌ Coming Soon",  cls: "pc-badge--soon" },
    "In Progress":  { label: "◑ In Progress",  cls: "pc-badge--progress" },
};

export default function ProjectCard({ project, index }) {
    const { title, category, status, image, description, tech, links, id } = project;
    const num   = String(index + 1).padStart(2, "0");
    const badge = STATUS_CONFIG[status] ?? STATUS_CONFIG["Live"];

    return (
        <article className="pc-card" aria-labelledby={`pc-title-${id}`}>

            {/* ── image ─────────────────────────────────── */}
            <div className="pc-img-wrap">
                <img
                    src={image}
                    alt={`${title} screenshot`}
                    className="pc-img"
                    loading="lazy"
                />
                {/* project number overlay */}
                <span className="pc-num" aria-hidden="true">{num}</span>
                {/* category tag overlay */}
                <span className={`pc-badge ${badge.cls}`}>{category}</span>
            </div>

            {/* ── content ───────────────────────────────── */}
            <div className="pc-body">
                <h3 id={`pc-title-${id}`} className="pc-title">{title}</h3>
                <p className="pc-desc">{description}</p>

                <div className="pc-tech">
                    <span className="pc-tech-label">Technologies used</span>
                    <p className="pc-tech-list">{tech.join(" & ")}</p>
                </div>

                <div className="pc-actions">
                    {links.demo ? (
                        <a
                            href={links.demo}
                            className="pc-btn pc-btn--demo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo ↗
                        </a>
                    ) : (
                        <span className="pc-btn pc-btn--disabled">Coming Soon</span>
                    )}
                    {links.github && (
                        <a
                            href={links.github}
                            className="pc-btn pc-btn--gh"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}