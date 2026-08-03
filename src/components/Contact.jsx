import React, { useState, useRef, useCallback } from "react";
import "../css/Contact.css";

/* ------------------------------------------------------------------ */
/*  Static data — replace placeholder values with your own details    */
/* ------------------------------------------------------------------ */

const CONTACT_ITEMS = [
    {
        id: "email",
        label: "Email",
        value: "anuradhagupta1829@gmail.com",
        href: "mailto:yourname@example.com",
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
    {
        id: "location",
        label: "Location",
        value: "India",
        href: null,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 21.5C12 21.5 19 15.4 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 15.4 12 21.5 12 21.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/anuradha-gupta-66732632b/",
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
        id: "github",
        label: "GitHub",
        value: "github.com/Anuradhaa2004",
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
];

const AVAILABILITY_ITEMS = [
    "Open to Internship",
    "Open to Full-time Opportunities",
    "Available for Freelance Projects",
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

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | loading | success
    const formRef = useRef(null);

    const validate = useCallback((values) => {
        const next = {};
        if (!values.name.trim()) next.name = "Please enter your name.";
        if (!values.email.trim()) {
            next.email = "Please enter your email.";
        } else if (!EMAIL_REGEX.test(values.email.trim())) {
            next.email = "Please enter a valid email address.";
        }
        if (!values.subject.trim()) next.subject = "Please add a subject.";
        if (!values.message.trim()) {
            next.message = "Please write a short message.";
        } else if (values.message.trim().length < 10) {
            next.message = "Message should be at least 10 characters.";
        }
        return next;
    }, []);

    const handleChange = (field) => (e) => {
        const { value } = e.target;
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setStatus("loading");

        // Simulated submit — wire this up to your backend / email service.
        window.setTimeout(() => {
            setStatus("success");
            setForm(INITIAL_FORM);
            window.setTimeout(() => setStatus("idle"), 4000);
        }, 1600);
    };

    return (
        <section id="contact" className="contact" aria-labelledby="contact-heading">
            <div className="contact__backdrop" aria-hidden="true">
                <span className="contact__glow contact__glow--purple" />
                <span className="contact__glow contact__glow--cyan" />
                <span className="contact__grid" />
            </div>

            <div className="contact__inner">
                <header className="contact__header">
                    <span className="contact__badge">
                        <span className="contact__badge-dot" />
                        CONTACT
                    </span>
                    <h2 id="contact-heading" className="contact__heading">
                        Let&apos;s Build Something <span className="contact__heading-accent">Amazing</span>{" "}
                        Together
                    </h2>
                    <p className="contact__subtitle">
                        I&apos;m always open to internships, freelance opportunities, collaborations, and
                        exciting projects. Feel free to reach out.
                    </p>
                </header>

                <div className="contact__grid-layout">
                    {/* ---------------------------------------------------------- */}
                    {/*  LEFT — contact info + availability                        */}
                    {/* ---------------------------------------------------------- */}
                    <div className="contact__left">
                        <ul className="contact-info-list">
                            {CONTACT_ITEMS.map((item) => {
                                const Wrapper = item.href ? "a" : "div";
                                const wrapperProps = item.href
                                    ? {
                                        href: item.href,
                                        target: item.href.startsWith("http") ? "_blank" : undefined,
                                        rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                                    }
                                    : {};
                                return (
                                    <li key={item.id} className="contact-info-item">
                                        <Wrapper
                                            {...wrapperProps}
                                            className="contact-info-card"
                                            aria-label={`${item.label}: ${item.value}`}
                                        >
                                            <span className="contact-info-card__icon">{item.icon}</span>
                                            <span className="contact-info-card__text">
                                                <span className="contact-info-card__label">{item.label}</span>
                                                <span className="contact-info-card__value">{item.value}</span>
                                            </span>
                                        </Wrapper>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="availability-card">
                            <h3 className="availability-card__title">Availability</h3>
                            <ul className="availability-card__list">
                                {AVAILABILITY_ITEMS.map((label) => (
                                    <li key={label} className="availability-card__item">
                                        <span className="availability-card__dot" />
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ---------------------------------------------------------- */}
                    {/*  RIGHT — contact form                                       */}
                    {/* ---------------------------------------------------------- */}
                    <div className="contact__right">
                        <form
                            ref={formRef}
                            className="contact-form"
                            noValidate
                            onSubmit={handleSubmit}
                            aria-describedby={status === "success" ? "form-success-message" : undefined}
                        >
                            <div className="contact-form__row">
                                <FormField
                                    id="name"
                                    label="Full Name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    error={errors.name}
                                    autoComplete="name"
                                />
                                <FormField
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    error={errors.email}
                                    autoComplete="email"
                                />
                            </div>

                            <FormField
                                id="subject"
                                label="Subject"
                                type="text"
                                value={form.subject}
                                onChange={handleChange("subject")}
                                error={errors.subject}
                            />

                            <FormField
                                id="message"
                                label="Message"
                                type="textarea"
                                value={form.message}
                                onChange={handleChange("message")}
                                error={errors.message}
                                rows={5}
                            />

                            <button
                                type="submit"
                                className={`contact-submit${status === "loading" ? " is-loading" : ""}`}
                                disabled={status === "loading"}
                            >
                                <span className="contact-submit__content">
                                    {status === "loading" ? (
                                        <>
                                            <span className="contact-submit__spinner" aria-hidden="true" />
                                            Sending&hellip;
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg
                                                className="contact-submit__arrow"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M5 12H19M19 12L13 6M19 12L13 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>

                            <div role="status" aria-live="polite" className="contact-form__status">
                                {status === "success" && (
                                    <p id="form-success-message" className="contact-form__success">
                                        Message sent — thank you! I&apos;ll get back to you soon.
                                    </p>
                                )}
                            </div>
                        </form>

                        <div className="social-links">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="social-links__item"
                                    aria-label={social.label}
                                    data-tooltip={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Reusable floating-label field                                      */
/* ------------------------------------------------------------------ */

function FormField({ id, label, type, value, onChange, error, autoComplete, rows }) {
    const isTextarea = type === "textarea";
    const Tag = isTextarea ? "textarea" : "input";

    return (
        <div className={`form-field${error ? " has-error" : ""}`}>
            <Tag
                id={id}
                name={id}
                className="form-field__control"
                placeholder=" "
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                rows={isTextarea ? rows : undefined}
                type={isTextarea ? undefined : type}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            <label htmlFor={id} className="form-field__label">
                {label}
            </label>
            <span className="form-field__border" aria-hidden="true" />
            {error && (
                <span id={`${id}-error`} className="form-field__error" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}