/* ═══════════════════════════════════════════════════════════════
   iloveresume — app.js
   State, form handlers, live preview, PDF export, share, history
   Inspiré de iloveinvoice · Vanilla JavaScript pur
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Translations ──────────────────────────────────────────────
const T = {
  fr: {
    step_profile: 'Profil', step_exp: 'Expériences', step_edu: 'Formation',
    step_skills: 'Compétences', step_extras: 'Extras',
    full_name: 'Nom complet *', job_title: 'Titre / Poste visé *',
    summary: 'Résumé / Accroche', phone: 'Téléphone', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Ville / Pays',
    website: 'Site web', add_photo: 'Ajouter une photo', remove_photo: 'Supprimer la photo',
    add_experience: 'Ajouter une expérience', add_education: 'Ajouter une formation',
    add_skill_group: 'Ajouter une catégorie', add_certification: 'Ajouter',
    add_language: 'Ajouter une langue', certifications: 'Certifications',
    languages: 'Langues', interests: "Centres d'intérêt",
    interests_placeholder: "Voyage, Photo, Sport… (séparés par virgule)",
    design_options: 'Design & Options', template: 'Template',
    tpl_modern: 'Modern', tpl_classic: 'Classic', tpl_bold: 'Bold', tpl_compact: 'Compact',
    accent_color: "Couleur d'accent", font: 'Police',
    show_photo: 'Afficher la photo dans le CV',
    previous: '← Précédent', next: 'Suivant →',
    history: 'Historique', share: 'Partager', download: 'Télécharger PDF',
    save_json: 'Sauvegarder', import_json: 'Importer', saved_json: 'CV sauvegardé ✓', imported_json: 'CV importé ✓', import_error: 'Fichier invalide',
    persist_tip: 'Sauvegardez votre CV en JSON pour le retrouver et le modifier plus tard, même des mois après.',
    history_empty: "Aucun CV dans l'historique", share_title: 'Partager votre CV',
    share_desc: 'Ce lien contient toutes les données de votre CV. Aucune donnée n\'est envoyée sur un serveur.',
    copy_link: 'Copier', link_copied: '✓ Lien copié !',
    preview_placeholder: 'Remplissez le formulaire pour voir votre CV',
    select_language: 'Choisir la langue', contact: 'Contact',
    company: 'Entreprise', role: 'Poste', start_date: 'Date de début', end_date: 'Date de fin',
    current_position: 'Poste actuel', description: 'Description / Points clés (un par ligne)',
    school: 'École / Université', degree: 'Diplôme', field: 'Domaine', grade: 'Mention / Note',
    skill_category: 'Catégorie (ex: Langages, Outils…)',
    skill_items: 'Compétences (séparées par virgule)',
    cert_name: 'Nom de la certification', cert_issuer: 'Organisme', cert_date: 'Date',
    lang_name: 'Langue', lang_level: 'Niveau (ex: Natif, B2, Intermédiaire)',
    load: 'Charger', duplicate: 'Dupliquer', delete: 'Supprimer',
    pdf_generating: 'Génération du PDF…', pdf_done: 'PDF téléchargé !',
    present: 'Présent', unnamed: 'Sans titre',
    demo_title: 'Données d\'exemple', demo_desc: 'remplacez-les par les vôtres', demo_clear: 'Tout effacer',
    // New sections
    projects: 'Projets', add_project: 'Ajouter un projet', project_name: 'Nom du projet',
    project_description: 'Description', project_url: 'URL du projet', project_tech: 'Technologies utilisées',
    volunteer: 'Bénévolat', add_volunteer: 'Ajouter une expérience bénévole',
    volunteer_org: 'Organisation', volunteer_role: 'Rôle',
    custom_section: 'Section personnalisée', add_custom_section: 'Ajouter une section personnalisée',
    custom_section_title: 'Titre de la section', custom_entry_title: 'Titre', custom_entry_subtitle: 'Sous-titre',
    custom_entry_date: 'Date', custom_entry_desc: 'Description', add_custom_entry: 'Ajouter une entrée',
    saved_indicator: 'Sauvegardé', preview_cv: 'Voir mon CV',
    // New templates
    tpl_executive: 'Exécutif', tpl_creative: 'Créatif', tpl_technical: 'Technique',
    tpl_minimal: 'Minimal', tpl_academic: 'Académique', tpl_infographic: 'Infographie',
    tpl_elegant: 'Élégant', tpl_twopage: 'Deux pages',
    // Publications & References
    publications: 'Publications', add_publication: 'Ajouter une publication',
    pub_title: 'Titre', pub_authors: 'Auteurs', pub_venue: 'Revue / Conférence', pub_date: 'Date', pub_url: 'URL',
    references: 'Références', add_reference: 'Ajouter une référence',
    ref_name: 'Nom', ref_title: 'Titre / Poste', ref_company: 'Entreprise', ref_email: 'Email', ref_phone: 'Téléphone',
    references_available: 'Références disponibles sur demande',
    // ATS
    ats_checker: 'Score ATS', ats_paste_job: 'Collez l\'offre d\'emploi ici', ats_analyze: 'Analyser',
    ats_score: 'Score', ats_suggestions: 'Suggestions', ats_matched: 'Mots-clés trouvés', ats_missing: 'Mots-clés manquants',
    ats_add_keywords: 'Ajoutez ces mots-clés à votre CV', ats_add_section: 'Ajoutez ou complétez la section',
    ats_sec_summary: 'Résumé professionnel', ats_sec_experience: 'Expérience professionnelle', ats_sec_skills: 'Compétences', ats_sec_education: 'Formation', ats_sec_header: 'Nom et titre',
    ats_fmt_chars: 'Supprimez les caractères spéciaux — les ATS peuvent ne pas les lire', ats_fmt_date: 'Utilisez un format de date cohérent (AAAA-MM)', ats_fmt_summary_long: 'Raccourcissez votre résumé (max 500 caractères)', ats_fmt_summary_short: 'Développez votre résumé (min 30 caractères)', ats_fmt_bullet: 'Raccourcissez vos bullet points (max 200 caractères)', ats_fmt_few: 'Ajoutez plus de bullet points à vos expériences', ats_fmt_contact: 'Ajoutez un email ou numéro de téléphone',
    // Content helpers
    content_helpers: 'Aide à la rédaction', action_verbs: 'Verbes d\'action', bullet_templates: 'Modèles de bullet points',
    weak_words_detected: 'Mots faibles détectés',
    // Export
    download_docx: 'Télécharger DOCX',
    // Drag
    drag_hint: 'Glissez pour réordonner',
    font_size: 'Taille de police', spacing: 'Espacement', sidebar_width: 'Largeur sidebar',
    section_visibility: 'Sections visibles',
  },
  en: {
    step_profile: 'Profile', step_exp: 'Experience', step_edu: 'Education',
    step_skills: 'Skills', step_extras: 'Extras',
    full_name: 'Full name *', job_title: 'Job title *',
    summary: 'Summary / Headline', phone: 'Phone', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'City / Country',
    website: 'Website', add_photo: 'Add photo', remove_photo: 'Remove photo',
    add_experience: 'Add experience', add_education: 'Add education',
    add_skill_group: 'Add skill group', add_certification: 'Add',
    add_language: 'Add language', certifications: 'Certifications',
    languages: 'Languages', interests: 'Interests',
    interests_placeholder: 'Travel, Photography, Sport… (comma separated)',
    design_options: 'Design & Options', template: 'Template',
    tpl_modern: 'Modern', tpl_classic: 'Classic', tpl_bold: 'Bold', tpl_compact: 'Compact',
    accent_color: 'Accent color', font: 'Font',
    show_photo: 'Show photo in CV',
    previous: '← Previous', next: 'Next →',
    history: 'History', share: 'Share', download: 'Download PDF',
    save_json: 'Save', import_json: 'Import', saved_json: 'CV saved ✓', imported_json: 'CV imported ✓', import_error: 'Invalid file',
    persist_tip: 'Save your CV as JSON to retrieve and update it later — even months from now.',
    history_empty: 'No CV in history', share_title: 'Share your CV',
    share_desc: 'This link contains all your CV data. No data is sent to any server.',
    copy_link: 'Copy', link_copied: '✓ Link copied!',
    preview_placeholder: 'Fill in the form to see your CV',
    select_language: 'Select language', contact: 'Contact',
    company: 'Company', role: 'Position', start_date: 'Start date', end_date: 'End date',
    current_position: 'Current position', description: 'Description / Key points (one per line)',
    school: 'School / University', degree: 'Degree', field: 'Field of study', grade: 'Grade / Honours',
    skill_category: 'Category (e.g. Languages, Tools…)',
    skill_items: 'Skills (comma separated)',
    cert_name: 'Certification name', cert_issuer: 'Issuer', cert_date: 'Date',
    lang_name: 'Language', lang_level: 'Level (e.g. Native, B2, Intermediate)',
    load: 'Load', duplicate: 'Duplicate', delete: 'Delete',
    pdf_generating: 'Generating PDF…', pdf_done: 'PDF downloaded!',
    present: 'Present', unnamed: 'Untitled',
    demo_title: 'Sample data', demo_desc: 'replace it with yours', demo_clear: 'Clear all',
    projects: 'Projects', add_project: 'Add a project', project_name: 'Project name',
    project_description: 'Description', project_url: 'Project URL', project_tech: 'Technologies used',
    volunteer: 'Volunteering', add_volunteer: 'Add volunteer experience',
    volunteer_org: 'Organization', volunteer_role: 'Role',
    custom_section: 'Custom section', add_custom_section: 'Add custom section',
    custom_section_title: 'Section title', custom_entry_title: 'Title', custom_entry_subtitle: 'Subtitle',
    custom_entry_date: 'Date', custom_entry_desc: 'Description', add_custom_entry: 'Add entry',
    saved_indicator: 'Saved', preview_cv: 'Preview CV',
    tpl_executive: 'Executive', tpl_creative: 'Creative', tpl_technical: 'Technical',
    tpl_minimal: 'Minimal', tpl_academic: 'Academic', tpl_infographic: 'Infographic',
    tpl_elegant: 'Elegant', tpl_twopage: 'Two Page',
    publications: 'Publications', add_publication: 'Add publication',
    pub_title: 'Title', pub_authors: 'Authors', pub_venue: 'Journal / Conference', pub_date: 'Date', pub_url: 'URL',
    references: 'References', add_reference: 'Add reference',
    ref_name: 'Name', ref_title: 'Title / Position', ref_company: 'Company', ref_email: 'Email', ref_phone: 'Phone',
    references_available: 'References available upon request',
    ats_checker: 'ATS Score', ats_paste_job: 'Paste job description here', ats_analyze: 'Analyze',
    ats_score: 'Score', ats_suggestions: 'Suggestions', ats_matched: 'Matched keywords', ats_missing: 'Missing keywords',
    ats_add_keywords: 'Add these keywords to your CV', ats_add_section: 'Add or complete section',
    ats_sec_summary: 'Professional summary', ats_sec_experience: 'Work experience', ats_sec_skills: 'Skills', ats_sec_education: 'Education', ats_sec_header: 'Name & job title',
    ats_fmt_chars: 'Remove special characters — ATS may not parse them', ats_fmt_date: 'Use consistent date format (YYYY-MM)', ats_fmt_summary_long: 'Shorten your summary (max 500 characters)', ats_fmt_summary_short: 'Expand your summary (at least 30 characters)', ats_fmt_bullet: 'Shorten bullet points (max 200 characters)', ats_fmt_few: 'Add more bullet points to your experience', ats_fmt_contact: 'Add email or phone number',
    content_helpers: 'Writing Help', action_verbs: 'Action verbs', bullet_templates: 'Bullet templates',
    weak_words_detected: 'Weak words detected',
    download_docx: 'Download DOCX',
    drag_hint: 'Drag to reorder',
    font_size: 'Font size', spacing: 'Spacing', sidebar_width: 'Sidebar width',
    section_visibility: 'Visible sections',
  },
};

// Emoji flags: fully offline, no external dependency.
// Uses Unicode Regional Indicator Symbols (supported on all modern OS).
function flagEmoji(iso2) {
  return iso2.toUpperCase().replace(/./g,
    c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  );
}

const LANGS = [
  { code: 'fr', label: 'Français',          flag: flagEmoji('fr') },
  { code: 'en', label: 'English',            flag: flagEmoji('gb') },
  { code: 'de', label: 'Deutsch',            flag: flagEmoji('de') },
  { code: 'es', label: 'Español',            flag: flagEmoji('es') },
  { code: 'pt', label: 'Português',          flag: flagEmoji('pt') },
  { code: 'it', label: 'Italiano',           flag: flagEmoji('it') },
  { code: 'nl', label: 'Nederlands',         flag: flagEmoji('nl') },
  { code: 'pl', label: 'Polski',             flag: flagEmoji('pl') },
  { code: 'tr', label: 'Türkçe',             flag: flagEmoji('tr') },
  { code: 'zh', label: '中文',               flag: flagEmoji('cn') },
  { code: 'ja', label: '日本語',             flag: flagEmoji('jp') },
  { code: 'ko', label: '한국어',             flag: flagEmoji('kr') },
  { code: 'hi', label: 'हिन्दी',            flag: flagEmoji('in') },
  { code: 'ar', label: 'العربية',            flag: flagEmoji('sa') },
  { code: 'ru', label: 'Русский',            flag: flagEmoji('ru') },
  { code: 'he', label: 'עברית',              flag: flagEmoji('il') },
  { code: 'sv', label: 'Svenska',            flag: flagEmoji('se') },
  { code: 'id', label: 'Bahasa Indonesia',   flag: flagEmoji('id') },
  { code: 'ro', label: 'Română',             flag: flagEmoji('ro') },
  { code: 'cs', label: 'Čeština',            flag: flagEmoji('cz') },
  { code: 'uk', label: 'Українська',         flag: flagEmoji('ua') },
  { code: 'el', label: 'Ελληνικά',           flag: flagEmoji('gr') },
  { code: 'hu', label: 'Magyar',             flag: flagEmoji('hu') },
  { code: 'nb', label: 'Norsk',              flag: flagEmoji('no') },
  { code: 'da', label: 'Dansk',              flag: flagEmoji('dk') },
  { code: 'fi', label: 'Suomi',              flag: flagEmoji('fi') },
  { code: 'vi', label: 'Tiếng Việt',         flag: flagEmoji('vn') },
  { code: 'th', label: 'ไทย',               flag: flagEmoji('th') },
];

// ── Lazy script loader ────────────────────────────────────────

const _loadedScripts = {};
function loadScript(src) {
  if (_loadedScripts[src]) return _loadedScripts[src];
  _loadedScripts[src] = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return _loadedScripts[src];
}

const LIBS = {
  html2pdf: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  pako: 'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js',
  sortable: 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.3/Sortable.min.js',
};

// ── localStorage safe wrapper ─────────────────────────────────

/**
 * Wraps localStorage.setItem with QuotaExceededError handling.
 * On quota error: shows a user-friendly toast and returns false.
 * @returns {boolean} true on success, false on quota error
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e instanceof DOMException && (
      e.code === 22 || e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    )) {
      showToast('⚠️ Stockage plein — supprimez des CVs ou des photos pour libérer de l\'espace.', 5000);
      console.warn('[iloveresume] localStorage quota exceeded for key:', key);
    }
    return false;
  }
}

// ── State ─────────────────────────────────────────────────────

let lang = 'fr';
let template = 'modern';
let accentColor = '#4f6ef7';
let cvFont = 'Inter';
let showPhoto = true;
let cvFontSize = 1;      // scale factor 0.8–1.3
let cvSpacing = 1;        // scale factor 0.7–1.5
let cvSidebarWidth = 220; // px 160–280
let hiddenSections = {};  // { experience: true, ... }
let currentStep = 0;

let profile = { name:'', title:'', summary:'', email:'', phone:'', city:'', linkedin:'', github:'', website:'', photoB64:'' };
let experiences = [];
let education = [];
let skills = [];
let projects = [];
let volunteer = [];
let customSections = [];
let publications = [];
let references = [];
let showReferencesToggle = true;
let extras = { certifications: [], languages: [], interests: '' };

// ── Utilities ─────────────────────────────────────────────────

/**
 * Generates a collision-safe integer ID for CV section entries.
 * Replaces the scattered `genId()` pattern.
 */
