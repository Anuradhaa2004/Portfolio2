import React from "react";

/**
 * Reusable card for the Achievements & Certifications section.
 * Renders in one of two variants so both the timeline (left column)
 * and the certificate grid (right column) share one component and
 * one visual language instead of duplicating card markup.
 *
 * variant="timeline"    -> icon, title, description, year, glowing dot + connecting line
 * variant="certificate" -> icon, title, organization, year, status badge
 */
export default function AchievementCard({
    variant,
    icon: Icon,
    title,
    description,
    organization,
    year,
    status,
    link,
    index = 0,
    isLast = false,
    visible = false,
}) {
    if (variant === "timeline") {
        return (
            <li
                className={`timeline-item ${visible ? "timeline-item--visible" : ""}`}
                style={{ "--reveal-delay": `${index * 140}ms` }}
            >
                <div className="timeline-item__rail" aria-hidden="true">
                    <span className="timeline-item__dot" />
                    {!isLast && <span className="timeline-item__line" />}
                </div>

                <div className="timeline-item__card">
                    <div className="timeline-item__icon">
                        <Icon aria-hidden="true" />
                    </div>
                    <div className="timeline-item__body">
                        <div className="timeline-item__meta">
                            <span className="timeline-item__year">{year}</span>
                        </div>
                        <h4 className="timeline-item__title">{title}</h4>
                        <p className="timeline-item__desc">{description}</p>
                    </div>
                </div>
            </li>
        );
    }

    // variant === "certificate"
    return (
        <article
            className={`cert-card ${visible ? "cert-card--visible" : ""}`}
            style={{ "--reveal-delay": `${index * 140}ms` }}
            aria-labelledby={`cert-title-${index}`}
        >
            <span className="cert-card__border" aria-hidden="true" />
            <span className="cert-card__glow" aria-hidden="true" />

            <div className="cert-card__top">
                <div className="cert-card__icon">
                    <Icon aria-hidden="true" />
                </div>
                {status && <span className="cert-card__status">{status}</span>}
            </div>

            <h4 id={`cert-title-${index}`} className="cert-card__title">
                {title}
            </h4>
            <p className="cert-card__org">{organization}</p>
            <p className="cert-card__year">{year}</p>

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card__link"
                    aria-label={`View certificate: ${title}`}
                >
                    View Certificate
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            )}
        </article>
    );
}