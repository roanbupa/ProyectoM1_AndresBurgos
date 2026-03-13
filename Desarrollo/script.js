const botonGenerar = document.getElementById("generarBtn");
const paleta = document.getElementById("paleta");
const cantidadColores = document.getElementById("cantidadColores");

// Función que genera un color hexadecimal aleatorio
function generarColoresAleatorios() {
  const letras = "0123456789ABCDEF";
  let color = "#"; // Inicia el color con '#' para HEX

  // Loop de 6 iteraciones para generar los 6 caracteres del HEX
  for (let i = 0; i < 6; i++) {
    // Math.random() * 16 genera un número entre 0 y 15
    // Math.floor() lo convierte en entero
    // Se selecciona un carácter aleatorio del string 'letras'
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Función que genera y muestra la paleta de colores
function generarPaleta() {
  paleta.innerHTML = ""; // Limpia la paleta anterior

  // Obtiene la cantidad de colores seleccionada y la convierte a número
  const cantidad = parseInt(cantidadColores.value);

  // Loop para crear cada div de color
  for (let i = 0; i < cantidad; i++) {
    const colorHex = generarColoresAleatorios();
    const divColor = document.createElement("div"); // Crea un div para representar el color
    divColor.className = "color"; // Le asigna la clase CSS "color"
    divColor.style.backgroundColor = colorHex;
    divColor.textContent = colorHex;

    // Accesibilidad: permitir focus y copiar con Enter o Space
    divColor.tabIndex = 0; // hace el div focusable
    divColor.setAttribute("role", "button"); // indica que es interactivo
    divColor.setAttribute(
      "aria-label",
      `Color ${colorHex}, presiona Enter o Space para copiar`,
    );

    // Evento click o teclado para copiar
    const copiarColor = () => {
      navigator.clipboard
        .writeText(colorHex)
        .then(() => mostrarTooltip(divColor, "Color copiado!"))
        .catch((err) => console.error("No se pudo copiar: ", err));
    };

    // Evento click para copiar el color
    divColor.addEventListener("click", copiarColor);
    divColor.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Evita scroll al presionar Space
        copiarColor(); // Llama a la función para copiar
      }
    });

    // Agrega el div a la paleta en el DOM
    paleta.appendChild(divColor);
  }
}

// Evento del botón "Generar paleta"
// Cuando el usuario hace click, se llama a generarPaleta()
botonGenerar.addEventListener("click", generarPaleta);

function copiarAlPortapapeles(texto) {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.value = texto;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  alert(`Color ${texto} copiado!`);
}

// Función alternativa para copiar texto usando input temporal
function mostrarTooltip(elemento, mensaje) {
  const tooltip = document.createElement("span");
  tooltip.className = "tooltip";
  tooltip.textContent = mensaje;
  elemento.appendChild(tooltip);

  // Animación y desaparición después de 1.5s
  setTimeout(() => {
    tooltip.remove(); // Elimina el tooltip del DOM
  }, 1500);
}
