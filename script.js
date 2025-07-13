document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const progresoGuardado = JSON.parse(localStorage.getItem("mallaAprobada")) || [];

  // Restaurar progreso desde localStorage
  ramos.forEach(ramo => {
    const id = ramo.id;
    const prer = ramo.dataset.prer?.split(",") || [];

    if (prer.length === 0) {
      ramo.classList.add("desbloqueado");
    }

    if (progresoGuardado.includes(id)) {
      ramo.classList.add("aprobado");
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;
      ramo.classList.toggle("aprobado");
      guardarProgreso();
      actualizarDesbloqueos();
    });
  });

  actualizarDesbloqueos();

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
        ramo.classList.remove("desbloqueado");
        ramo.classList.remove("aprobado");
      }
    });

    guardarProgreso();
  }

  function guardarProgreso() {
    const aprobados = [...document.querySelectorAll(".ramo.aprobado")].map(r => r.id);
    localStorage.setItem("mallaAprobada", JSON.stringify(aprobados));
  }

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

  // ✅ Mostrar requisitos como tooltip automáticamente
  document.querySelectorAll(".ramo").forEach(ramo => {
    const prer = ramo.dataset.prer;
    if (prer) {
      const nombres = prer
        .split(",")
        .map(id => {
          const nodo = document.getElementById(id);
          return nodo ? nodo.textContent.trim() : id;
        });
      ramo.title = "Requiere: " + nombres.join(", ");
    }
  });
});
