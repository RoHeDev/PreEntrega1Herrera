const preciosTrabajos = {
  escolta: 20000,
  caceria: 45000,
  busqueda: 15000,
  reconocimiento: 10500,
};

let trabajosRealizados = [];

function saludar() {
  let nombre = prompt("Ingrese su nombre");
  let edad = parseInt(prompt("Ingrese su edad"));

  if (edad > 17) {
    let mensaje = `Bienvenido ${nombre} a Nidal`;
    alert(mensaje);
    console.log(`Bienvenido a la Consola ${nombre}. Proceda con cuidado.`);
    document.getElementById("loginButton").style.display = "none"; // Oculta el botón de login

    // Evento boton 0
    document.getElementById("contratar1").addEventListener("click", () => {
      nidal("escolta");
    });

    // Evento boton 1
    document.getElementById("contratar2").addEventListener("click", () => {
      nidal("caceria");
    });

    // Evento boton 2
    document.getElementById("contratar3").addEventListener("click", () => {
      nidal("busqueda");
    });

    // Evento boton 3
    document.getElementById("contratar4").addEventListener("click", () => {
      nidal("reconocimiento");
    });

    // Cargar los trabajos realizados solo si coinciden con los datos de inicio de sesión
    cargarTrabajosRealizados(nombre, edad);
  } else {
    let mensaje1 = `${nombre} no tiene permitido estar aquí. Por favor salga de aquí.`;
    alert(mensaje1);
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
function cargarTrabajosRealizados(nombre, edad) {
  const trabajosGuardados = localStorage.getItem("trabajosRealizados");
  if (trabajosGuardados) {
    trabajosRealizados = JSON.parse(trabajosGuardados);

    // Filtrar los trabajos realizados para mostrar solo los que coinciden con los datos de inicio de sesión
    trabajosRealizados = trabajosRealizados.filter((trabajo) => {
      return trabajo.nombre === nombre && trabajo.edad === edad;
    });

    mostrarTrabajosRealizados();
  }
}

function nidal(trabajo) {
  let precioTrabajo = preciosTrabajos[trabajo];

  if (trabajo && precioTrabajo) {
    let codigoDescuento = prompt("Ingrese el código de descuento (opcional)");

    if (codigoDescuento === "fantoche") {
      precioTrabajo -= precioTrabajo * 0.15; // descuentito del 15%
    }

    let confirmacion = confirm(
      `El precio del trabajo "${trabajo}" es: $${precioTrabajo}. ¿Desea confirmar la contratación?`
    );

    if (confirmacion) {
      alert(`¡El trabajo "${trabajo}" ha sido contratado!`);
      console.log(
        `El trabajo "${trabajo}" ha sido contratado por ${precioTrabajo}`
      );

      // Agregar los datos de inicio de sesión junto con el trabajo realizado
      trabajosRealizados.push({
        nombre: nombre,
        edad: edad,
        trabajo: trabajo,
        precio: precioTrabajo,
      });

      mostrarTrabajosRealizados();

      // Guardar los trabajos realizados en el almacenamiento local
      guardarTrabajosRealizados();
    } else {
      alert("La contratación ha sido cancelada.");
    }
  } else {
    console.log("Trabajo inválido");
  }
}

// Al cargar la página, llamar a la función para cargar los trabajos realizados desde el almacenamiento local
cargarTrabajosRealizados();
