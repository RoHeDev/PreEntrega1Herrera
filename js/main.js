const preciosTrabajos = {
  escolta: 20000,
  caceria: 45000,
  busqueda: 15000,
  reconocimiento: 10500,
};

const trabajosRealizados = []; // contador de trabajos

function saludar() {
  let nombre = prompt("Ingrese su nombre");
  let edad = parseInt(prompt("Ingrese su edad"));

  if (edad > 17) {
    let mensaje = `Bienvenido ${nombre} a Nidal`;
    alert(mensaje);
    console.log(`Bienvenido a la Consola ${nombre}. Proceda con cuidado.`);
    nidal();
  } else {
    let mensaje1 = `${nombre} no tiene permitido estar aquí. Por favor salga de aquí.`;
    alert(mensaje1);
  }
}

function nidal() {
  let trabajo = null;
  while (
    trabajo !== "escolta" &&
    trabajo !== "caceria" &&
    trabajo !== "busqueda" &&
    trabajo !== "reconocimiento"
  ) {
    trabajo = prompt(
      `Ingrese el trabajo deseado: "escolta", "caceria", "busqueda", "reconocimiento".`
    );
  }

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

      trabajosRealizados.push({
        trabajo: trabajo,
        precio: precioTrabajo,
      });
    } else {
      alert("La contratación ha sido cancelada.");
    }
  } else {
    console.log("Trabajo inválido");
  }
}

saludar();
console.log("Trabajos realizados:", trabajosRealizados);