function genId() {
  return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

/**
 * Commits a state change: persists to localStorage and re-renders the preview.
 * Use instead of the `commitChange();` pair everywhere.
 */
function commitChange() {
  saveState();
  renderPreview();
}

/**
 * Updates the visible header label of the nearest `.entry-item` ancestor.
 * @param {Element} el   - any element inside an .entry-item
 * @param {string}  text - the new label text
 */
function refreshHeader(el, text) {
  const header = el.closest('.entry-item')
    ?.querySelector('.entry-header > span:not(.drag-handle)');
  if (header) header.textContent = text;
}

/**
 * Attaches a single delegated input+change listener to a list container.
 * Any input/textarea/select with [data-field] and [data-id] inside the container
 * will automatically update the matching entry in `arr` and call commitChange().
 *
 * @param {HTMLElement} listEl     - the container element
 * @param {Array}       arr        - array of objects with numeric `.id` property
 * @param {Function}    [onUpdate] - optional callback(entry, field, el) for side-effects
 */
function bindDelegated(listEl, arr, onUpdate) {
  // Cancel any previous delegated listeners on this container.
  // Without this, every renderXxx() call would stack a new listener
  // on the same persistent DOM node → n renders = n commitChange() calls per keystroke.
  if (listEl._delegatedAbort) listEl._delegatedAbort.abort();
  const controller = new AbortController();
  listEl._delegatedAbort = controller;

  function handler(e) {
    const field = e.target.dataset.field;
    if (!field) return;
    const id = parseFloat(e.target.dataset.id);
    const entry = arr.find(x => x.id === id);
    if (!entry) return;
    entry[field] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onUpdate?.(entry, field, e.target);
    commitChange();
  }
  listEl.addEventListener('input',  handler, { signal: controller.signal });
  listEl.addEventListener('change', handler, { signal: controller.signal });
}

const $ = id => document.getElementById(id);
const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
const t = (k, fallback) => (T[lang] && T[lang][k]) ? T[lang][k] : (T.fr[k] || fallback || k);

function showToast(msg, duration = 2500) {
  const el = $('toast');
  el.textContent = msg;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, duration);
}

function setAccent(color) {
  accentColor = color;
  document.documentElement.style.setProperty('--accent', color);
  // Update accent-light approximation
  document.documentElement.style.setProperty('--accent-dark', color);
}

// ── Dark Mode ─────────────────────────────────────────────────

function initDark() {
  const isDark = localStorage.getItem('iloveresume_dark') === '1';
  if (isDark) document.documentElement.classList.add('dark');
  updateDarkIcon(isDark);
}

function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  safeSetItem('iloveresume_dark', isDark ? '1' : '0');
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  $('icon-moon').classList.toggle('hidden', isDark);
  $('icon-sun').classList.toggle('hidden', !isDark);
}

// ── Language ──────────────────────────────────────────────────

async function initLang() {
  const saved = localStorage.getItem('iloveresume_lang');
  if (saved) {
    if (saved !== 'fr' && saved !== 'en' && !T[saved]) {
      try {
        await loadScript(`locales/${saved}.js`);
        if (window.T_LOCALES && window.T_LOCALES[saved]) {
          T[saved] = window.T_LOCALES[saved];
        }
      } catch (e) {
        console.warn(`[iloveresume] Failed to load locale ${saved}`, e);
      }
    }
    if (T[saved]) lang = saved;
  }
  updateLangUI();
}

// RTL languages that need a specific font loaded automatically
const LANG_FONT_MAP = {
  ar: 'Noto Sans Arabic',
  he: 'Noto Sans Arabic', // Hebrew also benefits from Noto Sans
};

async function setLang(code) {
  if (code !== 'fr' && code !== 'en' && !T[code]) {
    try {
      await loadScript(`locales/${code}.js`);
      if (window.T_LOCALES && window.T_LOCALES[code]) {
        T[code] = window.T_LOCALES[code];
      }
    } catch (e) {
      console.warn(`[iloveresume] Failed to load locale ${code}`, e);
      code = 'fr';
    }
  }
  if (!T[code]) code = 'fr';
  lang = code;
  safeSetItem('iloveresume_lang', code);
  // Auto-load the font required for this language (e.g. Noto Arabic for ar/he)
  if (LANG_FONT_MAP[code]) ensureFontLoaded(LANG_FONT_MAP[code]);
  updateLangUI();
  renderAllTranslations();
  renderPreview();
  closeModal('modal-lang');
}

