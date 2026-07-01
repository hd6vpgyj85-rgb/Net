# Hinetly — Tu negocio, en línea.

Web estática (una sola página) de **Hinetly**, agencia de landing pages y
tiendas online para negocios locales. No necesita servidor, ni programas, ni
saber programar. Son archivos sueltos que funcionan solos.

---

## 1. Cómo ver la web en tu computadora

Haz **doble clic** en el archivo **`index.html`**. Se abre en tu navegador
(Chrome, Edge, Safari…) y listo. Funciona sin internet salvo las tipografías.

---

## 2. Cómo subirla a Hostinger (sin tocar nada técnico)

1. Entra a tu panel de **Hostinger** → **Administrador de archivos**
   (File Manager).
2. Abre la carpeta **`public_html`** de tu dominio.
3. **Arrastra toda esta carpeta** (todos los archivos y subcarpetas:
   `index.html`, `styles/`, `lib/`, `assets/`, `.htaccess`) dentro de
   `public_html`.
   - Si Hostinger te deja subir una carpeta comprimida `.zip`, súbela y luego
     usa **Extraer** dentro de `public_html`.
4. Entra a tu dominio en el navegador. Ya está publicada.

> Sube **todos** los archivos tal como están. No cambies los nombres de las
> carpetas `styles`, `lib` ni `assets`.

---

## 3. Cómo editar textos, precios y proyectos (lo importante)

Casi todo lo editable está en **un solo archivo**:

```
lib/hinetly-manifest.js
```

Ábrelo con el **Bloc de notas** (Windows) o **TextEdit** (Mac), o cualquier
editor. Cambia solo el texto **entre comillas** `" "`. **No borres** las
comillas, las comas `,` ni las llaves `{ }`.

### Cambiar tu número de WhatsApp  ⭐ (lo más importante)

Busca dentro de `lib/hinetly-manifest.js` el bloque `contacto:` y edita:

```js
whatsapp: "521234567890",            // ← tu número, con código de país y SIN +, espacios ni signos
whatsappVisible: "+52 123 456 7890", // ← cómo se ve en pantalla
```

- México: es `52` + `1` + tus 10 dígitos. Ejemplo para 55 1234 5678 →
  `"5215512345678"`.
- El botón de WhatsApp ya lleva un mensaje escrito automáticamente; puedes
  cambiarlo en `mensajeWhatsapp`.

### Cambiar precios o lo que incluye cada servicio

En el bloque `servicios:` edita `precio`, `lema` o las líneas de `incluye`.
Ejemplo:

```js
precio: "$500 MXN",
incluye: [
  "Diseño a medida, no plantilla genérica",
  "Mobile-first: impecable en celular"
],
```

### Cambiar o añadir proyectos del portafolio

En el bloque `portafolio:` cada proyecto es un grupo `{ ... }`:

```js
{
  nombre: "PadelBros",
  tipo: "Tienda · Shopify",
  url: "https://padelbrosmx.com/collections/palas-de-padel",
  imagen: "assets/portfolio/padelbros.webp"
}
```

- Para **añadir** un proyecto: copia un grupo `{ ... }` completo, pégalo y
  ponle una coma `,` antes. Cambia `nombre`, `tipo`, `url` e `imagen`.
- Para **quitar** uno: borra su grupo `{ ... }` (y la coma sobrante).
- La **imagen** debe estar dentro de `assets/portfolio/`. Puedes sustituir las
  imágenes actuales por capturas reales de tus sitios (mismo nombre de archivo
  y listo, o usa un nombre nuevo y actualiza la ruta en `imagen`).

### Cambiar el proceso, Instagram, horario, eslogan…

Todo está en `lib/hinetly-manifest.js`, en bloques con nombres claros: `proceso`,
`contacto`, `brand`. Edita el texto entre comillas y guarda.

### Plantillas por sector (sección "Plantillas")

