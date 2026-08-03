import React, { useEffect, useRef, useState } from "react";
import "../css/Skill.css";

import {
    SiReact,
    SiJavascript,
    SiHtml5,
    SiPython,
    SiCplusplus,
    SiGit,
    SiGithub,
    SiVite,
    SiFigma,
    SiNodedotjs,
    SiMongodb,
    SiExpress,
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { TbDeviceMobile, TbBrain, TbRobot } from "react-icons/tb";

const SKILL_CATEGORIES = [
    {
        id: "frontend",
        title: "Frontend Development",
        skills: [
            { name: "React", percentage: 50, Icon: SiReact, color: "#61DAFB" },
            { name: "JavaScript", percentage: 88, Icon: SiJavascript, color: "#F7DF1E" },
            { name: "HTML", percentage: 95, Icon: SiHtml5, color: "#E34F26" },
            { name: "CSS", percentage: 95, Icon: FaCss3Alt, color: "#1572B6" },
            { name: "Responsive Design", percentage: 40, Icon: TbDeviceMobile, color: "#00E5FF" },
        ],
    },
    {
        id: "languages",
        title: "Programming Languages",
        skills: [
            { name: "Python", percentage: 65, Icon: SiPython, color: "#3776AB" },
        ],
    },
    {
        id: "tools",
        title: "Tools & Platforms",
        skills: [
            { name: "Git", percentage: 88, Icon: SiGit, color: "#F05032" },
            { name: "GitHub", percentage: 90, Icon: SiGithub, color: "#F8FAFC" },
            { name: "VS Code", percentage: 95, Icon: VscCode, color: "#007ACC" },
            { name: "Vite", percentage: 85, Icon: SiVite, color: "#646CFF" },
        ],
    },
    {
        id: "learning",
        title: "Backend & AI / Machine Learning",
        skills: [
            { name: "Node.js", percentage: 20, Icon: SiNodedotjs, color: "#339933" },
            { name: "Express.js", percentage: 10, Icon: SiExpress, color: "#9ca3af" },
            { name: "MongoDB", percentage: 72, Icon: SiMongodb, color: "#47A248" },
        ],
    },
];

/** Reveal hook for scroll animations */
function useReveal(threshold = 0.15) {
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

function SkillItem({ skill, isOpen, onSelect }) {
    const { name, percentage, Icon, color } = skill;
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = () => onSelect(name);
    const handleKey = (e) => { if (e.key === "Enter" || e.key === " ") handleToggle(); };

    return (
        <div
            className={`sk-item ${isHovered ? "sk-item--hovered" : ""} ${isOpen ? "sk-item--active" : ""}`}
            onClick={handleToggle}
            onKeyDown={handleKey}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0}
            role="button"
            aria-expanded={isOpen}
            aria-label={`${name}${isOpen ? `: ${percentage}% proficiency` : " — click to reveal proficiency"}`}
            style={{ "--item-color": color }}
        >
            <div className="sk-item__header">
                <div className="sk-item__left">
                    <span className="sk-item__icon" style={{ color }}>
                        <Icon aria-hidden="true" />
                    </span>
                    <span className="sk-item__name">{name}</span>
                </div>

                {/* Percentage: hidden until clicked */}
                <span
                    className={`sk-item__badge ${isOpen ? "sk-item__badge--visible" : ""}`}
                    style={{ color }}
                    aria-hidden={!isOpen}
                >
                    {percentage}%
                </span>
            </div>

            {/* Progress bar: animates in only when clicked */}
            <div className={`sk-item__bar-bg ${isOpen ? "sk-item__bar-bg--visible" : ""}`}>
                <div
                    className="sk-item__bar-fill"
                    style={{
                        width: isOpen ? `${percentage}%` : "0%",
                        backgroundColor: color,
                        boxShadow: isOpen ? `0 0 10px ${color}88` : "none",
                    }}
                />
            </div>
        </div>
    );
}

function SkillCard({ category, index }) {
    const [ref, visible] = useReveal();
    // Accordion: track which skill name is open. Clicking same one closes it.
    const [openSkill, setOpenSkill] = useState(null);

    const handleSelect = (name) => {
        setOpenSkill((prev) => (prev === name ? null : name));
    };

    return (
        <article
            ref={ref}
            className={`sk-card ${visible ? "sk-card--visible" : ""}`}
            style={{ "--card-delay": `${index * 100}ms` }}
        >
            <div className="sk-card__glow" aria-hidden="true" />
            <h3 className="sk-card__title">{category.title}</h3>
            <div className="sk-card__list">
                {category.skills.map((skill) => (
                    <SkillItem
                        key={skill.name}
                        skill={skill}
                        isOpen={openSkill === skill.name}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </article>
    );
}

export default function Skills() {
    const [headerRef, headerVisible] = useReveal(0.25);

    return (
        <section id="skills" className="sk-section" aria-labelledby="sk-heading">
            {/* Background Layer */}
            <div className="sk-bg-grid" aria-hidden="true" />
            <div className="sk-bg-blob sk-bg-blob--a" aria-hidden="true" />
            <div className="sk-bg-blob sk-bg-blob--b" aria-hidden="true" />

            <div className="sk-container">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`sk-header ${headerVisible ? "sk-header--visible" : ""}`}
                >
                    <span className="sk-badge">MY SKILLS</span>
                    <h2 id="sk-heading" className="sk-heading">
                        Technical <span className="sk-heading__grad">Proficiency</span>
                    </h2>
                    <p className="sk-sub">
                        Hover or tap on any skill to reveal the exact proficiency level &amp; expertise.
                    </p>
                </div>

                {/* Grid */}
                <div className="sk-grid">
                    {SKILL_CATEGORIES.map((category, index) => (
                        <SkillCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}