const RTL_LANGS = ['ar', 'he'];

function updateLangUI() {
  const l = LANGS.find(x => x.code === lang) || LANGS[0];
  $('lang-flag').innerHTML = l.flag;
  $('lang-label').textContent = l.code.toUpperCase();
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}

function renderLangModal() {
  const list = $('lang-list');
  list.innerHTML = LANGS.map(l => `
    <button class="lang-item ${l.code === lang ? 'active' : ''}" onclick="setLang('${l.code}')">
      <span>${l.flag}</span>
      <span>${l.label}</span>
    </button>`).join('');
}

// ── Translations: update [data-t] elements ────────────────────

function renderAllTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
}

// ── Stepper ───────────────────────────────────────────────────

function goToStep(step) {
  const panels = document.querySelectorAll('.step-panel');
  const items = document.querySelectorAll('.step-item');
  const lines = document.querySelectorAll('.step-line');

  panels.forEach((p, i) => p.classList.toggle('hidden', i !== step));
  items.forEach((item, i) => {
    item.classList.toggle('active', i === step);
    item.classList.toggle('done', i < step);
  });
  lines.forEach((line, i) => line.classList.toggle('done', i < step));

  currentStep = step;
  $('btn-prev').disabled = step === 0;
  const isLast = step === panels.length - 1;
  $('btn-next').textContent = isLast ? t('download') : t('next');
  $('btn-next').classList.toggle('primary', true);

  if (isLast) {
    $('btn-next').onclick = downloadPDF;
  } else {
    $('btn-next').onclick = nextStep;
  }
}

function nextStep() {
  collectProfile();
  const total = document.querySelectorAll('.step-panel').length;
  if (currentStep < total - 1) goToStep(currentStep + 1);
}

function prevStep() {
  if (currentStep > 0) goToStep(currentStep - 1);
}

document.querySelectorAll('.step-item').forEach(item => {
  item.addEventListener('click', () => goToStep(parseInt(item.dataset.step)));
});

// ── Accordion sections ────────────────────────────────────────

function toggleSection(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('collapsed');
  body.classList.toggle('hidden-acc');
}

// ── Profile form ──────────────────────────────────────────────

function collectProfile() {
  profile = {
    name:     val('p-name'),
    title:    val('p-title'),
    summary:  val('p-summary'),
    email:    val('p-email'),
    phone:    val('p-phone'),
    city:     val('p-city'),
    linkedin: val('p-linkedin'),
    github:   val('p-github'),
    website:  val('p-website'),
    photoB64: profile.photoB64,
  };
  commitChange();
}

function populateProfile() {
  const fields = ['name','title','summary','email','phone','city','linkedin','github','website'];
  fields.forEach(f => {
    const el = $(`p-${f}`);
    if (el) el.value = profile[f] || '';
  });
  updatePhotoUI();
}

// ── Photo upload ──────────────────────────────────────────────

// ── Photo resize helper ───────────────────────────────────────
// Caps photo at MAX_PHOTO_PX on its longest side and re-encodes as JPEG
// to prevent localStorage quota exhaustion with large images.
const MAX_PHOTO_PX = 300;

function resizePhotoBase64(dataUrl, callback) {
  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, MAX_PHOTO_PX / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    callback(canvas.toDataURL('image/jpeg', 0.82));
  };
  img.onerror = () => callback(dataUrl); // fallback: keep original
  img.src = dataUrl;
}

$('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    resizePhotoBase64(ev.target.result, resized => {
      profile.photoB64 = resized;
      updatePhotoUI();
      commitChange();
    });
  };
  reader.readAsDataURL(file);
});

$('btn-remove-photo').addEventListener('click', () => {
  profile.photoB64 = '';
  $('photo-input').value = '';
  updatePhotoUI();
  commitChange();
});

function updatePhotoUI() {
  if (profile.photoB64) {
    $('photo-img').src = profile.photoB64;
    $('photo-preview').classList.remove('hidden');
    $('photo-placeholder').classList.add('hidden');
  } else {
    $('photo-preview').classList.add('hidden');
    $('photo-placeholder').classList.remove('hidden');
  }
}

// ── Experiences ───────────────────────────────────────────────

function addExperience(data = {}) {
  const id = genId();
  experiences.push({ id, company: data.company||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', current: data.current||false, bullets: data.bullets||'' });
  renderExperiences();
  commitChange();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e.id !== id);
  renderExperiences();
  commitChange();
}

function renderExperiences() {
  const list = $('exp-list');
  if (!experiences.length) { list.innerHTML = ''; return; }
  list.innerHTML = experiences.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span style="flex:1">${esc2(e.role) || t('role')} ${e.company ? '@ ' + esc2(e.company) : ''}</span>
        <button class="btn-remove-entry" onclick="removeExperience(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="role" data-id="${e.id}" value="${esc2(e.role)}" placeholder=" " />
        <label class="fl-label">${t('role')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="company" data-id="${e.id}" value="${esc2(e.company)}" placeholder=" " />
        <label class="fl-label">${t('company')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${e.id}" value="${e.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${e.id}" value="${e.endDate||''}" ${e.current ? 'disabled' : ''} />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;cursor:pointer;">
        <input type="checkbox" data-field="current" data-id="${e.id}" ${e.current ? 'checked' : ''} />
        ${t('current_position')}
      </label>
      <textarea class="bullets-input" data-field="bullets" data-id="${e.id}" placeholder="${t('description')}">${esc2(e.bullets)}</textarea>
    </div>`).join('');

  bindDelegated(list, experiences, (exp, field, el) => {
    if (field === 'role' || field === 'company') {
      refreshHeader(el, `${exp.role || t('role')} ${exp.company ? '@ ' + exp.company : ''}`);
    }
    if (field === 'current') {
      const endInput = el.closest('.entry-item')?.querySelector('[data-field="endDate"]');
      if (endInput) endInput.disabled = exp.current;
    }
  });
}

$('btn-add-exp').addEventListener('click', () => addExperience());

// ── Education ─────────────────────────────────────────────────

function addEducation(data = {}) {
  const id = genId();
  education.push({ id, school: data.school||'', degree: data.degree||'', field: data.field||'', startDate: data.startDate||'', endDate: data.endDate||'', grade: data.grade||'' });
  renderEducation();
  commitChange();
}

function removeEducation(id) {
  education = education.filter(e => e.id !== id);
  renderEducation();
  commitChange();
}

function renderEducation() {
  const list = $('edu-list');
  if (!education.length) { list.innerHTML = ''; return; }
  list.innerHTML = education.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(e.degree) || t('degree')} ${e.school ? '· ' + esc2(e.school) : ''}</span>
        <button class="btn-remove-entry" onclick="removeEducation(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="degree" data-id="${e.id}" value="${esc2(e.degree)}" placeholder=" " />
        <label class="fl-label">${t('degree')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="field" data-id="${e.id}" value="${esc2(e.field)}" placeholder=" " />
        <label class="fl-label">${t('field')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="school" data-id="${e.id}" value="${esc2(e.school)}" placeholder=" " />
        <label class="fl-label">${t('school')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${e.id}" value="${e.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${e.id}" value="${e.endDate||''}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="grade" data-id="${e.id}" value="${esc2(e.grade)}" placeholder=" " />
        <label class="fl-label">${t('grade')}</label>
      </div>
    </div>`).join('');

  bindDelegated(list, education, (edu, field, el) => {
    if (field === 'degree' || field === 'school') {
      refreshHeader(el, `${edu.degree || t('degree')} ${edu.school ? '· ' + edu.school : ''}`);
    }
  });
}

$('btn-add-edu').addEventListener('click', () => addEducation());

// ── Skills ────────────────────────────────────────────────────

function addSkillGroup(data = {}) {
  const id = genId();
  skills.push({ id, category: data.category||'', items: data.items||[] });
  renderSkills();
  commitChange();
}

function removeSkillGroup(id) {
  skills = skills.filter(s => s.id !== id);
  renderSkills();
  commitChange();
}

function addSkillTag(groupId, value) {
  const group = skills.find(s => s.id === groupId);
  if (!group || !value.trim()) return;
  const tags = value.split(',').map(v => v.trim()).filter(Boolean);
  tags.forEach(tag => { if (!group.items.includes(tag)) group.items.push(tag); });
  renderSkills();
  commitChange();
}

function removeSkillTag(groupId, tag) {
  const group = skills.find(s => s.id === groupId);
  if (!group) return;
  group.items = group.items.filter(i => i !== tag);
  renderSkills();
  commitChange();
}

function renderSkills() {
  const list = $('skills-list');
  if (!skills.length) { list.innerHTML = ''; return; }
  list.innerHTML = skills.map(g => `
    <div class="entry-item" data-id="${g.id}">
      <div class="entry-header">
        <span>${g.category || t('skill_category')}</span>
        <button class="btn-remove-entry" onclick="removeSkillGroup(${g.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input skill-cat" data-field="category" value="${esc2(g.category)}" placeholder=" " data-id="${g.id}" />
        <label class="fl-label">${t('skill_category')}</label>
      </div>
      <div class="flex flex-wrap gap-1 min-h-[32px]">
        ${g.items.map(item => `
          <span class="skill-tag">${esc2(item)} <span class="rm-tag" onclick="removeSkillTag(${g.id},'${esc2(item)}')" title="${t('delete')}">×</span></span>`).join('')}
      </div>
      <div style="display:flex;gap:0.5rem;">
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input skill-input" placeholder=" " data-id="${g.id}" />
          <label class="fl-label">${t('skill_items')}</label>
        </div>
        <button class="nav-btn" style="padding:0 0.875rem;flex-shrink:0;" onclick="addSkillTagFromInput(${g.id})">+</button>
      </div>
    </div>`).join('');

  bindDelegated(list, skills, (group, field, el) => {
    if (field === 'category') {
      const header = el.closest('.entry-item')?.querySelector('.entry-header span:last-of-type');
      if (header) header.textContent = group.category || t('skill_category');
    }
  });

  list.querySelectorAll('.skill-input').forEach(el => el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillTagFromInput(parseFloat(el.dataset.id));
    }
  }));
}

function addSkillTagFromInput(groupId) {
  const input = document.querySelector(`.skill-input[data-id="${groupId}"]`);
  if (!input || !input.value.trim()) return;
  addSkillTag(groupId, input.value);
  input.value = '';
}

