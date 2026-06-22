/* ═══════════════════════════════════════════════════════════════════
   FUGAZZA – Configuración General y Datos de la Carta
   Edita este archivo para modificar la información del local, la promo
   del día o agregar/editar productos de la carta.
   ═══════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════
   1. DIRECCIÓN URL DEL SITIO (Para el QR)
   ══════════════════════════════════════ */
const SITE_URL = "https://fugazza.com.ar"; // Cambia aquí tu URL real

/* ══════════════════════════════════════
   2. TELÉFONO DE WHATSAPP (Para pedidos)
   ══════════════════════════════════════ */
const WA = "543874854544"; // Código de país + código de área + número sin espacios ni guiones

/* ══════════════════════════════════════
   3. BANNER DE PROMOCIÓN DEL DÍA
   ──────────────────────────────────────
   activo  → true = banner visible | false = banner oculto
   mensaje → el texto que ven tus clientes
   icono   → cualquier emoji (🔥 ⭐ 🕐 📢 🛵 🎉 🍕 💥 🆕)
   color   → naranja | verde | amarillo | azul | violeta
   ══════════════════════════════════════ */
const PROMO_CONFIG = {
  activo:  true,
  mensaje: "🍕Tu cabala es FUGAZZA!! llevandote dos Pizzas o dos Sandwich TE LLEVAS UNA GASEOSA DE REGALO!! ",
  icono:   "🔥",
  color:   "naranja"
};

/* ══════════════════════════════════════
   4. IMÁGENES POR DEFECTO (PLACEHOLDERS)
   Si la imagen de un plato falla al cargar, se mostrará esta por defecto.
   ══════════════════════════════════════ */
const PLACEHOLDERS = {
  pizzas:     './img/pizza-hawaiana.jpg',
  rellenas:   './img/calzon-artesanal.jpg',
  calzones:   './img/calzon-artesanal.jpg',
  sandwiches: './img/super-sandwich.jpg',
  milanesas:  './img/milanesa-napolitana.jpg',
  empanadas:  './img/empanada-arabe.jpg',
  papas:      './img/papas-con-cheddar.jpg',
};

/* ══════════════════════════════════════
   5. CARTA DE PLATOS
   Puedes agregar, quitar o modificar cualquier plato aquí.
   Las imágenes locales corresponden a la carpeta ./img/.
   Si prefieres fotos de internet, usa enlaces de tipo https://.
   ══════════════════════════════════════ */
