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
    summary: 'Résumé / Accroche', phone: 'Téléphone', city: 'Ville / Pays',
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
    save_json: 'Sauvegarder', import_json: 'Importer un CV', saved_json: 'CV sauvegardé ✓', imported_json: 'CV importé ✓', import_error: 'Fichier invalide',
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
  },
  en: {
    step_profile: 'Profile', step_exp: 'Experience', step_edu: 'Education',
    step_skills: 'Skills', step_extras: 'Extras',
    full_name: 'Full name *', job_title: 'Job title *',
    summary: 'Summary / Headline', phone: 'Phone', city: 'City / Country',
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
    save_json: 'Save', import_json: 'Import a CV', saved_json: 'CV saved ✓', imported_json: 'CV imported ✓', import_error: 'Invalid file',
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
  },
  de: {
    step_profile: 'Profil', step_exp: 'Erfahrung', step_edu: 'Ausbildung',
    step_skills: 'Fähigkeiten', step_extras: 'Extras',
    full_name: 'Vollständiger Name *', job_title: 'Berufsbezeichnung *',
    summary: 'Zusammenfassung', phone: 'Telefon', city: 'Stadt / Land',
    website: 'Webseite', add_photo: 'Foto hinzufügen', remove_photo: 'Foto entfernen',
    add_experience: 'Erfahrung hinzufügen', add_education: 'Ausbildung hinzufügen',
    add_skill_group: 'Kategorie hinzufügen', add_certification: 'Hinzufügen',
    add_language: 'Sprache hinzufügen', certifications: 'Zertifikate',
    languages: 'Sprachen', interests: 'Interessen',
    interests_placeholder: 'Reisen, Fotografie, Sport… (kommagetrennt)',
    design_options: 'Design & Optionen', template: 'Vorlage',
    tpl_modern: 'Modern', tpl_classic: 'Klassisch', tpl_bold: 'Fett', tpl_compact: 'Kompakt',
    accent_color: 'Akzentfarbe', font: 'Schriftart',
    show_photo: 'Foto im Lebenslauf anzeigen',
    previous: '← Zurück', next: 'Weiter →',
    history: 'Verlauf', share: 'Teilen', download: 'PDF herunterladen',
    save_json: 'Speichern', import_json: 'CV importieren', saved_json: 'CV gespeichert ✓', imported_json: 'CV importiert ✓', import_error: 'Ungültige Datei',
    persist_tip: 'Speichern Sie Ihren Lebenslauf als JSON, um ihn später – auch Monate danach – wiederzufinden und zu bearbeiten.',
    history_empty: 'Keine Lebensläufe im Verlauf', share_title: 'Lebenslauf teilen',
    share_desc: 'Dieser Link enthält alle Ihre Daten. Es werden keine Daten an einen Server gesendet.',
    copy_link: 'Kopieren', link_copied: '✓ Link kopiert!',
    preview_placeholder: 'Füllen Sie das Formular aus, um Ihren Lebenslauf zu sehen',
    select_language: 'Sprache auswählen', contact: 'Kontakt',
    company: 'Unternehmen', role: 'Position', start_date: 'Startdatum', end_date: 'Enddatum',
    current_position: 'Aktuelle Stelle', description: 'Beschreibung / Stichpunkte (einer pro Zeile)',
    school: 'Schule / Universität', degree: 'Abschluss', field: 'Fachrichtung', grade: 'Note',
    skill_category: 'Kategorie (z.B. Sprachen, Tools…)',
    skill_items: 'Fähigkeiten (kommagetrennt)',
    cert_name: 'Zertifikatname', cert_issuer: 'Aussteller', cert_date: 'Datum',
    lang_name: 'Sprache', lang_level: 'Niveau (z.B. Muttersprache, B2)',
    load: 'Laden', duplicate: 'Duplizieren', delete: 'Löschen',
    pdf_generating: 'PDF wird erstellt…', pdf_done: 'PDF heruntergeladen!',
    present: 'Aktuell', unnamed: 'Unbenannt',
    demo_title: 'Beispieldaten', demo_desc: 'ersetzen Sie sie durch Ihre', demo_clear: 'Alles löschen',
    projects: 'Projekte', add_project: 'Projekt hinzufügen', project_name: 'Projektname',
    project_description: 'Beschreibung', project_url: 'Projekt-URL', project_tech: 'Verwendete Technologien',
    volunteer: 'Ehrenamt', add_volunteer: 'Ehrenamtliche Tätigkeit hinzufügen',
    volunteer_org: 'Organisation', volunteer_role: 'Rolle',
    custom_section: 'Benutzerdefinierter Abschnitt', add_custom_section: 'Abschnitt hinzufügen',
    custom_section_title: 'Abschnittstitel', custom_entry_title: 'Titel', custom_entry_subtitle: 'Untertitel',
    custom_entry_date: 'Datum', custom_entry_desc: 'Beschreibung', add_custom_entry: 'Eintrag hinzufügen',
    saved_indicator: 'Gespeichert', preview_cv: 'Lebenslauf ansehen',
  },
  es: {
    step_profile: 'Perfil', step_exp: 'Experiencia', step_edu: 'Formación',
    step_skills: 'Habilidades', step_extras: 'Extras',
    full_name: 'Nombre completo *', job_title: 'Título / Puesto *',
    summary: 'Resumen / Titular', phone: 'Teléfono', city: 'Ciudad / País',
    website: 'Sitio web', add_photo: 'Añadir foto', remove_photo: 'Eliminar foto',
    add_experience: 'Añadir experiencia', add_education: 'Añadir formación',
    add_skill_group: 'Añadir categoría', add_certification: 'Añadir',
    add_language: 'Añadir idioma', certifications: 'Certificaciones',
    languages: 'Idiomas', interests: 'Intereses',
    interests_placeholder: 'Viajes, Fotografía, Deporte… (separados por coma)',
    design_options: 'Diseño & Opciones', template: 'Plantilla',
    tpl_modern: 'Moderno', tpl_classic: 'Clásico', tpl_bold: 'Negrita', tpl_compact: 'Compacto',
    accent_color: 'Color de acento', font: 'Fuente',
    show_photo: 'Mostrar foto en el CV',
    previous: '← Anterior', next: 'Siguiente →',
    history: 'Historial', share: 'Compartir', download: 'Descargar PDF',
    save_json: 'Guardar', import_json: 'Importar un CV', saved_json: 'CV guardado ✓', imported_json: 'CV importado ✓', import_error: 'Archivo inválido',
    persist_tip: 'Guarda tu CV en JSON para recuperarlo y actualizarlo más tarde, incluso meses después.',
    history_empty: 'Sin currículums en el historial', share_title: 'Compartir tu CV',
    share_desc: 'Este enlace contiene todos los datos de tu CV. No se envían datos a ningún servidor.',
    copy_link: 'Copiar', link_copied: '✓ ¡Enlace copiado!',
    preview_placeholder: 'Rellena el formulario para ver tu CV',
    select_language: 'Seleccionar idioma', contact: 'Contacto',
    company: 'Empresa', role: 'Puesto', start_date: 'Fecha inicio', end_date: 'Fecha fin',
    current_position: 'Puesto actual', description: 'Descripción / Puntos clave (uno por línea)',
    school: 'Centro / Universidad', degree: 'Título', field: 'Área de estudio', grade: 'Nota',
    skill_category: 'Categoría (ej: Lenguajes, Herramientas…)',
    skill_items: 'Habilidades (separadas por coma)',
    cert_name: 'Nombre de certificación', cert_issuer: 'Entidad', cert_date: 'Fecha',
    lang_name: 'Idioma', lang_level: 'Nivel (ej: Nativo, B2)',
    load: 'Cargar', duplicate: 'Duplicar', delete: 'Eliminar',
    pdf_generating: 'Generando PDF…', pdf_done: '¡PDF descargado!',
    present: 'Actualidad', unnamed: 'Sin título',
    demo_title: 'Datos de ejemplo', demo_desc: 'reemplácelos con los suyos', demo_clear: 'Borrar todo',
    projects: 'Proyectos', add_project: 'Añadir proyecto', project_name: 'Nombre del proyecto',
    project_description: 'Descripción', project_url: 'URL del proyecto', project_tech: 'Tecnologías utilizadas',
    volunteer: 'Voluntariado', add_volunteer: 'Añadir experiencia voluntaria',
    volunteer_org: 'Organización', volunteer_role: 'Rol',
    custom_section: 'Sección personalizada', add_custom_section: 'Añadir sección personalizada',
    custom_section_title: 'Título de la sección', custom_entry_title: 'Título', custom_entry_subtitle: 'Subtítulo',
    custom_entry_date: 'Fecha', custom_entry_desc: 'Descripción', add_custom_entry: 'Añadir entrada',
    saved_indicator: 'Guardado', preview_cv: 'Ver mi CV',
  },
};

