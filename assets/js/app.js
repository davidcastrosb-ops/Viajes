
const state = {
  site: null,
  destinations: [],
  currentDestination: null,
  galleryMap: {},
  modalDestination: null,
  modalIndex: 0,
  countdownTarget: null
};

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('assets/data/site.json');
  const data = await res.json();
  state.site = data.site;
  state.destinations = data.destinations;
  applyConfig();
  fillDestinationSelect();
  renderFeatured();
  renderDestinations();
  renderRegions();
  renderYucatan();
  initBannerSelect();
  initEvents();
  initCountdown();
});

function applyConfig() {
  const c = state.site.colors;
  document.documentElement.style.setProperty('--color-primary', c.primary);
  document.documentElement.style.setProperty('--color-secondary', c.secondary);
  document.documentElement.style.setProperty('--color-accent', c.accent);
  document.documentElement.style.setProperty('--color-text', c.text);
  document.documentElement.style.setProperty('--color-bg', c.bg);
  document.documentElement.style.setProperty('--color-card', c.card);

  document.getElementById('heroBanner').src = state.site.defaultBanner;
  document.getElementById('waMain').href = makeWhatsAppUrl('Hola, quiero información para viajes.');
  document.getElementById('waFloat').href = makeWhatsAppUrl('Hola, quiero ayuda con un viaje.');
  document.getElementById('waTop').href = makeWhatsAppUrl('Hola, quiero una cotización.');
  document.getElementById('socialFacebook').href = state.site.social.facebook;
  document.getElementById('socialInstagram').href = state.site.social.instagram;
  document.getElementById('socialTiktok').href = state.site.social.tiktok;
}

function fillDestinationSelect() {
  const select = document.getElementById('destinationSelect');
  select.innerHTML = '<option value="">Selecciona un destino o ciudad</option>';
  state.destinations.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.name;
    select.appendChild(opt);
  });
}

function initBannerSelect() {
  const select = document.getElementById('destinationSelect');
  select.addEventListener('change', () => {
    if (!select.value) {
      setHeroDefault();
      return;
    }
    const d = state.destinations.find(x => x.id === select.value);
    if (d) setHeroFromDestination(d);
  });
}

function setHeroDefault() {
  document.getElementById('heroBanner').src = state.site.defaultBanner;
  document.getElementById('heroTitle').innerHTML = 'Tu próximo<br>viaje';
  document.getElementById('heroSmall').textContent = 'Playa, pueblos mágicos, ciudad y más';
  document.getElementById('heroPrice').innerHTML = 'Cotiza por WhatsApp y arma tu viaje ideal';
  document.getElementById('heroMeta').textContent = 'Hoteles, traslados, excursiones y escapadas';
}

function setHeroFromDestination(d) {
  state.currentDestination = d;
  document.getElementById('heroBanner').src = d.bannerImage;
  document.getElementById('heroTitle').innerHTML = escapeHtml(d.name).replace(' ', '<br>');
  document.getElementById('heroSmall').textContent = d.region;
  document.getElementById('heroPrice').innerHTML = `${escapeHtml(d.heroOffer)}`;
  document.getElementById('heroMeta').textContent = d.heroNights;
}

