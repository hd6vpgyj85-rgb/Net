/* ============================================================================
   HINETLY · manifest.js  —  PANEL DE CONTROL EDITABLE
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para editar la web.
   Ábrelo con el Bloc de notas (o cualquier editor) y cambia los textos
   entre comillas. NO borres las comillas, las comas ni las llaves { }.

   Después de guardar:
     1) Sube el archivo a Hostinger (File Manager → carpeta del sitio).
     2) En tu navegador pulsa Ctrl + F5 para ver los cambios.

   Si algo no se actualiza, pulsa Ctrl + F5 (o Cmd + Shift + R en Mac)
   para recargar sin caché.
   ========================================================================== */

window.__HINETLY__ = {

  /* ---- MARCA --------------------------------------------------------------
     Nombre, eslogan y textos de cabecera. */
  brand: {
    nombre: "Hinetly",
    eslogan: "Tu negocio, en línea.",
    descripcion: "Landing pages y tiendas online para negocios locales. " +
                 "Se entregan rápido, se ven bien y funcionan sin errores.",
    kicker: "Landing pages · Tiendas online · Shopify · Hostinger",
    anioCopyright: "2026"
  },

  /* ---- CONTACTO -----------------------------------------------------------
     ↓↓↓  AQUÍ CAMBIAS TU NÚMERO DE WHATSAPP  ↓↓↓
     Escríbelo con código de país y SIN espacios, signos ni el símbolo +.
     Ejemplo México: 52 + 10 dígitos  ->  "5215512345678"
     (El "1" después del 52 es el formato de WhatsApp para México). */
  contacto: {
    whatsapp: "5216568596503",                 // <-- TU NÚMERO AQUÍ
    whatsappVisible: "+52 656 859 6503",       // como se muestra en pantalla
    mensajeWhatsapp: "Hola Hinetly, quiero cotizar una web para mi negocio.",
    instagram: "https://www.instagram.com/net._.ly",
    instagramVisible: "@net._.ly",
    horario: "Respuesta en menos de 24 h · Lun a Sáb"
  },

  /* ---- SERVICIOS (sección 01) --------------------------------------------
     Los dos paquetes principales. Edita precios e incluye libremente.
     Cada línea de "incluye" es un elemento entre comillas separado por coma. */
  servicios: [
    {
      id: "landing",
      indice: "01",
      nombre: "Landing Page",
      precio: "$500 MXN",
      precioNota: "proyecto entregado",
      icono: "page",                            // page | cart  (icono line-art)
      lema: "Una página que vende sin necesitar más.",
      incluye: [
        "Diseño a medida, no plantilla genérica",
        "Mobile-first: impecable en celular",
        "Formulario de contacto directo a WhatsApp",
        "Hosting en Hostinger listo para usar",
        "Entrega en pocos días"
      ],
      ctaWhatsapp: "Hola Hinetly, quiero cotizar una LANDING PAGE para mi negocio."
    },
    {
      id: "tienda",
      indice: "02",
      nombre: "Tienda Online",
      precio: "$1,000–2,000 MXN",
      precioNota: "según catálogo",
      icono: "cart",
      lema: "Tu catálogo, listo para vender 24/7.",
      incluye: [
        "Tienda en Shopify o Hostinger",
        "Catálogo de productos completo",
        "Carrito y pago en línea",
        "Diseño a medida de tu marca",
        "Capacitación básica para administrarla tú mismo"
      ],
      ctaWhatsapp: "Hola Hinetly, quiero cotizar una TIENDA ONLINE para mi negocio."
    }
  ],

  /* ---- PORTAFOLIO (sección 02) -------------------------------------------
     Proyectos reales. Para cada uno:
       - nombre: el título visible
       - tipo: texto corto (ej. "Tienda · Shopify" / "Landing")
       - url: el enlace al sitio en vivo (se abre en pestaña nueva)
       - imagen: ruta a la captura/poster dentro de assets/portfolio/
     Para añadir un proyecto, copia un bloque { ... } completo y pégalo
     con una coma antes. Para quitarlo, borra su bloque (y la coma sobrante). */
  portafolio: [
    {
      nombre: "PadelBros",
      tipo: "Tienda · Shopify",
      detalle: "Palas de pádel",
      url: "https://padelbrosmx.com/collections/palas-de-padel",
      imagen: "assets/portfolio/padelbros.webp"
    },
    {
      nombre: "Artly",
      tipo: "Landing",
      detalle: "Marca creativa",
      url: "https://artly-byabi.netlify.app/",
      imagen: "assets/portfolio/artly.webp"
    },
    {
      nombre: "Yukly Store",
      tipo: "Tienda online",
      detalle: "Comercio local",
      url: "https://yukly-store.netlify.app/",
      imagen: "assets/portfolio/yukly.webp"
    },
    {
      nombre: "Sunny",
      tipo: "Landing",
      detalle: "Negocio local",
      url: "https://sunny-crostata-82248f.netlify.app/",
      imagen: "assets/portfolio/sunny.webp"
    },
    {
      nombre: "Willowy",
      tipo: "Landing",
      detalle: "Negocio local",
      url: "https://willowy-cassata-a92e97.netlify.app/",
      imagen: "assets/portfolio/willowy.webp"
    }
  ],

  /* ---- PROCESO (sección 03) ----------------------------------------------
     Los pasos de cómo trabajas. Cada uno: título corto + una línea. */
  proceso: [
    {
      indice: "01",
      titulo: "Brief y referencias",
      texto: "Me cuentas tu negocio y me pasas ejemplos que te gustan. Sin tecnicismos."
    },
    {
      indice: "02",
      titulo: "Propuesta y precio",
      texto: "Te doy un precio cerrado y un plazo claro antes de empezar. Cero sorpresas."
    },
    {
      indice: "03",
      titulo: "Diseño y desarrollo",
      texto: "Construyo tu web a medida, mobile-first, con tu marca y tu contenido."
    },
    {
      indice: "04",
      titulo: "Entrega y subida",
      texto: "La dejo lista y publicada en Hostinger o Shopify. Tú solo recibes el enlace."
    },
    {
      indice: "05",
      titulo: "Soporte post-entrega",
      texto: "Te acompaño los primeros días para ajustes y para que sepas administrarla."
    }
  ],

  /* ---- NAVEGACIÓN ---------------------------------------------------------
     Etiquetas del menú. El "href" apunta a las secciones por ancla. */
  nav: [
    { num: "01", label: "Servicios",  href: "#servicios" },
    { num: "02", label: "Portafolio", href: "#portafolio" },
    { num: "03", label: "Proceso",    href: "#proceso" },
    { num: "04", label: "Contacto",   href: "#contacto" }
  ],

  /* ---- MARQUEES -----------------------------------------------------------
     Frases que se desplazan en bucle. Edita o añade entre comillas. */
  marqueeHero: [
    "Landing pages", "Tiendas online", "Shopify", "Hostinger",
    "Negocios locales", "Entrega rápida", "Tu negocio, en línea"
  ],
  marqueeServicios: [
    "Shopify", "Hostinger", "Diseño a medida", "Mobile-first",
    "Entrega rápida", "Sin errores"
  ]
};
