document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Desbloquear ramos sin prerrequisitos al cargar
  ramos.forEach(ramo => {
    const prer = ramo.dataset.prer?.split(",") || [];
    if (prer.length === 0) {
      ramo.classList.add("desbloqueado");
    }

    // Acción al hacer clic en un ramo desbloqueado
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;

      // Marcar o desmarcar como aprobado
      ramo.classList.toggle("aprobado");

      // Revisar si se desbloquean otros ramos
      actualizarDesbloqueos();
    });
  });

  // Función que revisa qué ramos se desbloquean
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];
      if (prer.length === 0) return;

      // Verifica si todos los prerrequisitos están aprobados
      const todosAprobados = prer.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (todosAprobados) {
        ramo.classList.add("desbloqueado");
      } else {
        ramo.classList.remove("desbloqueado");
        ramo.classList.remove("aprobado");
      }
    });
  }

  // Botón "Reiniciar malla"
  window.reiniciarMalla = function () {
    ramos.forEach(ramo => {
      ramo.classList.remove("aprobado", "desbloqueado");
    });

    // Volver a activar los ramos sin prerrequisitos
    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];
      if (prer.length === 0) {
        ramo.classList.add("desbloqueado");
      }
    });
  };
});
