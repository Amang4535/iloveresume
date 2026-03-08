/* ═══════════════════════════════════════════════════════════════
   iloveresume — templates.js
   4 CV templates: modern, classic, bold, compact
   Each template returns an HTML string injected into #cv-page
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Helpers ──────────────────────────────────────────────────

function esc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function linkify(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

function bulletsHtml(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return '';
  return '<ul style="margin:0.25rem 0 0 1rem;padding:0;">' +
    lines.map(l => `<li style="margin-bottom:0.2rem;">${esc(l)}</li>`).join('') +
    '</ul>';
}

function formatDate(d) {
  if (!d) return '';
  // Input: YYYY-MM → Month YYYY
  const [y, m] = d.split('-');
  if (!y) return d;
  if (!m) return y;
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  return `${months[parseInt(m,10)-1] || m} ${y}`;
}

function dateRange(start, end, current, t) {
  const s = formatDate(start);
  const e = current ? (t('present') || 'Présent') : formatDate(end);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

function contactLine(icon, value, href) {
  if (!value) return '';
  const link = href ? `<a href="${esc(href)}" style="color:inherit;text-decoration:none;">${esc(value)}</a>` : esc(value);
  return `<div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem;font-size:0.78rem;">${icon} ${link}</div>`;
}

const ICONS = {
  email: '✉',
  phone: '☎',
  city: '📍',
  linkedin: '🔗',
  github: '🔗',
  website: '🌐',
};

// ── Template: MODERN (sidebar colorée) ───────────────────────

function tplModern(cv, accent, font, t) {
  const sidebarStyle = `background:${accent};color:#fff;padding:2rem 1.5rem;width:220px;flex-shrink:0;align-self:stretch;`;
  const mainStyle = `padding:2rem 1.75rem;flex:1;`;

  // Photo
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<div style="text-align:center;margin-bottom:1.5rem;">
      <img src="${cv.profile.photoB64}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.5);" alt="Photo" />
    </div>`;
  }

  // Sidebar: contact + skills + langues
  const contactBlock = `
    <div style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('contact') || 'Contact'}</div>
      ${contactLine(ICONS.email, cv.profile.email, `mailto:${cv.profile.email}`)}
      ${contactLine(ICONS.phone, cv.profile.phone, `tel:${cv.profile.phone}`)}
      ${contactLine(ICONS.city, cv.profile.city)}
      ${contactLine(ICONS.linkedin, linkify(cv.profile.linkedin), cv.profile.linkedin)}
      ${contactLine(ICONS.github, linkify(cv.profile.github), cv.profile.github)}
      ${contactLine(ICONS.website, linkify(cv.profile.website), cv.profile.website)}
    </div>`;

  const skillsBlock = cv.skills.length ? `
    <div style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('step_skills') || 'Compétences'}</div>
      ${cv.skills.map(g => `
        <div style="margin-bottom:0.75rem;">
          ${g.category ? `<div style="font-size:0.7rem;font-weight:600;opacity:.8;margin-bottom:0.3rem;">${esc(g.category)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
            ${g.items.map(s => `<span style="background:rgba(255,255,255,0.2);padding:0.15rem 0.5rem;border-radius:9999px;font-size:0.72rem;">${esc(s)}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('languages') || 'Langues'}</div>
      ${cv.extras.languages.map(l => `<div style="font-size:0.78rem;margin-bottom:0.2rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div>
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('interests') || "Centres d'intérêt"}</div>
      <div style="font-size:0.78rem;line-height:1.6;">${esc(cv.extras.interests)}</div>
    </div>` : '';

  // Main: name + sections
  const headerBlock = `
    <div style="margin-bottom:1.75rem;border-bottom:2px solid ${accent};padding-bottom:1rem;">
      <h1 style="font-size:1.7rem;font-weight:700;margin:0 0 0.25rem;color:#111;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      <h2 style="font-size:1rem;font-weight:500;margin:0;color:${accent};">${esc(cv.profile.title) || ''}</h2>
      ${cv.profile.summary ? `<p style="margin-top:0.75rem;font-size:0.85rem;color:#444;line-height:1.6;">${esc(cv.profile.summary)}</p>` : ''}
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${accent};border-bottom:1.5px solid ${accent};padding-bottom:0.3rem;margin:0 0 0.75rem;">${label}</h3>`;

  const expBlock = cv.experiences.length ? `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(t('step_exp') || 'Expériences')}
      ${cv.experiences.map(e => `
        <div class="cv-item" style="margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(e.role)}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(e.company)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(e.startDate, e.endDate, e.current, t)}</div>
          </div>
          ${bulletsHtml(e.bullets)}
        </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(t('step_edu') || 'Formation')}
      ${cv.education.map(e => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(e.school)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(e.startDate, e.endDate, false, t)}</div>
          </div>
          ${e.grade ? `<div style="font-size:0.78rem;color:#666;margin-top:0.2rem;">${esc(e.grade)}</div>` : ''}
        </div>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(t('certifications') || 'Certifications')}
      ${cv.extras.certifications.map(c => `
        <div class="cv-item" style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.3rem;">
          <span>${esc(c.name)}${c.issuer ? ` <span style="color:#777;">· ${esc(c.issuer)}</span>` : ''}</span>
          ${c.date ? `<span style="color:#888;font-size:0.76rem;">${formatDate(c.date)}</span>` : ''}
        </div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(t('projects') || 'Projets')}
      ${cv.projects.map(p => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="font-weight:600;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <a href="${esc(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗ ${linkify(p.url)}</a>` : ''}</div>
          ${p.tech ? `<div style="font-size:0.75rem;color:#888;margin-top:0.15rem;">${esc(p.tech)}</div>` : ''}
          ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.25rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
        </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(t('volunteer') || 'Bénévolat')}
      ${cv.volunteer.map(v => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(v.role)}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(v.org)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(v.startDate, v.endDate, false, t)}</div>
          </div>
          ${bulletsHtml(v.description)}
        </div>`).join('')}
    </div>` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map(sec => `
    <div style="margin-bottom:1.5rem;">
      ${sectionTitle(esc(sec.title) || t('custom_section'))}
      ${sec.entries.map(en => `
        <div class="cv-item" style="margin-bottom:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <span style="font-weight:600;font-size:0.9rem;">${esc(en.title)}</span>
              ${en.subtitle ? `<span style="color:#777;font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
            </div>
            ${en.date ? `<span style="font-size:0.75rem;color:#888;">${esc(en.date)}</span>` : ''}
          </div>
          ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
        </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="display:flex;font-family:${font},sans-serif;min-height:1123px;background:#fff;">
  <div style="${sidebarStyle}">
    ${photoHtml}
    ${contactBlock}
    ${skillsBlock}
    ${langsBlock}
    ${interestsBlock}
  </div>
  <div style="${mainStyle}">
    ${headerBlock}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${certBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: CLASSIC (clean, one-column) ────────────────────

function tplClassic(cv, accent, font, t) {
  const sectionTitle = (label) =>
    `<h3 style="font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;border-bottom:1px solid #ddd;padding-bottom:0.3rem;margin:1.25rem 0 0.75rem;">${label}</h3>`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:75px;height:75px;border-radius:50%;object-fit:cover;border:2px solid ${accent};" alt="Photo" />`;
  }

  const header = `
    <div style="display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:1.5rem;border-bottom:2px solid ${accent};padding-bottom:1.25rem;">
      ${photoHtml}
      <div style="flex:1;">
        <h1 style="font-size:1.6rem;font-weight:700;margin:0 0 0.2rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        <h2 style="font-size:1rem;font-weight:400;margin:0 0 0.5rem;color:${accent};">${esc(cv.profile.title) || ''}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.78rem;color:#555;">
          ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
          ${cv.profile.github ? `<span>🔗 ${linkify(cv.profile.github)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const summary = cv.profile.summary ? `
    <p style="font-size:0.875rem;color:#444;line-height:1.65;margin-bottom:0;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(e.role)}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(e.company)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, e.current, t)}</span>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}` : '';

  const eduBlock = cv.education.length ? `
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(e.school)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, false, t)}</span>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}` : '';

  const skillsBlock = cv.skills.length ? `
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.5rem;">
        ${g.category ? `<span style="font-weight:600;font-size:0.82rem;color:#333;">${esc(g.category)}: </span>` : ''}
        <span style="font-size:0.82rem;color:#555;">${g.items.map(esc).join(', ')}</span>
      </div>`).join('')}` : '';

  const langsBlock = cv.extras.languages.length ? `
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
      ${cv.extras.languages.map(l => `<span style="font-size:0.82rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div style="font-size:0.82rem;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date)})</span>` : ''}</div>`).join('')}` : '';

  const interestsBlock = cv.extras.interests ? `
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.82rem;color:#555;">${esc(cv.extras.interests)}</p>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="font-weight:600;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <span style="color:${accent};font-size:0.78rem;">↗ ${linkify(p.url)}</span>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.75rem;color:#888;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#555;margin:0.2rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(v.role)}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(v.org)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(v.startDate, v.endDate, false, t)}</span>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map(sec => `
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#777;font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.75rem;color:#999;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#555;margin:0.15rem 0 0;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}`).join('') : '';

  return `
<div style="padding:2.5rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${interestsBlock}
  ${customBlocks}
</div>`;
}

// ── Template: BOLD (grand header pleine largeur) ─────────────

function tplBold(cv, accent, font, t) {
  const sectionTitle = (label) =>
    `<h3 style="font-size:0.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${accent};margin:1.5rem 0 0.75rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="flex:1;height:2px;background:${accent};display:block;"></span>
      ${label}
      <span style="flex:1;height:2px;background:${accent};display:block;"></span>
    </h3>`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #fff;" alt="Photo" />`;
  }

  const header = `
    <div style="background:${accent};color:#fff;padding:2rem 2.5rem;display:flex;align-items:center;gap:2rem;">
      ${photoHtml}
      <div>
        <h1 style="font-size:2rem;font-weight:800;margin:0 0 0.25rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        <h2 style="font-size:1.05rem;font-weight:400;margin:0 0 0.75rem;opacity:.9;">${esc(cv.profile.title) || ''}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:0.78rem;opacity:.85;">
          ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const summary = cv.profile.summary ? `
    <div style="background:${accent}11;border-left:4px solid ${accent};padding:0.875rem 1.25rem;margin:1.25rem 0;border-radius:0 0.5rem 0.5rem 0;">
      <p style="margin:0;font-size:0.875rem;color:#333;line-height:1.65;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.92rem;">${esc(e.role)}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(e.company)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.2rem 0.5rem;border-radius:9999px;">${dateRange(e.startDate, e.endDate, e.current, t)}</div>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}` : '';

  const eduBlock = cv.education.length ? `
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(e.school)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, false, t)}</div>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}` : '';

  const skillsBlock = cv.skills.length ? `
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.6rem;">
        ${g.category ? `<div style="font-size:0.78rem;font-weight:700;color:#555;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:.05em;">${esc(g.category)}</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
          ${g.items.map(s => `<span style="background:${accent}18;color:${accent};padding:0.2rem 0.6rem;border-radius:9999px;font-size:0.78rem;font-weight:500;">${esc(s)}</span>`).join('')}
        </div>
      </div>`).join('')}` : '';

  const langsBlock = cv.extras.languages.length ? `
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
      ${cv.extras.languages.map(l => `<span style="font-size:0.82rem;background:#f3f4f6;padding:0.25rem 0.75rem;border-radius:9999px;"><strong>${esc(l.name)}</strong>${l.level ? ` · ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="font-size:0.82rem;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date)})</span>` : ''}</div>`).join('')}` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="font-weight:700;font-size:0.92rem;">${esc(p.name)}${p.url ? ` <a href="${esc(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.1rem 0.4rem;border-radius:9999px;display:inline-block;margin-top:0.2rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.25rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.92rem;">${esc(v.role)}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(v.org)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.2rem 0.5rem;border-radius:9999px;">${dateRange(v.startDate, v.endDate, false, t)}</div>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map(sec => `
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.75rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(en.title)}</div>
            ${en.subtitle ? `<div style="font-size:0.82rem;color:#666;">${esc(en.subtitle)}</div>` : ''}
          </div>
          ${en.date ? `<div style="font-size:0.75rem;color:#999;">${esc(en.date)}</div>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}`).join('') : '';

  return `
<div style="font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  <div style="padding:0 2.5rem 2rem;">
    ${summary}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${skillsBlock}
    ${langsBlock}
    ${certBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: COMPACT (dense, ATS-friendly) ──────────────────

function tplCompact(cv, accent, font, t) {
  const sep = `<span style="color:#ccc;margin:0 0.3rem;">|</span>`;

  const header = `
    <div style="border-bottom:1.5px solid ${accent};padding-bottom:0.6rem;margin-bottom:0.75rem;">
      <h1 style="font-size:1.4rem;font-weight:700;margin:0 0 0.15rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      ${cv.profile.title ? `<div style="font-size:0.9rem;color:${accent};font-weight:500;margin-bottom:0.3rem;">${esc(cv.profile.title)}</div>` : ''}
      <div style="font-size:0.75rem;color:#555;display:flex;flex-wrap:wrap;gap:0.15rem;">
        ${cv.profile.email ? `<span>${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `${sep}<span>${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `${sep}<span>${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `${sep}<span>${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `${sep}<span>${linkify(cv.profile.github)}</span>` : ''}
      </div>
    </div>`;

  const st = (label) =>
    `<div style="font-size:0.65rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${accent};margin:0.75rem 0 0.4rem;border-bottom:1px solid ${accent}44;padding-bottom:0.2rem;">${label}</div>`;

  const summary = cv.profile.summary ? `
    ${st(t('summary') || 'Profil')}
    <p style="font-size:0.8rem;color:#333;line-height:1.5;margin:0;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    ${st(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:0.6rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div style="font-size:0.82rem;"><strong>${esc(e.role)}</strong><span style="color:#666;"> · ${esc(e.company)}</span></div>
          <div style="font-size:0.72rem;color:#888;">${dateRange(e.startDate, e.endDate, e.current, t)}</div>
        </div>
        ${e.bullets ? `<div style="font-size:0.78rem;color:#444;margin-top:0.2rem;">${bulletsHtml(e.bullets)}</div>` : ''}
      </div>`).join('')}` : '';

  const eduBlock = cv.education.length ? `
    ${st(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:0.35rem;">
        <div style="font-size:0.82rem;"><strong>${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</strong><span style="color:#666;"> · ${esc(e.school)}</span></div>
        <div style="font-size:0.72rem;color:#888;">${dateRange(e.startDate, e.endDate, false, t)}</div>
      </div>`).join('')}` : '';

  const skillsBlock = cv.skills.length ? `
    ${st(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="font-size:0.8rem;margin-bottom:0.25rem;">
        ${g.category ? `<strong>${esc(g.category)}: </strong>` : ''}${g.items.map(esc).join(', ')}
      </div>`).join('')}` : '';

  const langsBlock = cv.extras.languages.length ? `
    ${st(t('languages') || 'Langues')}
    <div style="font-size:0.8rem;">${cv.extras.languages.map(l => `${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ''}`).join(' · ')}</div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    ${st(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `<div style="font-size:0.8rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` (${formatDate(c.date)})` : ''}</div>`).join('')}` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    ${st(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.4rem;">
        <div style="font-size:0.82rem;"><strong>${esc(p.name)}</strong>${p.url ? ` <span style="color:${accent};font-size:0.72rem;">↗ ${linkify(p.url)}</span>` : ''}${p.tech ? `<span style="color:#666;"> · ${esc(p.tech)}</span>` : ''}</div>
        ${p.description ? `<div style="font-size:0.78rem;color:#444;margin-top:0.1rem;">${esc(p.description)}</div>` : ''}
      </div>`).join('')}` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    ${st(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:0.35rem;">
        <div style="font-size:0.82rem;"><strong>${esc(v.role)}</strong><span style="color:#666;"> · ${esc(v.org)}</span></div>
        <div style="font-size:0.72rem;color:#888;">${dateRange(v.startDate, v.endDate, false, t)}</div>
      </div>`).join('')}` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map(sec => `
    ${st(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.3rem;">
        <div style="font-size:0.82rem;"><strong>${esc(en.title)}</strong>${en.subtitle ? `<span style="color:#666;"> · ${esc(en.subtitle)}</span>` : ''}${en.date ? ` <span style="color:#888;font-size:0.72rem;">(${esc(en.date)})</span>` : ''}</div>
        ${en.description ? `<div style="font-size:0.78rem;color:#444;">${esc(en.description)}</div>` : ''}
      </div>`).join('')}`).join('') : '';

  return `
<div style="padding:1.25rem 1.75rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;font-size:0.82rem;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${customBlocks}
</div>`;
}

// ── Main render function ──────────────────────────────────────

function renderTemplate(cv, template, accent, font, t) {
  switch (template) {
    case 'modern':  return tplModern(cv, accent, font, t);
    case 'classic': return tplClassic(cv, accent, font, t);
    case 'bold':    return tplBold(cv, accent, font, t);
    case 'compact': return tplCompact(cv, accent, font, t);
    default:        return tplModern(cv, accent, font, t);
  }
}
