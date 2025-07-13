document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Mapa para acceder rápidamente por nombre
  const ramoMap = {};

  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    ramoMap[nombre] = ramo;

    // Bloqueamos si tiene prerrequisitos
    if (ramo.dataset.prerreq) {
      ramo.classList.add("bloqueado");
    }
  });

  // Verifica si todos los requisitos de un ramo están aprobados
  function prerrequisitosAprobados(prerreqStr) {
    const nombres = prerreqStr.split(",").map(n => n.trim());
    return nombres.every(nombre => {
      const ramo = ramoMap[nombre];
      return ramo && ramo.classList.contains("aprobado");
    });
  }

  // Desbloquea ramos si ya cumplen sus prerrequisitos
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      if (ramo.classList.contains("aprobado")) return;
      const prerreq = ramo.dataset.prerreq;
      if (prerreq && prerrequisitosAprobados(prerreq)) {
        ramo.classList.remove("bloqueado");
      }
    });
  }

  // Click: aprobar ramo si está desbloqueado
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;

      ramo.classList.add("aprobado");
      actualizarDesbloqueos();
    });
  });
});
