import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Heart, 
  Plus, 
  Trash2, 
  Sparkles, 
  Wand2
} from 'lucide-react';
import { 
  BULLET_SUGGESTIONS, 
  SUMMARY_SUGGESTIONS, 
  POPULAR_SKILL_PACKS 
} from '../data/initialResumeData';

export function EditorPanel({ resumeData, onUpdateResumeData, onShowToast }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [skillInput, setSkillInput] = useState('');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [interestInput, setInterestInput] = useState('');

  // Handle personal info field updates
  const handlePersonalChange = (field, value) => {
    onUpdateResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value
      }
    });
  };

  // 1-Click summary generator / replacement
  const handleApplySummarySuggestion = (suggestedText) => {
    handlePersonalChange('summary', suggestedText);
    onShowToast('Applied enhanced summary suggestion!', 'success');
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'Bangkok, Thailand',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      highlights: [
        'Developed resilient backend services with modern architectural standards.',
        'Collaborated with designers and stakeholders to deliver customer-centric solutions.'
      ]
    };
    onUpdateResumeData({
      ...resumeData,
      experience: [newExp, ...resumeData.experience]
    });
    onShowToast('New experience role added');
  };

  const handleUpdateExperience = (id, field, value) => {
    const updated = resumeData.experience.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onUpdateResumeData({ ...resumeData, experience: updated });
  };

  const handleDeleteExperience = (id) => {
    onUpdateResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
    onShowToast('Experience entry removed');
  };

  const handleAddHighlight = (expId) => {
    const randomTemplate = BULLET_SUGGESTIONS[Math.floor(Math.random() * BULLET_SUGGESTIONS.length)]
      .replace('{technology}', 'React & TypeScript')
      .replace('{number}', '30')
      .replace('{feature}', 'real-time workflow');

    const updated = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        return {
          ...exp,
          highlights: [...(exp.highlights || []), randomTemplate]
        };
      }
      return exp;
    });
    onUpdateResumeData({ ...resumeData, experience: updated });
  };

  const handleUpdateHighlight = (expId, index, text) => {
    const updated = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        const bullets = [...exp.highlights];
        bullets[index] = text;
        return { ...exp, highlights: bullets };
      }
      return exp;
    });
    onUpdateResumeData({ ...resumeData, experience: updated });
  };

  const handleDeleteHighlight = (expId, index) => {
    const updated = resumeData.experience.map(exp => {
      if (exp.id === expId) {
        const bullets = exp.highlights.filter((_, i) => i !== index);
        return { ...exp, highlights: bullets };
      }
      return exp;
    });
    onUpdateResumeData({ ...resumeData, experience: updated });
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: 'University Name',
      degree: 'Bachelor of Science (B.Sc.)',
      field: 'Computer Science',
      location: 'Bangkok, Thailand',
      graduationYear: `${new Date().getFullYear()}`,
      gpa: '3.80 / 4.00',
      achievements: 'Dean’s List, Senior Capstone Project with Distinction'
    };
    onUpdateResumeData({
      ...resumeData,
      education: [newEdu, ...resumeData.education]
    });
    onShowToast('Education entry added');
  };

  const handleUpdateEducation = (id, field, value) => {
    const updated = resumeData.education.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onUpdateResumeData({ ...resumeData, education: updated });
  };

  const handleDeleteEducation = (id) => {
    onUpdateResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
    onShowToast('Education entry removed');
  };

  // Skills handlers
  const handleAddSkillItem = (categoryIndex) => {
    if (!skillInput.trim()) return;
    const updated = [...resumeData.skills];
    if (!updated[categoryIndex]) return;

    if (!updated[categoryIndex].items.includes(skillInput.trim())) {
      updated[categoryIndex].items = [...updated[categoryIndex].items, skillInput.trim()];
      onUpdateResumeData({ ...resumeData, skills: updated });
    }
    setSkillInput('');
  };

  const handleRemoveSkillItem = (categoryIndex, skillName) => {
    const updated = [...resumeData.skills];
    updated[categoryIndex].items = updated[categoryIndex].items.filter(s => s !== skillName);
    onUpdateResumeData({ ...resumeData, skills: updated });
  };

  const handleApplySkillPack = (pack) => {
    const updated = [...resumeData.skills];
    // Find or create category for pack
    let target = updated[0];
    if (!target) {
      updated.push({ category: pack.name, items: pack.skills });
    } else {
      const merged = Array.from(new Set([...target.items, ...pack.skills]));
      target.items = merged;
    }
    onUpdateResumeData({ ...resumeData, skills: updated });
    onShowToast(`Injected "${pack.name}" skill pack!`, 'success');
  };

  // Projects handlers
  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'Full-Stack Showcase App',
      subtitle: 'Modern Web Application',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      description: 'Engineered high-performance web service with automated testing and seamless authentication.'
    };
    onUpdateResumeData({
      ...resumeData,
      projects: [newProj, ...resumeData.projects]
    });
    onShowToast('Project added');
  };

  const handleUpdateProject = (id, field, value) => {
    const updated = resumeData.projects.map(proj => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    onUpdateResumeData({ ...resumeData, projects: updated });
  };

  const handleDeleteProject = (id) => {
    onUpdateResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
    onShowToast('Project removed');
  };

  // Certifications handlers
  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: 'Professional Certificate Name',
      issuer: 'Issuing Body (e.g. AWS / Google)',
      issueDate: '2024',
      credentialUrl: ''
    };
    onUpdateResumeData({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), newCert]
    });
  };

  const handleUpdateCertification = (id, field, value) => {
    const updated = (resumeData.certifications || []).map(cert => {
      if (cert.id === id) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    onUpdateResumeData({ ...resumeData, certifications: updated });
  };

  const handleDeleteCertification = (id) => {
    onUpdateResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(c => c.id !== id)
    });
  };

  // Languages handlers
  const handleAddLanguage = () => {
    const newLang = {
      id: `lang-${Date.now()}`,
      name: 'Language Name',
      proficiency: 'Fluent / Working'
    };
    onUpdateResumeData({
      ...resumeData,
      languages: [...(resumeData.languages || []), newLang]
    });
  };

  const handleUpdateLanguage = (id, field, value) => {
    const updated = (resumeData.languages || []).map(l => {
      if (l.id === id) {
        return { ...l, [field]: value };
      }
      return l;
    });
    onUpdateResumeData({ ...resumeData, languages: updated });
  };

  const handleDeleteLanguage = (id) => {
    onUpdateResumeData({
      ...resumeData,
      languages: resumeData.languages.filter(l => l.id !== id)
    });
  };

  // Interests handlers
  const handleAddInterest = (item) => {
    const val = item || interestInput.trim();
    if (!val) return;
    if (!(resumeData.interests || []).includes(val)) {
      onUpdateResumeData({
        ...resumeData,
        interests: [...(resumeData.interests || []), val]
      });
    }
    setInterestInput('');
  };

  const handleDeleteInterest = (item) => {
    onUpdateResumeData({
      ...resumeData,
      interests: (resumeData.interests || []).filter(i => i !== item)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Candidate', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'credentials', label: 'Certs & Lang', icon: Award },
    { id: 'interests', label: 'Interests', icon: Heart }
  ];

  return (
    <aside className="rc-editor-panel">
      {/* Editor Sub-nav Bar */}
      <div className="rc-editor-nav">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`rc-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="rc-editor-scroll">
        {/* TAB 1: PERSONAL INFORMATION */}
        {activeTab === 'personal' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Candidate Personal Details</h3>
                <p>Identity, target role, contact channels and executive biography</p>
              </div>
            </div>

            <div className="rc-grid-2">
              <div className="rc-field">
                <label>Full Name *</label>
                <input 
                  type="text"
                  value={resumeData.personal.fullName || ''}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  placeholder="e.g. Alexandre Chen"
                />
              </div>

              <div className="rc-field">
                <label>Target Job Title / Role *</label>
                <input 
                  type="text"
                  value={resumeData.personal.targetRole || ''}
                  onChange={(e) => handlePersonalChange('targetRole', e.target.value)}
                  placeholder="e.g. Senior Full-Stack Software Engineer"
                />
              </div>

              <div className="rc-field">
                <label>Candidate Age / Birth Info</label>
                <input 
                  type="number"
                  value={resumeData.personal.age || ''}
                  onChange={(e) => handlePersonalChange('age', e.target.value)}
                  placeholder="e.g. 28"
                />
              </div>

              <div className="rc-field">
                <label>Location (City, Country) *</label>
                <input 
                  type="text"
                  value={resumeData.personal.location || ''}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  placeholder="e.g. Bangkok, Thailand (Open to Remote)"
                />
              </div>

              <div className="rc-field">
                <label>Email Address *</label>
                <input 
                  type="email"
                  value={resumeData.personal.email || ''}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  placeholder="alex.chen.dev@gmail.com"
                />
              </div>

              <div className="rc-field">
                <label>Phone Number *</label>
                <input 
                  type="text"
                  value={resumeData.personal.phone || ''}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  placeholder="+66 82 456 7890"
                />
              </div>

              <div className="rc-field">
                <label>Portfolio / Personal Website</label>
                <input 
                  type="text"
                  value={resumeData.personal.website || ''}
                  onChange={(e) => handlePersonalChange('website', e.target.value)}
                  placeholder="https://alexchen.tech"
                />
              </div>

              <div className="rc-field">
                <label>GitHub Profile Handle</label>
                <input 
                  type="text"
                  value={resumeData.personal.github || ''}
                  onChange={(e) => handlePersonalChange('github', e.target.value)}
                  placeholder="github.com/alexchen-dev"
                />
              </div>

              <div className="rc-field rc-span-2">
                <label>LinkedIn Profile URL / Handle</label>
                <input 
                  type="text"
                  value={resumeData.personal.linkedin || ''}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/alexchen-eng"
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="rc-field rc-mt-4">
              <div className="rc-label-row">
                <label>Executive Professional Summary (ATS Bio)</label>
                <span className="rc-word-count">
                  {(resumeData.personal.summary || '').split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea 
                rows={5}
                value={resumeData.personal.summary || ''}
                onChange={(e) => handlePersonalChange('summary', e.target.value)}
                placeholder="High-impact 3-4 sentence summary of your expertise, quantifiable accomplishments, and core technologies..."
              />
            </div>

            {/* Auto Suggestions for Summary */}
            <div className="rc-suggestions-box">
              <div className="rc-suggestion-header">
                <Wand2 size={14} className="text-sky" />
                <span>1-Click Summary Prompts:</span>
              </div>
              <div className="rc-suggestion-pills">
                {SUMMARY_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="rc-suggestion-pill"
                    onClick={() => handleApplySummarySuggestion(suggestion)}
                  >
                    <span>"{suggestion.slice(0, 75)}..."</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Professional Work Experience</h3>
                <p>Reverse-chronological roles with action-verb accomplishments</p>
              </div>
              <button 
                type="button" 
                className="rc-btn-primary-sm"
                onClick={handleAddExperience}
              >
                <Plus size={14} />
                <span>Add Position</span>
              </button>
            </div>

            <div className="rc-list-container">
              {resumeData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="rc-card-item">
                  <div className="rc-card-top-bar">
                    <div className="rc-card-badge">Role #{expIdx + 1}</div>
                    <button 
                      type="button" 
                      className="rc-btn-trash"
                      onClick={() => handleDeleteExperience(exp.id)}
                      title="Delete this role"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="rc-grid-2">
                    <div className="rc-field">
                      <label>Job Title / Position</label>
                      <input 
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Company / Organization</label>
                      <input 
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                        placeholder="e.g. Agoda Services"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Location</label>
                      <input 
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                        placeholder="Bangkok, Thailand"
                      />
                    </div>

                    <div className="rc-grid-dates">
                      <div className="rc-field">
                        <label>Start Date</label>
                        <input 
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="2021-03"
                        />
                      </div>
                      <div className="rc-field">
                        <label>End Date</label>
                        <input 
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="Present or 2023-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlights / Bullet Points */}
                  <div className="rc-field rc-mt-3">
                    <div className="rc-label-row">
                      <label>Key Impact & Achievements (Action-Oriented Bullets)</label>
                      <button 
                        type="button" 
                        className="rc-btn-text-sm"
                        onClick={() => handleAddHighlight(exp.id)}
                      >
                        <Plus size={13} />
                        <span>Add Bullet Point</span>
                      </button>
                    </div>

                    <div className="rc-bullets-wrap">
                      {(exp.highlights || []).map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="rc-bullet-row">
                          <span className="rc-bullet-dot">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => handleUpdateHighlight(exp.id, bulletIdx, e.target.value)}
                            placeholder="Architected, engineered, or deployed..."
                          />
                          <button
                            type="button"
                            className="rc-btn-icon-del"
                            onClick={() => handleDeleteHighlight(exp.id, bulletIdx)}
                            title="Remove bullet"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EDUCATION */}
        {activeTab === 'education' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Education & Academic Credentials</h3>
                <p>Degrees, universities, honours, and relevant capstones</p>
              </div>
              <button 
                type="button" 
                className="rc-btn-primary-sm"
                onClick={handleAddEducation}
              >
                <Plus size={14} />
                <span>Add Education</span>
              </button>
            </div>

            <div className="rc-list-container">
              {resumeData.education.map((edu, eduIdx) => (
                <div key={edu.id} className="rc-card-item">
                  <div className="rc-card-top-bar">
                    <div className="rc-card-badge">Degree #{eduIdx + 1}</div>
                    <button 
                      type="button" 
                      className="rc-btn-trash"
                      onClick={() => handleDeleteEducation(edu.id)}
                      title="Delete education"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="rc-grid-2">
                    <div className="rc-field">
                      <label>University / School Name *</label>
                      <input 
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                        placeholder="e.g. Chulalongkorn University"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Degree (B.Sc., M.Sc., etc.) *</label>
                      <input 
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="e.g. Bachelor of Engineering (B.Eng.)"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Major / Field of Study</label>
                      <input 
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(edu.id, 'field', e.target.value)}
                        placeholder="e.g. Computer Science & Software Engineering"
                      />
                    </div>

                    <div className="rc-grid-dates">
                      <div className="rc-field">
                        <label>Graduation Year</label>
                        <input 
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => handleUpdateEducation(edu.id, 'graduationYear', e.target.value)}
                          placeholder="2022"
                        />
                      </div>
                      <div className="rc-field">
                        <label>GPA / Honours</label>
                        <input 
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => handleUpdateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="3.85 / 4.00"
                        />
                      </div>
                    </div>

                    <div className="rc-field rc-span-2">
                      <label>Academic Honours & Key Projects</label>
                      <input 
                        type="text"
                        value={edu.achievements || ''}
                        onChange={(e) => handleUpdateEducation(edu.id, 'achievements', e.target.value)}
                        placeholder="e.g. 1st Place National Hackathon, Dean's List for 4 Semesters"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === 'skills' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Technical Skills & Core Competencies</h3>
                <p>Categorized skill taxonomy for maximum ATS keyword density</p>
              </div>
            </div>

            {/* Quick Skill Packs Injection */}
            <div className="rc-skill-pack-banner">
              <span className="pack-title">
                <Sparkles size={14} className="text-yellow" />
                <span>1-Click Skill Packs:</span>
              </span>
              <div className="pack-buttons">
                {POPULAR_SKILL_PACKS.map(pack => (
                  <button
                    key={pack.name}
                    type="button"
                    className="rc-pack-btn"
                    onClick={() => handleApplySkillPack(pack)}
                  >
                    + {pack.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="rc-skill-categories-list">
              {resumeData.skills.map((cat, catIdx) => (
                <div key={catIdx} className="rc-card-item">
                  <div className="rc-field">
                    <label>Skill Category Title</label>
                    <input 
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const updated = [...resumeData.skills];
                        updated[catIdx].category = e.target.value;
                        onUpdateResumeData({ ...resumeData, skills: updated });
                      }}
                      placeholder="e.g. Languages & Frameworks"
                    />
                  </div>

                  {/* Chips */}
                  <div className="rc-skill-chips-wrap">
                    {cat.items.map(item => (
                      <span key={item} className="rc-skill-tag">
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkillItem(catIdx, item)}
                          title="Remove skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add skill input */}
                  <div className="rc-add-skill-row">
                    <input 
                      type="text"
                      placeholder={`Add skill to "${cat.category}" (e.g. Docker, GraphQL)...`}
                      value={activeCategoryIndex === catIdx ? skillInput : ''}
                      onFocus={() => setActiveCategoryIndex(catIdx)}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkillItem(catIdx);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="rc-btn-primary-sm"
                      onClick={() => handleAddSkillItem(catIdx)}
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Key Projects & Technical Highlights</h3>
                <p>Highlight full-stack creations, open-source repositories, or SaaS products</p>
              </div>
              <button 
                type="button" 
                className="rc-btn-primary-sm"
                onClick={handleAddProject}
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>

            <div className="rc-list-container">
              {resumeData.projects.map((proj, projIdx) => (
                <div key={proj.id} className="rc-card-item">
                  <div className="rc-card-top-bar">
                    <div className="rc-card-badge">Project #{projIdx + 1}</div>
                    <button 
                      type="button" 
                      className="rc-btn-trash"
                      onClick={() => handleDeleteProject(proj.id)}
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="rc-grid-2">
                    <div className="rc-field">
                      <label>Project Title *</label>
                      <input 
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                        placeholder="e.g. AutoMetrics Observability Engine"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Subtitle / One-liner</label>
                      <input 
                        type="text"
                        value={proj.subtitle || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'subtitle', e.target.value)}
                        placeholder="e.g. Real-Time Distributed Tracing Visualizer"
                      />
                    </div>

                    <div className="rc-field">
                      <label>Live Demo URL</label>
                      <input 
                        type="text"
                        value={proj.liveUrl || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'liveUrl', e.target.value)}
                        placeholder="https://myproject.com"
                      />
                    </div>

                    <div className="rc-field">
                      <label>GitHub Source URL</label>
                      <input 
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'githubUrl', e.target.value)}
                        placeholder="github.com/myrepo"
                      />
                    </div>

                    <div className="rc-field rc-span-2">
                      <label>Tech Stack Used (comma-separated)</label>
                      <input 
                        type="text"
                        value={(proj.techStack || []).join(', ')}
                        onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="React, TypeScript, Golang, Docker"
                      />
                    </div>

                    <div className="rc-field rc-span-2">
                      <label>Project Overview & Metrics</label>
                      <textarea 
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                        placeholder="High-performance engine ingesting 50,000 requests/sec with automated failover..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CREDENTIALS & LANGUAGES */}
        {activeTab === 'credentials' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Certifications & Verified Licenses</h3>
                <p>Industry qualifications from AWS, Google, Microsoft, Meta, etc.</p>
              </div>
              <button 
                type="button" 
                className="rc-btn-primary-sm"
                onClick={handleAddCertification}
              >
                <Plus size={14} />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="rc-list-container">
              {(resumeData.certifications || []).map(cert => (
                <div key={cert.id} className="rc-card-item">
                  <div className="rc-card-top-bar">
                    <span className="rc-card-badge">Certification</span>
                    <button 
                      type="button" 
                      className="rc-btn-trash"
                      onClick={() => handleDeleteCertification(cert.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="rc-grid-2">
                    <div className="rc-field">
                      <label>Certification Name *</label>
                      <input 
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div className="rc-field">
                      <label>Issuing Body *</label>
                      <input 
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div className="rc-field">
                      <label>Year / Date</label>
                      <input 
                        type="text"
                        value={cert.issueDate}
                        onChange={(e) => handleUpdateCertification(cert.id, 'issueDate', e.target.value)}
                        placeholder="2023"
                      />
                    </div>
                    <div className="rc-field">
                      <label>Verification Link</label>
                      <input 
                        type="text"
                        value={cert.credentialUrl || ''}
                        onChange={(e) => handleUpdateCertification(cert.id, 'credentialUrl', e.target.value)}
                        placeholder="https://verify.cert.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages Section */}
            <div className="rc-section-header rc-mt-5">
              <div>
                <h3>Spoken & Working Languages</h3>
                <p>Global communication proficiency</p>
              </div>
              <button 
                type="button" 
                className="rc-btn-primary-sm"
                onClick={handleAddLanguage}
              >
                <Plus size={14} />
                <span>Add Language</span>
              </button>
            </div>

            <div className="rc-list-container">
              {(resumeData.languages || []).map(lang => (
                <div key={lang.id} className="rc-card-item">
                  <div className="rc-grid-2">
                    <div className="rc-field">
                      <label>Language Name</label>
                      <input 
                        type="text"
                        value={lang.name}
                        onChange={(e) => handleUpdateLanguage(lang.id, 'name', e.target.value)}
                        placeholder="English, Thai, Japanese..."
                      />
                    </div>
                    <div className="rc-field">
                      <div className="rc-label-row">
                        <label>Proficiency</label>
                        <button 
                          type="button" 
                          className="rc-btn-trash"
                          onClick={() => handleDeleteLanguage(lang.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <input 
                        type="text"
                        value={lang.proficiency}
                        onChange={(e) => handleUpdateLanguage(lang.id, 'proficiency', e.target.value)}
                        placeholder="Native / Fluent / IELTS 8.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INTERESTS */}
        {activeTab === 'interests' && (
          <div className="rc-form-section">
            <div className="rc-section-header">
              <div>
                <h3>Interests, Hobbies & Culture Fit</h3>
                <p>Personalized passions that showcase team chemistry and well-roundedness</p>
              </div>
            </div>

            <div className="rc-skill-chips-wrap">
              {(resumeData.interests || []).map(item => (
                <span key={item} className="rc-skill-tag interest">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteInterest(item)}
                    title="Remove interest"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="rc-add-skill-row rc-mt-3">
              <input 
                type="text"
                placeholder="Add hobby or interest (e.g. Open-Source, Marathon Running)..."
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
              />
              <button
                type="button"
                className="rc-btn-primary-sm"
                onClick={() => handleAddInterest()}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Inspiration */}
            <div className="rc-suggestions-box rc-mt-4">
              <span className="rc-suggestion-header">Quick Ideas:</span>
              <div className="rc-suggestion-pills">
                {[
                  'Open Source Contributing',
                  'Distributed Systems Papers',
                  'Specialty Coffee & Espresso Brewing',
                  'Competitive Badminton',
                  'Mechanical Keyboards',
                  'Marathon Running & Fitness'
                ].map(idea => (
                  <button
                    key={idea}
                    type="button"
                    className="rc-suggestion-pill"
                    onClick={() => handleAddInterest(idea)}
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
