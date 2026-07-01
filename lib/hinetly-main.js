/* ============================================================================
   HINETLY · main.js  —  enriquece la web (la web funciona aunque esto falle)
   IIFE clásico. Sin import/export. Cada init envuelto en safe().
   ========================================================================== */
(function () {
  "use strict";

  var M = (window.__HINETLY__) || {};

  /* ---- safe(): si una pieza falla, el resto sigue vivo ------------------ */
  function safe(fn, name) {
    try { fn(); } catch (e) {
      if (window.console) console.warn("[Hinetly] init falló:", name, e);
    }
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---- WhatsApp helpers -------------------------------------------------- */
  function waURL(msg) {
    var c = M.contacto || {};
    var num = (c.whatsapp || "521234567890").replace(/[^0-9]/g, "");
    var text = encodeURIComponent(msg || c.mensajeWhatsapp || "Hola Hinetly, quiero cotizar una web.");
    return "https://wa.me/" + num + "?text=" + text;
  }

  /* ====================================================================== */
  /*  SPLASH — Red de seguridad 2 (JS). La Red 1 es CSS a los 4.5s.         */
  /* ====================================================================== */
  function hideSplash() {
    var s = document.getElementById("splash");
    if (s) s.classList.add("is-done");
  }
  // se apaga al cargar todo, con tope de 2.6s pase lo que pase
  window.addEventListener("load", function () { setTimeout(hideSplash, 400); });
  setTimeout(hideSplash, 2600);

  /* ====================================================================== */
  /*  SYNC desde manifest.js (editable por el usuario)                      */
  /* ====================================================================== */

  function syncWhatsApp() {
    $all("[data-wa]").forEach(function (a) {
      var msg = a.getAttribute("data-wa-msg") || undefined;   // mensaje propio (ej. productos)
      if (!msg) {
        var card = a.closest ? a.closest(".svc-card") : null;
        if (card && M.servicios) {
          var id = card.getAttribute("data-svc");
          var svc = M.servicios.filter(function (s) { return s.id === id; })[0];
          if (svc) msg = svc.ctaWhatsapp;
        }
      }
      a.setAttribute("href", waURL(msg));
    });
  }

  function syncContacto() {
    var c = M.contacto || {};
    var b = M.brand || {};
    $all("[data-wa-visible]").forEach(function (n) { if (c.whatsappVisible) n.textContent = c.whatsappVisible; });
    $all("[data-ig]").forEach(function (n) { if (c.instagram) n.setAttribute("href", c.instagram); });
    $all("[data-ig-visible]").forEach(function (n) { if (c.instagramVisible) n.textContent = c.instagramVisible; });
    $all("[data-horario]").forEach(function (n) { if (c.horario) n.textContent = c.horario; });
    $all("[data-anio]").forEach(function (n) { if (b.anioCopyright) n.textContent = b.anioCopyright; });
  }

  // Sincroniza precios/nombres/incluye de los servicios (sin tocar el SVG)
  function syncServicios() {
    if (!M.servicios) return;
    M.servicios.forEach(function (svc) {
      var card = $('.svc-card[data-svc="' + svc.id + '"]');
      if (!card) return;
      var name = $(".svc-card__name", card); if (name) name.textContent = svc.nombre;
      var strong = $(".svc-card__price strong", card); if (strong) strong.textContent = svc.precio;
      var note = $(".svc-card__price span", card); if (note && svc.precioNota) note.textContent = svc.precioNota;
      var lema = $(".svc-card__lema", card); if (lema) lema.textContent = svc.lema;
      var list = $(".svc-card__list", card);
      if (list && svc.incluye && svc.incluye.length) {
        list.innerHTML = "";
        svc.incluye.forEach(function (it) {
          var li = document.createElement("li"); li.textContent = it; list.appendChild(li);
        });
      }
    });
  }

  // Reconstruye el portafolio desde manifest (idempotente)
  function mountPortafolio() {
    var grid = document.getElementById("workGrid");
    if (!grid || !M.portafolio || !M.portafolio.length) return;
    if (grid.getAttribute("data-mounted") === "1") return; // idempotente
    grid.setAttribute("data-mounted", "1");
    grid.innerHTML = "";
    M.portafolio.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "work-card";
      a.href = p.url; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("data-cursor", "ver");
      a.innerHTML =
        '<div class="work-card__img"><img src="' + p.imagen + '" alt="' +
          (p.nombre + " — " + p.tipo).replace(/"/g, "") + '" loading="lazy" /></div>' +
        '<div class="work-card__meta">' +
          '<span class="work-card__name"></span>' +
          '<span class="work-card__type mono"></span>' +
        '</div>';
      $(".work-card__name", a).textContent = p.nombre;
      $(".work-card__type", a).textContent = p.tipo;
      grid.appendChild(a);
    });
  }

  // Reconstruye la tienda de peluches desde manifest (idempotente)
  function mountProductos() {
    var grid = document.getElementById("shopGrid");
    if (!grid || !M.productos || !M.productos.length) return;
    if (grid.getAttribute("data-mounted") === "1") return; // idempotente
    grid.setAttribute("data-mounted", "1");
    grid.innerHTML = "";
    M.productos.forEach(function (p) {
      var msg = p.mensaje || ("Hola Hinetly, me interesa el peluche de " + p.nombre +
                              " (" + p.precio + "). ¿Sigue disponible?");
      var card = document.createElement("article");
      card.className = "prod-card";
      card.innerHTML =
        '<div class="prod-card__img"></div>' +
        '<div class="prod-card__info">' +
          '<div class="prod-card__row">' +
            '<h3 class="prod-card__name"></h3>' +
            '<span class="prod-card__price mono"></span>' +
          '</div>' +
          '<a class="btn btn--primary prod-card__cta" data-wa data-cursor="enviar">' +
            'Apartar <span aria-hidden="true">→</span></a>' +
        '</div>';
      if (p.imagen) $(".prod-card__img", card).style.backgroundImage = "url('" + p.imagen + "')";
      $(".prod-card__name", card).textContent = p.nombre;
      $(".prod-card__price", card).textContent = p.precio;
      var cta = $(".prod-card__cta", card);
      cta.setAttribute("data-wa-msg", msg);
      cta.setAttribute("href", waURL(msg));
      grid.appendChild(card);
    });
  }

  // Reconstruye Plantillas (sectores + sus sitios) desde manifest (idempotente)
  function mountPlantillas() {
    var tabs = document.getElementById("tplTabs");
    var panels = document.getElementById("tplPanels");
    if (!tabs || !panels || !M.plantillas || !M.plantillas.length) return;
    if (panels.getAttribute("data-mounted") === "1") return;
    panels.setAttribute("data-mounted", "1");
    tabs.innerHTML = ""; panels.innerHTML = "";
    M.plantillas.forEach(function (sec, i) {
      var n = (sec.items && sec.items.length) || 0;
      // pestaña
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tpl__tab" + (i === 0 ? " is-active" : "");
      tab.setAttribute("data-tab", sec.id);
      tab.setAttribute("data-cursor", "ver");
      tab.innerHTML =
        '<span class="tpl__tab-idx mono">' + ("0" + (i + 1)).slice(-2) + '</span>' +
        '<span class="tpl__tab-name"></span>' +
        '<span class="tpl__tab-count mono">' + n + '</span>';
      $(".tpl__tab-name", tab).textContent = sec.sector;
      tabs.appendChild(tab);
      // panel
      var panel = document.createElement("div");
      panel.className = "tpl__panel" + (i === 0 ? " is-active" : "");
      panel.setAttribute("data-panel", sec.id);
      (sec.items || []).forEach(function (it, j) {
        var a = document.createElement("a");
        a.className = "tpl-card";
        a.href = it.url; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("data-cursor", "ver");
        a.innerHTML =
          '<span class="tpl-card__idx mono"></span>' +
          '<span class="tpl-card__name"></span>' +
          '<span class="tpl-card__go">Ver plantilla <b aria-hidden="true">→</b></span>';
        $(".tpl-card__idx", a).textContent = sec.sector + " · " + ("0" + (j + 1)).slice(-2);
        $(".tpl-card__name", a).textContent = it.nombre;
        panel.appendChild(a);
      });
      panels.appendChild(panel);
    });
    // nota de IA (si existe en el manifest)
    var note = document.querySelector(".tpl__ai");
    if (note && M.notaPlantillasIA) {
      note.innerHTML = '<span aria-hidden="true">✳</span> ' + M.notaPlantillasIA;
    }
  }

  // Pestañas de Plantillas: al hacer click, muestra el sector elegido
  function initPlantillasTabs() {
    var tabsBox = document.getElementById("tplTabs");
    var panelsBox = document.getElementById("tplPanels");
    if (!tabsBox || !panelsBox) return;
    panelsBox.classList.add("is-tabbed");
    tabsBox.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".tpl__tab") : null;
      if (!btn) return;
      var id = btn.getAttribute("data-tab");
      $all(".tpl__tab", tabsBox).forEach(function (t) {
        t.classList.toggle("is-active", t === btn);
      });
      $all(".tpl__panel", panelsBox).forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === id);
      });
    });
  }

  // Reconstruye los pasos del proceso como tarjetas apiladas (idempotente)
  function mountProceso() {
    var box = document.getElementById("stepsList");
    if (!box || !M.proceso || !M.proceso.length) return;
    if (box.getAttribute("data-mounted") === "1") return;
    box.setAttribute("data-mounted", "1");
    box.innerHTML = "";
    M.proceso.forEach(function (p, i) {
      var card = document.createElement("article");
      card.className = "pcard";
      card.style.setProperty("--i", i);
      card.innerHTML =
        '<span class="pcard__idx" aria-hidden="true"></span>' +
        '<div class="pcard__body">' +
          '<span class="pcard__tag mono"></span>' +
          '<h3 class="pcard__title"></h3>' +
          '<p class="pcard__text"></p>' +
        '</div>';
      $(".pcard__idx", card).textContent = p.indice;
      $(".pcard__tag", card).textContent = "Paso " + p.indice;
      $(".pcard__title", card).textContent = p.titulo;
      $(".pcard__text", card).textContent = p.texto;
      box.appendChild(card);
    });
  }

  // Efecto "scrolling cards": las tarjetas cubiertas se encogen y atenúan
  function initProcessCards() {
    if (!(window.gsap && window.ScrollTrigger)) return;
    var cards = $all("#stepsList .pcard");
    if (cards.length < 2) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    cards.forEach(function (card, i) {
      if (i === cards.length - 1) return;
      window.gsap.to(card, {
        scale: 0.9, opacity: 0.32, ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      });
    });
  }

  // Reconstruye un track de marquee duplicando el contenido para bucle continuo
  function buildMarquee(id, words, serif) {
    var track = document.getElementById(id);
    if (!track || !words || !words.length) return;
    if (track.getAttribute("data-mounted") === "1") return;
    track.setAttribute("data-mounted", "1");
    var html = "";
    function block() {
      var s = "";
      words.forEach(function (w) { s += "<span>" + w + "</span><b>·</b>"; });
      return s;
    }
    track.innerHTML = block() + block();
  }

  function mountMarquees() {
    buildMarquee("marqueeHero", M.marqueeHero, true);
    buildMarquee("marqueeSvc", M.marqueeServicios, false);
  }

  /* ====================================================================== */
  /*  CURSOR personalizado (oculto en touch)                               */
  /* ====================================================================== */
  function initCursor() {
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    var cur = document.getElementById("cursor");
    if (!cur) return;
    var ring = $(".cursor__ring", cur), label = $(".cursor__label", cur);
    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY; cur.classList.add("is-on");
    });
    document.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); });
    (function loop() {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      cur.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    function bind() {
      $all("[data-cursor]").forEach(function (el) {
        if (el.getAttribute("data-curbound") === "1") return;
        el.setAttribute("data-curbound", "1");
        el.addEventListener("mouseenter", function () {
          cur.classList.add("is-active");
          if (label) label.textContent = el.getAttribute("data-cursor") || "";
        });
        el.addEventListener("mouseleave", function () { cur.classList.remove("is-active"); });
      });
    }
    bind();
    // re-bind tras montar contenido dinámico
    setTimeout(bind, 300);
  }

  /* ====================================================================== */
  /*  NAV — sticky + burger                                                */
  /* ====================================================================== */
  function initNav() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("burger");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 24); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (nav && burger) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });
      $all("#navLinks a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ====================================================================== */
  /*  REVEAL — IntersectionObserver + tope de seguridad 6s                 */
  /* ====================================================================== */
  function initReveal() {
    document.documentElement.classList.add("js-ready");
    var items = $all(".reveal[data-split]");
    var revealAll = function () { items.forEach(function (el) { el.classList.add("is-in"); }); };

    if (!("IntersectionObserver" in window)) { revealAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });

    // Red de seguridad: nada queda invisible
    setTimeout(revealAll, 6000);
  }

  /* ====================================================================== */
  /*  ICONOS line-art — preparar trazado                                   */
  /* ====================================================================== */
  function prepIcons() {
    $all(".svc-icon .dash").forEach(function (el) {
      el.setAttribute("pathLength", "1"); // mapea stroke-dasharray:1 = longitud total
    });
  }
  function drawIconsOnEnter() {
    if (!("IntersectionObserver" in window)) {
      $all(".svc-card").forEach(function (c) { c.classList.add("is-draw"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-draw"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    $all(".svc-card").forEach(function (c) { io.observe(c); });
    setTimeout(function () { $all(".svc-card").forEach(function (c) { c.classList.add("is-draw"); }); }, 6000);
  }

  /* ====================================================================== */
  /*  CARRUSEL SERVICIOS — pin horizontal (desktop) / swipe (móvil)        */
  /* ====================================================================== */
  function initCarousel() {
    var section = document.getElementById("servicios");
    var car = document.getElementById("svcCar");
    var track = document.getElementById("svcTrack");
    var barEl = document.getElementById("svcProgressBar");
    var nowEl = document.getElementById("svcProgressNow");
    if (!section || !car || !track) return;

    var cards = $all(".svc-card", track);
    var setProgress = function (p) {
      p = Math.max(0, Math.min(1, p));
      if (barEl) barEl.style.width = (p * 100) + "%";
      if (nowEl) {
        var idx = Math.min(cards.length, Math.floor(p * cards.length + 0.0001) + 1);
        nowEl.textContent = ("0" + idx).slice(-2);
      }
    };
    setProgress(0);

    var hasGSAP = window.gsap && window.ScrollTrigger;
    var isDesktop = window.matchMedia("(min-width: 761px)").matches;

    if (!hasGSAP || !isDesktop) {
      // Móvil / sin GSAP: swipe horizontal nativo con snap
      car.classList.add("hcar--swipe");
      track.addEventListener("scroll", function () {
        var max = track.scrollWidth - track.clientWidth;
        if (max > 0) setProgress(track.scrollLeft / max);
      }, { passive: true });
      // por si el scroll está en el car en vez del track
      car.addEventListener("scroll", function () {
        var max = car.scrollWidth - car.clientWidth;
        if (max > 0) setProgress(car.scrollLeft / max);
      }, { passive: true });
      return;
    }

    // Desktop: pin + traslación horizontal con scroll vertical
    window.gsap.registerPlugin(window.ScrollTrigger);
    var getDist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 40); };

    window.gsap.to(track, {
      x: function () { return -getDist(); },
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: function () { return "+=" + getDist(); },
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) { setProgress(self.progress); }
      }
    });
    setTimeout(function () { window.ScrollTrigger.refresh(); }, 400);
    window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
  }

  /* ====================================================================== */
  /*  ARRANQUE                                                             */
  /* ====================================================================== */
  function boot() {
    safe(syncWhatsApp, "syncWhatsApp");
    safe(syncContacto, "syncContacto");
    safe(syncServicios, "syncServicios");
    safe(mountPortafolio, "mountPortafolio");
    safe(mountProductos, "mountProductos");
    safe(mountPlantillas, "mountPlantillas");
    safe(initPlantillasTabs, "initPlantillasTabs");
    safe(mountProceso, "mountProceso");
    safe(mountMarquees, "mountMarquees");
    safe(initCursor, "initCursor");
    safe(initNav, "initNav");
    safe(prepIcons, "prepIcons");
    safe(initReveal, "initReveal");
    safe(drawIconsOnEnter, "drawIconsOnEnter");
    safe(initCarousel, "initCarousel");
    safe(initProcessCards, "initProcessCards");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
