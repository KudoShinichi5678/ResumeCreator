import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  LayoutTemplate, 
  FileText, 
  Columns2, 
  Award, 
  Code2, 
  AlignJustify,
  CheckCircle2
} from 'lucide-react';
import { TEMPLATES } from '../data/templateThemes';

// Icon mapping helper
const TEMPLATE_ICONS = {
  modern: LayoutTemplate,
  minimal: FileText,
  creative: Columns2,
  executive: Award,
  innovator: Code2,
  nordic: Sparkles,
  compact: AlignJustify
};

export function TemplateGalleryModal({
  isOpen,
  onClose,
  activeTemplateId,
  onSelectTemplate,
  activeColorTheme
}) {
  const [filterCategory, setFilterCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'ats', label: 'ATS Friendly' },
    { id: 'two-col', label: 'Two Column' },
    { id: 'executive', label: 'Senior & Executive' }
  ];

  const filteredTemplates = TEMPLATES.filter(tpl => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'popular') return tpl.id === 'modern' || tpl.id === 'innovator';
    if (filterCategory === 'ats') return tpl.id === 'minimal' || tpl.id === 'modern' || tpl.id === 'compact';
    if (filterCategory === 'two-col') return tpl.id === 'creative' || tpl.id === 'innovator' || tpl.id === 'compact';
    if (filterCategory === 'executive') return tpl.id === 'executive' || tpl.id === 'nordic';
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content modal-template-gallery"
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-accent': activeColorTheme.primary }}
      >
        {/* Top Header */}
        <div className="modal-top-bar">
          <div className="modal-title-with-icon">
            <div className="gallery-header-icon">
              <LayoutTemplate size={22} />
            </div>
            <div>
              <h3>Choose a Resume Template</h3>
              <p>Switch seamlessly between professional layouts — your resume data stays 100% synchronized.</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close template gallery"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`gallery-filter-tab ${filterCategory === cat.id ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="gallery-templates-grid">
          {filteredTemplates.map(tpl => {
            const isSelected = activeTemplateId === tpl.id;
            const Icon = TEMPLATE_ICONS[tpl.id] || LayoutTemplate;

            return (
              <div 
                key={tpl.id}
                className={`gallery-tpl-card ${isSelected ? 'active-template' : ''}`}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
              >
                {/* Visual Wireframe Thumbnail */}
                <div className={`tpl-wireframe-preview preview-type-${tpl.id}`}>
                  {/* Decorative layout schematic */}
                  {tpl.id === 'modern' && (
                    <div className="wireframe-modern">
                      <div className="wf-bar primary-bar" />
                      <div className="wf-head-row">
                        <div className="wf-line title-line" />
                        <div className="wf-line sub-line" />
                      </div>
                      <div className="wf-contacts-row">
                        <div className="wf-dot" />
                        <div className="wf-dot" />
                        <div className="wf-dot" />
                      </div>
                      <div className="wf-body-row">
                        <div className="wf-block full" />
                        <div className="wf-split-row">
                          <div className="wf-block half" />
                          <div className="wf-block half" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.id === 'minimal' && (
                    <div className="wireframe-minimal">
                      <div className="wf-head-center">
                        <div className="wf-line title-center" />
                        <div className="wf-line sub-center" />
                      </div>
                      <div className="wf-divider" />
                      <div className="wf-line sec-title" />
                      <div className="wf-block full" />
                      <div className="wf-divider" />
                      <div className="wf-line sec-title" />
                      <div className="wf-block full" />
                    </div>
                  )}

                  {tpl.id === 'creative' && (
                    <div className="wireframe-creative">
                      <div className="wf-side-col">
                        <div className="wf-circle-avatar" />
                        <div className="wf-line white-line" />
                        <div className="wf-line white-line short" />
                        <div className="wf-side-chips">
                          <div className="wf-chip" />
                          <div className="wf-chip" />
                          <div className="wf-chip" />
                        </div>
                      </div>
                      <div className="wf-main-col">
                        <div className="wf-line dark-title" />
                        <div className="wf-block" />
                        <div className="wf-line dark-title" />
                        <div className="wf-block" />
                      </div>
                    </div>
                  )}

                  {tpl.id === 'executive' && (
                    <div className="wireframe-executive">
                      <div className="wf-exec-header">
                        <div className="wf-line title-center serif-look" />
                        <div className="wf-exec-double-rule" />
                        <div className="wf-line sub-center" />
                      </div>
                      <div className="wf-exec-section">
                        <div className="wf-line exec-sec-head" />
                        <div className="wf-block full" />
                      </div>
                      <div className="wf-exec-section">
                        <div className="wf-line exec-sec-head" />
                        <div className="wf-block full" />
                      </div>
                    </div>
                  )}

                  {tpl.id === 'innovator' && (
                    <div className="wireframe-innovator">
                      <div className="wf-innovator-top">
                        <div className="wf-code-tag">&lt;/&gt;</div>
                        <div className="wf-line title-line" />
                      </div>
                      <div className="wf-innovator-body">
                        <div className="wf-innovator-left">
                          <div className="wf-block" />
                          <div className="wf-block" />
                        </div>
                        <div className="wf-innovator-right">
                          <div className="wf-line sec-title" />
                          <div className="wf-tag-matrix">
                            <span className="wf-mini-tag" />
                            <span className="wf-mini-tag" />
                            <span className="wf-mini-tag" />
                            <span className="wf-mini-tag" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.id === 'nordic' && (
                    <div className="wireframe-nordic">
                      <div className="wf-nordic-header">
                        <div className="wf-line title-line" />
                        <div className="wf-line sub-line" />
                      </div>
                      <div className="wf-nordic-pill-sec" />
                      <div className="wf-block full" />
                      <div className="wf-nordic-pill-sec" />
                      <div className="wf-block full" />
                    </div>
                  )}

                  {tpl.id === 'compact' && (
                    <div className="wireframe-compact">
                      <div className="wf-compact-head">
                        <div className="wf-line title-line" />
                        <div className="wf-compact-contact" />
                      </div>
                      <div className="wf-compact-split">
                        <div className="wf-compact-left">
                          <div className="wf-block" />
                          <div className="wf-block" />
                        </div>
                        <div className="wf-compact-right">
                          <div className="wf-block" />
                          <div className="wf-block" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Active selection overlay check */}
                  {isSelected && (
                    <div className="wf-selected-ribbon">
                      <CheckCircle2 size={16} />
                      <span>Current Active</span>
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="gallery-tpl-info">
                  <div className="gallery-tpl-name-row">
                    <div className="gallery-name-with-icon">
                      <Icon size={16} className="tpl-type-icon" />
                      <strong className="gallery-tpl-title">{tpl.name}</strong>
                    </div>
                    <span className="gallery-tpl-badge">{tpl.badge}</span>
                  </div>

                  <p className="gallery-tpl-desc">{tpl.description}</p>

                  {tpl.bestFor && (
                    <div className="gallery-best-for">
                      <span className="best-for-label">Best for:</span>
                      <span className="best-for-text">{tpl.bestFor}</span>
                    </div>
                  )}

                  <div className="gallery-card-footer">
                    <button
                      type="button"
                      className={`gallery-apply-btn ${isSelected ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTemplate(tpl.id);
                        onClose();
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check size={14} />
                          <span>Currently Selected</span>
                        </>
                      ) : (
                        <span>Use This Template</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="modal-gallery-footer">
          <div className="gallery-note">
            <Sparkles size={14} className="text-amber-400" />
            <span>All templates dynamically format the exact same candidate data without loss.</span>
          </div>
          <button 
            type="button" 
            className="gallery-done-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