function flagImg(country, alt) {
  return `<img src="https://flagcdn.com/w40/${country}.png" alt="${alt}" style="width:20px;height:14px;object-fit:cover;border-radius:2px;display:inline-block;vertical-align:middle;">`;
}

const LANGS = [
  { code: 'fr', label: 'Français', flag: flagImg('fr','FR') },
  { code: 'en', label: 'English',  flag: flagImg('gb','GB') },
  { code: 'de', label: 'Deutsch',  flag: flagImg('de','DE') },
  { code: 'es', label: 'Español',  flag: flagImg('es','ES') },
];

// ── State ─────────────────────────────────────────────────────

let lang = 'fr';
let template = 'modern';
let accentColor = '#4f6ef7';
let cvFont = 'Inter';
let showPhoto = true;
let currentStep = 0;

let profile = { name:'', title:'', summary:'', email:'', phone:'', city:'', linkedin:'', github:'', website:'', photoB64:'' };
let experiences = [];
let education = [];
let skills = [];
let projects = [];
let volunteer = [];
let customSections = [];
let extras = { certifications: [], languages: [], interests: '' };

// ── Utilities ─────────────────────────────────────────────────

const $ = id => document.getElementById(id);
const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
const t = k => (T[lang] && T[lang][k]) ? T[lang][k] : (T.fr[k] || k);

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
  localStorage.setItem('iloveresume_dark', isDark ? '1' : '0');
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  $('icon-moon').classList.toggle('hidden', isDark);
  $('icon-sun').classList.toggle('hidden', !isDark);
}

