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
lib/manifest.js
```

Ábrelo con el **Bloc de notas** (Windows) o **TextEdit** (Mac), o cualquier
editor. Cambia solo el texto **entre comillas** `" "`. **No borres** las
comillas, las comas `,` ni las llaves `{ }`.

### Cambiar tu número de WhatsApp  ⭐ (lo más importante)

Busca dentro de `lib/manifest.js` el bloque `contacto:` y edita:

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

Todo está en `lib/manifest.js`, en bloques con nombres claros: `proceso`,
`contacto`, `brand`. Edita el texto entre comillas y guarda.

---

## 4. Si cambias algo y NO se ve actualizado

El navegador guarda copias en caché. Soluciones, en orden:

1. Pulsa **Ctrl + F5** (Windows) o **Cmd + Shift + R** (Mac) para recargar
   forzado.
2. Si aún no cambia, abre **`index.html`** con el Bloc de notas y **sube el
   número de versión** `?v=20260629` a otra fecha, por ejemplo `?v=20260630`,
   en **todas** las líneas donde aparezca (al final de cada `styles/...` y
   `lib/...`). Guarda y vuelve a subir el archivo.

Eso obliga al navegador a cargar la versión nueva.

---

## 5. Qué hay en cada carpeta

```
index.html            La página (contenido principal, ya escrito).
styles/main.css       El diseño (colores, tipografías, animaciones).
lib/manifest.js       ⭐ TUS DATOS editables (textos, precios, WhatsApp…).
lib/main.js           Las animaciones e interacciones.
lib/gsap.min.js       Librería de animación (local, no usa internet).
lib/ScrollTrigger.min.js  Animaciones al hacer scroll (local).
assets/portfolio/     Imágenes de los proyectos del portafolio.
.htaccess             Ajustes del servidor (caché, seguridad). Opcional.
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