Están en el bloque `plantillas` de `lib/hinetly-manifest.js`. Cada **sector**
(Restaurantes, Estéticas…) tiene una lista `items` con las plantillas, y cada
plantilla es `{ nombre: "...", url: "..." }`. Al hacer clic en un sector se
muestran sus plantillas; cada tarjeta abre el sitio en una pestaña nueva.

- Para **añadir una plantilla** a un sector: copia una línea
  `{ nombre: "...", url: "..." }` dentro de su `items` (con una coma antes).
- Para **añadir un sector nuevo**: copia un bloque `{ id, sector, items }`
  completo. El `id` va sin espacios ni acentos (ej. `"mascotas"`).
- El aviso de "imágenes hechas con IA" se edita en `notaPlantillasIA`.

### Tienda de peluches (sección "Tienda") y foto de portada  🧸

Los peluches a la venta están en el bloque `productos` de
`lib/hinetly-manifest.js` (nombre, precio e imagen de cada uno). Para añadir o
quitar uno, copia/borra su grupo `{ ... }`, igual que en el portafolio.

**Las fotos van en la carpeta `assets/products/`** con estos nombres exactos:

```
portada-garfield.jpg   ← foto de PORTADA (fondo del hero)
cinnamoroll.jpg        ← peluche Cinnamoroll Conejito
snoopy.jpg             ← peluche Snoopy
osito.jpg              ← peluche Osito Caramelo
conejito.jpg           ← peluche Conejito Blanco
```

- Si una foto todavía no está, **el sitio no se rompe**: el hero se ve oscuro y
  la tarjeta del peluche muestra un recuadro vacío hasta que subas la imagen.
- Si quieres usar otro nombre de archivo o `.png` en vez de `.jpg`, cámbialo
  también en `lib/hinetly-manifest.js` (campo `imagen`). Para la **portada**,
  el nombre se cambia en `styles/hinetly.css` (busca `portada-garfield`).
- La portada se ve **a pantalla completa de fondo en el celular** y **a la
  derecha (en horizontal) en computadora**. Una foto vertical funciona bien en
  ambos.
- Hay una guía rápida dentro de la propia carpeta: `assets/products/LEEME.txt`.

---

## 4. Si cambias algo y NO se ve actualizado

El navegador guarda copias en caché. Soluciones, en orden:

1. Pulsa **Ctrl + F5** (Windows) o **Cmd + Shift + R** (Mac) para recargar
   forzado. En el móvil, cierra la pestaña y vuelve a abrirla.
2. En Hostinger, los archivos CSS y JS están configurados (en `.htaccess`)
   para refrescarse en **1 hora** como máximo, así que tus cambios aparecen
   solos al poco rato.
3. Si usas la **caché de Hostinger** (LiteSpeed), vacíala desde el panel:
   *Sitios web → Administrar → Caché → Purgar todo*.

---

## 5. Qué hay en cada carpeta

```
index.html                       La página (contenido principal, ya escrito).
styles/hinetly.css               El diseño (colores, tipografías, animaciones).
lib/hinetly-manifest.js          ⭐ TUS DATOS editables (textos, precios, WhatsApp…).
lib/hinetly-main.js              Las animaciones e interacciones.
lib/hinetly-gsap.min.js          Librería de animación (local, no usa internet).
lib/hinetly-scrolltrigger.min.js Animaciones al hacer scroll (local).
assets/portfolio/                Imágenes de los proyectos del portafolio.
assets/products/                 ⭐ Fotos de la tienda de peluches y la portada.
.htaccess                        Ajustes del servidor (caché, seguridad). Opcional.
```

---

## 6. Notas

- La web está pensada para **arrastrar y subir**: no hay que instalar ni
  compilar nada.
- Las únicas conexiones a internet son las **tipografías de Google**. Si no
  hay internet, se usan tipografías de respaldo y la web se sigue viendo bien.
- Si algún archivo da problemas en tu hosting, puedes borrar `.htaccess`: la
  web seguirá funcionando.

**Hinetly — Tu negocio, en línea.**
