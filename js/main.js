function saludar() {
  let nombre = prompt("ingrese su nombre");
  let edad = prompt("ingrese su edad");

  if (edad > 17) {
    let mensaje = `Bienvenido ${nombre} a Nidal`;
    alert(mensaje);
    console.log(`Bienvenido a la Consola ${nombre}. Proceda con cuidado.`);
  } else {
    let mensaje1 = `${nombre} no tiene permitido estar aqui. Porfavor salga de aqui.`;
    alert(mensaje1);
  }
}
saludar();

function nidal() {
  let trabajo = prompt(
    `Ingrese el trabajo deseado "escolta , caceria , busqueda , reconocimiento".`
  );
  switch (trabajo) {
    case `escolta`:
      alert(`Su pedido de ${trabajo} a sido aceptado.`);
      console.log(`Su pedido de ${trabajo} a sido autorizado.`);
      break;
    case `caceria`:
      alert(`Su pedido de ${trabajo} a sido aceptado.`);
      console.log(`Su pedido de ${trabajo} a sido autorizado.`);
      break;
    case `busqueda`:
      alert(`Su pedido de ${trabajo} a sido aceptado.`);
      console.log(`Su pedido de ${trabajo} a sido autorizado.`);
      break;
    case `reconocimiento`:
      alert(`Su pedido de ${trabajo} a sido aceptado.`);
      console.log(`Su pedido de ${trabajo} a sido autorizado.`);
      break;

    default:
      alert("Escoja un trabajo designado.");
      console.log(`Su pedido de ${trabajo} no es posible.`);
      break;
  }
}
nidal();