$('btn-add-skill').addEventListener('click', () => addSkillGroup());

// ── Projects ─────────────────────────────────────────────────

function addProject(data = {}) {
  const id = genId();
  projects.push({ id, name: data.name||'', description: data.description||'', url: data.url||'', tech: data.tech||'' });
  renderProjects();
  commitChange();
}

function removeProject(id) {
  projects = projects.filter(p => p.id !== id);
  renderProjects();
  commitChange();
}

function renderProjects() {
  const list = $('project-list');
  if (!list) return;
  if (!projects.length) { list.innerHTML = ''; return; }
  list.innerHTML = projects.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(p.name) || t('project_name')}</span>
        <button class="btn-remove-entry" onclick="removeProject(${p.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="name" data-id="${p.id}" value="${esc2(p.name)}" placeholder=" " />
        <label class="fl-label">${t('project_name')}</label>
      </div>
      <div class="fl-wrap">
        <textarea class="bullets-input" data-field="description" data-id="${p.id}" placeholder="${t('project_description')}">${esc2(p.description)}</textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="url" class="fl-input" data-field="url" data-id="${p.id}" value="${esc2(p.url)}" placeholder=" " />
          <label class="fl-label">${t('project_url')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="tech" data-id="${p.id}" value="${esc2(p.tech)}" placeholder=" " />
          <label class="fl-label">${t('project_tech')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, projects, (proj, field, el) => {
    if (field === 'name') refreshHeader(el, proj.name || t('project_name'));
  });
}

$('btn-add-project')?.addEventListener('click', () => addProject());

// ── Volunteer ────────────────────────────────────────────────

function addVolunteer(data = {}) {
  const id = genId();
  volunteer.push({ id, org: data.org||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', description: data.description||'' });
  renderVolunteer();
  commitChange();
}

function removeVolunteer(id) {
  volunteer = volunteer.filter(v => v.id !== id);
  renderVolunteer();
  commitChange();
}

function renderVolunteer() {
  const list = $('volunteer-list');
  if (!list) return;
  if (!volunteer.length) { list.innerHTML = ''; return; }
  list.innerHTML = volunteer.map(v => `
    <div class="entry-item" data-id="${v.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(v.role) || t('volunteer_role')} ${v.org ? '@ ' + esc2(v.org) : ''}</span>
        <button class="btn-remove-entry" onclick="removeVolunteer(${v.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="role" data-id="${v.id}" value="${esc2(v.role)}" placeholder=" " />
        <label class="fl-label">${t('volunteer_role')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="org" data-id="${v.id}" value="${esc2(v.org)}" placeholder=" " />
        <label class="fl-label">${t('volunteer_org')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${v.id}" value="${v.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${v.id}" value="${v.endDate||''}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <textarea class="bullets-input" data-field="description" data-id="${v.id}" placeholder="${t('description')}">${esc2(v.description)}</textarea>
    </div>`).join('');

  bindDelegated(list, volunteer, (vol, field, el) => {
    if (field === 'role' || field === 'org') {
      refreshHeader(el, `${vol.role || t('volunteer_role')} ${vol.org ? '@ ' + vol.org : ''}`);
    }
  });
}

$('btn-add-volunteer')?.addEventListener('click', () => addVolunteer());

// ── Custom Sections ──────────────────────────────────────────

function addCustomSection(data = {}) {
  const id = genId();
  customSections.push({ id, title: data.title||'', entries: data.entries||[] });
  renderCustomSections();
  commitChange();
}

function removeCustomSection(id) {
  customSections = customSections.filter(s => s.id !== id);
  renderCustomSections();
  commitChange();
}

function addCustomEntry(sectionId, data = {}) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  const id = genId();
  section.entries.push({ id, title: data.title||'', subtitle: data.subtitle||'', date: data.date||'', description: data.description||'' });
  renderCustomSections();
  commitChange();
}

function removeCustomEntry(sectionId, entryId) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  section.entries = section.entries.filter(e => e.id !== entryId);
  renderCustomSections();
  commitChange();
}

function renderCustomSections() {
  const container = $('custom-sections-list');
  if (!container) return;
  if (!customSections.length) { container.innerHTML = ''; return; }

  container.innerHTML = customSections.map(sec => `
    <div class="entry-item" data-id="${sec.id}" style="border-color:var(--accent);border-style:solid;border-width:1.5px;">
      <div class="entry-header">
        <span>${sec.title || t('custom_section')}</span>
        <button class="btn-remove-entry" onclick="removeCustomSection(${sec.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input cs-title" value="${esc2(sec.title)}" placeholder=" " data-id="${sec.id}" />
        <label class="fl-label">${t('custom_section_title')}</label>
      </div>
      <div class="cs-entries flex flex-col gap-2" data-section="${sec.id}">
        ${sec.entries.map(en => `
          <div class="entry-item" style="padding:0.625rem;border-style:dashed;" data-eid="${en.id}">
            <div style="display:flex;gap:0.5rem;align-items:flex-start;">
              <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                <div class="grid grid-cols-2 gap-2">
                  <div class="fl-wrap">
                    <input type="text" class="fl-input ce-title" value="${esc2(en.title)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                    <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_title')}</label>
                  </div>
                  <div class="fl-wrap">
                    <input type="text" class="fl-input ce-subtitle" value="${esc2(en.subtitle)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                    <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_subtitle')}</label>
                  </div>
                </div>
                <div class="fl-wrap" style="max-width:140px;">
                  <input type="text" class="fl-input ce-date" value="${esc2(en.date)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                  <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_date')}</label>
                </div>
                <textarea class="bullets-input ce-desc" placeholder="${t('custom_entry_desc')}" data-sid="${sec.id}" data-eid="${en.id}" style="min-height:50px;">${esc2(en.description)}</textarea>
              </div>
              <button class="btn-remove-entry" onclick="removeCustomEntry(${sec.id},${en.id})">×</button>
            </div>
          </div>`).join('')}
      </div>
      <button class="add-btn mt-2" onclick="addCustomEntry(${sec.id})">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        ${t('add_custom_entry')}
      </button>
    </div>`).join('');

  // Section title change
  container.querySelectorAll('.cs-title').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const sec = customSections.find(s => s.id === id);
    if (sec) {
      sec.title = e.target.value;
      const h = e.target.closest('.entry-item')?.querySelector('.entry-header span');
      if (h) h.textContent = sec.title || t('custom_section');
    }
    commitChange();
  }));

  // Entry field changes
  container.querySelectorAll('.ce-title,.ce-subtitle,.ce-date,.ce-desc').forEach(el => el.addEventListener('input', e => {
    const sid = parseFloat(e.target.dataset.sid);
    const eid = parseFloat(e.target.dataset.eid);
    const sec = customSections.find(s => s.id === sid);
    if (!sec) return;
    const en = sec.entries.find(x => x.id === eid);
    if (!en) return;
    const cls = e.target.classList;
    if (cls.contains('ce-title')) en.title = e.target.value;
    else if (cls.contains('ce-subtitle')) en.subtitle = e.target.value;
    else if (cls.contains('ce-date')) en.date = e.target.value;
    else if (cls.contains('ce-desc')) en.description = e.target.value;
    commitChange();
  }));
}

$('btn-add-custom-section')?.addEventListener('click', () => addCustomSection());

// ── Extras: Certifications ────────────────────────────────────

function addCertification(data = {}) {
  const id = genId();
  extras.certifications.push({ id, name: data.name||'', issuer: data.issuer||'', date: data.date||'' });
  renderCertifications();
  commitChange();
}

function removeCertification(id) {
  extras.certifications = extras.certifications.filter(c => c.id !== id);
  renderCertifications();
  commitChange();
}

