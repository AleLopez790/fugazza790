# 🍕 FUGAZZA — Pizzería & Casa de Comidas · Salta

Sitio web oficial de **Fugazza**, 12 de Octubre 790, Salta Capital, Argentina.

## 🚀 Deploy en GitHub Pages — 5 pasos

1. Crear cuenta en [github.com](https://github.com) (gratis)
2. Nuevo repositorio → nombre: `fugazza` → público
3. Subir **todos** estos archivos (arrastrá la carpeta o usá `git push`)
4. Ir a **Settings → Pages → Source: Deploy from branch → main / root → Save**
5. En ~2 minutos la web estará en `https://TU_USUARIO.github.io/fugazza/`

### Después del deploy: actualizar 2 líneas en index.html

```html
<!-- Reemplazá "fugazza790" por tu usuario de GitHub -->
<link rel="canonical" href="https://TU_USUARIO.github.io/fugazza/">
<meta property="og:url" content="https://TU_USUARIO.github.io/fugazza/">
```

---

## 📁 Estructura del proyecto

```
fugazza/
├── index.html              ← Web completa (107KB)
├── img/                    ← 38 imágenes del local y platos
│   ├── local-nosotros.jpg
│   ├── fachada-nocturna-cartel.jpg
│   ├── pizza-hawaiana.jpg
│   ├── empanada-arabe.jpg
│   ├── papas-con-cheddar.jpg
│   ├── papas-con-cheddar-y-bacon.jpg
│   └── ... (32 más)
└── README.md
```

---

## ✏️ Cómo editar la promo del día

Abrí `index.html`, buscá `PROMO_CONFIG` (está al inicio del JS) y editá:

```js
const PROMO_CONFIG = {
  activo:  true,                              // true = visible | false = oculto
  mensaje: "Hoy: 2x1 en pizzas hasta las 21 hs",
  icono:   "🔥",                              // cualquier emoji
  color:   "naranja"  // naranja | verde | amarillo | azul | violeta
};
```

Guardá el archivo → subí a GitHub → listo, el cambio es instantáneo.

---

## 📱 Funcionalidades

| Característica | Estado |
|---|---|
| Animación portones + cartel neón | ✅ |
| Menú digital por categorías (7 tabs) | ✅ |
| Carrito acumulativo para WhatsApp | ✅ |
| Botón flotante (FAB) de carrito | ✅ |
| Banner de promo del día configurable | ✅ |
| Galería Pinterest con lightbox | ✅ |
| Google Maps embebido | ✅ |
| Botones WhatsApp + PedidosYa | ✅ |
| Menú hamburguesa responsive | ✅ |
| SEO completo (meta, OG, Schema.org) | ✅ |
| Carga rápida (sin base64, lazy load) | ✅ |

---

## 📞 Datos del local

- 📍 12 de Octubre 790, Salta Capital
- 📱 WhatsApp: 3874-854544
- 📸 Instagram: [@fugazza790](https://instagram.com/fugazza790)
- 🛵 PedidosYa: [ver menú](https://www.pedidosya.com.ar/restaurantes/salta/fugazza-salta-5e74e9f3-9b9e-40fc-ab33-1fa2c42ff46d-menu)
- 🕐 Horarios: 10:00–14:00 y 18:00–02:00 (todos los días)