// ── Language ──────────────────────────────────────────────────

function initLang() {
  const saved = localStorage.getItem('iloveresume_lang');
  if (saved && T[saved]) lang = saved;
  updateLangUI();
}

function setLang(code) {
  if (!T[code]) return;
  lang = code;
  localStorage.setItem('iloveresume_lang', code);
  updateLangUI();
  renderAllTranslations();
  renderPreview();
  closeModal('modal-lang');
}

function updateLangUI() {
  const l = LANGS.find(x => x.code === lang) || LANGS[0];
  $('lang-flag').innerHTML = l.flag;
  $('lang-label').textContent = l.label;
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
  saveState();
  renderPreview();
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

$('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    profile.photoB64 = ev.target.result;
    updatePhotoUI();
    saveState();
    renderPreview();
  };
  reader.readAsDataURL(file);
});

$('btn-remove-photo').addEventListener('click', () => {
  profile.photoB64 = '';
  $('photo-input').value = '';
  updatePhotoUI();
  saveState();
  renderPreview();
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
  const id = Date.now() + Math.random();
  experiences.push({ id, company: data.company||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', current: data.current||false, bullets: data.bullets||'' });
  renderExperiences();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e.id !== id);
  renderExperiences();
  saveState();
  renderPreview();
}

function renderExperiences() {
  const list = $('exp-list');
  if (!experiences.length) { list.innerHTML = ''; return; }
  list.innerHTML = experiences.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span>${e.role || t('role')} ${e.company ? '@ '+e.company : ''}</span>
        <button class="btn-remove-entry" onclick="removeExperience(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input exp-role" value="${esc2(e.role)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('role')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input exp-company" value="${esc2(e.company)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('company')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input exp-start" value="${e.startDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input exp-end" value="${e.endDate||''}" data-id="${e.id}" ${e.current ? 'disabled' : ''} />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;cursor:pointer;">
        <input type="checkbox" class="exp-current" data-id="${e.id}" ${e.current ? 'checked' : ''} />
        ${t('current_position')}
      </label>
      <textarea class="bullets-input exp-bullets" placeholder="${t('description')}" data-id="${e.id}">${esc2(e.bullets)}</textarea>
    </div>`).join('');

  // Events
  list.querySelectorAll('.exp-role').forEach(el => el.addEventListener('input', onExpChange));
  list.querySelectorAll('.exp-company').forEach(el => el.addEventListener('input', onExpChange));
  list.querySelectorAll('.exp-start').forEach(el => el.addEventListener('change', onExpChange));
  list.querySelectorAll('.exp-end').forEach(el => el.addEventListener('change', onExpChange));
  list.querySelectorAll('.exp-current').forEach(el => el.addEventListener('change', onExpCurrentChange));
  list.querySelectorAll('.exp-bullets').forEach(el => el.addEventListener('input', onExpChange));
}

function onExpChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const exp = experiences.find(x => x.id === id);
  if (!exp) return;
  const cls = e.target.classList;
  if (cls.contains('exp-role')) exp.role = e.target.value;
  else if (cls.contains('exp-company')) exp.company = e.target.value;
  else if (cls.contains('exp-start')) exp.startDate = e.target.value;
  else if (cls.contains('exp-end')) exp.endDate = e.target.value;
  else if (cls.contains('exp-bullets')) exp.bullets = e.target.value;

  // Update header label
  const item = e.target.closest('.entry-item');
  if (item) {
    const header = item.querySelector('.entry-header span');
    if (header) header.textContent = `${exp.role || t('role')} ${exp.company ? '@ '+exp.company : ''}`;
  }
  saveState();
  renderPreview();
}

function onExpCurrentChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const exp = experiences.find(x => x.id === id);
  if (!exp) return;
  exp.current = e.target.checked;
  const item = e.target.closest('.entry-item');
  if (item) {
    const endInput = item.querySelector('.exp-end');
    if (endInput) endInput.disabled = exp.current;
  }
  saveState();
  renderPreview();
}

$('btn-add-exp').addEventListener('click', () => {
  addExperience();
});

// ── Education ─────────────────────────────────────────────────

function addEducation(data = {}) {
  const id = Date.now() + Math.random();
  education.push({ id, school: data.school||'', degree: data.degree||'', field: data.field||'', startDate: data.startDate||'', endDate: data.endDate||'', grade: data.grade||'' });
  renderEducation();
}

function removeEducation(id) {
  education = education.filter(e => e.id !== id);
  renderEducation();
  saveState();
  renderPreview();
}

function renderEducation() {
  const list = $('edu-list');
  if (!education.length) { list.innerHTML = ''; return; }
  list.innerHTML = education.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span>${e.degree || t('degree')} ${e.school ? '· '+e.school : ''}</span>
        <button class="btn-remove-entry" onclick="removeEducation(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-degree" value="${esc2(e.degree)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('degree')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-field" value="${esc2(e.field)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('field')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-school" value="${esc2(e.school)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('school')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input edu-start" value="${e.startDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input edu-end" value="${e.endDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-grade" value="${esc2(e.grade)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('grade')}</label>
      </div>
    </div>`).join('');

  list.querySelectorAll('.edu-degree,.edu-field,.edu-school,.edu-start,.edu-end,.edu-grade')
    .forEach(el => el.addEventListener('input', onEduChange));
  list.querySelectorAll('.edu-start,.edu-end')
    .forEach(el => el.addEventListener('change', onEduChange));
}

function onEduChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const edu = education.find(x => x.id === id);
  if (!edu) return;
  const cls = e.target.classList;
  if (cls.contains('edu-degree')) edu.degree = e.target.value;
  else if (cls.contains('edu-field')) edu.field = e.target.value;
  else if (cls.contains('edu-school')) edu.school = e.target.value;
  else if (cls.contains('edu-start')) edu.startDate = e.target.value;
  else if (cls.contains('edu-end')) edu.endDate = e.target.value;
  else if (cls.contains('edu-grade')) edu.grade = e.target.value;

  const item = e.target.closest('.entry-item');
  if (item) {
    const header = item.querySelector('.entry-header span');
    if (header) header.textContent = `${edu.degree || t('degree')} ${edu.school ? '· '+edu.school : ''}`;
  }
  saveState();
  renderPreview();
}

