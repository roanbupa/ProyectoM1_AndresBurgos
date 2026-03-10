const botonGenerar = document.getElementById("generarBtn");
const paleta = document.getElementById("paleta");
const cantidadColores = document.getElementById("cantidadColores");

function generarColoresAleatorios() {
  const letras = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }

  return color;
}

function generarPaleta() {
  paleta.innerHTML = "";
  const cantidad = parseInt(cantidadColores.value);

  for (let i = 0; i < cantidad; i++) {
    const colorHex = generarColoresAleatorios();
    const divColor = document.createElement("div");
    divColor.className = "color";
    divColor.style.backgroundColor = colorHex;
    divColor.textContent = colorHex;
    paleta.appendChild(divColor);
  }
}

botonGenerar.addEventListener("click", generarPaleta);
