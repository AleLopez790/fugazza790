/* ═══════════════════════════════════════════════════════════════════
   FUGAZZA – Lógica Interactiva (Aplicación)
   Contiene el control del carrito, animaciones, lightbox y
   comportamientos responsivos del sitio.
   ═══════════════════════════════════════════════════════════════════ */

/* Carrito de compras: { "Nombre del producto": cantidad } */
let carrito = {};

/* ──────────────────────────────────────────────────────────────────
   1. INICIALIZACIONES
   ────────────────────────────────────────────────────────────────── */

// Renderiza el banner promocional según PROMO_CONFIG en menu-config.js
function initPromoBanner() {
  const banner = document.getElementById('promo-banner');
  if (!banner) return;

  if (!PROMO_CONFIG.activo) return;
  if (sessionStorage.getItem('promo_cerrada') === PROMO_CONFIG.mensaje) return;

  document.getElementById('promo-icon').textContent = PROMO_CONFIG.icono;
  document.getElementById('promo-msg').textContent  = PROMO_CONFIG.mensaje;

  const colores = ['naranja','verde','amarillo','azul','violeta'];
  colores.forEach(c => banner.classList.remove('promo-' + c));
  const colorFinal = colores.includes(PROMO_CONFIG.color)
    ? PROMO_CONFIG.color
    : 'naranja';
  banner.classList.add('promo-' + colorFinal);

  banner.style.display = 'flex';
}

function cerrarPromoBanner() {
  const banner = document.getElementById('promo-banner');
  if (!banner) return;
  banner.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  banner.style.opacity    = '0';
  banner.style.transform  = 'translateY(-6px)';
  setTimeout(() => { banner.style.display = 'none'; }, 260);
  sessionStorage.setItem('promo_cerrada', PROMO_CONFIG.mensaje);
}

/* ──────────────────────────────────────────────────────────────────
   2. CARRITO DE COMPRAS - LÓGICA
   ────────────────────────────────────────────────────────────────── */

function agregarAlCarrito(nombre) {
  if (carrito[nombre]) {
    carrito[nombre]++;
  } else {
    carrito[nombre] = 1;
  }
  actualizarCarritoUI();
  flashBtnCarrito();
}

function cambiarCantidad(nombre, delta) {
  if (!carrito[nombre]) return;
  carrito[nombre] += delta;
  if (carrito[nombre] <= 0) delete carrito[nombre];
  actualizarCarritoUI();
}

function eliminarDelCarrito(nombre) {
  delete carrito[nombre];
  actualizarCarritoUI();
}

function limpiarCarrito() {
  carrito = {};
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const total = Object.values(carrito).reduce((s, v) => s + v, 0);
  const badge = document.getElementById('carrito-badge');
  const vaciomsg = document.getElementById('carrito-vacio-msg');
  const footer = document.getElementById('carrito-footer');
  const bar = document.getElementById('confirmar-pedido-bar');
  const resumen = document.getElementById('resumen-carrito-texto');

  // Badge en el navbar
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  // Sincronización del badge flotante (FAB)
  const fab = document.getElementById('fab-carrito');
  const fabBadge = document.getElementById('fab-badge');
  if (fab && fabBadge) {
    if (total > 0) {
      const newBadge = fabBadge.cloneNode(true);
      newBadge.textContent = total > 99 ? '99+' : total;
      newBadge.style.display = 'flex';
      fabBadge.parentNode.replaceChild(newBadge, fabBadge);
      fab.classList.add('tiene-items');
    } else {
      fabBadge.style.display = 'none';
      fabBadge.textContent   = '';
      fab.classList.remove('tiene-items');
    }
  }

  const itemsDiv = document.getElementById('carrito-items');
  if (!itemsDiv) return;

  if (total === 0) {
    if (vaciomsg) vaciomsg.style.display = 'block';
    if (footer) footer.style.display = 'none';
    if (bar) bar.classList.remove('visible');
    
    Array.from(itemsDiv.children).forEach(c => {
      if (c.id !== 'carrito-vacio-msg') c.remove();
    });
    return;
  }

  if (vaciomsg) vaciomsg.style.display = 'none';
  if (footer) footer.style.display = 'block';

  // Limpiar renderizado anterior
  Array.from(itemsDiv.children).forEach(c => {
    if (c.id !== 'carrito-vacio-msg') c.remove();
  });

  // Renderizar cada plato del carrito
  Object.entries(carrito).forEach(([nombre, qty]) => {
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <div class="carrito-item-name">${nombre}</div>
      <div class="carrito-qty">
        <button class="qty-minus" onclick="cambiarCantidad('${nombre.replace(/'/g,"\\'")}', -1)">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-plus" onclick="cambiarCantidad('${nombre.replace(/'/g,"\\'")}', 1)">+</button>
      </div>
      <button class="carrito-item-del" onclick="eliminarDelCarrito('${nombre.replace(/'/g,"\\'")}')">🗑</button>
    `;
    itemsDiv.appendChild(div);
  });

  // Mostrar la barra inferior de confirmación
  if (bar) {
    bar.classList.add('visible');
    const lista = Object.entries(carrito).map(([n,q]) => `${q}× ${n}`).join(', ');
    if (resumen) {
      resumen.innerHTML = `🛒 <strong>${total} item${total!==1?'s':''}</strong>: ${lista}`;
    }
  }
}

function confirmarPedido() {
  if (Object.keys(carrito).length === 0) return;
  const lineas = Object.entries(carrito)
    .map(([nombre, qty]) => `• ${qty}x ${nombre}`)
    .join('\n');
  const msg = encodeURIComponent(
    `Hola FUGAZZA 🍕, quiero hacer un pedido:\n\n${lineas}\n\n¿Me podés confirmar el precio total? ¡Gracias!`
  );
  window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
}

function abrirCarrito() {
  document.getElementById('carrito-overlay').classList.add('open');
  document.getElementById('carrito-drawer').classList.add('open');
}

function cerrarCarrito() {
  document.getElementById('carrito-overlay').classList.remove('open');
  document.getElementById('carrito-drawer').classList.remove('open');
}

function flashBtnCarrito() {
  const btn = document.getElementById('btn-carrito-nav');
  if (!btn) return;
  btn.style.background = 'var(--teal)';
  btn.style.color = 'white';
  setTimeout(() => {
    btn.style.background = '';
    btn.style.color = '';
  }, 400);
}

/* ──────────────────────────────────────────────────────────────────
   3. RENDERIZADO DEL MENÚ Y TABS
   ────────────────────────────────────────────────────────────────── */

const cartSVG = `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;

