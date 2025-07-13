// script.js

// Esperamos a que cargue todo el DOM document.addEventListener("DOMContentLoaded", () => { const ramos = document.querySelectorAll(".ramo"); const ramoMap = {};

// Asociamos nombre de ramo con su elemento ramos.forEach(ramo => { const nombre = ramo.dataset.nombre; ramoMap[nombre] = ramo;

// Bloquear si tiene prerrequisitos
if (ramo.dataset.prerreq) {
  ramo.classList.add("bloqueado");
}

});

// Verifica si todos los prerrequisitos están aprobados function prerrequisitosAprobados(prerreqStr) { const nombres = prerreqStr.split(",").map(n => n.trim()); return nombres.every(nombre => { const ramo = ramoMap[nombre]; return ramo && ramo.classList.contains("aprobado"); }); }

// Desbloquea los ramos que ya tienen todos sus requisitos cumplidos function actualizarDesbloqueos() { ramos.forEach(ramo => { if (ramo.classList.contains("aprobado")) return; const prerreq = ramo.dataset.prerreq; if (prerreq && prerrequisitosAprobados(prerreq)) { ramo.classList.remove("bloqueado"); } }); }

// Clic para aprobar ramo ramos.forEach(ramo => { ramo.addEventListener("click", () => { if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return; ramo.classList.add("aprobado"); actualizarDesbloqueos(); }); });

// Botón para reiniciar toda la malla const btnReiniciar = document.getElementById("reiniciar-btn"); btnReiniciar.addEventListener("click", () => { ramos.forEach(ramo => { ramo.classList.remove("aprobado"); if (ramo.dataset.prerreq) { ramo.classList.add("bloqueado"); } else { ramo.classList.remove("bloqueado"); } }); }); });