function renderCertifications() {
  const list = $('cert-list');
  if (!extras.certifications.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.certifications.map(c => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${c.id}">
      <div style="display:flex;gap:0.5rem;align-items:flex-start;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;">
          <div class="fl-wrap">
            <input class="fl-input" data-field="name" data-id="${c.id}" value="${esc2(c.name)}" placeholder=" " />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_name')}</label>
          </div>
          <div class="fl-wrap">
            <input class="fl-input" data-field="issuer" data-id="${c.id}" value="${esc2(c.issuer)}" placeholder=" " />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_issuer')}</label>
          </div>
          <div class="fl-wrap" style="width:110px;">
            <input type="month" class="fl-input" data-field="date" data-id="${c.id}" value="${c.date||''}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_date')}</label>
          </div>
        </div>
        <button class="btn-remove-entry" onclick="removeCertification(${c.id})">×</button>
      </div>
    </div>`).join('');

  bindDelegated(list, extras.certifications);
}

$('btn-add-cert').addEventListener('click', () => addCertification());

// ── Extras: Languages ─────────────────────────────────────────

function addLangItem(data = {}) {
  const id = genId();
  extras.languages.push({ id, name: data.name||'', level: data.level||'' });
  renderLangItems();
  commitChange();
}

function removeLangItem(id) {
  extras.languages = extras.languages.filter(l => l.id !== id);
  renderLangItems();
  commitChange();
}

function renderLangItems() {
  const list = $('langs-list');
  if (!extras.languages.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.languages.map(l => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${l.id}">
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <div class="fl-wrap" style="flex:1;">
          <input class="fl-input" data-field="name" data-id="${l.id}" value="${esc2(l.name)}" placeholder=" " />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_name')}</label>
        </div>
        <div class="fl-wrap" style="flex:1;">
          <input class="fl-input" data-field="level" data-id="${l.id}" value="${esc2(l.level)}" placeholder=" " />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_level')}</label>
        </div>
        <button class="btn-remove-entry" onclick="removeLangItem(${l.id})">×</button>
      </div>
    </div>`).join('');

  bindDelegated(list, extras.languages);
}

$('btn-add-lang-item').addEventListener('click', () => addLangItem());

// Interests
$('p-interests').addEventListener('input', () => {
  extras.interests = $('p-interests').value;
  commitChange();
});

// ── Publications ──────────────────────────────────────────────

function addPublication(data = {}) {
  const id = genId();
  publications.push({ id, title: data.title||'', authors: data.authors||'', venue: data.venue||'', date: data.date||'', url: data.url||'' });
  renderPublications();
  commitChange();
}

function removePublication(id) {
  publications = publications.filter(p => p.id !== id);
  renderPublications();
  commitChange();
}

function renderPublications() {
  const list = $('pub-list');
  if (!list) return;
  if (!publications.length) { list.innerHTML = ''; return; }
  list.innerHTML = publications.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(p.title) || t('pub_title')}</span>
        <button class="btn-remove-entry" onclick="removePublication(${p.id})">×</button>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <div class="fl-wrap">
          <input class="fl-input" data-field="title" data-id="${p.id}" value="${esc2(p.title)}" placeholder=" " />
          <label class="fl-label">${t('pub_title')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="authors" data-id="${p.id}" value="${esc2(p.authors)}" placeholder=" " />
          <label class="fl-label">${t('pub_authors')}</label>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="fl-wrap">
            <input class="fl-input" data-field="venue" data-id="${p.id}" value="${esc2(p.venue)}" placeholder=" " />
            <label class="fl-label">${t('pub_venue')}</label>
          </div>
          <div class="fl-wrap">
            <input type="month" class="fl-input" data-field="date" data-id="${p.id}" value="${p.date||''}" />
            <label class="fl-label">${t('pub_date')}</label>
          </div>
        </div>
        <div class="fl-wrap">
          <input type="url" class="fl-input" data-field="url" data-id="${p.id}" value="${esc2(p.url)}" placeholder=" " />
          <label class="fl-label">${t('pub_url')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, publications, (pub, field, el) => {
    if (field === 'title') refreshHeader(el, pub.title || t('pub_title'));
  });
}

$('btn-add-pub').addEventListener('click', () => addPublication());

// ── References ────────────────────────────────────────────────

function addReference(data = {}) {
  const id = genId();
  references.push({ id, name: data.name||'', title: data.title||'', company: data.company||'', email: data.email||'', phone: data.phone||'' });
  renderReferences();
  commitChange();
}

function removeReference(id) {
  references = references.filter(r => r.id !== id);
  renderReferences();
  commitChange();
}

function renderReferences() {
  const list = $('ref-list');
  if (!list) return;
  if (!references.length) { list.innerHTML = ''; return; }
  list.innerHTML = references.map(r => `
    <div class="entry-item" data-id="${r.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(r.name) || t('ref_name')}</span>
        <button class="btn-remove-entry" onclick="removeReference(${r.id})">×</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="fl-wrap">
          <input class="fl-input" data-field="name" data-id="${r.id}" value="${esc2(r.name)}" placeholder=" " />
          <label class="fl-label">${t('ref_name')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="title" data-id="${r.id}" value="${esc2(r.title)}" placeholder=" " />
          <label class="fl-label">${t('ref_title')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="company" data-id="${r.id}" value="${esc2(r.company)}" placeholder=" " />
          <label class="fl-label">${t('ref_company')}</label>
        </div>
        <div class="fl-wrap">
          <input type="email" class="fl-input" data-field="email" data-id="${r.id}" value="${esc2(r.email)}" placeholder=" " />
          <label class="fl-label">${t('ref_email')}</label>
        </div>
        <div class="fl-wrap">
          <input type="tel" class="fl-input" data-field="phone" data-id="${r.id}" value="${esc2(r.phone)}" placeholder=" " />
          <label class="fl-label">${t('ref_phone')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, references, (ref, field, el) => {
    if (field === 'name') refreshHeader(el, ref.name || t('ref_name'));
  });
}

$('btn-add-ref').addEventListener('click', () => addReference());

$('tog-references').addEventListener('change', () => {
  showReferencesToggle = $('tog-references').checked;
  commitChange();
});

// ── Design options ────────────────────────────────────────────

document.querySelectorAll('.tpl-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tpl-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    template = btn.dataset.tpl;
    commitChange();
  });
});

document.querySelectorAll('.color-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('custom-color').value = btn.dataset.color;
    setAccent(btn.dataset.color);
    commitChange();
  });
});

$('custom-color').addEventListener('input', e => {
  document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  setAccent(e.target.value);
  commitChange();
});

// ── Lazy font loader ──────────────────────────────────────────
// Only Inter is loaded at startup. Other fonts are injected on demand.
const FONT_URLS = {
  'Roboto':          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'Lato':            'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
  'Playfair Display':'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  'Poppins':         'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'Noto Sans Arabic':'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap',
};
const _loadedFonts = new Set(['Inter']);

function ensureFontLoaded(fontName) {
  if (_loadedFonts.has(fontName) || !FONT_URLS[fontName]) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONT_URLS[fontName];
  document.head.appendChild(link);
  _loadedFonts.add(fontName);
}

document.querySelectorAll('.font-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cvFont = btn.dataset.font;
    ensureFontLoaded(cvFont);
    commitChange();
  });
});

$('tog-photo').addEventListener('change', () => {
  showPhoto = $('tog-photo').checked;
  commitChange();
});

// ── Sliders ──────────────────────────────────────────────────
$('slider-font-size').addEventListener('input', e => {
  cvFontSize = parseInt(e.target.value, 10) / 100;
  $('val-font-size').textContent = e.target.value + '%';
  commitChange();
});
$('slider-spacing').addEventListener('input', e => {
  cvSpacing = parseInt(e.target.value, 10) / 100;
  $('val-spacing').textContent = e.target.value + '%';
  commitChange();
});
$('slider-sidebar-width').addEventListener('input', e => {
  cvSidebarWidth = parseInt(e.target.value, 10);
  $('val-sidebar-width').textContent = e.target.value + 'px';
  commitChange();
});

// ── Section toggles ──────────────────────────────────────────
const SECTION_KEYS = [
  { key: 'experience', labelKey: 'step_exp' },
  { key: 'education', labelKey: 'step_edu' },
  { key: 'skills', labelKey: 'step_skills' },
  { key: 'projects', labelKey: 'projects' },
  { key: 'volunteer', labelKey: 'volunteer' },
  { key: 'certifications', labelKey: 'certifications' },
  { key: 'languages', labelKey: 'languages' },
  { key: 'interests', labelKey: 'interests' },
  { key: 'publications', labelKey: 'publications' },
  { key: 'references', labelKey: 'references' },
];

function renderSectionToggles() {
  const container = $('section-toggles');
  if (!container) return;
  const items = [...SECTION_KEYS];
  // Add custom sections
  customSections.forEach((cs, i) => {
    items.push({ key: `custom_${i}`, label: cs.title || t('custom_section') + ' ' + (i + 1) });
  });
  container.innerHTML = items.map(s => {
    const checked = !hiddenSections[s.key] ? 'checked' : '';
    const label = s.label || t(s.labelKey);
    return `<label class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 py-0.5 cursor-pointer">
      <span>${esc(label)}</span>
      <input type="checkbox" ${checked} data-section-key="${s.key}" class="section-toggle accent-[var(--accent)]" />
    </label>`;
  }).join('');
  container.querySelectorAll('.section-toggle').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) delete hiddenSections[cb.dataset.sectionKey];
      else hiddenSections[cb.dataset.sectionKey] = true;
      commitChange();
    });
  });
}

// ── Preview ───────────────────────────────────────────────────

let previewTimer = null;

function renderPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(_doRenderPreview, 120);
}

// Post-process template HTML to apply customisation sliders
function postProcessTemplate(html) {
  // Fast path: nothing to transform when all sliders are at defaults
  const needsFontScale    = cvFontSize !== 1;
  const needsSpacingScale = cvSpacing !== 1;
  const needsSidebarScale = cvSidebarWidth !== 220;
  const needsRTL          = RTL_LANGS.includes(lang);
  if (!needsFontScale && !needsSpacingScale && !needsSidebarScale && !needsRTL) return html;

  let out = html;
  // Scale font sizes
  if (needsFontScale) {
    out = out.replace(/font-size:\s*([\d.]+)(rem|em|px)/g, (m, num, unit) => {
      return `font-size:${(parseFloat(num) * cvFontSize).toFixed(3)}${unit}`;
    });
  }
  // Scale spacing (margin, padding, gap)
  if (needsSpacingScale) {
    out = out.replace(/(margin(?:-top|-bottom|-left|-right)?|padding(?:-top|-bottom|-left|-right)?|gap|row-gap|column-gap):\s*([\d.]+)(rem|em|px)/g, (m, prop, num, unit) => {
      return `${prop}:${(parseFloat(num) * cvSpacing).toFixed(3)}${unit}`;
    });
  }
  // Sidebar width - replace common sidebar width patterns
  if (needsSidebarScale) {
    out = out.replace(/width:220px/g, `width:${cvSidebarWidth}px`);
    out = out.replace(/width:235px/g, `width:${cvSidebarWidth}px`);
  }
  // RTL: flip direction on the root flex container and text alignment
  if (needsRTL) {
    // Flip sidebar layout (flex-direction: row → row-reverse)
    out = out.replace(/display:\s*flex(?=[^"]*flex-shrink:0)/g, 'display:flex;flex-direction:row-reverse');
    // Add direction:rtl and text-align:right to the outermost container
    out = out.replace(/^(<div[^>]*style=")/, '$1direction:rtl;text-align:right;');
    // Flip bullet margins
    out = out.replace(/margin:0\.25rem 0 0 1rem/g, 'margin:0.25rem 1rem 0 0');
    out = out.replace(/margin-left:1rem/g, 'margin-right:1rem');
  }
  return out;
}

function _doRenderPreview() {
  collectProfile();
  const cv = buildCVState();
  cv.hiddenSections = hiddenSections;
  const page = $('cv-page');
  let html = renderTemplate(cv, template, accentColor, cvFont, t);
  html = postProcessTemplate(html);
  page.innerHTML = html;
  // Remove hidden sections from DOM
  const hidden = Object.keys(hiddenSections).filter(k => hiddenSections[k]);
  hidden.forEach(key => {
    page.querySelectorAll(`[data-section="${key}"]`).forEach(el => el.remove());
  });
  fixPageBreaks(page);
  injectContinuationHeaders(page, cv, accentColor);
  scalePreview();
}

// ── Page break fixer ─────────────────────────────────────────
// Inserts spacers before any cv-item that would be cut by a page boundary
// or fall under the continuation header zone (HEADER_H px after boundary).
// Uses offsetTop traversal (unaffected by CSS scale transform).
function fixPageBreaks(cvPageEl) {
  cvPageEl.querySelectorAll('.cv-page-spacer').forEach(el => el.remove());

  const A4H = 1123;
  const HEADER_H = 56;

  // Helper: get offsetTop relative to cvPageEl
  function relativeTop(el) {
    let top = 0;
    let node = el;
    while (node && node !== cvPageEl) {
      top += node.offsetTop;
      node = node.offsetParent;
      if (!node || !cvPageEl.contains(node)) return -1;
    }
    return top;
  }

  const candidates = Array.from(
    cvPageEl.querySelectorAll('.cv-item, li')
  ).filter(el => !el.closest('.cv-cont-header') && !el.closest('.cv-page-spacer'));

  // Snapshot all positions before any DOM mutation
  const snapshot = candidates.map(el => ({
    el,
    top: relativeTop(el),
    height: el.offsetHeight,
  })).filter(item => item.top >= 0 && item.height > 8);

  let extraAdded = 0;
  let nextBoundary = A4H;

  for (const item of snapshot) {
    const top = item.top + extraAdded;
    const bottom = top + item.height;

    // Advance to the relevant boundary
    while (top > nextBoundary + HEADER_H) {
      nextBoundary += A4H;
    }

    const zoneEnd = nextBoundary + HEADER_H;

    // Element crosses the boundary or starts inside the header zone
    if (top < zoneEnd && bottom > nextBoundary - 2) {
      const spacerH = Math.round(zoneEnd - top);
      if (spacerH > 0 && spacerH < A4H * 0.85) {
        const spacer = document.createElement('div');
        spacer.className = 'cv-page-spacer';
        spacer.style.cssText = `height:${spacerH}px;display:block;flex-shrink:0;`;
        item.el.parentNode.insertBefore(spacer, item.el);
        extraAdded += spacerH;
        nextBoundary += A4H;
      }
    }
  }
}

// ── Continuation page mini-header (à la MyInvoice) ───────────
// Injected at each A4 page boundary (1123px, 2246px, …) directly
// inside the cv-page element as position:absolute overlays.
function injectContinuationHeaders(cvPageEl, cv, accent) {
  cvPageEl.querySelectorAll('.cv-cont-header').forEach(el => el.remove());

  const A4H   = 1123;
  const actualH = cvPageEl.scrollHeight;
  const numPages = Math.ceil(actualH / A4H);
  if (numPages <= 1) return;

  const name  = cv.profile.name  || '';
  const title = cv.profile.title || '';
  const email = cv.profile.email || '';
  const phone = cv.profile.phone || '';

  // Photo thumbnail (if available)
  const photoHtml = (cv.profile.photoB64 && cv.showPhoto)
    ? `<img src="${cv.profile.photoB64}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="" />`
    : `<div style="width:28px;height:28px;border-radius:50%;background:${accent};
                  display:flex;align-items:center;justify-content:center;
                  font-size:11px;font-weight:700;color:#fff;flex-shrink:0;">
        ${name ? esc(name.charAt(0).toUpperCase()) : '✦'}
       </div>`;

  for (let i = 1; i < numPages; i++) {
    const el = document.createElement('div');
    el.className = 'cv-cont-header';
    el.style.cssText = `
      position:absolute;top:${i * A4H}px;left:0;right:0;
      height:56px;background:#ffffff;
      border-top:3px solid ${accent};
      border-bottom:1.5px solid ${accent}22;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 28px;z-index:50;box-sizing:border-box;
    `;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;min-width:0;overflow:hidden;">
        ${photoHtml}
        <div style="min-width:0;overflow:hidden;">
          ${name ? `<div style="font-size:12px;font-weight:700;color:#111;white-space:nowrap;">${esc(name)}</div>` : ''}
          ${title ? `<div style="font-size:9.5px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(title)}</div>` : ''}
        </div>
        ${email ? `<div style="font-size:8.5px;color:#888;white-space:nowrap;display:flex;align-items:center;gap:4px;">✉ ${esc(email)}</div>` : ''}
        ${phone ? `<div style="font-size:8.5px;color:#888;white-space:nowrap;display:flex;align-items:center;gap:4px;">✆ ${esc(phone)}</div>` : ''}
      </div>
      <div style="flex-shrink:0;font-size:10px;font-weight:600;color:${accent};margin-left:12px;">
        ${i + 1} / ${numPages}
      </div>
    `;
    cvPageEl.appendChild(el);
  }
}

function scalePreview() {
  const wrapper = document.querySelector('.preview-scale-container');
  if (!wrapper) return;
  const available = wrapper.clientWidth;
  const pageW = 794;
  const scale = Math.min(1, available / pageW);
  const page = $('cv-page');
  page.style.transform = `scale(${scale})`;
  page.style.transformOrigin = 'top center';
  page.style.marginLeft = 'auto';
  page.style.marginRight = 'auto';

  // Use actual rendered height (supports multi-page CVs)
  const actualH = page.scrollHeight;
  wrapper.style.height = (actualH * scale) + 'px';

  // Remove old page break lines
  wrapper.querySelectorAll('.cv-page-break-line').forEach(el => el.remove());

  // Inject visual page break lines between pages
  const A4H = 1123;
  const numPages = Math.ceil(actualH / A4H);
  for (let i = 1; i < numPages; i++) {
    const line = document.createElement('div');
    line.className = 'cv-page-break-line';
    line.style.top = (i * A4H * scale) + 'px';
    wrapper.appendChild(line);
  }

  // Update or create page counter badge
  let counter = wrapper.querySelector('.preview-page-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'preview-page-counter';
    wrapper.appendChild(counter);
  }
  counter.textContent = numPages > 1 ? `${numPages} pages` : '1 page';
}

window.addEventListener('resize', scalePreview);

function buildCVState() {
  return {
    profile: { ...profile },
    experiences: experiences.map(e => ({ ...e })),
    education: education.map(e => ({ ...e })),
    skills: skills.map(g => ({ ...g, items: [...g.items] })),
    projects: projects.map(p => ({ ...p })),
    volunteer: volunteer.map(v => ({ ...v })),
    customSections: customSections.map(s => ({ ...s, entries: s.entries.map(e => ({ ...e })) })),
    publications: publications.map(p => ({ ...p })),
    references: references.map(r => ({ ...r })),
    showReferencesToggle,
    extras: {
      certifications: extras.certifications.map(c => ({ ...c })),
      languages: extras.languages.map(l => ({ ...l })),
      interests: extras.interests,
    },
    showPhoto,
  };
}

// ── PDF Export ────────────────────────────────────────────────

async function downloadPDF() {
  collectProfile();
  showToast(t('pdf_generating'));
  await loadScript(LIBS.html2pdf);

  const name = (profile.name || 'cv').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
  const filename = `${name}-resume.pdf`;

  // Dark mode must be removed before capture (html2canvas won't apply dark CSS vars correctly)
  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');

  // Off-screen container: position:fixed top:-9999px (proven approach, avoids scroll/transform issues)
  const renderWrapper = document.createElement('div');
  renderWrapper.style.cssText = 'position:fixed;top:-9999px;left:0;width:794px;z-index:-9999;pointer-events:none;';

  const clone = $('cv-page').cloneNode(true);
  clone.style.cssText = 'width:794px;transform:none;transform-origin:top left;background:#ffffff;';
  renderWrapper.appendChild(clone);
  document.body.appendChild(renderWrapper);

  // Fix page breaks and inject continuation headers into the clone
  fixPageBreaks(clone);
  injectContinuationHeaders(clone, buildCVState(), accentColor);

  const PDF_TIMEOUT_MS = 30_000;
  try {
    const pdfPromise = html2pdf().set({
      margin: [0, 0, 0, 0],
      filename,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale: 4.5,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        x: 0,
        y: 0,
        width: 794,
        // No height — html2canvas auto-measures full content height for multi-page support
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }).from(clone).output('blob').then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('PDF timeout')), PDF_TIMEOUT_MS)
    );

    await Promise.race([pdfPromise, timeoutPromise]);

    showToast(t('pdf_done'));
    saveToHistory();
  } catch(err) {
    console.error(err);
    showToast('Erreur lors de la génération du PDF');
  } finally {
    document.body.removeChild(renderWrapper);
    if (wasDark) document.documentElement.classList.add('dark');
  }
}

// ── History ───────────────────────────────────────────────────

const HISTORY_KEY = 'iloveresume_history';

function exportStateForHistory() {
  // Strip photo from history entries — a photo can be 50-200KB,
  // and 20 entries × 150KB = 3MB which exhausts localStorage quota.
  // The photo remains in the active CV slot.
  const s = JSON.parse(exportState());
  if (s.profile) s.profile.photoB64 = '';
  return JSON.stringify(s);
}

function saveToHistory() {
  const history = getHistory();
  const list = getCVList();
  const activeCv = list.cvs.find(c => c.id === list.activeCvId);
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    name: profile.name || t('unnamed'),
    title: profile.title || '',
    template,
    cvId: list.activeCvId || null,
    cvName: activeCv?.name || null,
    state: exportStateForHistory(), // photo stripped
  };
  history.unshift(entry);
  const trimmed = history.slice(0, 20);
  safeSetItem(HISTORY_KEY, JSON.stringify(trimmed));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function renderHistoryModal() {
  const history = getHistory();
  const list = $('history-list');
  const empty = $('history-empty');
  if (!history.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = history.map(item => {
    const cvBadge = item.cvName
      ? `<span class="history-cv-badge">${esc2(item.cvName)}</span>`
      : '';
    return `
    <div class="history-item">
      <div>
        <div class="font-semibold text-sm">${esc2(item.name)} ${cvBadge}</div>
        <div class="text-xs text-gray-500">${esc2(item.title)} · ${new Date(item.date).toLocaleDateString(lang)} · ${item.template}</div>
      </div>
      <div class="history-item-actions">
        <button onclick="loadFromHistory(${item.id})" title="${t('load')}">${t('load')}</button>
        <button class="btn-del" onclick="deleteFromHistory(${item.id})" title="${t('delete')}">${t('delete')}</button>
      </div>
    </div>`;
  }).join('');
}

function loadFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;

  // With multi-CV: always load into a NEW cv slot to avoid silently
  // overwriting the current CV. The old single-CV behavior was a data-loss risk.
  clearTimeout(_saveTimer);
  _doSaveState(); // flush current immediately

  const list = getCVList();
  const newId = genCvId();
  const baseName = (entry.cvName || entry.name || t('unnamed'));
  const date = new Date(entry.date).toLocaleDateString(lang);
  list.cvs.push({ id: newId, name: `${baseName} (${date})`, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = newId;
  saveCVList(list);
  importState(entry.state);
  safeSetItem(CV_PREFIX + newId, entry.state);
  renderAll();
  syncDesignUI();
  renderAllTranslations();
  renderPreview();
  renderCVSelect();
  closeModal('modal-history');
  showToast(t('load') + ' ✓');
}

function duplicateFromHistory(id) {
  // Same as load — creates a new CV slot with the historical state
  loadFromHistory(id);
}

function deleteFromHistory(id) {
  let history = getHistory();
  history = history.filter(h => h.id !== id);
  safeSetItem(HISTORY_KEY, JSON.stringify(history));
  renderHistoryModal();
}

// ── State persistence ─────────────────────────────────────────

const STATE_KEY    = 'iloveresume_state';   // legacy single-CV key (kept for migration)
const CVLIST_KEY   = 'iloveresume_cvlist';  // multi-CV index
const CV_PREFIX    = 'iloveresume_cv_';     // per-CV state key prefix

function exportState() {
  return JSON.stringify({ profile, experiences, education, skills, projects, volunteer, customSections, publications, references, showReferencesToggle, extras, template, accentColor, cvFont, showPhoto, cvFontSize, cvSpacing, cvSidebarWidth, hiddenSections, lang });
}

// ── saveState — debounced (400ms), writes to active CV slot ───

let _saveTimer = null;
let _saveIndicatorTimer = null;

function saveState() {
  // Show indicator immediately for snappy feel
  const el = $('save-indicator');
  if (el) el.classList.add('visible');
  // Debounce the actual write
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(_doSaveState, 400);
}

function _doSaveState() {
  const json = exportState();
  const list = getCVList();
  if (list.activeCvId) {
    safeSetItem(CV_PREFIX + list.activeCvId, json);
    // Update timestamp in index
    const cv = list.cvs.find(c => c.id === list.activeCvId);
    if (cv) { cv.updatedAt = Date.now(); saveCVList(list); }
  } else {
    safeSetItem(STATE_KEY, json); // fallback
  }
  clearTimeout(_saveIndicatorTimer);
  _saveIndicatorTimer = setTimeout(() => {
    const el = $('save-indicator');
    if (el) el.classList.remove('visible');
  }, 2000);
}

// ── Multi-CV management ───────────────────────────────────────

function genCvId() {
  return 'cv-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function getCVList() {
  try {
    const raw = localStorage.getItem(CVLIST_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { activeCvId: null, cvs: [] };
}

function saveCVList(data) {
  safeSetItem(CVLIST_KEY, JSON.stringify(data));
}

function initMultiCV() {
  let list = getCVList();
  if (!list.cvs.length) {
    // First boot — migrate old single-CV if it exists
    const firstId = genCvId();
    const oldState = localStorage.getItem(STATE_KEY);
    list = {
      activeCvId: firstId,
      cvs: [{ id: firstId, name: 'Mon CV', createdAt: Date.now(), updatedAt: Date.now() }],
    };
    if (oldState) safeSetItem(CV_PREFIX + firstId, oldState);
    saveCVList(list);
  }
  // Load active CV state
  const saved = localStorage.getItem(CV_PREFIX + list.activeCvId);
  if (saved) importState(saved);
  renderCVSelect();
}

function renderCVSelect() {
  const list = getCVList();
  const sel = $('cv-select');
  if (!sel) return;
  sel.innerHTML = list.cvs.map(cv =>
    `<option value="${esc2(cv.id)}" ${cv.id === list.activeCvId ? 'selected' : ''}>${esc2(cv.name)}</option>`
  ).join('');
}

function switchCV(id) {
  clearTimeout(_saveTimer);
  _doSaveState(); // flush current immediately
  const list = getCVList();
  if (!list.cvs.find(c => c.id === id)) return;
  list.activeCvId = id;
  saveCVList(list);
  const saved = localStorage.getItem(CV_PREFIX + id);
  if (saved) {
    importState(saved);
  } else {
    resetState();
  }
  renderAll();
  syncDesignUI();
  renderAllTranslations();
  renderPreview();
  renderCVSelect();
}

function newCV() {
  clearTimeout(_saveTimer);
  _doSaveState();
  const list = getCVList();
  const id = genCvId();
  const name = `CV ${list.cvs.length + 1}`;
  list.cvs.push({ id, name, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = id;
  saveCVList(list);
  resetState();
  renderAll();
  syncDesignUI();
  renderPreview();
  renderCVSelect();
  showToast('✓ Nouveau CV créé');
}

function duplicateCurrentCV() {
  clearTimeout(_saveTimer);
  _doSaveState();
  const list = getCVList();
  const src = list.cvs.find(c => c.id === list.activeCvId);
  const id = genCvId();
  const name = src ? src.name + ' (copie)' : `CV ${list.cvs.length + 1}`;
  const stateJson = exportState();
  list.cvs.push({ id, name, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = id;
  safeSetItem(CV_PREFIX + id, stateJson);
  saveCVList(list);
  renderCVSelect();
  showToast('✓ CV dupliqué');
}

function deleteCurrentCV() {
  const list = getCVList();
  if (list.cvs.length <= 1) { showToast('Impossible de supprimer le seul CV'); return; }
  if (!confirm(`Supprimer "${list.cvs.find(c=>c.id===list.activeCvId)?.name || 'ce CV'}" ?`)) return;
  localStorage.removeItem(CV_PREFIX + list.activeCvId);
  list.cvs = list.cvs.filter(c => c.id !== list.activeCvId);
  list.activeCvId = list.cvs[0].id;
  saveCVList(list);
  const saved = localStorage.getItem(CV_PREFIX + list.activeCvId);
  if (saved) importState(saved); else resetState();
  renderAll();
  syncDesignUI();
  renderPreview();
  renderCVSelect();
  showToast('CV supprimé');
}

function renameCurrentCV(name) {
  const list = getCVList();
  const cv = list.cvs.find(c => c.id === list.activeCvId);
  if (cv && name.trim()) { cv.name = name.trim(); saveCVList(list); renderCVSelect(); }
}

// ── Reset state to blank CV defaults ─────────────────────────

function resetState() {
  profile = { name:'', title:'', summary:'', email:'', phone:'', city:'', linkedin:'', github:'', website:'', photoB64:'' };
  experiences = []; education = []; skills = []; projects = [];
  volunteer = []; customSections = []; publications = []; references = [];
  showReferencesToggle = true;
  extras = { certifications: [], languages: [], interests: '' };
  template = 'modern'; accentColor = '#4f6ef7'; cvFont = 'Inter';
  showPhoto = true; cvFontSize = 1; cvSpacing = 1; cvSidebarWidth = 220;
  hiddenSections = {};
  setAccent(accentColor);
  populateProfile();
}

function importState(json) {
  try {
    const s = typeof json === 'string' ? JSON.parse(json) : json;
    if (s.profile)        profile = s.profile;
    if (s.experiences)    experiences = s.experiences;
    if (s.education)      education = s.education;
    if (s.skills)         skills = s.skills;
    if (s.projects)       projects = s.projects;
    if (s.volunteer)      volunteer = s.volunteer;
    if (s.customSections) customSections = s.customSections;
    if (s.publications)   publications = s.publications;
    if (s.references)     references = s.references;
    if (typeof s.showReferencesToggle === 'boolean') showReferencesToggle = s.showReferencesToggle;
    if (s.extras)         extras = s.extras;
    if (s.template)     template = s.template;
    if (s.accentColor)  { accentColor = s.accentColor; setAccent(accentColor); }
    // Whitelist: only allow fonts that are actually loaded/loadable
    const ALLOWED_FONTS = ['Inter','Roboto','Lato','Playfair Display','Poppins','Noto Sans Arabic'];
    if (s.cvFont && ALLOWED_FONTS.includes(s.cvFont)) cvFont = s.cvFont;
    if (typeof s.showPhoto === 'boolean') showPhoto = s.showPhoto;
    if (typeof s.cvFontSize === 'number') cvFontSize = s.cvFontSize;
    if (typeof s.cvSpacing === 'number') cvSpacing = s.cvSpacing;
    if (typeof s.cvSidebarWidth === 'number') cvSidebarWidth = s.cvSidebarWidth;
    if (s.hiddenSections && typeof s.hiddenSections === 'object') hiddenSections = s.hiddenSections;
    if (s.lang && T[s.lang]) { lang = s.lang; }
    populateProfile();
    renderExperiences();
    renderEducation();
    renderSkills();
    renderProjects();
    renderVolunteer();
    renderCustomSections();
    renderPublications();
    renderReferences();
    renderCertifications();
    renderLangItems();
    $('p-interests').value = extras.interests || '';
    if ($('tog-references')) $('tog-references').checked = showReferencesToggle;
    syncDesignUI();
    renderAllTranslations();
    updateLangUI();
    renderPreview();
  } catch(e) {
    console.error('Import state error', e);
  }
}

function loadState() {
  const saved = localStorage.getItem(STATE_KEY);
  if (saved) importState(saved);
}

function syncDesignUI() {
  document.querySelectorAll('.tpl-pill').forEach(b => b.classList.toggle('active', b.dataset.tpl === template));
  document.querySelectorAll('.font-pill').forEach(b => b.classList.toggle('active', b.dataset.font === cvFont));
  const togPhoto = $('tog-photo'); if (togPhoto) togPhoto.checked = showPhoto;
  const customColor = $('custom-color'); if (customColor) customColor.value = accentColor;
  document.querySelectorAll('.color-dot').forEach(b => b.classList.toggle('active', b.dataset.color === accentColor));
  // Sliders
  const sliderFS = $('slider-font-size');
  if (sliderFS) { sliderFS.value = Math.round(cvFontSize * 100); $('val-font-size').textContent = Math.round(cvFontSize * 100) + '%'; }
  const sliderSp = $('slider-spacing');
  if (sliderSp) { sliderSp.value = Math.round(cvSpacing * 100); $('val-spacing').textContent = Math.round(cvSpacing * 100) + '%'; }
  const sliderSW = $('slider-sidebar-width');
  if (sliderSW) { sliderSW.value = cvSidebarWidth; $('val-sidebar-width').textContent = cvSidebarWidth + 'px'; }
  // Section toggles
  renderSectionToggles();
}

// ── Share by link ─────────────────────────────────────────────

async function buildShareUrl() {
  await loadScript(LIBS.pako);
  const json = exportState();
  const compressed = pako.deflate(new TextEncoder().encode(json));
  // Chunked encoding to avoid "Maximum call stack size exceeded" on large CVs
  let binary = '';
  for (let i = 0; i < compressed.length; i++) binary += String.fromCharCode(compressed[i]);
  const b64 = btoa(binary);
  const url = `${location.origin}${location.pathname}?cv=${encodeURIComponent(b64)}`;
  return url;
}

async function loadFromUrl() {
  const params = new URLSearchParams(location.search);
  const cv = params.get('cv');
  if (!cv) return false;
  try {
    await loadScript(LIBS.pako);
    const bytes = Uint8Array.from(atob(decodeURIComponent(cv)), c => c.charCodeAt(0));
    const json = new TextDecoder().decode(pako.inflate(bytes));
    importState(json);
    return true;
  } catch(e) {
    console.warn('Failed to load CV from URL', e);
    return false;
  }
}

async function renderShareModal() {
  const url = await buildShareUrl();
  $('share-url').value = url;
  $('share-copied').classList.add('hidden');
}

$('btn-copy-link').addEventListener('click', () => {
  const url = $('share-url').value;
  navigator.clipboard.writeText(url).then(() => {
    $('share-copied').classList.remove('hidden');
    showToast(t('link_copied'));
  }).catch(() => {
    $('share-url').select();
    document.execCommand('copy');
    $('share-copied').classList.remove('hidden');
  });
});

// ── Modals ────────────────────────────────────────────────────

function openModal(id) {
  $(id).classList.remove('hidden');
}

function closeModal(id) {
  $(id).classList.add('hidden');
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(modal.id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => closeModal(m.id));
  }
});

// ── Button bindings ───────────────────────────────────────────

// ── CV Switcher bindings ──────────────────────────────────────

$('cv-select').addEventListener('change', e => switchCV(e.target.value));

$('btn-new-cv').addEventListener('click', () => newCV());

$('btn-dup-cv').addEventListener('click', () => duplicateCurrentCV());

$('btn-rename-cv').addEventListener('click', () => {
  const list = getCVList();
  const current = list.cvs.find(c => c.id === list.activeCvId);
  const name = prompt('Nouveau nom du CV :', current?.name || '');
  if (name !== null) renameCurrentCV(name);
});

$('btn-delete-cv').addEventListener('click', () => deleteCurrentCV());

$('btn-lang').addEventListener('click', () => {
  renderLangModal();
  openModal('modal-lang');
});

$('btn-history').addEventListener('click', () => {
  renderHistoryModal();
  openModal('modal-history');
});

$('btn-share').addEventListener('click', () => {
  renderShareModal();
  openModal('modal-share');
});

$('btn-dark').addEventListener('click', toggleDark);

$('btn-pdf').addEventListener('click', downloadPDF);

// ── Save / Import JSON ────────────────────────────────────────

$('btn-save-json').addEventListener('click', () => {
  const json = exportState();
  const now = new Date();
  const ss = String(now.getSeconds()).padStart(2, '0');
  const aa = String(now.getMinutes()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const jj = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const stamp = `${ss}${aa}${hh}${mm}${jj}${yyyy}`;
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `iloveresume_cv_${stamp}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast(T[lang]?.saved_json || 'CV sauvegardé ✓');
});

$('json-file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      importState(ev.target.result);
      commitChange();
      showToast(T[lang]?.imported_json || 'CV importé ✓');
    } catch {
      showToast(T[lang]?.import_error || 'Fichier invalide');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});


// ── Profile auto-save on input ────────────────────────────────

['p-name','p-title','p-summary','p-email','p-phone','p-city','p-linkedin','p-github','p-website'].forEach(id => {
  const el = $(id);
  if (el) el.addEventListener('input', () => { collectProfile(); });
});

// ── Keyboard shortcuts ────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'd') { e.preventDefault(); downloadPDF(); }
    if (e.key === 's') { e.preventDefault(); saveState(); showToast('✓ ' + t('saved_indicator')); }
  }
});