function renderPlatos(key) {
  const grid = document.getElementById(`grid-${key}`);
  if (!grid) return;
  if (!MENU[key]) return;
  
  grid.innerHTML = MENU[key].map(p => {
    const fallback = PLACEHOLDERS[key];
    return `
      <div class="plato-card">
        <img class="plato-img"
             src="${p.img}"
             alt="${p.name}"
             loading="lazy"
             onerror="this.src='${fallback}'; this.onerror=null;">
        <div class="plato-body">
          <div class="plato-name">${p.name}</div>
          <div class="plato-desc">${p.desc}</div>
          <div class="plato-footer">
            <button class="btn-add-cart" onclick="agregarAlCarrito('${p.name.replace(/'/g,"\\'")}')">
              ${cartSVG} Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Inicializar render de platos
if (typeof MENU !== 'undefined') {
  Object.keys(MENU).forEach(renderPlatos);
}

// Manejo de tabs en el Menú
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const categoryTab = document.getElementById('tab-' + btn.dataset.tab);
    if (categoryTab) categoryTab.classList.add('active');
  });
});

/* ──────────────────────────────────────────────────────────────────
   4. PIZZA MITAD Y MITAD
   ────────────────────────────────────────────────────────────────── */

function poblarSelectsMitad() {
  if (typeof MENU === 'undefined' || !MENU.pizzas) return;
  const nombres = MENU.pizzas.map(p => p.name);
  ['mitad-gusto1','mitad-gusto2'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    nombres.forEach(nombre => {
      const opt = document.createElement('option');
      opt.value = nombre;
      opt.textContent = nombre;
      sel.appendChild(opt);
    });
  });
}
poblarSelectsMitad();

function agregarMitadMitad() {
  const g1 = document.getElementById('mitad-gusto1').value;
  const g2 = document.getElementById('mitad-gusto2').value;
  if (!g1 || !g2) {
    alert('Por favor elegí los dos gustos para la pizza Mitad y Mitad.');
    return;
  }
  if (g1 === g2) {
    alert('Los dos gustos son iguales. ¡Elegí gustos distintos!');
    return;
  }
  const nombre = `Pizza Mitad ${g1} / Mitad ${g2}`;
  agregarAlCarrito(nombre);
}

/* ──────────────────────────────────────────────────────────────────
   5. GALERÍA - LIGHTBOX
   ────────────────────────────────────────────────────────────────── */

const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');

function openLightbox(src) { 
  if (lbImg && lb) {
    lbImg.src = src; 
    lb.classList.add('active'); 
  }
}

const lbClose = document.getElementById('lightbox-close');
if (lbClose) {
  lbClose.addEventListener('click', () => lb.classList.remove('active'));
}

if (lb) {
  lb.addEventListener('click', e => { 
    if (e.target === lb) lb.classList.remove('active'); 
  });
}

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape' && lb) lb.classList.remove('active'); 
});

/* ──────────────────────────────────────────────────────────────────
   6. ANIMACIÓN DE INTRO (PORTONES Y NEÓN)
   ────────────────────────────────────────────────────────────────── */

window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const neon  = document.getElementById('neon-text');

  setTimeout(() => {
    if (intro) intro.classList.add('open');

    setTimeout(() => {
      if (neon) neon.classList.add('encendido');

      setTimeout(() => {
        if (intro) {
          intro.style.transition = 'opacity 0.6s ease';
          intro.style.opacity = '0';
        }

        setTimeout(() => {
          if (intro) intro.style.display = 'none';
          document.body.classList.add('unlocked');
          
          const navbar = document.getElementById('navbar');
          if (navbar) navbar.classList.add('visible');
          
          const heroContent = document.getElementById('heroContent');
          if (heroContent) heroContent.classList.add('visible');
          
          initPromoBanner();
        }, 600);

      }, 1400);

    }, 600);

  }, 1300);
});

/* ──────────────────────────────────────────────────────────────────
   7. COPIAR LINK Y GENERACIÓN DE QR
   ────────────────────────────────────────────────────────────────── */

function copiarLink() {
  const input = document.getElementById('share-url-input');
  const btn   = document.getElementById('btn-copy-link');
  if (!input || !btn) return;
  
  const url = input.dataset.url || input.value;
  navigator.clipboard.writeText(url).then(() => {
    btn.textContent = '✓ ¡Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar link`;
      btn.classList.remove('copied');
    }, 2500);
  }).catch(() => {
    input.select();
    document.execCommand('copy');
    btn.textContent = '✓ ¡Copiado!';
    setTimeout(() => { 
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar link`;
    }, 2500);
  });
}

function generarQR() {
  const input = document.getElementById('share-url-input');
  const url = (input && input.dataset.url) ? input.dataset.url : (typeof SITE_URL !== 'undefined' ? SITE_URL : window.location.href);
  const container = document.getElementById('qr-container');
  if (!container) return;
  container.innerHTML = '';
  
  try {
    // eslint-disable-next-line no-undef
    new QRCode(container, {
      text:          url,
      width:         98,
      height:        98,
      colorDark:     '#120A04',
      colorLight:    '#FFFFFF',
      correctLevel:  QRCode.CorrectLevel.M,
    });
  } catch(e) {
    // Fallback QR API
    const img = document.createElement('img');
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=98x98&data=' + encodeURIComponent(url);
    img.alt = 'QR Fugazza';
    img.style.width = '98px';
    img.style.height = '98px';
    container.appendChild(img);
  }
}

// Patch inicial para la URL de compartir
(function(){
  const inp = document.getElementById('share-url-input');
  if(inp && typeof SITE_URL !== 'undefined'){
    inp.dataset.url = SITE_URL;
    inp.value = SITE_URL;
  }
})();

/* ──────────────────────────────────────────────────────────────────
   8. INTERSECTION OBSERVER (REVEAL ANIMATIONS)
   ────────────────────────────────────────────────────────────────── */

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ──────────────────────────────────────────────────────────────────
   9. NAVEGACIÓN MOBILE
   ────────────────────────────────────────────────────────────────── */

function toggleMobileNav() {
  const panel  = document.getElementById('nav-mobile-panel');
  const toggle = document.getElementById('nav-toggle');
  if (!panel || !toggle) return;

  const isOpen = panel.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  
  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    spans[1].style.cssText = 'opacity:0';
    spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    spans[0].style.cssText = spans[1].style.cssText = spans[2].style.cssText = '';
  }
}

function closeMobileNav() {
  const panel  = document.getElementById('nav-mobile-panel');
  const toggle = document.getElementById('nav-toggle');
  if (!panel || !toggle) return;

  panel.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
  const spans = toggle.querySelectorAll('span');
  spans[0].style.cssText = spans[1].style.cssText = spans[2].style.cssText = '';
}

// Cerrar panel mobile si se hace click fuera
document.addEventListener('click', function(e) {
  const panel  = document.getElementById('nav-mobile-panel');
  const toggle = document.getElementById('nav-toggle');
  if (panel && panel.classList.contains('open') &&
      !panel.contains(e.target) && !toggle.contains(e.target)) {
    closeMobileNav();
  }
});
