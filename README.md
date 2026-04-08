# Viajes Troncal — Landing editable

Esta landing ya viene lista para subir a GitHub y publicar en Vercel.

## 1) Estructura principal

```text
index.html
assets/
  css/styles.css
  js/app.js
  data/site.json
  images/
    banner/
    destinos/
    ui/
fichas/
```

## 2) Cómo cambiar el WhatsApp

Abre este archivo:

```text
assets/data/site.json
```

Busca esto:

```json
"whatsapp": "523329335952",
"whatsappDisplay": "3329335952"
```

- `whatsapp` va con código de país, sin signos. Ejemplo México: `523329335952`
- `whatsappDisplay` es como quieres mostrarlo en pantalla.

---

## 3) Cómo conectar Google Sheets

En `assets/data/site.json` cambia:

```json
"sheetsEndpoint": "PEGA_AQUI_TU_WEBAPP_DE_GOOGLE_APPS_SCRIPT"
```

Ahí debes pegar la URL del Web App de Google Apps Script.

### Columnas sugeridas en tu hoja:
- timestamp
- nombre
- telefono
- destino
- destinoId
- adultos
- ninos
- edadesNinos
- pagina
- origenClick
- resumen

---

## 4) Cómo cambiar colores de toda la landing

Archivo:

```text
assets/data/site.json
```

Bloque:

```json
"colors": {
  "primary": "#00b7d6",
  "secondary": "#ff7a00",
  "accent": "#24b679",
  "text": "#143544",
  "bg": "#f6fbfd",
  "card": "#ffffff"
}
```

### Qué hace cada color:
- `primary`: turquesa principal
- `secondary`: naranja del formulario y botones de oferta
- `accent`: verde/turquesa complementario
- `text`: color de títulos y texto fuerte
- `bg`: fondo general
- `card`: fondo de tarjetas

Usa **código HEX**. Ejemplo:
- blanco: `#ffffff`
- turquesa: `#00b7d6`
- dorado suave: `#ffc637`
- azul oscuro: `#083b61`

---

## 5) Cómo cambiar el banner principal y banners por destino

### Banner general por defecto
Ruta:

```text
assets/images/banner/default-banner.svg
```

Medida recomendada:
- **1920 x 850 px**

### Banner individual por destino
Carpeta:

```text
assets/images/banner/
```

Ejemplos:
- `cancun.svg`
- `puerto-vallarta.svg`
- `los-cabos.svg`

Medida recomendada:
- **1920 x 850 px**

Si quieres usar JPG o WEBP en lugar de SVG, puedes hacerlo, pero debes actualizar la ruta en:

```text
assets/data/site.json
```

Campo:
```json
"bannerImage": "assets/images/banner/cancun.svg"
```

---

## 6) Cómo cambiar fotos de cada destino

Cada destino tiene su carpeta. Ejemplo:

```text
assets/images/destinos/cancun/
assets/images/destinos/puerto-vallarta/
assets/images/destinos/pueblos-magicos-jalisco/
```

Dentro verás:
- `cover.svg` → imagen principal de la tarjeta
- `g1.svg`
- `g2.svg`
- `g3.svg`
- `g4.svg`

### Medidas recomendadas
- `cover`: **1200 x 760 px**
- `g1-g4`: **800 x 520 px**

Puedes reemplazarlas por `.jpg`, `.png` o `.webp`.

**Si cambias el nombre o la extensión**, actualiza las rutas en:

```text
assets/data/site.json
```

Ejemplo:
```json
"coverImage": "assets/images/destinos/cancun/cover.jpg",
"gallery": [
  "assets/images/destinos/cancun/g1.jpg",
  "assets/images/destinos/cancun/g2.jpg",
  "assets/images/destinos/cancun/g3.jpg",
  "assets/images/destinos/cancun/g4.jpg"
]
```

---

## 7) Cómo cambiar textos, destinos y ofertas

Todo eso está en:

```text
assets/data/site.json
```

Ahí puedes editar por destino:
- nombre
- región
- subtítulo
- resumen
- texto de oferta
- banner
- galería
- ficha

---

## 8) Destinos ya incluidos

### Caribe Mexicano
- Cancún
- Playa del Carmen
- Tulum
- Cozumel

### Pacífico Dorado
- Puerto Vallarta
- Nuevo Nayarit

### Pacífico Sur
- Huatulco
- Puerto Escondido

### Baja California Sur
- Los Cabos
- Cabo San Lucas
- La Paz
- Loreto

### Tradicionales
- Acapulco
- Mazatlán
- Ixtapa Zihuatanejo

### Extra que pediste
- Pueblos Mágicos de Jalisco

---

## 9) Cómo funciona el banner automático

Cuando el usuario selecciona un destino en el formulario:
- cambia el banner
- cambia el texto principal
- cambia el texto de oferta

Todo sale del archivo `assets/data/site.json`

---

## 10) Qué hace la ficha de cada destino

Cada destino tiene una ficha HTML en la carpeta:

```text
fichas/
```

Ejemplo:
- `fichas/cancun.html`
- `fichas/puerto-vallarta.html`

Desde ahí el usuario puede:
- ver resumen
- abrir WhatsApp
- guardar la ficha como PDF desde el navegador

---

## 11) Recomendación para subir a GitHub

La raíz del proyecto debe verse así:

```text
index.html
assets/
fichas/
README.md
vercel.json
```

No subas el ZIP al repo.
Sube la carpeta descomprimida.

---

## 12) Vercel

Este proyecto es estático.
Solo conéctalo a GitHub y publícalo.

Si Vercel te pregunta:
- Framework Preset: `Other`
- Root Directory: `/`

---

## 13) Archivo clave para casi todo

Si solo vas a aprender un archivo, que sea este:

```text
assets/data/site.json
```

Desde ahí cambias:
- WhatsApp
- colores
- endpoint de Google Sheets
- redes
- textos
- imágenes
- destinos
