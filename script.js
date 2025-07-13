document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Recuperar progreso guardado
  const progresoGuardado = JSON.parse(localStorage.getItem("mallaAprobada")) || [];

  // Aplicar estados guardados
  ramos.forEach(ramo => {
    const id = ramo.id;
    const prer = ramo.dataset.prer?.split(",") || [];

    if (prer.length === 0) {
      ramo.classList.add("desbloqueado");
    }

    if (progresoGuardado.includes(id)) {
      ramo.classList.add("aprobado");
    }

    // Manejar clic
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;
      ramo.classList.toggle("aprobado");
      guardarProgreso();
      actualizarDesbloqueos();
    });
  });

  actualizarDesbloqueos();

  // Verifica qué ramos deben desbloquearse
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prer = ramo.dataset.prer?.split(",") || [];
      if (prer.length === 0) return;

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

    guardarProgreso();
  }

  // Guardar progreso en localStorage
  function guardarProgreso() {
    const aprobados = [...document.querySelectorAll(".ramo.aprobado")]
      .map(r => r.id);
    localStorage.setItem("mallaAprobada", JSON.stringify(aprobados));
  }

  // Botón de reinicio
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

    localStorage.removeItem("mallaAprobada");
  };
});