const MENU = {
  pizzas: [
    { name:"Pizza Anchoas",              desc:"Salsa, mozzarella y anchoas",                                     img:"./img/pizza-anchoa.png" },
    { name:"Pizza Amadeus",              desc:"Cebolla, mozzarella y roquefort",                                 img:"./img/pizza-amadeus.png" },
    { name:"Pizza a Caballo",            desc:"Salsa, mozzarella, huevos fritos y papas fritas",                 img:"./img/pizza-a-caballo.png" },
    { name:"Pizza Calabresa",            desc:"Salsa, mozzarella y cantimpalo",                                  img:"./img/pizza-calabresa.png" },
    { name:"Pizza Champiñon",            desc:"Salsa, mozzarella, champiñones, tomate cherry y rúcula",          img:"./img/pizza-champignon.png" },
    { name:"Pizza Cherry y Albahaca",    desc:"Salsa, mozzarella, tomates cherry y albahaca",                   img:"./img/pizza-cherry-albahaca.png" },
    { name:"Pizza Cuatro Quesos",        desc:"Salsa, mozzarella, roquefort, provolone y parmesano",             img:"./img/pizza-cuatro-quesos.png" },
    { name:"Pizza Especial",             desc:"Salsa, mozzarella, jamón cocido y ajíes",                         img:"./img/pizza-especial.png" },
    { name:"Pizza Fuga Suave",           desc:"Mozzarella y cebolla caramelizada",                               img:"./img/pizza-fuga-suave.png" },
    { name:"Pizza Fugazzeta",            desc:"Mozzarella y cebolla en juliana",                                 img:"./img/pizza-fugazzeta.png" },
    { name:"Pizza Gallega",              desc:"Salsa, mozzarella, jamón crudo y morrones",                       img:"./img/pizza-gallega.png" },
    { name:"Pizza Hawaiana",             desc:"Mozzarella, jamón cocido y ananá",                                img:"./img/pizza-hawaiana.png" },
    { name:"Pizza Jamón y Morrones",     desc:"Salsa, mozzarella, jamón cocido y morrones",                     img:"./img/pizza-jamon-y-morrones.png" },
    { name:"Pizza Mozzarella",           desc:"Salsa y mozzarella",                                              img:"./img/pizza-mozarella.png" },
    { name:"Pizza Napolitana",           desc:"Salsa, mozzarella y tomates",                                     img:"./img/pizza-napolitana.png" },
    { name:"Pizza Napolitana Especial",  desc:"Salsa, mozzarella, jamón cocido, parmesano y tomates",           img:"./img/pizza-napolitana-especial.png" },
    { name:"Pizza Palmitos",             desc:"Jamón cocido, mozzarella, palmitos, huevo duro y roquefort",      img:"./img/pizza-palmitos.png" },
    { name:"Pizza Roquefort",            desc:"Salsa, mozzarella y roquefort",                                   img:"./img/pizza-roquefort.png" },
    { name:"Pizza Turca",                desc:"Salsa, mozzarella, tomates y ajo",                                img:"./img/pizza-turca.png" },
  ],
  rellenas: [
    { name:"Pizza Calabria",             desc:"Masa, mozzarella, cebolla, calabresa, cubierta con cebolla y parmesano",    img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=75" },
    { name:"Fugazzeta Rellena",          desc:"Masa, mozzarella, cebolla, cubierta con cebolla y parmesano",               img:"https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&q=75" },
    { name:"Fugazzeta Rellena Especial", desc:"Masa, mozzarella, cebolla, jamón cocido, parmesano, morrones y cebolla",   img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=75" },
  ],
  calzones: [
    { name:"Calzón Calabresa",    desc:"Mozzarella, calabresa, tomate cocido, jamón, parmesano y orégano",       img:"./img/calzon-calabresa.jpg" },
    { name:"Calzón Cuatro Quesos",desc:"Mozzarella, parmesano, roquefort, provolone, tomate y jamón",            img:"./img/calzon-cuatro-quesos.jpg" },
    { name:"Calzón Fugazza",      desc:"Mozzarella, cebolla caramelizada, champiñones, tomates cherry y jamón",  img:"./img/calzon-fugazza.jpg" },
    { name:"Calzón Hawaiano",     desc:"Mozzarella, jamón y ananá",                                              img:"./img/calzon-hawaiano.jpg" },
    { name:"Calzón Napolitano",   desc:"Mozzarella, tomate, jamón cocido, parmesano y orégano",                  img:"./img/calzon-napolitano.jpg" },
    { name:"Calzón Palmitos",     desc:"Mozzarella, palmitos, salsa golf, huevo duro, tomates, parmesano y jamón", img:"./img/calzon-palmitos.jpg" },
  ],
  sandwiches: [
    { name:"Sándwich Milanesa",   desc:"Milanesa en pan de campo, a tu gusto",        img:"./img/sandwich-milanesa.jpg" },
    { name:"Sándwich Lomito",     desc:"Lomo jugoso con lechuga, tomate y mayo",       img:"./img/sandwich-lomito.jpg" },
    { name:"Súper Mila",          desc:"Milanesa con jamón, queso y extras",           img:"./img/super-mila.jpg" },
    { name:"Súper Lomo",          desc:"Lomito completo con todos los aderezos",       img:"./img/super-lomo.jpg" },
    { name:"Hamburguesa",         desc:"Hamburguesa casera con lechuga y tomate",      img:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=75" },
  ],
  milanesas: [
    { name:"Milanesa Fugazza",     desc:"Milanesa con salsa, mozzarella y cebolla",    img:"./img/milanesa-fugazza.jpg" },
    { name:"Milanesa Napolitana",  desc:"Clásica milanesa con salsa y mozzarella",     img:"./img/milanesa-napolitana.jpg" },
    { name:"Milanesa a Caballo",   desc:"Milanesa con huevos fritos encima",           img:"./img/milanesa-a-caballo.jpg" },
    { name:"Milanesa al Roquefort",desc:"Milanesa con salsa de roquefort derretido",   img:"./img/milanesa-al-roquefort.jpg" },
    { name:"Milanesa Calabresa",   desc:"Milanesa con cantimpalo y mozzarella",        img:"./img/milanesa-calabresa.jpg" },
    { name:"Milanesa Individual",  desc:"Milanesa sola, para armar como quieras",      img:"./img/milanesa-individual.jpg" },
  ],
  empanadas: [
    { name:"Empanada de Carne",    desc:"Relleno de carne especiada, jugosa y sabrosa", img:"./img/empanada-de-carne.jpg" },
    { name:"Empanada de Queso",    desc:"Relleno de queso cremoso derretido",            img:"./img/empanada-de-queso.jpg" },
    { name:"Empanada Árabe",       desc:"Relleno árabe tradicional con especias",        img:"./img/empanada-arabe.jpg" },
  ],
  papas: [
    { name:"Papas Fritas Individual",   desc:"Papas fritas crujientes",                      img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=75" },
    { name:"Papas con Cheddar",         desc:"Papas fritas bañadas en salsa de cheddar",      img:"./img/papas-con-cheddar.jpg" },
    { name:"Papas con Cheddar y Bacon", desc:"Papas con cheddar y bacon crocante",            img:"./img/papas-con-cheddar-y-bacon.jpg" },
  ],
};
