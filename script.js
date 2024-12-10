// Función para generar palabras aleatorias
function generarPalabrasAleatorias(numPalabras) {
  const palabras = ["perro", "gato", "ratón", "elefante", "tigre", "león", "lobo", "zorro", "oso", "jirafa", "loro", "plato", "bolsa", "cuchara", "casa", "cuchillo", "televisor", "humo", "hacha", "soga", "dado", "Teléfono", "Auriculares", "Computadora", "Llanta", "Mesa", "Silla", "Cemento", "Teclado", "Mochila", "Bolsa", "Cepillo", "Cuchara", "Cinta", "Jaguar", "Peces", "Niña", "Niño", "Cerdo", "Avestruz", "Delfín", "Fútbol", "Llamas", "Cóndor", "Pingüino", "Rana", "Cuaderno", "Lapicero", "Lápiz", "Zapato", "Abrigo", "Dragón", "Fuego", "Manos", "Noé", "Té", "Aro", "Thor", "Tina", "Domo", "Taco", "Tela", "Taza", "Tufo", "Tacho", "Tubo", "Nora"];
  const palabrasAleatorias = [];
  for (let i = 0; i < numPalabras; i++) {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    palabrasAleatorias.push(palabras[randomIndex]);
  }
  return palabrasAleatorias;
}

// Función para desordenar las palabras aleatorias
function desordenarPalabras(palabras) {
  return palabras.sort(() => Math.random() - 0.5);
}

// Función para mostrar palabras en el área de texto
function mostrarPalabras(palabras) {
  const ul = document.getElementById("jta_palabras");
  ul.innerHTML = "";
  palabras.forEach(function (palabra) {
    const li = document.createElement("li");
    li.textContent = palabra;
    ul.appendChild(li);
  });
}

// Función para habilitar el área de texto para que el usuario pueda ordenar manualmente
function habilitarOrdenManual() {
  const ul = document.getElementById("jta_palabras");
  Array.from(ul.children).forEach(function (li) {
    li.setAttribute("draggable", true);
    li.addEventListener("dragstart", function (e) {
      e.target.setAttribute("data-dragging", "true");
      e.dataTransfer.setData("text/plain", e.target.textContent);
    });
    li.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    li.addEventListener("drop", function (e) {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const draggedElement = document.querySelector("[data-dragging=true]");
      if (draggedElement !== this) {
        this.parentNode.insertBefore(draggedElement, this.nextSibling || this);
      }
      draggedElement.removeAttribute("data-dragging");
    });
    li.addEventListener("dragend", function (e) {
      e.target.removeAttribute("data-dragging");
    });
  });
}

// Función para comprobar si las palabras están ordenadas correctamente
function comprobarOrden(palabrasAleatorias, palabrasOrdenadas) {
  for (let i = 0; i < palabrasAleatorias.length; i++) {
    if (palabrasAleatorias[i] !== palabrasOrdenadas[i]) {
      return false;
    }
  }
  return true;
}

// Función para resaltar palabras incorrectas
function resaltarPalabrasIncorrectas() {
  const ul = document.getElementById("jta_palabras");
  const palabrasOrdenadas = Array.from(ul.children).map(li => li.textContent);
  const palabrasAleatorias = JSON.parse(localStorage.getItem("palabrasAleatorias"));
  Array.from(ul.children).forEach(function (li, index) {
    if (palabrasAleatorias[index] !== palabrasOrdenadas[index]) {
      li.style.color = "red";
    } else {
      li.style.color = "green";
    }
  });
}

// Función principal para comenzar el juego
function comenzarJuego() {
  const numPalabras = parseInt(document.getElementById("jtf_palabras").value);
  const segundos = parseInt(document.getElementById("jtf_segundos").value);

  const palabrasAleatorias = generarPalabrasAleatorias(numPalabras);
  localStorage.setItem("palabrasAleatorias", JSON.stringify(palabrasAleatorias));

  mostrarPalabras(palabrasAleatorias);

  setTimeout(function () {
    const ul = document.getElementById("jta_palabras");
    ul.innerHTML = "";
    const palabrasDesordenadas = desordenarPalabras(palabrasAleatorias);
    mostrarPalabras(palabrasDesordenadas);
    habilitarOrdenManual();
  }, segundos * 1000);
}

// Función para manejar el botón de comprobar
function comprobar() {
  const ul = document.getElementById("jta_palabras");
  const palabrasOrdenadas = Array.from(ul.children).map(li => li.textContent);
  const palabrasAleatorias = JSON.parse(localStorage.getItem("palabrasAleatorias"));

  if (comprobarOrden(palabrasAleatorias, palabrasOrdenadas)) {
    alert("¡Lo hiciste muy bien!");
  } else {
    resaltarPalabrasIncorrectas();
    alert("Puedes hacerlo mejor");
  }
}