$('btn-add-edu').addEventListener('click', () => addEducation());

// ── Skills ────────────────────────────────────────────────────

function addSkillGroup(data = {}) {
  const id = Date.now() + Math.random();
  skills.push({ id, category: data.category||'', items: data.items||[] });
  renderSkills();
}

function removeSkillGroup(id) {
  skills = skills.filter(s => s.id !== id);
  renderSkills();
  saveState();
  renderPreview();
}

function addSkillTag(groupId, value) {
  const group = skills.find(s => s.id === groupId);
  if (!group || !value.trim()) return;
  const tags = value.split(',').map(v => v.trim()).filter(Boolean);
  tags.forEach(tag => { if (!group.items.includes(tag)) group.items.push(tag); });
  renderSkills();
  saveState();
  renderPreview();
}

function removeSkillTag(groupId, tag) {
  const group = skills.find(s => s.id === groupId);
  if (!group) return;
  group.items = group.items.filter(i => i !== tag);
  renderSkills();
  saveState();
  renderPreview();
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
        <input type="text" class="fl-input skill-cat" value="${esc2(g.category)}" placeholder=" " data-id="${g.id}" />
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

  list.querySelectorAll('.skill-cat').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const group = skills.find(s => s.id === id);
    if (group) {
      group.category = e.target.value;
      const header = e.target.closest('.entry-item').querySelector('.entry-header span');
      if (header) header.textContent = e.target.value || t('skill_category');
    }
    saveState(); renderPreview();
  }));

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
  const id = Date.now() + Math.random();
  projects.push({ id, name: data.name||'', description: data.description||'', url: data.url||'', tech: data.tech||'' });
  renderProjects();
}

