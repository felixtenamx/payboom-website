# PayBoom — Sitio web

Sitio corporativo de **PayBoom S.A.S. de C.V.** Infraestructura de pagos para empresas globales: procesamiento de tarjetas, pagos internacionales, motor antifraude y APIs.

Proyecto estático. Sin build step, sin frameworks. Solo HTML, CSS y JavaScript modular con Three.js para los efectos 3D.

## Estructura

```
.
├── index.html                    Home (hero 3D, productos, globo, API, seguridad, contacto)
├── styles.css                    Hoja de estilos compartida
├── script.js                     Lógica + 3D (tarjeta, globo, animaciones, formulario, cookies)
│
├── tarjetas.html                 Producto: procesamiento de tarjetas (flujo merchant/agregador/emisor)
├── pagos-internacionales.html    Producto: cross-border (recolección + FX + dispersión)
├── antifraude.html               Producto: motor antifraude (señales, scoring, decisión)
│
├── privacidad.html               Legal: política de privacidad
├── terminos.html                 Legal: términos y condiciones
├── cookies.html                  Legal: política de cookies
└── licencias.html                Legal: licencias propias y de proveedores
```

## Stack

- **HTML5 + CSS3** — sin preprocesadores
- **JavaScript ES Modules** — sin bundler
- **Three.js 0.160** — cargado vía import map desde `cdn.jsdelivr.net`
- **Google Fonts** — Space Grotesk + JetBrains Mono
- **Formsubmit.co** — puente sin backend para envío del formulario de contacto por email

## Marca

| Token | Valor |
|---|---|
| Naranja Payboom | `#f05215` |
| Teal Payboom    | `#049ea0` |
| Naranja claro   | `#ff7a45` |
| Teal claro      | `#06c4c7` |

Tipografía: **Space Grotesk** (UI) + **JetBrains Mono** (código).

## Cómo verlo en local

Al ser estático, basta con abrir `index.html` en cualquier navegador moderno. No requiere servidor.

Si prefieres servirlo localmente para evitar restricciones de `file://`:

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node
npx serve

# Opción 3: PHP
php -S localhost:8080
```

Luego abre `http://localhost:8080`.

## Deploy

### GitHub Pages (gratis)

1. Sube el repo a GitHub (ver más abajo).
2. Ve a **Settings → Pages**.
3. En *Source*, elige `main` branch, carpeta `/` (root).
4. Guarda. En unos minutos estará en `https://<usuario>.github.io/<repo>/`.

### Cualquier hosting estático

Sube los 10 archivos a la raíz del servidor (Netlify, Vercel, Cloudflare Pages, Hostinger, S3, etc.). No requiere Node, PHP ni base de datos.

### Servidor tradicional (Apache/Nginx)

Mismo enfoque: sube los archivos al `public_html` o `www`. Si quieres URLs sin `.html`, configura un rewrite en el servidor.

## Configuración importante en producción

### 1. Activar el formulario de contacto

El formulario usa `formsubmit.co` para enviar el lead por email a `comercial@payboom.io` (CC `sandro.haro@payboom.io`) con asunto `NUEVO LEAD POTENCIAL`. La **primera vez** que alguien rellene el formulario, formsubmit enviará un email de activación a `comercial@payboom.io` con un botón "Confirm". Hay que pulsarlo una sola vez. A partir de ahí, todos los leads llegan en automático.

Si prefieres tu propio backend, modifica `setupContactForm()` en `script.js` para enviar a tu endpoint.

### 2. Three.js desde CDN

Three.js se carga desde `cdn.jsdelivr.net`. Si necesitas tenerlo offline o tu política bloquea CDNs, descarga `three.module.js` y reemplaza la línea del `importmap` por la ruta local.

### 3. Banner de cookies

La decisión del usuario se guarda en `localStorage` con la clave `payboom_cookies_v1` (`accepted` o `rejected`). Si necesitas pasar esa preferencia a Google Analytics u otros, lee `localStorage.getItem('payboom_cookies_v1')` antes de cargar los scripts.

## Enlaces externos referenciados

| Destino | Dónde se usa |
|---|---|
| `https://docs.payboom.io/` | Botones "Ver la API" / "Documentación" / "API Reference" / nav "API" |
| `https://wa.me/525636717395` | "Empezar gratis" / "Empieza ahora" / CTAs comerciales |
| `https://onboarding.payboom.tena.ink` | "Iniciar sesión" |
| `https://www.linkedin.com/company/payboom/` | Footer |
| `https://www.instagram.com/payboom.io` | Footer |

## Datos de la sociedad

PayBoom S.A.S. de C.V. — Folio de constitución `SAS202506881505`.

## Contacto

- Comercial: comercial@payboom.io
- WhatsApp: +52 5636 717395

---

Hecho con ❤️ y 💪🏻 desde Madrid y México.
