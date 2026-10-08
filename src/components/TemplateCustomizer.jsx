import React from 'react';
import { 
  X, 
  Palette, 
  Layout, 
  Type, 
  MoveVertical, 
  Check
} from 'lucide-react';
import { 
  TEMPLATES, 
  COLOR_THEMES, 
  FONT_OPTIONS, 
  SPACING_OPTIONS 
} from '../data/templateThemes';

export function TemplateCustomizer({ 
  isOpen, 
  onClose, 
  activeTemplateId, 
  onSelectTemplate,
  activeColorThemeId,
  onSelectColorTheme,
  activeFontId,
  onSelectFont,
  activeSpacingId,
  onSelectSpacing
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-customizer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <div className="modal-title-with-icon">
            <Palette size={24} className="text-sky" />
            <div>
              <h3>Design & Layout Customizer</h3>
              <p>Tailor visual aesthetics, formatting standards, and page density</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Section 1: Template Selection */}
        <div className="cust-section">
          <label className="cust-label">
            <Layout size={15} />
            <span>Select Resume Template Architecture:</span>
          </label>
          <div className="cust-templates-grid">
            {TEMPLATES.map(tpl => {
              const isSelected = activeTemplateId === tpl.id;
              return (
                <div 
                  key={tpl.id}
                  className={`cust-template-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectTemplate(tpl.id)}
                >
                  <div className="tpl-card-top">
                    <strong className="tpl-name">{tpl.name}</strong>
                    <span className="tpl-badge">{tpl.badge}</span>
                  </div>
                  <p className="tpl-desc">{tpl.description}</p>
                  {tpl.bestFor && (
                    <div className="tpl-best-for-tag">
                      <span>Ideal for: </span>{tpl.bestFor}
                    </div>
                  )}
                  {isSelected && (
                    <div className="tpl-checked-badge">
                      <Check size={12} />
                      <span>Active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Color Palette */}
        <div className="cust-section rc-mt-4">
          <label className="cust-label">
            <Palette size={15} />
            <span>Theme Accent & Highlight Color:</span>
          </label>
          <div className="cust-colors-grid">
            {COLOR_THEMES.map(theme => {
              const isSelected = activeColorThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`cust-color-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectColorTheme(theme.id)}
                  style={{ '--theme-color': theme.primary }}
                >
                  <span className="color-swatch" style={{ backgroundColor: theme.primary }} />
                  <span className="color-label">{theme.name}</span>
                  {isSelected && <Check size={14} className="check-icon" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Typography & Fonts */}
        <div className="cust-section rc-mt-4">
          <label className="cust-label">
            <Type size={15} />
            <span>Font Pairing:</span>
          </label>
          <div className="cust-fonts-grid">
            {FONT_OPTIONS.map(font => {
              const isSelected = activeFontId === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  className={`cust-font-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectFont(font.id)}
                  style={{ fontFamily: font.family }}
                >
                  <span className="font-preview-name">{font.name}</span>
                  <span className="font-sample">Aa Bb Cc 123</span>
                  {isSelected && <Check size={14} className="check-icon" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Page Spacing / Density */}
        <div className="cust-section rc-mt-4">
          <label className="cust-label">
            <MoveVertical size={15} />
            <span>Page Spacing & Content Density:</span>
          </label>
          <div className="cust-spacing-options">
            {SPACING_OPTIONS.map(sp => {
              const isSelected = activeSpacingId === sp.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  className={`cust-spacing-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectSpacing(sp.id)}
                >
                  <span>{sp.label}</span>
                  {isSelected && <Check size={14} className="check-icon" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