function removeProject(id) {
  projects = projects.filter(p => p.id !== id);
  renderProjects();
  saveState(); renderPreview();
}

function renderProjects() {
  const list = $('project-list');
  if (!list) return;
  if (!projects.length) { list.innerHTML = ''; return; }
  list.innerHTML = projects.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span>${p.name || t('project_name')}</span>
        <button class="btn-remove-entry" onclick="removeProject(${p.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input proj-name" value="${esc2(p.name)}" placeholder=" " data-id="${p.id}" />
        <label class="fl-label">${t('project_name')}</label>
      </div>
      <div class="fl-wrap">
        <textarea class="bullets-input proj-desc" placeholder="${t('project_description')}" data-id="${p.id}">${esc2(p.description)}</textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="url" class="fl-input proj-url" value="${esc2(p.url)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('project_url')}</label>
        </div>
        <div class="fl-wrap">
          <input type="text" class="fl-input proj-tech" value="${esc2(p.tech)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('project_tech')}</label>
        </div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.proj-name,.proj-desc,.proj-url,.proj-tech').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const proj = projects.find(x => x.id === id);
    if (!proj) return;
    const cls = e.target.classList;
    if (cls.contains('proj-name')) { proj.name = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = proj.name || t('project_name'); }
    else if (cls.contains('proj-desc')) proj.description = e.target.value;
    else if (cls.contains('proj-url')) proj.url = e.target.value;
    else if (cls.contains('proj-tech')) proj.tech = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-project')?.addEventListener('click', () => addProject());

// ── Volunteer ────────────────────────────────────────────────

function addVolunteer(data = {}) {
  const id = Date.now() + Math.random();
  volunteer.push({ id, org: data.org||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', description: data.description||'' });
  renderVolunteer();
}

function removeVolunteer(id) {
  volunteer = volunteer.filter(v => v.id !== id);
  renderVolunteer();
  saveState(); renderPreview();
}

function renderVolunteer() {
  const list = $('volunteer-list');
  if (!list) return;
  if (!volunteer.length) { list.innerHTML = ''; return; }
  list.innerHTML = volunteer.map(v => `
    <div class="entry-item" data-id="${v.id}">
      <div class="entry-header">
        <span>${v.role || t('volunteer_role')} ${v.org ? '@ '+v.org : ''}</span>
        <button class="btn-remove-entry" onclick="removeVolunteer(${v.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input vol-role" value="${esc2(v.role)}" placeholder=" " data-id="${v.id}" />
        <label class="fl-label">${t('volunteer_role')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input vol-org" value="${esc2(v.org)}" placeholder=" " data-id="${v.id}" />
        <label class="fl-label">${t('volunteer_org')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input vol-start" value="${v.startDate||''}" data-id="${v.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input vol-end" value="${v.endDate||''}" data-id="${v.id}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <textarea class="bullets-input vol-desc" placeholder="${t('description')}" data-id="${v.id}">${esc2(v.description)}</textarea>
    </div>`).join('');

  list.querySelectorAll('.vol-role,.vol-org,.vol-start,.vol-end,.vol-desc').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const vol = volunteer.find(x => x.id === id);
    if (!vol) return;
    const cls = e.target.classList;
    if (cls.contains('vol-role')) { vol.role = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = `${vol.role || t('volunteer_role')} ${vol.org ? '@ '+vol.org : ''}`; }
    else if (cls.contains('vol-org')) { vol.org = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = `${vol.role || t('volunteer_role')} ${vol.org ? '@ '+vol.org : ''}`; }
    else if (cls.contains('vol-start')) vol.startDate = e.target.value;
    else if (cls.contains('vol-end')) vol.endDate = e.target.value;
    else if (cls.contains('vol-desc')) vol.description = e.target.value;
    saveState(); renderPreview();
  }));
  list.querySelectorAll('.vol-start,.vol-end').forEach(el => el.addEventListener('change', el.dispatchEvent.bind(el, new Event('input'))));
}

