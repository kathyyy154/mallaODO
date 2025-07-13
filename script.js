document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Activar los ramos sin prerrequisitos
  ramos.forEach(ramo => {
    const prer = ramo.dataset.prer?.split(",") || [];
    if (prer.length === 0) {
      ramo.classList.add("desbloqueado");
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;

      // Alternar aprobación
      ramo.classList.toggle("aprobado");

      // Verificar si eso desbloquea otros ramos
      actualizarDesbloqueos();
    });
  });

  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];

      if (prer.length === 0) return;

      const todosAprobados = prer.every(id => {
        const prereq = document.getElementById(id);
        return prereq && prereq.classList.contains("aprobado");
      });

      if (todosAprobados) {
        ramo.classList.add("desbloqueado");
      } else {
        ramo.classList.remove("desbloqueado");
        ramo.classList.remove("aprobado");
      }
    });
  }

  // Función global para botón de reinicio
  window.reiniciarMalla = function () {
    ramos.forEach(ramo => {
      ramo.classList.remove("aprobado", "desbloqueado");
    });

    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];
      if (prer.length === 0) {
        ramo.classList.add("desbloqueado");
      }
    });
  };
});
