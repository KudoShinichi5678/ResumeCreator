import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  Maximize2,
  Palette,
  Pencil
} from 'lucide-react';

function GithubIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function ResumePreview({ 
  resumeData, 
  templateId, 
  colorTheme, 
  fontOption, 
  spacingOption,
  onPrint,
  onOpenCustomizer,
  onSwitchToEditor
}) {
  const [zoomLevel, setZoomLevel] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 850) {
      return Math.min(100, Math.max(35, Math.floor(((window.innerWidth - 32) / 794) * 100)));
    }
    return 100;
  });

  const [isAutoFit, setIsAutoFit] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  });

  const viewportRef = useRef(null);
  const paperRef = useRef(null);
  const [paperHeight, setPaperHeight] = useState(1123);

  const calculateFitScale = useCallback(() => {
    if (!viewportRef.current) {
      if (typeof window !== 'undefined') {
        const available = window.innerWidth - 32;
        return Math.min(115, Math.max(32, Math.floor((available / 794) * 100)));
      }
      return 100;
    }
    const containerWidth = viewportRef.current.clientWidth - 32;
    if (containerWidth > 0) {
      return Math.min(115, Math.max(32, Math.floor((containerWidth / 794) * 100)));
    }
    return 100;
  }, []);

  const handleFitToScreen = () => {
    setIsAutoFit(true);
    const fitScale = calculateFitScale();
    setZoomLevel(fitScale);
  };

  const handleZoom = (delta) => {
    setIsAutoFit(false);
    setZoomLevel(prev => Math.min(150, Math.max(30, prev + delta)));
  };

  const handleResetZoom = () => {
    setIsAutoFit(false);
    setZoomLevel(100);
  };

  // Recalculate auto-fit when window resizes or viewport dimensions change
  useEffect(() => {
    if (!isAutoFit) return;

    const handleResize = () => {
      const fit = calculateFitScale();
      setZoomLevel(fit);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAutoFit, calculateFitScale]);

  const { personal, experience, education, skills, projects, certifications, languages, interests } = resumeData;

  // Track natural unscaled height of resume paper
  useEffect(() => {
    const el = paperRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        if (height > 0) {
          setPaperHeight(Math.max(1123, Math.round(height)));
        }
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Generate CSS custom properties for styling based on selected theme
  const previewStyle = {
    '--rc-primary': colorTheme.primary,
    '--rc-primary-dark': colorTheme.primaryDark,
    '--rc-accent-bg': colorTheme.accentBg,
    '--rc-border': colorTheme.border,
    fontFamily: fontOption.family,
    transform: `scale(${zoomLevel / 100})`,
    transformOrigin: 'top left',
    position: 'absolute',
    top: 0,
    left: 0
  };

  // Computed dimensions for the scaler wrapper
  const scaledWidth = Math.round(794 * (zoomLevel / 100));
  const scaledHeight = Math.round(paperHeight * (zoomLevel / 100));

  return (
    <section className="rc-preview-container">
      {/* Floating Toolbar for Preview (Zoom & Info) */}
      <div className="rc-preview-toolbar">
        <div className="rc-toolbar-left">
          {onSwitchToEditor && (
            <button 
              type="button" 
              className="rc-tool-btn-mobile-edit"
              onClick={onSwitchToEditor}
              title="Return to form editor"
            >
              <Pencil size={13} />
              <span>Edit Form</span>
            </button>
          )}
          <span className="rc-paper-indicator">A4 Standard</span>
          <span className="rc-dot-sep">•</span>
          <span className="rc-theme-name">{colorTheme.name}</span>
        </div>

        <div className="rc-toolbar-right">
          <button 
            type="button" 
            className="rc-tool-btn" 
            onClick={() => handleZoom(-10)} 
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="rc-zoom-val">{zoomLevel}%</span>
          <button 
            type="button" 
            className="rc-tool-btn" 
            onClick={() => handleZoom(10)} 
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button 
            type="button" 
            className={`rc-tool-btn ${isAutoFit ? 'active' : ''}`}
            onClick={handleFitToScreen} 
            title="Fit to Screen Width"
            aria-label="Fit to Screen Width"
          >
            <Maximize2 size={13} />
          </button>
          <button 
            type="button" 
            className="rc-tool-btn rc-tool-btn-reset" 
            onClick={handleResetZoom} 
            title="Reset Zoom to 100%"
            aria-label="Reset Zoom to 100%"
          >
            <RotateCcw size={13} />
          </button>
          {onOpenCustomizer && (
            <button 
              type="button" 
              className="rc-tool-btn rc-tool-btn-palette"
              onClick={onOpenCustomizer}
              title="Change Template & Colors"
              aria-label="Change Template & Colors"
            >
              <Palette size={14} />
            </button>
          )}
          <button 
            type="button" 
            className="rc-tool-btn-print" 
            onClick={onPrint}
            title="Download PDF or Print"
            aria-label="Download PDF"
          >
            <Printer size={14} />
            <span className="print-label-desktop">PDF Print</span>
            <span className="print-label-mobile">PDF</span>
          </button>
        </div>
      </div>

      {/* Outer wrapper to center the scaled paper */}
      <div className="rc-paper-viewport" ref={viewportRef}>
        {/* Scaled bounding wrapper so viewport scrollbars match the visually scaled paper size */}
        <div 
          className="rc-paper-scaler"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            minHeight: `${scaledHeight}px`,
            position: 'relative'
          }}
        >
          {/* Printable Paper Canvas */}
          <div 
            ref={paperRef}
            id="resume-printable-area" 
            className={`rc-paper rc-template-${templateId} rc-spacing-${spacingOption.id}`}
            style={previewStyle}
          >
          {/* ========================================================
              TEMPLATE 1: MODERN TECH (DEFAULT)
              ======================================================== */}
          {templateId === 'modern' && (
            <div className="template-modern-wrap">
              {/* Header Banner */}
              <div className="modern-header">
                <div className="modern-header-main">
                  <h1 className="candidate-name">{personal.fullName || 'Candidate Name'}</h1>
                  <h2 className="candidate-title">{personal.targetRole || 'Professional Role'}</h2>
                </div>

                {/* Contact Channels */}
                <div className="modern-contacts-grid">
                  {personal.email && (
                    <div className="contact-item">
                      <Mail size={12} className="contact-icon" />
                      <span>{personal.email}</span>
                    </div>
                  )}
                  {personal.phone && (
                    <div className="contact-item">
                      <Phone size={12} className="contact-icon" />
                      <span>{personal.phone}</span>
                    </div>
                  )}
                  {personal.location && (
                    <div className="contact-item">
                      <MapPin size={12} className="contact-icon" />
                      <span>{personal.location}</span>
                    </div>
                  )}
                  {personal.age && (
                    <div className="contact-item">
                      <span className="contact-label-tag">Age:</span>
                      <span>{personal.age} yrs</span>
                    </div>
                  )}
                  {personal.website && (
                    <div className="contact-item">
                      <Globe size={12} className="contact-icon" />
                      <a href={personal.website} target="_blank" rel="noreferrer">
                        {personal.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  {personal.github && (
                    <div className="contact-item">
                      <GithubIcon size={12} className="contact-icon" />
                      <span>{personal.github}</span>
                    </div>
                  )}
                  {personal.linkedin && (
                    <div className="contact-item">
                      <LinkedinIcon size={12} className="contact-icon" />
                      <span>{personal.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Summary */}
              {personal.summary && (
                <div className="modern-section">
                  <div className="section-title-wrap">
                    <h3 className="section-title">Professional Summary</h3>
                    <div className="section-divider-line" />
                  </div>
                  <p className="summary-text">{personal.summary}</p>
                </div>
              )}

              {/* Technical Skills */}
              {skills && skills.length > 0 && (
                <div className="modern-section">
                  <div className="section-title-wrap">
                    <h3 className="section-title">Core Skills & Technologies</h3>
                    <div className="section-divider-line" />
                  </div>
                  <div className="modern-skills-grid">
                    {skills.map((cat, i) => (
                      <div key={i} className="skill-cat-row">
                        <strong className="skill-cat-title">{cat.category}:</strong>
                        <div className="skill-pills-list">
                          {cat.items.map(skill => (
                            <span key={skill} className="skill-pill-item">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {experience && experience.length > 0 && (
                <div className="modern-section">
                  <div className="section-title-wrap">
                    <h3 className="section-title">Work Experience</h3>
                    <div className="section-divider-line" />
                  </div>
                  <div className="experience-list">
                    {experience.map(exp => (
                      <div key={exp.id} className="experience-item">
                        <div className="exp-heading-row">
                          <div>
                            <strong className="exp-role">{exp.role}</strong>
                            <span className="exp-company"> @ {exp.company}</span>
                          </div>
                          <span className="exp-date-location">
                            {exp.startDate} – {exp.endDate || 'Present'} | {exp.location}
                          </span>
                        </div>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="exp-bullets">
                            {exp.highlights.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Projects */}
              {projects && projects.length > 0 && (
                <div className="modern-section">
                  <div className="section-title-wrap">
                    <h3 className="section-title">Featured Projects</h3>
                    <div className="section-divider-line" />
                  </div>
                  <div className="projects-grid">
                    {projects.map(proj => (
                      <div key={proj.id} className="project-item">
                        <div className="project-top-row">
                          <strong className="project-title">{proj.title}</strong>
                          <div className="project-links">
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="proj-link">
                                Demo <ExternalLink size={10} />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="proj-link">
                                Code <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                        {proj.techStack && (
                          <div className="project-stack">
                            {proj.techStack.join(' • ')}
                          </div>
                        )}
                        <p className="project-desc">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Credentials Row */}
              <div className="modern-split-bottom">
                {/* Education */}
                {education && education.length > 0 && (
                  <div className="bottom-col">
                    <div className="section-title-wrap">
                      <h3 className="section-title">Education</h3>
                      <div className="section-divider-line" />
                    </div>
                    {education.map(edu => (
                      <div key={edu.id} className="edu-item">
                        <strong className="edu-degree">{edu.degree}</strong>
                        <div className="edu-school">{edu.school}</div>
                        <div className="edu-meta">
                          {edu.field && <span>{edu.field} • </span>}
                          <span>Graduated {edu.graduationYear}</span>
                          {edu.gpa && <span> • GPA {edu.gpa}</span>}
                        </div>
                        {edu.achievements && (
                          <p className="edu-achieve">{edu.achievements}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications & Languages */}
                <div className="bottom-col">
                  {certifications && certifications.length > 0 && (
                    <div className="cert-section">
                      <div className="section-title-wrap">
                        <h3 className="section-title">Certifications</h3>
                        <div className="section-divider-line" />
                      </div>
                      {certifications.map(c => (
                        <div key={c.id} className="cert-item">
                          <span className="cert-bullet">◈</span>
                          <div>
                            <strong>{c.name}</strong>
                            <span className="cert-issuer"> — {c.issuer} ({c.issueDate})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {languages && languages.length > 0 && (
                    <div className="lang-section rc-mt-3">
                      <div className="section-title-wrap">
                        <h3 className="section-title">Languages</h3>
                        <div className="section-divider-line" />
                      </div>
                      <div className="lang-items-row">
                        {languages.map(l => (
                          <span key={l.id} className="lang-item">
                            <strong>{l.name}:</strong> {l.proficiency}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {interests && interests.length > 0 && (
                    <div className="interests-section rc-mt-3">
                      <div className="section-title-wrap">
                        <h3 className="section-title">Interests</h3>
                        <div className="section-divider-line" />
                      </div>
                      <p className="interests-text">
                        {interests.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TEMPLATE 2: MINIMAL ATS
              ======================================================== */}
          {templateId === 'minimal' && (
            <div className="template-minimal-wrap">
              <header className="minimal-header">
                <h1 className="minimal-name">{personal.fullName}</h1>
                <p className="minimal-title">{personal.targetRole}</p>
                <div className="minimal-contacts">
                  {personal.email && <span>{personal.email}</span>}
                  {personal.phone && <span>• {personal.phone}</span>}
                  {personal.location && <span>• {personal.location}</span>}
                  {personal.age && <span>• Age: {personal.age}</span>}
                  {personal.linkedin && <span>• {personal.linkedin}</span>}
                  {personal.github && <span>• {personal.github}</span>}
                </div>
              </header>

              {personal.summary && (
                <section className="minimal-section">
                  <h2 className="minimal-sec-heading">PROFESSIONAL SUMMARY</h2>
                  <div className="minimal-divider" />
                  <p className="minimal-text">{personal.summary}</p>
                </section>
              )}

              {skills && skills.length > 0 && (
                <section className="minimal-section">
                  <h2 className="minimal-sec-heading">TECHNICAL SKILLS</h2>
                  <div className="minimal-divider" />
                  <div className="minimal-skills-list">
                    {skills.map((cat, i) => (
                      <div key={i} className="minimal-skill-row">
                        <strong>{cat.category}:</strong> {cat.items.join(', ')}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {experience && experience.length > 0 && (
                <section className="minimal-section">
                  <h2 className="minimal-sec-heading">PROFESSIONAL EXPERIENCE</h2>
                  <div className="minimal-divider" />
                  {experience.map(exp => (
                    <div key={exp.id} className="minimal-exp-item">
                      <div className="minimal-exp-head">
                        <div>
                          <strong>{exp.role}</strong> — <span>{exp.company}</span>
                        </div>
                        <span className="minimal-date">{exp.startDate} – {exp.endDate || 'Present'}</span>
                      </div>
                      <span className="minimal-location">{exp.location}</span>
                      {exp.highlights && (
                        <ul className="minimal-bullets">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {projects && projects.length > 0 && (
                <section className="minimal-section">
                  <h2 className="minimal-sec-heading">KEY PROJECTS</h2>
                  <div className="minimal-divider" />
                  {projects.map(proj => (
                    <div key={proj.id} className="minimal-proj-item">
                      <div className="minimal-proj-head">
                        <strong>{proj.title}</strong>
                        {proj.techStack && <span> ({proj.techStack.join(', ')})</span>}
                      </div>
                      <p className="minimal-text">{proj.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {education && education.length > 0 && (
                <section className="minimal-section">
                  <h2 className="minimal-sec-heading">EDUCATION</h2>
                  <div className="minimal-divider" />
                  {education.map(edu => (
                    <div key={edu.id} className="minimal-edu-item">
                      <div className="minimal-exp-head">
                        <strong>{edu.school}</strong>
                        <span>{edu.graduationYear}</span>
                      </div>
                      <div>{edu.degree} in {edu.field} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</div>
                      {edu.achievements && <p className="minimal-text italic">{edu.achievements}</p>}
                    </div>
                  ))}
                </section>
              )}

              {/* Extra: Certs, Languages & Interests */}
              <section className="minimal-section">
                <h2 className="minimal-sec-heading">ADDITIONAL INFORMATION</h2>
                <div className="minimal-divider" />
                {certifications && certifications.length > 0 && (
                  <div className="minimal-add-row">
                    <strong>Certifications:</strong>{' '}
                    {certifications.map(c => `${c.name} (${c.issuer})`).join('; ')}
                  </div>
                )}
                {languages && languages.length > 0 && (
                  <div className="minimal-add-row">
                    <strong>Languages:</strong>{' '}
                    {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                  </div>
                )}
                {interests && interests.length > 0 && (
                  <div className="minimal-add-row">
                    <strong>Interests:</strong> {interests.join(', ')}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* ========================================================
              TEMPLATE 3: CREATIVE SIDEBAR
              ======================================================== */}
          {templateId === 'creative' && (
            <div className="template-creative-wrap">
              {/* Left Sidebar */}
              <aside className="creative-sidebar">
                <div className="sidebar-brand-box">
                  <h1 className="sidebar-name">{personal.fullName}</h1>
                  <h2 className="sidebar-title">{personal.targetRole}</h2>
                </div>

                {/* Contact Section */}
                <div className="sidebar-section">
                  <h3 className="sidebar-heading">CONTACT</h3>
                  <div className="sidebar-contact-list">
                    {personal.email && (
                      <div className="sidebar-contact-item">
                        <Mail size={12} />
                        <span>{personal.email}</span>
                      </div>
                    )}
                    {personal.phone && (
                      <div className="sidebar-contact-item">
                        <Phone size={12} />
                        <span>{personal.phone}</span>
                      </div>
                    )}
                    {personal.location && (
                      <div className="sidebar-contact-item">
                        <MapPin size={12} />
                        <span>{personal.location}</span>
                      </div>
                    )}
                    {personal.age && (
                      <div className="sidebar-contact-item">
                        <span>Age: {personal.age} years old</span>
                      </div>
                    )}
                    {personal.github && (
                      <div className="sidebar-contact-item">
                        <GithubIcon size={12} />
                        <span>{personal.github}</span>
                      </div>
                    )}
                    {personal.linkedin && (
                      <div className="sidebar-contact-item">
                        <LinkedinIcon size={12} />
                        <span>{personal.linkedin}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills Section */}
                {skills && (
                  <div className="sidebar-section">
                    <h3 className="sidebar-heading">SKILLS</h3>
                    <div className="sidebar-skills-groups">
                      {skills.map((cat, i) => (
                        <div key={i} className="sidebar-skill-group">
                          <span className="sidebar-group-title">{cat.category}</span>
                          <div className="sidebar-tag-cloud">
                            {cat.items.map(s => (
                              <span key={s} className="sidebar-pill">{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education && (
                  <div className="sidebar-section">
                    <h3 className="sidebar-heading">EDUCATION</h3>
                    {education.map(edu => (
                      <div key={edu.id} className="sidebar-edu-item">
                        <strong>{edu.degree}</strong>
                        <div>{edu.school}</div>
                        <div className="sidebar-meta">{edu.graduationYear} • GPA {edu.gpa}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {languages && (
                  <div className="sidebar-section">
                    <h3 className="sidebar-heading">LANGUAGES</h3>
                    {languages.map(l => (
                      <div key={l.id} className="sidebar-lang-row">
                        <strong>{l.name}</strong>
                        <span>{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interests */}
                {interests && (
                  <div className="sidebar-section">
                    <h3 className="sidebar-heading">INTERESTS</h3>
                    <div className="sidebar-interests-pills">
                      {interests.map(int => (
                        <span key={int} className="sidebar-interest-tag">{int}</span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

              {/* Right Content Area */}
              <main className="creative-main">
                {personal.summary && (
                  <div className="creative-sec">
                    <h3 className="creative-sec-title">ABOUT ME</h3>
                    <p className="creative-text">{personal.summary}</p>
                  </div>
                )}

                {experience && (
                  <div className="creative-sec">
                    <h3 className="creative-sec-title">EXPERIENCE</h3>
                    <div className="creative-exp-list">
                      {experience.map(exp => (
                        <div key={exp.id} className="creative-exp-card">
                          <div className="creative-exp-header">
                            <div>
                              <h4 className="creative-role">{exp.role}</h4>
                              <span className="creative-company">{exp.company} • {exp.location}</span>
                            </div>
                            <span className="creative-date">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <ul className="creative-bullets">
                            {(exp.highlights || []).map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projects && (
                  <div className="creative-sec">
                    <h3 className="creative-sec-title">NOTABLE PROJECTS</h3>
                    <div className="creative-proj-list">
                      {projects.map(proj => (
                        <div key={proj.id} className="creative-proj-card">
                          <div className="creative-proj-top">
                            <strong>{proj.title}</strong>
                            <span className="creative-proj-sub">{proj.subtitle}</span>
                          </div>
                          <p className="creative-text">{proj.description}</p>
                          {proj.techStack && (
                            <div className="creative-proj-tech">
                              {proj.techStack.join(' • ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certifications && certifications.length > 0 && (
                  <div className="creative-sec">
                    <h3 className="creative-sec-title">LICENSES & CERTIFICATIONS</h3>
                    <ul className="creative-bullets">
                      {certifications.map(c => (
                        <li key={c.id}>
                          <strong>{c.name}</strong> — {c.issuer} ({c.issueDate})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </main>
            </div>
          )}

          {/* ========================================================
              TEMPLATE 4: EXECUTIVE CLASSIC
              ======================================================== */}
          {templateId === 'executive' && (
            <div className="template-executive-wrap">
              <div className="executive-header">
                <h1 className="executive-name">{personal.fullName}</h1>
                <div className="executive-rule-double" />
                <h2 className="executive-title">{personal.targetRole}</h2>
                <div className="executive-contact-line">
                  {personal.email && <span>{personal.email}</span>}
                  {personal.phone && <span> | {personal.phone}</span>}
                  {personal.location && <span> | {personal.location}</span>}
                  {personal.age && <span> | Age: {personal.age}</span>}
                  {personal.linkedin && <span> | {personal.linkedin}</span>}
                </div>
              </div>

              {personal.summary && (
                <div className="executive-section">
                  <h3 className="executive-heading">EXECUTIVE SUMMARY</h3>
                  <p className="executive-text">{personal.summary}</p>
                </div>
              )}

              {skills && (
                <div className="executive-section">
                  <h3 className="executive-heading">AREAS OF EXPERTISE</h3>
                  <div className="executive-skills-matrix">
                    {skills.map((cat, i) => (
                      <div key={i} className="executive-skill-cell">
                        <strong>{cat.category}:</strong> {cat.items.join(', ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {experience && (
                <div className="executive-section">
                  <h3 className="executive-heading">LEADERSHIP & EXPERIENCE</h3>
                  {experience.map(exp => (
                    <div key={exp.id} className="executive-exp-entry">
                      <div className="executive-exp-row">
                        <div>
                          <strong className="executive-role">{exp.role}</strong>
                          <span className="executive-company"> | {exp.company}, {exp.location}</span>
                        </div>
                        <span className="executive-dates">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <ul className="executive-bullets">
                        {(exp.highlights || []).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {projects && (
                <div className="executive-section">
                  <h3 className="executive-heading">KEY INITIATIVES & PROJECTS</h3>
                  {projects.map(proj => (
                    <div key={proj.id} className="executive-proj-entry">
                      <strong>{proj.title}</strong> — {proj.description}
                    </div>
                  ))}
                </div>
              )}

              {education && (
                <div className="executive-section">
                  <h3 className="executive-heading">EDUCATION & ACADEMIC MERIT</h3>
                  {education.map(edu => (
                    <div key={edu.id} className="executive-edu-entry">
                      <strong>{edu.school}</strong> — {edu.degree} in {edu.field} ({edu.graduationYear})
                      {edu.achievements && <div><em>{edu.achievements}</em></div>}
                    </div>
                  ))}
                </div>
              )}

              <div className="executive-section">
                <h3 className="executive-heading">HONORS, CREDENTIALS & INTERESTS</h3>
                <div className="executive-credentials-row">
                  {certifications && certifications.length > 0 && (
                    <div>
                      <strong>Certifications:</strong> {certifications.map(c => c.name).join(', ')}
                    </div>
                  )}
                  {languages && languages.length > 0 && (
                    <div>
                      <strong>Languages:</strong> {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
                    </div>
                  )}
                  {interests && interests.length > 0 && (
                    <div>
                      <strong>Interests:</strong> {interests.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