$('btn-add-volunteer')?.addEventListener('click', () => addVolunteer());

// ── Custom Sections ──────────────────────────────────────────

function addCustomSection(data = {}) {
  const id = Date.now() + Math.random();
  customSections.push({ id, title: data.title||'', entries: data.entries||[] });
  renderCustomSections();
}

function removeCustomSection(id) {
  customSections = customSections.filter(s => s.id !== id);
  renderCustomSections();
  saveState(); renderPreview();
}

function addCustomEntry(sectionId, data = {}) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  const id = Date.now() + Math.random();
  section.entries.push({ id, title: data.title||'', subtitle: data.subtitle||'', date: data.date||'', description: data.description||'' });
  renderCustomSections();
  saveState(); renderPreview();
}

function removeCustomEntry(sectionId, entryId) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  section.entries = section.entries.filter(e => e.id !== entryId);
  renderCustomSections();
  saveState(); renderPreview();
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
    saveState(); renderPreview();
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
    saveState(); renderPreview();
  }));
}

$('btn-add-custom-section')?.addEventListener('click', () => addCustomSection());

// ── Extras: Certifications ────────────────────────────────────

function addCertification(data = {}) {
  const id = Date.now() + Math.random();
  extras.certifications.push({ id, name: data.name||'', issuer: data.issuer||'', date: data.date||'' });
  renderCertifications();
}

function removeCertification(id) {
  extras.certifications = extras.certifications.filter(c => c.id !== id);
  renderCertifications();
  saveState(); renderPreview();
}