// ── Escape helper for HTML attributes ────────────────────────

// esc2 is an alias for esc() defined in templates.js (same global scope, loaded before app.js)
const esc2 = esc;

// ── Render all dynamic lists ──────────────────────────────────

function renderAll() {
  renderExperiences();
  renderEducation();
  renderSkills();
  renderProjects();
  renderVolunteer();
  renderCustomSections();
  renderPublications();
  renderReferences();
  renderCertifications();
  renderLangItems();
}

// renderCV() removed — use commitChange() (saveState + renderPreview) instead

// ── Mobile Preview ───────────────────────────────────────────

function openMobilePreview() {
  renderPreview();
  const container = $('mobile-cv-container');
  if (!container) return;
  const page = $('cv-page');
  const clone = page.cloneNode(true);
  clone.id = '';
  clone.style.transform = 'none';
  clone.style.transformOrigin = 'top left';

  container.innerHTML = '';
  container.appendChild(clone);

  // Scale to fit container width
  const cw = container.clientWidth || window.innerWidth - 32;
  const scale = Math.min(1, cw / 794);
  clone.style.transform = `scale(${scale})`;
  clone.style.transformOrigin = 'top left';
  container.style.height = (clone.scrollHeight * scale) + 'px';

  openModal('modal-mobile-preview');

  // Re-scale after modal is visible
  requestAnimationFrame(() => {
    const cw2 = container.clientWidth || window.innerWidth - 32;
    const scale2 = Math.min(1, cw2 / 794);
    clone.style.transform = `scale(${scale2})`;
    container.style.height = (clone.scrollHeight * scale2) + 'px';
  });
}

