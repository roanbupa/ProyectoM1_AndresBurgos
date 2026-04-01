# Generador de Paletas de Colores

## Descripción

Aplicación web que permite generar paletas de colores de forma aleatoria.
El usuario puede bloquear colores, copiarlos al portapapeles, cambiar el formato (HEX / HSL) y guardar automáticamente la paleta en el navegador.

Demo: https://roanbupa.github.io/ProyectoM1_AndresBurgos/

---

## Funcionalidades

* Generación de colores aleatorios
* Selección de cantidad de colores
* Bloqueo/desbloqueo de colores (doble click)
* Copia de colores al portapapeles
* Soporte para formatos:

  * HEX
  * HSL
* Persistencia de datos con `localStorage`
* Accesibilidad:

  * Navegación con teclado (Enter / Space)

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* API de `localStorage`

---

## Decisiones técnicas

* Se implementó `dataset` (`data-locked`) para manejar el estado de bloqueo de cada color.
* Se separó la lógica de generación de colores en funciones reutilizables.
* Se implementó soporte para múltiples formatos de color (HEX y HSL).
* Se añadieron atributos de accesibilidad (`tabIndex`, `aria-label`) para mejorar la interacción con teclado.

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/roanbupa/ProyectoM1_AndresBurgos.git
```

2. Abrir el archivo:

```bash
index.html
```

No requiere instalación de dependencias.

---

## Deploy en GitHub Pages

El proyecto se encuentra publicado en:

https://roanbupa.github.io/ProyectoM1_AndresBurgos/

---

## Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo.

### Prompts utilizados

* "Cómo mantener elementos bloqueados en una lista dinámica"
* "Cómo copiar texto al portapapeles en JavaScript"
* "Cómo hacer accesible un elemento interactivo con teclado"

### Aplicación de las respuestas

Las respuestas obtenidas fueron utilizadas como guía y posteriormente adaptadas al contexto del proyecto.
Se integraron las soluciones dentro de una única lógica coherente, ajustando el comportamiento según los requerimientos de la consigna.

### Reflexión

El uso de inteligencia artificial permitió acelerar el desarrollo y resolver dudas específicas.
Sin embargo, fue necesario comprender cada implementación para poder integrarla correctamente y asegurar su funcionamiento.

---

## Autor

Desarrollado por **Andres Burgos**
GitHub: https://github.com/roanbupa