function renderCertifications() {
  const list = $('cert-list');
  if (!extras.certifications.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.certifications.map(c => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${c.id}">
      <div style="display:flex;gap:0.5rem;align-items:flex-start;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;">
          <div class="fl-wrap">
            <input type="text" class="fl-input cert-name" value="${esc2(c.name)}" placeholder=" " data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_name')}</label>
          </div>
          <div class="fl-wrap">
            <input type="text" class="fl-input cert-issuer" value="${esc2(c.issuer)}" placeholder=" " data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_issuer')}</label>
          </div>
          <div class="fl-wrap" style="width:110px;">
            <input type="month" class="fl-input cert-date" value="${c.date||''}" data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_date')}</label>
          </div>
        </div>
        <button class="btn-remove-entry" onclick="removeCertification(${c.id})">×</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.cert-name,.cert-issuer,.cert-date').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const cert = extras.certifications.find(c => c.id === id);
    if (!cert) return;
    const cls = e.target.classList;
    if (cls.contains('cert-name')) cert.name = e.target.value;
    else if (cls.contains('cert-issuer')) cert.issuer = e.target.value;
    else if (cls.contains('cert-date')) cert.date = e.target.value;
    saveState(); renderPreview();
  }));
  list.querySelectorAll('.cert-date').forEach(el => el.addEventListener('change', e => {
    const id = parseFloat(e.target.dataset.id);
    const cert = extras.certifications.find(c => c.id === id);
    if (cert) { cert.date = e.target.value; saveState(); renderPreview(); }
  }));
}

$('btn-add-cert').addEventListener('click', () => addCertification());

// ── Extras: Languages ─────────────────────────────────────────

function addLangItem(data = {}) {
  const id = Date.now() + Math.random();
  extras.languages.push({ id, name: data.name||'', level: data.level||'' });
  renderLangItems();
}

function removeLangItem(id) {
  extras.languages = extras.languages.filter(l => l.id !== id);
  renderLangItems();
  saveState(); renderPreview();
}

function renderLangItems() {
  const list = $('langs-list');
  if (!extras.languages.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.languages.map(l => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${l.id}">
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input lang-name" value="${esc2(l.name)}" placeholder=" " data-id="${l.id}" />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_name')}</label>
        </div>
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input lang-level" value="${esc2(l.level)}" placeholder=" " data-id="${l.id}" />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_level')}</label>
        </div>
        <button class="btn-remove-entry" onclick="removeLangItem(${l.id})">×</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.lang-name,.lang-level').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const item = extras.languages.find(x => x.id === id);
    if (!item) return;
    if (e.target.classList.contains('lang-name')) item.name = e.target.value;
    else item.level = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-lang-item').addEventListener('click', () => addLangItem());

// Interests
$('p-interests').addEventListener('input', () => {
  extras.interests = $('p-interests').value;
  saveState(); renderPreview();
});

// ── Design options ────────────────────────────────────────────

document.querySelectorAll('.tpl-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tpl-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    template = btn.dataset.tpl;
    saveState(); renderPreview();
  });
});

document.querySelectorAll('.color-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('custom-color').value = btn.dataset.color;
    setAccent(btn.dataset.color);
    saveState(); renderPreview();
  });
});

$('custom-color').addEventListener('input', e => {
  document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  setAccent(e.target.value);
  saveState(); renderPreview();
});

document.querySelectorAll('.font-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cvFont = btn.dataset.font;
    saveState(); renderPreview();
  });
});

$('tog-photo').addEventListener('change', () => {
  showPhoto = $('tog-photo').checked;
  saveState(); renderPreview();
});

// ── Preview ───────────────────────────────────────────────────

let previewTimer = null;

function renderPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(_doRenderPreview, 120);
}

