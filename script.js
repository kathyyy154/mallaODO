document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prer = ramo.dataset.prer?.split(",") || [];

    // Si no tiene prerrequisitos, se puede clicar desde el inicio
    if (prer.length === 0) {
      ramo.classList.add("desbloqueado");
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;

      // Marcar como aprobado
      ramo.classList.toggle("aprobado");

      // Recalcular desbloqueos
      actualizarDesbloqueos();
    });
  });

  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];

      if (prer.length === 0) return;

      const aprobados = prer.every(id => {
        const nodo = document.getElementById(id);
        return nodo && nodo.classList.contains("aprobado");
      });

      if (aprobados) {
        ramo.classList.add("desbloqueado");
      } else {
        // Si algún prerrequisito se desmarca, lo bloqueamos de nuevo
        ramo.classList.remove("desbloqueado");
        ramo.classList.remove("aprobado");
      }
    });
  }
});
