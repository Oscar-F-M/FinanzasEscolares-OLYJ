let web3;
let contrato;
let cuenta;

const contratoAddress = "0xTU_DIRECCION_DEL_CONTRATO";

const contratoABI = [];

window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    cuenta = accounts[0];
    contrato = new web3.eth.Contract(contratoABI, contratoAddress);
    console.log("Conectado como:", cuenta);
  } else {
    alert("MetaMask no está instalado");
  }
});

async function registrarProfesor() {
  await contrato.methods.registrarProfesor(cuenta).send({ from: cuenta });
  alert("Profesor registrado");
}

async function crearActividad(titulo, descripcion, respuestaCorrecta) {
  await contrato.methods.crearActividad(titulo, descripcion, respuestaCorrecta).send({ from: cuenta });
  alert("Actividad creada");
}

async function responderActividad(id, respuesta) {
  await contrato.methods.responderActividad(id, respuesta).send({ from: cuenta });
  alert("Respuesta enviada");
}

async function consultarPuntos() {
  const puntos = await contrato.methods.consultarPuntos(cuenta).call();
  alert("Tus puntos: " + puntos);
}




function crearActividadDesdeFormulario() {
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const respuesta = document.getElementById("respuesta").value;
  crearActividad(titulo, descripcion, respuesta);
}



function crearActividadDesdeFormulario() {
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const respuesta = document.getElementById("respuesta").value;
  crearActividad(titulo, descripcion, respuesta);
}



function responderActividadDesdeFormulario() {
  const id = document.getElementById("actividadId").value;
  const respuesta = document.getElementById("respuestaEstudiante").value;
  responderActividad(id, respuesta);
}

async function cargarActividades() {
  const total = await contrato.methods.totalActividades().call();
  const lista = document.getElementById("listaActividades");
  lista.innerHTML = ""; 

  for (let i = 0; i < total; i++) {
    const actividad = await contrato.methods.actividades(i).call();
    const item = document.createElement("div");
    item.className = "list-group-item";
    item.innerHTML = `<strong>ID ${i}</strong>: ${actividad.titulo}<br><em>${actividad.descripcion}</em>`;
    lista.appendChild(item);
  }
}



async function iniciarSesion() {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      cuenta = accounts[0];
      document.getElementById("usuarioConectado").innerText = "Conectado como: " + cuenta;

      const esProfesor = await contrato.methods.esProfesor(cuenta).call();
      if (esProfesor) {
        window.location.href = "profesor.html";
      } else {
        window.location.href = "estudiante.html";
      }

    } catch (error) {
      console.error("Error al conectar con MetaMask:", error);
      alert("No se pudo conectar con MetaMask");
    }
  } else {
    alert("MetaMask no está instalado. Instálalo para continuar.");
  }
}






async function mostrarTotalActividades() {
  const total = await contrato.methods.totalActividades().call();
  document.getElementById("totalActividades").innerText = "Actividades creadas: " + total;
}
