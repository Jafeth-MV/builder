(function(){
  const $ = (s, scope=document) => scope.querySelector(s);
  const $$ = (s, scope=document) => Array.from(scope.querySelectorAll(s));

  // Mobile nav toggle (reuse primary nav)
  const navToggle = $('.nav-toggle');
  const primaryNav = $('#primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target) target.scrollIntoView({behavior:'smooth'});
        document.body.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded','false');
      }
    });
  });

  // Learn More toggle
  const learnMoreBtn = $('#btn-learn-more');
  const learnMorePanel = $('#learn-more-panel');
  if (learnMoreBtn && learnMorePanel) {
    learnMoreBtn.addEventListener('click', () => {
      const isHidden = learnMorePanel.hasAttribute('hidden');
      if (isHidden) { learnMorePanel.removeAttribute('hidden'); } else { learnMorePanel.setAttribute('hidden',''); }
    });
  }

  // Modal Get Started (Signup)
  const modal = $('#modal');
  const openBtn = $('#btn-get-started');
  const closeEls = $$('[data-close]', modal || undefined);
  function openModal(){ modal?.removeAttribute('hidden'); $('#signup-name')?.focus(); document.body.style.overflow='hidden'; }
  function closeModal(){ modal?.setAttribute('hidden',''); document.body.style.overflow=''; }
  openBtn?.addEventListener('click', openModal);
  closeEls.forEach(el => el.addEventListener('click', closeModal));
  modal?.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && !modal?.hasAttribute('hidden')) closeModal(); });

  // Header scroll effect
  const onScroll = () => {
    if (window.scrollY > 8) { document.body.classList.add('scrolled'); }
    else { document.body.classList.remove('scrolled'); }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile CTA -> open signup modal
  const mobileCta = $('#mobile-cta');
  mobileCta?.addEventListener('click', openModal);

  // Active section highlight
  const sections = ['#home','#product','#about','#team','#solutions','#features','#pricing','#faq','#contact'].map(id=>$(id)).filter(Boolean);
  const links = Array.from($$('.nav-link'));
  const linkFor = href => links.find(l=>l.getAttribute('href')===href);
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = '#' + entry.target.id;
      const link = linkFor(id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin:'-50% 0px -40% 0px', threshold:0});
  sections.forEach(s=>io.observe(s));

  // i18n
  const translations = {
    en: {
      'nav.product':'Product','nav.about':'About Us','nav.team':'Team','nav.solutions':'Solutions','nav.features':'Features','nav.pricing':'Pricing','nav.faq':'FAQ','nav.contact':'Contact Sales',
      'hero.title':'Smart liquid monitoring for homes and businesses',
      'hero.subtitle':'Track volume, pressure, density and temperature in real time with clear alerts and reports.',
      'cta.getStarted':'Get Started','cta.learnMore':'Learn More','hero.more':'Qlic integrates high-precision sensors with a cloud platform to give you full visibility of your tanks and lines. Configure alerts, share access, and export data for audits.',
      'hero.badge':'Real-Time Monitoring',
      'trust.sensors':'Certified sensors','trust.uptime':'99.9% uptime','trust.cloud':'Cloud dashboard',
      'readout.volume':'Volume','readout.pressure':'Pressure','readout.temperature':'Temperature','readout.density':'Density',
      'product.title':'Full visibility of your liquids','product.desc':'Monitor water, beer, gasoline and more, measuring volume, pressure, density and temperature with clear dashboards and configurable alerts.',
      'cards.volumeTitle':'Volume Management','cards.volumeText':'Record levels, calculate consumption and predict replenishments.',
      'cards.pressureTitle':'Pressure Tracking','cards.pressureText':'Detect pressure variations to prevent line damage.',
      'cards.temperatureTitle':'Temperature Control','cards.temperatureText':'Ensure ideal ranges with smart alerts.',
      'about.title':'About Us','about.desc':'At Qlic we build sensor and software technology to provide total visibility of liquid usage. We believe in precise data, useful alerts and operational simplicity.',
      'about.missionTitle':'Mission','about.missionText':'Make liquid management predictable and efficient.',
      'about.reliabilityTitle':'Reliability','about.reliabilityText':'Certified sensors and a platform with 99.9% uptime.',
      'about.closenessTitle':'Customer focus','about.closenessText':'Human support, guided onboarding and continuous improvements.',
      'team.title':'Our team','team.desc':'Five pillars powering Qlic: engineering, hardware, data, product and operations.',
      'solutions.title':'Solutions by segment','solutions.homeTitle':'Residences','solutions.homeText':'Monitor water tanks, receive low-level alerts and prevent leaks.',
      'solutions.businessTitle':'Businesses','solutions.businessText':'Control liquid inventories, audits and compliance in industries.',
      'features.title':'Key features','features.pressureTitle':'Pressure Tracking','features.pressureText':'Trends and safety thresholds with notifications.',
      'features.temperatureTitle':'Temperature Control','features.temperatureText':'Custom ranges and thermal control for quality.',
      'features.volumeTitle':'Volume Management','features.volumeText':'Consumption projections and replenishment logistics.',
      'pricing.title':'Subscription plans','pricing.perMonth':'/mo','pricing.recommended':'Recommended','pricing.choose':'Choose Plan','pricing.custom':'Custom',
      'pricing.basic.f1':'1 tank','pricing.basic.f2':'Update every 15 min','pricing.basic.f3':'Basic alerts','pricing.basic.f4':'Email support',
      'pricing.pro.f1':'Up to 5 tanks','pricing.pro.f2':'Update every 5 min','pricing.pro.f3':'Advanced alerts','pricing.pro.f4':'Shared dashboards','pricing.pro.f5':'Priority support',
      'pricing.ent.f1':'Unlimited tanks and sites','pricing.ent.f2':'Integrations and SLAs','pricing.ent.f3':'Exports and audits','pricing.ent.f4':'24/7 support',
      'faq.title':'Frequently asked questions','faq.q1':'Which liquids can I monitor?','faq.a1':'Water, beer, fuels and other liquids compatible with our sensors.',
      'faq.q2':'Do I need constant internet?','faq.a2':'Connectivity is required to send data to the cloud; the device stores readings during temporary outages.',
      'faq.q3':'How do alerts work?','faq.a3':'Set thresholds by volume, pressure or temperature and receive alerts via email or notifications.',
      'contact.title':'Contact Sales','contact.desc':'Tell us about your operation and a specialist will contact you.',
      'contact.name':'Name','contact.email':'Email','contact.message':'Message','contact.send':'Send',
      'footer.company':'Company','footer.help':'Get Help','footer.community':'Community','footer.follow':'Follow Us',
      'footer.company.about':'About Us','footer.company.services':'Our Services','footer.company.privacy':'Privacy Policy','footer.company.affiliates':'Affiliate Institutions',
      'footer.help.faq':'FAQ','footer.help.progress':'Progress','footer.help.advisors':'Advisors','footer.help.payments':'Payment Options',
      'footer.community.story':'Our Story','footer.community.developers':'Developers','footer.community.events':'Events',
      'footer.rights':'All rights reserved.',
      'signup.title':'Create your account','signup.name':'Name','signup.email':'Email','signup.password':'Password','signup.submit':'Create account',
      'status.signup.invalid':'Fill name, email and a password of at least 6 characters.',
      'status.signup.success':'Account created! Check your email to confirm.',
      'status.contact.invalid':'Complete all fields to continue.','status.contact.success':'Message sent. We will reply shortly.',
      'toast.plan':'Plan {plan} selected. Our team will contact you.'
    },
    es: {
      'nav.product':'Producto','nav.about':'Nosotros','nav.team':'Equipo','nav.solutions':'Soluciones','nav.features':'Funcionalidades','nav.pricing':'Precios','nav.faq':'FAQ','nav.contact':'Contactar Ventas',
      'hero.title':'Monitoreo inteligente de agua para hogares y empresas',
      'hero.subtitle':'Controla volumen, presión y temperatura en tiempo real con alertas y reportes claros.',
      'cta.getStarted':'Comenzar','cta.learnMore':'Más información','hero.more':'Qlic integra sensores de alta precisión con una plataforma en la nube para brindar visibilidad total de tus tanques y líneas de agua. Configura alertas, comparte accesos y exporta datos para auditorías.',
      'hero.badge':'Monitoreo en tiempo real',
      'trust.sensors':'Sensores certificados','trust.uptime':'99.9% uptime','trust.cloud':'Dashboard en la nube',
      'readout.volume':'Volumen','readout.pressure':'Presión','readout.temperature':'Temperatura','readout.density':'Densidad',
      'product.title':'Visibilidad completa del agua','product.desc':'Monitorea tanques y tuberías de agua, midiendo volumen, presión y temperatura con paneles claros y alertas configurables.',
      'cards.volumeTitle':'Gestión de Volumen','cards.volumeText':'Registra niveles, calcula consumos y predice reabastecimientos.',
      'cards.pressureTitle':'Seguimiento de Presión','cards.pressureText':'Detecta variaciones de presión para evitar daños en líneas.',
      'cards.temperatureTitle':'Control de Temperatura','cards.temperatureText':'Asegura rangos ideales con alertas inteligentes.',
      'about.title':'Nosotros','about.desc':'En Qlic construimos tecnología de sensores y software para brindar visibilidad total del uso del agua. Creemos en datos precisos, alertas útiles y simplicidad operativa.',
      'about.missionTitle':'Misión','about.missionText':'Hacer que la gestión del agua sea predecible y eficiente.',
      'about.reliabilityTitle':'Confiabilidad','about.reliabilityText':'Sensores certificados y plataforma con 99.9% de disponibilidad.',
      'about.closenessTitle':'Cercanía','about.closenessText':'Soporte humano, implementación guiada y mejoras continuas.',
      'team.title':'Nuestro equipo','team.desc':'Cinco pilares que impulsan Qlic: ingeniería, hardware, datos, producto y operaciones.',
      'solutions.title':'Soluciones por segmento','solutions.homeTitle':'Residencias','solutions.homeText':'Monitorea tinacos y cisternas de agua, recibe alertas de bajo nivel y evita fugas.',
      'solutions.businessTitle':'Negocios','solutions.businessText':'Controla inventarios de agua, auditorías y cumplimiento en industrias.',
      'features.title':'Funcionalidades clave','features.pressureTitle':'Seguimiento de Presión','features.pressureText':'Tendencias y umbrales de seguridad con notificaciones.',
      'features.temperatureTitle':'Control de Temperatura','features.temperatureText':'Rangos personalizados y control térmico para calidad.',
      'features.volumeTitle':'Gestión de Volumen','features.volumeText':'Proyecciones de consumo y logística de reabastecimiento.',
      'pricing.title':'Planes de suscripción','pricing.perMonth':'/mes','pricing.recommended':'Recomendado','pricing.choose':'Elegir plan','pricing.custom':'Personalizado',
      'pricing.basic.f1':'1 tanque','pricing.basic.f2':'Actualización cada 15 min','pricing.basic.f3':'Alertas básicas','pricing.basic.f4':'Soporte por email',
      'pricing.pro.f1':'Hasta 5 tanques','pricing.pro.f2':'Actualización cada 5 min','pricing.pro.f3':'Alertas avanzadas','pricing.pro.f4':'Dashboards compartidos','pricing.pro.f5':'Soporte prioritario',
      'pricing.ent.f1':'Tanques y sitios ilimitados','pricing.ent.f2':'Integraciones y SLAs','pricing.ent.f3':'Exportaciones y auditorías','pricing.ent.f4':'Soporte 24/7',
      'faq.title':'Preguntas frecuentes','faq.q1':'¿Qué puedo monitorear?','faq.a1':'Tanques, cisternas y líneas de agua compatibles con nuestros sensores.',
      'faq.q2':'¿Necesito internet constante?','faq.a2':'Se requiere conectividad para enviar datos a la nube; el dispositivo almacena lecturas si hay cortes temporales.',
      'faq.q3':'¿Cómo funcionan las alertas?','faq.a3':'Configura umbrales por volumen, presión o temperatura y recibe alertas por email o notificaciones.',
      'contact.title':'Contactar Ventas','contact.desc':'Cuéntanos sobre tu operación y un especialista te contactará.',
      'contact.name':'Nombre','contact.email':'Email','contact.message':'Mensaje','contact.send':'Enviar',
      'footer.company':'Compañía','footer.help':'Ayuda','footer.community':'Comunidad','footer.follow':'Síguenos',
      'footer.company.about':'Nosotros','footer.company.services':'Nuestros servicios','footer.company.privacy':'Política de privacidad','footer.company.affiliates':'Instituciones afiliadas',
      'footer.help.faq':'FAQ','footer.help.progress':'Progreso','footer.help.advisors':'Asesores','footer.help.payments':'Opciones de pago',
      'footer.community.story':'Nuestra historia','footer.community.developers':'Desarrolladores','footer.community.events':'Eventos',
      'footer.rights':'Todos los derechos reservados.',
      'signup.title':'Crea tu cuenta','signup.name':'Nombre','signup.email':'Email','signup.password':'Contraseña','signup.submit':'Crear cuenta',
      'status.signup.invalid':'Completa nombre, email y una contraseña de al menos 6 caracteres.',
      'status.signup.success':'¡Cuenta creada! Revisa tu email para confirmar.',
      'status.contact.invalid':'Completa todos los campos para continuar.','status.contact.success':'Mensaje enviado. Te responderemos en breve.',
      'toast.plan':'Plan {plan} seleccionado. Nuestro equipo te contactará.'
    }
  };

  const setText = (sel, text) => { const el = document.querySelector(sel); if (el && typeof text === 'string') el.textContent = text; };
  function applyLanguage(lang){
    const tr = translations[lang]; if (!tr) return;
    // Header
    setText('a[href="#product"]', tr['nav.product']);
    setText('a[href="#about"]', tr['nav.about']);
    setText('a[href="#team"]', tr['nav.team']);
    setText('a[href="#solutions"]', tr['nav.solutions']);
    setText('a[href="#features"]', tr['nav.features']);
    setText('a[href="#pricing"]', tr['nav.pricing']);
    setText('a[href="#faq"]', tr['nav.faq']);
    setText('a[href="#contact"].btn', tr['nav.contact']);

    // Hero
    setText('.hero-title', tr['hero.title']);
    setText('.hero-subtitle', tr['hero.subtitle']);
    setText('#btn-get-started', tr['cta.getStarted']);
    setText('#btn-learn-more', tr['cta.learnMore']);
    const learnP = document.querySelector('#learn-more-panel p'); if (learnP) learnP.textContent = tr['hero.more'];
    setText('.badge-live', tr['hero.badge']);
    // Trust row
    setText('.trust-row li:nth-child(1)', tr['trust.sensors']);
    setText('.trust-row li:nth-child(2)', tr['trust.uptime']);
    setText('.trust-row li:nth-child(3)', tr['trust.cloud']);

    // Readouts labels
    setText('.device-readouts .readout:nth-child(1) span', tr['readout.volume']);
    setText('.device-readouts .readout:nth-child(2) span', tr['readout.pressure']);
    setText('.device-readouts .readout:nth-child(3) span', tr['readout.temperature']);
    setText('.device-readouts .readout:nth-child(4) span', tr['readout.density']);

    // Product
    setText('#product .section-title', tr['product.title']);
    setText('#product .section-desc', tr['product.desc']);
    setText('#product .metric-card:nth-child(1) .metric-title', tr['cards.volumeTitle']);
    setText('#product .metric-card:nth-child(1) .metric-text', tr['cards.volumeText']);
    setText('#product .metric-card:nth-child(2) .metric-title', tr['cards.pressureTitle']);
    setText('#product .metric-card:nth-child(2) .metric-text', tr['cards.pressureText']);
    setText('#product .metric-card:nth-child(3) .metric-title', tr['cards.temperatureTitle']);
    setText('#product .metric-card:nth-child(3) .metric-text', tr['cards.temperatureText']);

    // About
    setText('#about .section-title', tr['about.title']);
    setText('#about .section-desc', tr['about.desc']);
    setText('#about .points-grid .point-card:nth-child(1) .point-title', tr['about.missionTitle']);
    setText('#about .points-grid .point-card:nth-child(1) .point-text', tr['about.missionText']);
    setText('#about .points-grid .point-card:nth-child(2) .point-title', tr['about.reliabilityTitle']);
    setText('#about .points-grid .point-card:nth-child(2) .point-text', tr['about.reliabilityText']);
    setText('#about .points-grid .point-card:nth-child(3) .point-title', tr['about.closenessTitle']);
    setText('#about .points-grid .point-card:nth-child(3) .point-text', tr['about.closenessText']);

    // Team
    setText('#team .section-title', tr['team.title']);
    setText('#team .section-desc', tr['team.desc']);

    // Solutions
    setText('#solutions .section-title', tr['solutions.title']);
    setText('#solutions .solution-card:nth-child(1) .solution-title', tr['solutions.homeTitle']);
    setText('#solutions .solution-card:nth-child(1) .solution-text', tr['solutions.homeText']);
    setText('#solutions .solution-card:nth-child(2) .solution-title', tr['solutions.businessTitle']);
    setText('#solutions .solution-card:nth-child(2) .solution-text', tr['solutions.businessText']);

    // Features
    setText('#features .section-title', tr['features.title']);
    setText('#features .feature-card:nth-child(1) .feature-title', tr['features.pressureTitle']);
    setText('#features .feature-card:nth-child(1) .feature-text', tr['features.pressureText']);
    setText('#features .feature-card:nth-child(2) .feature-title', tr['features.temperatureTitle']);
    setText('#features .feature-card:nth-child(2) .feature-text', tr['features.temperatureText']);
    setText('#features .feature-card:nth-child(3) .feature-title', tr['features.volumeTitle']);
    setText('#features .feature-card:nth-child(3) .feature-text', tr['features.volumeText']);

    // Pricing
    setText('#pricing .section-title', tr['pricing.title']);
    setText('#pricing .price-card:nth-child(1) .price-period', tr['pricing.perMonth']);
    setText('#pricing .price-card:nth-child(1) .price-features li:nth-child(1)', tr['pricing.basic.f1']);
    setText('#pricing .price-card:nth-child(1) .price-features li:nth-child(2)', tr['pricing.basic.f2']);
    setText('#pricing .price-card:nth-child(1) .price-features li:nth-child(3)', tr['pricing.basic.f3']);
    setText('#pricing .price-card:nth-child(1) .price-features li:nth-child(4)', tr['pricing.basic.f4']);
    setText('#pricing .price-card:nth-child(1) .choose-plan', tr['pricing.choose']);

    setText('#pricing .price-card:nth-child(2) .ribbon', tr['pricing.recommended']);
    setText('#pricing .price-card:nth-child(2) .price-period', tr['pricing.perMonth']);
    setText('#pricing .price-card:nth-child(2) .price-features li:nth-child(1)', tr['pricing.pro.f1']);
    setText('#pricing .price-card:nth-child(2) .price-features li:nth-child(2)', tr['pricing.pro.f2']);
    setText('#pricing .price-card:nth-child(2) .price-features li:nth-child(3)', tr['pricing.pro.f3']);
    setText('#pricing .price-card:nth-child(2) .price-features li:nth-child(4)', tr['pricing.pro.f4']);
    setText('#pricing .price-card:nth-child(2) .price-features li:nth-child(5)', tr['pricing.pro.f5']);
    setText('#pricing .price-card:nth-child(2) .choose-plan', tr['pricing.choose']);

    setText('#pricing .price-card:nth-child(3) .price-amount', tr['pricing.custom']);
    setText('#pricing .price-card:nth-child(3) .price-features li:nth-child(1)', tr['pricing.ent.f1']);
    setText('#pricing .price-card:nth-child(3) .price-features li:nth-child(2)', tr['pricing.ent.f2']);
    setText('#pricing .price-card:nth-child(3) .price-features li:nth-child(3)', tr['pricing.ent.f3']);
    setText('#pricing .price-card:nth-child(3) .price-features li:nth-child(4)', tr['pricing.ent.f4']);
    setText('#pricing .price-card:nth-child(3) .choose-plan', tr['pricing.choose']);

    // FAQ
    setText('#faq .section-title', tr['faq.title']);
    setText('#faq .faq-item:nth-child(1) summary', tr['faq.q1']);
    setText('#faq .faq-item:nth-child(1) .faq-answer', tr['faq.a1']);
    setText('#faq .faq-item:nth-child(2) summary', tr['faq.q2']);
    setText('#faq .faq-item:nth-child(2) .faq-answer', tr['faq.a2']);
    setText('#faq .faq-item:nth-child(3) summary', tr['faq.q3']);
    setText('#faq .faq-item:nth-child(3) .faq-answer', tr['faq.a3']);

    // Contact
    setText('#contact .section-title', tr['contact.title']);
    setText('#contact .section-desc', tr['contact.desc']);
    setText('label[for="contact-name"]', tr['contact.name']);
    setText('label[for="contact-email"]', tr['contact.email']);
    setText('label[for="contact-message"]', tr['contact.message']);
    setText('#contact button[type="submit"]', tr['contact.send']);

    // Footer
    setText('.footer-grid .footer-col:nth-child(1) .footer-title', tr['footer.company']);
    setText('.footer-grid .footer-col:nth-child(2) .footer-title', tr['footer.help']);
    setText('.footer-grid .footer-col:nth-child(3) .footer-title', tr['footer.community']);
    setText('.footer-grid .footer-col:nth-child(4) .footer-title', tr['footer.follow']);

    setText('.footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(1) a', tr['footer.company.about']);
    setText('.footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(2) a', tr['footer.company.services']);
    setText('.footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(3) a', tr['footer.company.privacy']);
    setText('.footer-grid .footer-col:nth-child(1) .footer-links li:nth-child(4) a', tr['footer.company.affiliates']);

    setText('.footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(1) a', tr['footer.help.faq']);
    setText('.footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(2) a', tr['footer.help.progress']);
    setText('.footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(3) a', tr['footer.help.advisors']);
    setText('.footer-grid .footer-col:nth-child(2) .footer-links li:nth-child(4) a', tr['footer.help.payments']);

    setText('.footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(1) a', tr['footer.community.story']);
    setText('.footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(2) a', tr['footer.community.developers']);
    setText('.footer-grid .footer-col:nth-child(3) .footer-links li:nth-child(3) a', tr['footer.community.events']);

    const rights = document.querySelector('.footer-copy');
    if (rights) rights.innerHTML = `© <span id="year"></span> Qlic. ${tr['footer.rights']}`;

    // Modal
    setText('#modal-title', tr['signup.title']);
    setText('label[for="signup-name"]', tr['signup.name']);
    setText('label[for="signup-email"]', tr['signup.email']);
    setText('label[for="signup-password"]', tr['signup.password']);
    setText('#signup-form button[type="submit"]', tr['signup.submit']);

    // Mobile CTA
    setText('#mobile-cta', tr['cta.getStarted']);

    // Update button label
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang.toUpperCase();

    // Save
    localStorage.setItem('qlic_lang', lang);
    // Set document lang attribute
    document.documentElement.setAttribute('lang', lang);
  }

  const langBtn = document.getElementById('lang-toggle');
  const current = localStorage.getItem('qlic_lang') || 'en';
  applyLanguage(current);
  langBtn?.addEventListener('click', ()=>{
    const next = (localStorage.getItem('qlic_lang') || 'en') === 'en' ? 'es' : 'en';
    applyLanguage(next);
    const y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
  });

  // Signup form validation (uses current lang at submit time)
  const signupForm = $('#signup-form');
  const signupStatus = $('#signup-status');
  signupForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#signup-name')?.value.trim();
    const email = $('#signup-email')?.value.trim();
    const password = $('#signup-password')?.value || '';
    const tr = translations[localStorage.getItem('qlic_lang') || 'en'];
    if (!name || !email || password.length < 6) { signupStatus && (signupStatus.textContent = tr['status.signup.invalid']); return; }
    if (signupStatus) signupStatus.textContent = tr['status.signup.success'];
    setTimeout(closeModal, 900);
  });

  // Choose plan toast
  const toast = $('#plan-toast');
  $$('.choose-plan').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const plan = btn.getAttribute('data-plan') || '';
      const tr = translations[localStorage.getItem('qlic_lang') || 'en'];
      if (!toast) return;
      toast.textContent = tr['toast.plan'].replace('{plan}', plan);
      toast.hidden = false;
      setTimeout(()=>{ toast.hidden = true; }, 2000);
    });
  });

  // Contact form (uses current lang at submit time)
  const contactForm = $('#contact-form');
  const contactStatus = $('#contact-status');
  contactForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#contact-name')?.value.trim();
    const email = $('#contact-email')?.value.trim();
    const message = $('#contact-message')?.value.trim();
    const tr = translations[localStorage.getItem('qlic_lang') || 'en'];
    if (!name || !email || !message) { contactStatus && (contactStatus.textContent = tr['status.contact.invalid']); return; }
    if (contactStatus) contactStatus.textContent = tr['status.contact.success'];
    contactForm.reset();
  });

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