function _doRenderPreview() {
  collectProfile();
  const cv = buildCVState();
  const page = $('cv-page');
  page.innerHTML = renderTemplate(cv, template, accentColor, cvFont, t);
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

  try {
    await html2pdf().set({
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

function saveToHistory() {
  const history = getHistory();
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    name: profile.name || t('unnamed'),
    title: profile.title || '',
    template,
    state: exportState(),
  };
  history.unshift(entry);
  const trimmed = history.slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
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
  list.innerHTML = history.map(item => `
    <div class="history-item">
      <div>
        <div class="font-semibold text-sm">${esc2(item.name)}</div>
        <div class="text-xs text-gray-500">${esc2(item.title)} · ${new Date(item.date).toLocaleDateString(lang)} · ${item.template}</div>
      </div>
      <div class="history-item-actions">
        <button onclick="loadFromHistory(${item.id})" title="${t('load')}">${t('load')}</button>
        <button onclick="duplicateFromHistory(${item.id})" title="${t('duplicate')}">${t('duplicate')}</button>
        <button class="btn-del" onclick="deleteFromHistory(${item.id})" title="${t('delete')}">${t('delete')}</button>
      </div>
    </div>`).join('');
}

function loadFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;
  importState(entry.state);
  closeModal('modal-history');
  showToast(t('load') + ' ✓');
}

function duplicateFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;
  importState(entry.state);
  closeModal('modal-history');
}

function deleteFromHistory(id) {
  let history = getHistory();
  history = history.filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistoryModal();
}

// ── State persistence ─────────────────────────────────────────

const STATE_KEY = 'iloveresume_state';

function exportState() {
  return JSON.stringify({ profile, experiences, education, skills, projects, volunteer, customSections, extras, template, accentColor, cvFont, showPhoto, lang });
}

let _saveIndicatorTimer = null;
function saveState() {
  localStorage.setItem(STATE_KEY, exportState());
  // Show autosave indicator
  const el = $('save-indicator');
  if (el) {
    el.classList.add('visible');
    clearTimeout(_saveIndicatorTimer);
    _saveIndicatorTimer = setTimeout(() => el.classList.remove('visible'), 2000);
  }
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
    if (s.extras)         extras = s.extras;
    if (s.template)     template = s.template;
    if (s.accentColor)  { accentColor = s.accentColor; setAccent(accentColor); }
    if (s.cvFont)       cvFont = s.cvFont;
    if (typeof s.showPhoto === 'boolean') showPhoto = s.showPhoto;
    if (s.lang && T[s.lang]) { lang = s.lang; }
    populateProfile();
    renderExperiences();
    renderEducation();
    renderSkills();
    renderProjects();
    renderVolunteer();
    renderCustomSections();
    renderCertifications();
    renderLangItems();
    $('p-interests').value = extras.interests || '';
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
  $('tog-photo').checked = showPhoto;
  $('custom-color').value = accentColor;
  document.querySelectorAll('.color-dot').forEach(b => b.classList.toggle('active', b.dataset.color === accentColor));
}

// ── Share by link ─────────────────────────────────────────────

function buildShareUrl() {
  const json = exportState();
  const compressed = pako.deflate(new TextEncoder().encode(json));
  const b64 = btoa(String.fromCharCode(...compressed));
  const url = `${location.origin}${location.pathname}?cv=${encodeURIComponent(b64)}`;
  return url;
}

function loadFromUrl() {
  const params = new URLSearchParams(location.search);
  const cv = params.get('cv');
  if (!cv) return false;
  try {
    const bytes = Uint8Array.from(atob(decodeURIComponent(cv)), c => c.charCodeAt(0));
    const json = new TextDecoder().decode(pako.inflate(bytes));
    importState(json);
    return true;
  } catch(e) {
    console.warn('Failed to load CV from URL', e);
    return false;
  }
}

function renderShareModal() {
  const url = buildShareUrl();
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
      renderCV();
      saveState();
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
    if (e.key === 's') { e.preventDefault(); saveState(); showToast('✓ Sauvegardé'); }
  }
});

// ── Escape helper for HTML attributes ────────────────────────

function esc2(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── Render all dynamic lists ──────────────────────────────────

function renderAll() {
  renderExperiences();
  renderEducation();
  renderSkills();
  renderProjects();
  renderVolunteer();
  renderCustomSections();
  renderCertifications();
  renderLangItems();
}

function renderCV() {
  renderPreview();
}

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

function init() {
  initDark();
  initLang();
  renderAllTranslations();

  const loadedFromUrl = loadFromUrl();
  if (!loadedFromUrl) loadState();


  populateProfile();
  renderAll();

  goToStep(0);
  renderPreview();

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