function closeMobilePreview() {
  closeModal('modal-mobile-preview');
}

// ── Init ──────────────────────────────────────────────────────

// ── Drag-and-drop (SortableJS) ────────────────────────────────

function initSortable() {
  if (typeof Sortable === 'undefined') return;

  // Experiences
  const expList = $('exp-list');
  if (expList) Sortable.create(expList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(expList, experiences, 'exp'); commitChange(); }
  });

  // Education
  const eduList = $('edu-list');
  if (eduList) Sortable.create(eduList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(eduList, education, 'edu'); commitChange(); }
  });

  // Skills
  const skillsList = $('skills-list');
  if (skillsList) Sortable.create(skillsList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(skillsList, skills, 'skill'); commitChange(); }
  });

  // Projects
  const projList = $('project-list');
  if (projList) Sortable.create(projList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(projList, projects, 'proj'); commitChange(); }
  });

  // Volunteer
  const volList = $('volunteer-list');
  if (volList) Sortable.create(volList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(volList, volunteer, 'vol'); commitChange(); }
  });

  // Publications
  const pubList = $('pub-list');
  if (pubList) Sortable.create(pubList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(pubList, publications, 'pub'); commitChange(); }
  });
}

function reorderFromDOM(listEl, arr) {
  const ids = Array.from(listEl.children).map(el => parseFloat(el.dataset.id)).filter(id => !isNaN(id));
  const reordered = [];
  ids.forEach(id => {
    const item = arr.find(x => x.id === id);
    if (item) reordered.push(item);
  });
  arr.length = 0;
  reordered.forEach(item => arr.push(item));
}