function renderFeatured() {
  const wrap = document.getElementById('featuredGrid');
  const featured = [
    state.destinations.find(d => d.id === 'cancun'),
    state.destinations.find(d => d.id === 'pueblos-magicos-jalisco')
  ].filter(Boolean);
  wrap.innerHTML = featured.map(d => `
    <article class="featured-card">
      <div class="featured-image"><img src="${d.coverImage}" alt="${escapeHtml(d.name)}"></div>
      <div class="featured-content">
        <h3>${escapeHtml(d.name)}</h3>
        <p>${escapeHtml(d.summary)}</p>
        <div class="mini-strip">
          ${d.gallery.slice(0,3).map(g => `<img src="${g}" alt="${escapeHtml(d.name)}">`).join('')}
        </div>
        <div class="destination-actions" style="padding-left:0;padding-right:0;padding-bottom:0;margin-top:16px">
          <a class="btn btn-secondary" href="#" data-open-gallery="${d.id}">Ver galería</a>
          <a class="btn btn-primary" href="${makeWhatsAppUrl(whatsAppLeadMessage(d.name,'tarjeta destacada'))}" target="_blank">Cotizar</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderDestinations() {
  const wrap = document.getElementById('destinationsGrid');
  wrap.innerHTML = state.destinations.map(d => `
    <article class="destination-card">
      <div class="destination-image">
        <img src="${d.coverImage}" alt="${escapeHtml(d.name)}">
      </div>
      <div class="destination-mini">
        ${d.gallery.slice(0,3).map(g => `<img src="${g}" alt="${escapeHtml(d.name)}">`).join('')}
      </div>
      <div class="destination-body">
        <h3>${escapeHtml(d.name)}</h3>
        <p>${escapeHtml(d.subtitle)}</p>
      </div>
      <div class="destination-actions">
        <a class="btn btn-secondary" href="#" data-open-gallery="${d.id}">Ver más</a>
        <a class="btn btn-primary" href="${makeWhatsAppUrl(whatsAppLeadMessage(d.name,'botón de destino'))}" target="_blank">Cotiza por WhatsApp</a>
        <a class="btn btn-outline" href="${d.fichaFile}" target="_blank">Ficha</a>
      </div>
    </article>
  `).join('');
}

function renderRegions() {
  const items = [
    {
      title: 'Caribe Mexicano',
      routes: ['Cancún', 'Playa del Carmen', 'Tulum', 'Cozumel']
    },
    {
      title: 'Pacífico mexicano',
      routes: ['Puerto Vallarta', 'Nuevo Nayarit', 'Huatulco', 'Puerto Escondido']
    },
    {
      title: 'Baja y clásicos',
      routes: ['Los Cabos', 'La Paz', 'Loreto', 'Mazatlán', 'Acapulco', 'Ixtapa Zihuatanejo']
    }
  ];
  const wrap = document.getElementById('regionsGrid');
  wrap.innerHTML = items.map(i => `
    <article class="region-card">
      <h3>${escapeHtml(i.title)}</h3>
      <ul>${i.routes.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    </article>
  `).join('');
}

function renderYucatan() {
  document.getElementById('yucatanCopy').innerHTML = `
    <h3>Especial: Península de Yucatán</h3>
    <p><strong>Tu mayor oportunidad.</strong> Cuando te pidan Caribe, no vendas solo hotel. Puedes ofrecer una ruta más completa y más atractiva.</p>
    <ul>
      <li>Vuela a Cancún y conecta con Isla Mujeres o Tulum.</li>
      <li>Quédate en Valladolid para cenotes y Chichén Itzá.</li>
      <li>Cierra con Bacalar o Mérida según el estilo del cliente.</li>
    </ul>
  `;
  document.getElementById('agentTip').innerHTML = `
    <h4>Consejo de agente</h4>
    <p>“Vuela a Cancún, quédate 2 noches en Valladolid para ver Chichén Itzá, 2 noches en Mérida para cenotes y termina relajándote en Bacalar”.</p>
  `;
}

function initEvents() {
  document.getElementById('leadForm').addEventListener('submit', submitLead);
  document.querySelectorAll('[data-open-gallery]').forEach(btn => btn.addEventListener('click', openGalleryFromButton));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
  document.getElementById('prevSlide').addEventListener('click', () => moveSlide(-1));
  document.getElementById('nextSlide').addEventListener('click', () => moveSlide(1));
  document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('mobile-open');
  });

  document.getElementById('childrenCount').addEventListener('change', updateChildrenAgeFields);
  updateChildrenAgeFields();
}

function updateChildrenAgeFields() {
  const count = Number(document.getElementById('childrenCount').value || 0);
  const wrap = document.getElementById('childrenAges');
  wrap.innerHTML = '';
  for (let i=0; i<count; i++) {
    const field = document.createElement('div');
    field.className = 'field';
    field.innerHTML = `
      <label>Edad del niño ${i+1}</label>
      <select name="childAge${i+1}">
        <option value="">Selecciona edad</option>
        ${Array.from({length:18}).map((_,age)=>`<option value="${age}">${age} años</option>`).join('')}
      </select>`;
    wrap.appendChild(field);
  }
}

function openGalleryFromButton(e) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('data-open-gallery');
  const d = state.destinations.find(x => x.id === id);
  if (!d) return;
  state.modalDestination = d;
  state.modalIndex = 0;
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = d.name;
  renderModalSlide();
  modal.classList.add('active');
}

function renderModalSlide() {
  const d = state.modalDestination;
  const current = d.gallery[state.modalIndex] || d.coverImage;
  document.getElementById('modalImage').src = current;
  const thumbs = document.getElementById('modalThumbs');
  thumbs.innerHTML = d.gallery.map((g,idx)=>`<img class="${idx===state.modalIndex?'active':''}" src="${g}" alt="${escapeHtml(d.name)}" data-idx="${idx}">`).join('');
  thumbs.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
      state.modalIndex = Number(img.getAttribute('data-idx'));
      renderModalSlide();
    });
  });
  document.getElementById('modalWhatsApp').href = makeWhatsAppUrl(whatsAppLeadMessage(d.name, 'galería'));
  document.getElementById('modalFicha').href = d.fichaFile;
}

function moveSlide(dir) {
  const d = state.modalDestination;
  if (!d) return;
  state.modalIndex = (state.modalIndex + dir + d.gallery.length) % d.gallery.length;
  renderModalSlide();
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

async function submitLead(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const selectedId = document.getElementById('destinationSelect').value;
  const d = state.destinations.find(x => x.id === selectedId);
  const fd = new FormData(form);
  const childrenCount = Number(fd.get('children') || 0);
  const childAges = [];
  for (let i=1; i<=childrenCount; i++) {
    childAges.push(fd.get(`childAge${i}`) || '');
  }
  const payload = {
    timestamp: new Date().toISOString(),
    nombre: (fd.get('name') || '').trim(),
    telefono: (fd.get('phone') || '').trim(),
    destino: d ? d.name : (fd.get('customDestination') || 'No especificado'),
    destinoId: d ? d.id : '',
    adultos: fd.get('adults') || '',
    ninos: fd.get('children') || '0',
    edadesNinos: childAges.filter(Boolean).join(', '),
    pagina: window.location.href,
    origenClick: 'formulario principal',
    resumen: buildSummary(d, fd, childAges)
  };

  let savedToSheets = false;
  if (state.site.sheetsEndpoint && !state.site.sheetsEndpoint.includes('PEGA_AQUI')) {
    try {
      await fetch(state.site.sheetsEndpoint, {
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      savedToSheets = true;
    } catch (err) {}
  }

  const waText = encodeURIComponent(payload.resumen + (savedToSheets ? '\n\nSe intentó guardar también en Google Sheets.' : '\n\nRecuerda conectar el endpoint de Google Sheets.'));
  const waUrl = `https://wa.me/${state.site.whatsapp}?text=${waText}`;
  window.open(waUrl, '_blank');

  showToast(savedToSheets ? 'Formulario enviado y WhatsApp abierto.' : 'WhatsApp abierto. Falta conectar Google Sheets.');
  form.reset();
  updateChildrenAgeFields();
  setHeroDefault();
}

function buildSummary(dest, fd, childAges) {
  const destinationName = dest ? dest.name : ((fd.get('customDestination') || '').trim() || 'Destino no especificado');
  const adults = fd.get('adults') || '0';
  const children = fd.get('children') || '0';
  const name = (fd.get('name') || '').trim() || 'Cliente sin nombre';
  const phone = (fd.get('phone') || '').trim() || 'Sin teléfono';
  const childText = Number(children) > 0 ? `\n• Edades niños: ${childAges.filter(Boolean).join(', ') || 'pendiente'}` : '';
  return `Hola, quiero cotización desde la landing de Viajes Troncal.\n\n• Destino: ${destinationName}\n• Adultos: ${adults}\n• Niños: ${children}${childText}\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Acción: formulario principal`;
}

function whatsAppLeadMessage(destinationName, origin) {
  return `Hola, me interesa ${destinationName}. Lo vi en la landing de Viajes Troncal desde ${origin}. ¿Me ayudas con información y cotización?`;
}

function makeWhatsAppUrl(text) {
  return `https://wa.me/${state.site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function initCountdown() {
  const now = new Date();
  const target = new Date(now.getTime() + (2*24 + 11)*60*60*1000 + 27*60*1000 + 44*1000);
  state.countdownTarget = target;
  const paint = () => {
    const diff = target - new Date();
    const box = document.getElementById('countdown');
    if (diff <= 0) {
      box.innerHTML = ['00','00','00','00'].map((n,i)=>`<div><strong>${n}</strong><span>${['días','horas','minutos','segundos'][i]}</span></div>`).join('');
      return;
    }
    const totalSeconds = Math.floor(diff/1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [days,hours,minutes,seconds].map(n => String(n).padStart(2,'0'));
    box.innerHTML = parts.map((n,i)=>`<div><strong>${n}</strong><span>${['días','horas','minutos','segundos'][i]}</span></div>`).join('');
  };
  paint();
  setInterval(paint,1000);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3600);
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'
  }[s]));
}
