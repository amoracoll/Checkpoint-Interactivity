// Capturar el formulario HTML
const formulario = document.getElementById("miFormulario");

// Capturar el espacio para mostrar resultados
const resultadosDiv = document.getElementById("resultados");

// Variable para almacenar los resultados acumulados (inicialmente, intenta cargar desde el almacenamiento local)
let resultadosAcumulados = cargarResultadosAcumulados();

// Agregar evento al formulario para capturar los datos cuando se envía
formulario.addEventListener("submit", function (evento) {
  // Evitar que el formulario se envíe de forma convencional
  evento.preventDefault();

  // Capturar los valores de los campos de entrada
  const nombreValor = document.getElementById("nombre").value;
  const tareaValor = document.getElementById("tarea").value;

  // Agregar los nuevos resultados a la variable acumulada
  resultadosAcumulados.push({ nombre: nombreValor, tarea: tareaValor });

  // Guardar los resultados acumulados en el almacenamiento local
  guardarResultadosAcumulados(resultadosAcumulados);

  // Mostrar resultados acumulados en el espacio de resultados
  mostrarResultados();

  // Borrar respuesta anterior en los campos de entrada
  formulario.reset();

  //Posicionar automaticamente el cursor en el primer campo de entrada
  document.getElementById("nombre").focus();
});

// Función para cargar los resultados acumulados desde el almacenamiento local
function cargarResultadosAcumulados() {
  const resultadosGuardados = localStorage.getItem("resultadosAcumulados");
  return resultadosGuardados ? JSON.parse(resultadosGuardados) : [];
}

// Función para guardar los resultados acumulados en el almacenamiento local
function guardarResultadosAcumulados(resultados) {
  localStorage.setItem("resultadosAcumulados", JSON.stringify(resultados));
}

// Función para mostrar los resultados en el espacio de resultados
function mostrarResultados() {
  // Limpiar el contenido actual del espacio de resultados
  resultadosDiv.innerHTML = "";

  // Mostrar cada resultado con una casilla de verificación
  resultadosAcumulados.forEach((resultado, index) => {
    const checkboxId = `checkbox-${index}`;
    resultadosDiv.innerHTML += `
      <div>
        <input type="checkbox" id="${checkboxId}" onchange="borrarResultado(${index})">
        <label for="${checkboxId}">
          Nombre Responsable: ${resultado.nombre}, <br>Tarea: ${resultado.tarea}
        </label>
      </div>
    `;
  });
}

// Función para borrar un resultado cuando la casilla de verificación está activada
function borrarResultado(index) {
  resultadosAcumulados.splice(index, 1);
  guardarResultadosAcumulados(resultadosAcumulados);
  mostrarResultados();
}