// ── ATS button binding ────────────────────────────────────────

$('btn-ats').addEventListener('click', () => {
  openModal('modal-ats');
});

$('btn-ats-analyze').addEventListener('click', () => {
  const jobDesc = $('ats-job-desc').value.trim();
  if (!jobDesc) return;
  collectProfile();
  const cv = buildCVState();
  if (typeof calculateATSScore === 'function') {
    const result = calculateATSScore(cv, jobDesc, t);
    $('ats-score-num').textContent = result.score;
    $('ats-score-num').style.color = result.score >= 70 ? '#10b981' : result.score >= 40 ? '#f59e0b' : '#ef4444';

    $('ats-suggestions-list').innerHTML = result.suggestions.map(s => {
      let text = '';
      if (s.type === 'keywords') {
        text = t('ats_add_keywords', 'Add these keywords to your CV') + ': ' + s.keywords.join(', ');
      } else if (s.type === 'section') {
        const sn = { summary: t('ats_sec_summary', 'Professional summary'), experience: t('ats_sec_experience', 'Work experience'), skills: t('ats_sec_skills', 'Skills'), education: t('ats_sec_education', 'Education'), header: t('ats_sec_header', 'Name & job title') };
        text = t('ats_add_section', 'Add or complete section') + ': ' + (sn[s.section] || s.section);
      } else if (s.type === 'format') {
        const fm = { special_chars: t('ats_fmt_chars', 'Remove special characters'), date_format: t('ats_fmt_date', 'Use consistent date format (YYYY-MM)'), summary_long: t('ats_fmt_summary_long', 'Shorten your summary'), summary_short: t('ats_fmt_summary_short', 'Expand your summary'), bullet_long: t('ats_fmt_bullet', 'Shorten bullet points'), few_bullets: t('ats_fmt_few', 'Add more bullet points'), no_contact: t('ats_fmt_contact', 'Add email or phone number') };
        text = fm[s.issue] || s.issue;
      }
      const icon = s.priority === 'high' ? '🔴' : '🟡';
      return `<div class="ats-suggestion"><span>${icon}</span><span>${text}</span></div>`;
    }).join('');

    $('ats-matched-list').innerHTML = result.matchedKeywords.map(k =>
      `<span class="ats-tag ats-tag-match">${k}</span>`
    ).join('');

    $('ats-missing-list').innerHTML = result.missingKeywords.map(k =>
      `<span class="ats-tag ats-tag-miss">${k}</span>`
    ).join('');

    $('ats-results').classList.remove('hidden');
  }
});

// ── Screen reader announcer ───────────────────────────────────

function announce(msg) {
  const el = $('sr-announcer');
  if (el) { el.textContent = ''; requestAnimationFrame(() => { el.textContent = msg; }); }
}

// ── Init ──────────────────────────────────────────────────────

async function init() {
  initDark();
  initLang();
  renderAllTranslations();

  const loadedFromUrl = await loadFromUrl();
  if (!loadedFromUrl) initMultiCV();
  else renderCVSelect(); // URL import: still render select with existing CVs

  // Ensure the saved font is loaded
  ensureFontLoaded(cvFont);

  populateProfile();
  renderAll();

  goToStep(0);
  renderPreview();

  // Lazy load SortableJS then init
  loadScript(LIBS.sortable).then(() => initSortable());

  // Lazy load feature modules
  loadScript('ats.js');
  loadScript('content-library.js');

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
