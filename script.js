// script.js

// Esperamos a que cargue todo el DOM document.addEventListener("DOMContentLoaded", () => { const ramos = document.querySelectorAll(".ramo"); const ramoMap = {};

// Creamos un mapa para acceder a los ramos por su nombre ramos.forEach(ramo => { const nombre = ramo.dataset.nombre; ramoMap[nombre] = ramo;

if (ramo.dataset.prerreq) {
  ramo.classList.add("bloqueado");
}

});

// Función para verificar si todos los prerrequisitos están aprobados function prerrequisitosAprobados(prerreqStr) { const nombres = prerreqStr.split(",").map(n => n.trim()); return nombres.every(nombre => { const ramo = ramoMap[nombre]; return ramo && ramo.classList.contains("aprobado"); }); }

// Actualiza el estado de los ramos (desbloquear si corresponde) function actualizarDesbloqueos() { ramos.forEach(ramo => { if (ramo.classList.contains("aprobado")) return; const prerreq = ramo.dataset.prerreq; if (prerreq && prerrequisitosAprobados(prerreq)) { ramo.classList.remove("bloqueado"); } }); }

// Evento click: aprobar un ramo si está desbloqueado ramos.forEach(ramo => { ramo.addEventListener("click", () => { if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return; ramo.classList.add("aprobado"); actualizarDesbloqueos(); }); });

// Botón de reinicio const btnReiniciar = document.getElementById("reiniciar-btn"); btnReiniciar.addEventListener("click", () => { ramos.forEach(ramo => { ramo.classList.remove("aprobado"); if (ramo.dataset.prerreq) { ramo.classList.add("bloqueado"); } else { ramo.classList.remove("bloqueado"); } }); }); });

