const botonGenerar = document.getElementById("generarBtn"); // Botón que dispara la generación
const paleta = document.getElementById("paleta"); // Contenedor donde van los colores

// Select donde el usuario elige la cantidad de colores
const cantidadColores = document.getElementById("cantidadColores"); // Guardamos referencia al select

// Función que genera un color hexadecimal aleatorio
function generarColoresAleatorios() {
  const letras = "0123456789ABCDEF"; // Caracteres posibles en HEX
  let color = "#"; // Todos los colores HEX empiezan con #

  // Bucle para armar el color agregando 6 caracteres
  for (let i = 0; i < 6; i++) {
    // Elegimos una letra/número al azar y la sumamos al color
    color += letras[Math.floor(Math.random() * 16)];
  }

  return color; // Devolvemos el color generado
}

// Select para elegir el formato de color (HEX o HSL)
const formatoColor = document.getElementById("formatoColor"); // Guardamos referencia

// Función que genera un color según el formato elegido
function generarColorAleatorio() {
  if (formatoColor.value === "hex") {
    // Si el usuario eligió HEX, usamos la función anterior
    return generarColoresAleatorios();
  } else {
    // Si eligió HSL, generamos valores dentro de rangos razonables
    const h = Math.floor(Math.random() * 360); // Tono entre 0 y 359
    const s = Math.floor(Math.random() * 51) + 50; // Saturación entre 50% y 100%
    const l = Math.floor(Math.random() * 41) + 30; // Luz entre 30% y 70%

    return `hsl(${h}, ${s}%, ${l}%)`; // Devolvemos el color en formato HSL
  }
}

// Función que crea un bloque de color en pantalla
function crearColor() {
  const color = generarColorAleatorio(); // Generamos el color según el formato

  const divColor = document.createElement("div"); // Creamos un div nuevo
  divColor.className = "color"; // Asignamos la clase CSS

  divColor.style.backgroundColor = color; // Aplicamos el color como fondo
  divColor.textContent = color; // Mostramos el código dentro del div

  divColor.dataset.locked = "false"; // Por defecto el color np está bloqueado

  divColor.tabIndex = 0; // Permite navegar con teclado
  divColor.setAttribute("role", "button"); // Accesibilidad: se comporta como botón

  // Texto para lectores de pantalla
  divColor.setAttribute(
    "aria-label",
    `Color ${color}, presiona Enter o Space para copiar`,
  );

  // Función para copiar el color al portapapeles
  const copiarColor = () => {
    const colorTexto = divColor.textContent.trim(); // siempre toma lo que se ve en pantalla
    navigator.clipboard
      .writeText(colorTexto)
      .then(() => mostrarTooltip(divColor, "Color copiado!"))
      .catch((err) => console.error("No se pudo copiar: ", err));
  };

  divColor.addEventListener("click", copiarColor); // Click copia el color

  // Permitimos copiar con teclado
  divColor.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      // Si presiona Enter o Space
      e.preventDefault(); // Evitamos comportamiento por defecto
      copiarColor(); // Copiamos el color
    }
  });

  // Doble click para bloquear/desbloquear
  divColor.addEventListener("dblclick", () => {
    const bloqueado = divColor.dataset.locked === "true"; // Estado actual

    if (bloqueado) {
      divColor.dataset.locked = "false"; // Desbloqueamos
      divColor.style.border = "none"; // Quitamos borde
    } else {
      divColor.dataset.locked = "true"; // Bloqueamos
      divColor.style.border = "3px solid black"; // Mostramos borde
    }
  });

  paleta.appendChild(divColor); // Agregamos el div a la paleta
}

// Función principal que arma la paleta
function generarPaleta() {
  const cantidad = parseInt(cantidadColores.value); // Cantidad elegida por el usuario

  let colores = Array.from(paleta.children); // Convertimos los hijos en array
  const actuales = colores.length; // Cantidad actual de colores

  // Si faltan colores, los creamos
  if (actuales < cantidad) {
    for (let i = actuales; i < cantidad; i++) {
      crearColor(); // Agregamos nuevos colores
    }
  }

  // Si sobran colores, eliminamos (priorizando los no bloqueados)
  if (actuales > cantidad) {
    for (let i = colores.length - 1; i >= 0; i--) {
      const divColor = colores[i]; // Tomamos el color actual

      if (divColor.dataset.locked !== "true") {
        // Solo eliminamos si no está bloqueado
        paleta.removeChild(divColor); // Lo sacamos del DOM
        colores.pop(); // Lo quitamos del array

        if (colores.length <= cantidad) break; // Cortamos cuando llegamos a la cantidad
      }
    }
  }

  // Actualizamos los colores que no están bloqueados
  colores.forEach((divColor) => {
    if (divColor.dataset.locked !== "true") {
      const nuevoColor = generarColorAleatorio(); // Generamos nuevo color

      divColor.style.backgroundColor = nuevoColor; // Aplicamos el color
      divColor.textContent = nuevoColor; // Mostramos el texto

      divColor.setAttribute(
        "aria-label",
        `Color ${nuevoColor}, presiona Enter o Space para copiar`,
      );
    }
  });
}

// Evento del botón para generar la paleta
botonGenerar.addEventListener("click", generarPaleta);

// Función para mostrar un tooltip
function mostrarTooltip(elemento, mensaje) {
  const tooltip = document.createElement("span"); // Creamos el elemento
  tooltip.className = "tooltip"; // le damos estilo
  tooltip.textContent = mensaje; // le ponemos el texto

  elemento.appendChild(tooltip); // Agregamos al color

  // Eliminamos después de 1.5 segundos
  setTimeout(() => {
    tooltip.remove();
  }, 1500);
}
