const preciosTrabajos = {
  escolta: 20000,
  caceria: 45000,
  busqueda: 15000,
  reconocimiento: 10500,
};

let trabajosRealizados = [];

function saludar() {
  let nombre = document.getElementById("nombreInput").value;
  let edad = parseInt(document.getElementById("edadInput").value);

  if (edad > 17) {
    let mensaje = `Bienvenido ${nombre} a Nidal`;

    // Mostrar mensaje de bienvenida con swal.fire
    swal
      .fire({
        title: mensaje,
        icon: "success",
      })
      .then(() => {
        console.log(`Bienvenido a la Consola ${nombre}. Proceda con cuidado.`);
        document.getElementById("loginButton").style.display = "none"; // Oculta el botón de login

        // Eventos de los botones
        document.getElementById("contratar1").addEventListener("click", () => {
          nidal("escolta");
        });

        document.getElementById("contratar2").addEventListener("click", () => {
          nidal("caceria");
        });

        document.getElementById("contratar3").addEventListener("click", () => {
          nidal("busqueda");
        });

        document.getElementById("contratar4").addEventListener("click", () => {
          nidal("reconocimiento");
        });
      });
  } else {
    let mensaje1 = `${nombre} no tiene permitido estar aquí. Por favor salga de aquí.`;

    // Mostrar mensaje de no permitido con swal.fire
    swal.fire({
      title: mensaje1,
      icon: "error",
    });
  }
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", saludar);

console.log("Trabajos realizados:", trabajosRealizados);

const trabajos = document.querySelectorAll(".trabajo");

trabajos[0].innerText = "ESCOLTA";
trabajos[1].innerText = "CACERIA";
trabajos[2].innerText = "BUSQUEDA";
trabajos[3].innerText = "RECONOCIMIENTO";

function mostrarTrabajosRealizados() {
  const trabajosRealizadosContainer =
    document.getElementById("trabajosRealizados");

  trabajosRealizadosContainer.innerHTML = ""; // Limpia el contenido anterior

  trabajosRealizados.forEach((trabajo) => {
    const trabajoRealizado = document.createElement("p");
    trabajoRealizado.textContent = `Trabajo: ${trabajo.trabajo}, Precio: $${trabajo.precio}`;
    trabajosRealizadosContainer.appendChild(trabajoRealizado);
  });
}

// Función para guardar los trabajos realizados en el almacenamiento local
function guardarTrabajosRealizados() {
  localStorage.setItem(
    "trabajosRealizados",
    JSON.stringify(trabajosRealizados)
  );
}

// Función para cargar los trabajos realizados desde el almacenamiento local
function cargarTrabajosRealizados() {
  const trabajosGuardados = localStorage.getItem("trabajosRealizados");
  if (trabajosGuardados) {
    trabajosRealizados = JSON.parse(trabajosGuardados);
  }
}

function nidal(trabajo) {
  let precioTrabajo = preciosTrabajos[trabajo];

  if (trabajo && precioTrabajo) {
    let codigoDescuento = document.getElementById("codigoDescuentoInput").value;

    if (codigoDescuento === "fantoche") {
      precioTrabajo -= precioTrabajo * 0.15; // descuentito del 15%
    }

    // Crear una promesa para el proceso de contratación
    const confirmarContratacion = new Promise((resolve, reject) => {
      swal
        .fire({
          title: `El precio del trabajo "${trabajo}" es: $${precioTrabajo}`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Trabajo contratado
            swal.fire("¡El trabajo ha sido contratado!", "", "success");

            trabajosRealizados.push({
              trabajo: trabajo,
              precio: precioTrabajo,
            });

            mostrarTrabajosRealizados();
            guardarTrabajosRealizados();

            // Solicitud fetch para la imagen de un Trabajador
            fetch("https://cataas.com/cat/says/Gracias%20por%20el%20Trabajo")
              .then((response) => response.blob())
              .then((blob) => {
                const imageUrl = URL.createObjectURL(blob);

                // Mostrar imagen en lugar de swal.fire
                const image = document.createElement("img");
                image.src = imageUrl;
                image.style.maxWidth = "100%";
                document
                  .getElementById("contratacionResultado")
                  .appendChild(image);
              })
              .catch((error) => {
                console.log("Error al obtener la imagen del gato:", error);
              });

            resolve(); // Resuelve la promesa
          } else {
            // Contratación cancelada no hay gato
            swal.fire("La contratación ha sido cancelada.", "", "info");
            reject(); // Rechaza la promesa
          }
        });
    });
  } else {
    console.log("Trabajo inválido");
  }
}

// La función para cargar los trabajos realizados desde el almacenamiento local
cargarTrabajosRealizados();

//Trabajos realizados
mostrarTrabajosRealizados();
