document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-promedio");

  // Datos de los ramos con créditos y semestre
  const ramos = [
    { nombre: "Morfofunción I", creditos: 11, semestre: 1 },
    { nombre: "Matemáticas", creditos: 5, semestre: 1 },
    { nombre: "Biología", creditos: 6, semestre: 1 },
    { nombre: "Química General", creditos: 5, semestre: 1 },
    { nombre: "Introducción a la Odontología", creditos: 4, semestre: 1 },

    { nombre: "Morfofunción II", creditos: 11, semestre: 2 },
    { nombre: "Biofísica", creditos: 4, semestre: 2 },
    { nombre: "Bioquímica", creditos: 6, semestre: 2 },
    { nombre: "Habilidades y Destrezas Odontológicas", creditos: 5, semestre: 2 },

    { nombre: "Anatomía Aplicada", creditos: 6, semestre: 3 },
    { nombre: "Microbiología y Parasitología", creditos: 5, semestre: 3 },
    { nombre: "Patología General", creditos: 5, semestre: 3 },
    { nombre: "Bioética", creditos: 2, semestre: 3 },

    { nombre: "Preclínico y Biomateriales Dentales", creditos: 10, semestre: 4 },
    { nombre: "Microbiología Oral", creditos: 4, semestre: 4 },
    { nombre: "Protección Radiológica", creditos: 3, semestre: 4 },
    { nombre: "Patología Oral I", creditos: 4, semestre: 4 },
    { nombre: "Epidemiología", creditos: 3, semestre: 4 },

    { nombre: "Diagnóstico por Imágenes I", creditos: 4, semestre: 5 },
    { nombre: "Patología Oral II", creditos: 4, semestre: 5 },

    { nombre: "Diagnóstico por Imágenes II", creditos: 4, semestre: 6 },
    { nombre: "Patología Oral III", creditos: 4, semestre: 6 },
    { nombre: "Farmacología General y Clínica", creditos: 5, semestre: 6 },
    { nombre: "Preclínico de Rehabilitación y Cariología", creditos: 10, semestre: 6 },
    { nombre: "Cirugía Bucal", creditos: 4, semestre: 6 },
    { nombre: "Oclusión y TTM", creditos: 4, semestre: 6 },

    { nombre: "Clínica del Niño I", creditos: 10, semestre: 7 },
    { nombre: "Clínica de Rehabilitación Oral", creditos: 10, semestre: 7 },
    { nombre: "Clínica de Endodoncia", creditos: 10, semestre: 7 },
    { nombre: "Clínica de Periodoncia", creditos: 10, semestre: 7 },
    { nombre: "Cirugía y Trauma Buco Dentaria", creditos: 6, semestre: 7 },
    { nombre: "Inglés I", creditos: 2, semestre: 7 },

    { nombre: "Clínica del Niño II", creditos: 10, semestre: 9 },
    { nombre: "Clínica Integral del Adulto y Senescente", creditos: 12, semestre: 9 },
    { nombre: "Cirugía y Trauma Máxilo Facial", creditos: 6, semestre: 9 },
    { nombre: "Promoción y Prevención en Salud", creditos: 3, semestre: 9 },
    { nombre: "Inglés II", creditos: 2, semestre: 9 },

    { nombre: "Odontología Legal", creditos: 2, semestre: 10 },
    { nombre: "Gestión en Salud", creditos: 2, semestre: 10 },

    { nombre: "Metodología de la Investigación", creditos: 2, semestre: 11 },
    { nombre: "Internado Asistencial", creditos: 24, semestre: 11 },

    { nombre: "Seminario de Investigación", creditos: 2, semestre: 12 },
  ];

  // Agrupar por semestre
  for (let sem = 1; sem <= 12; sem++) {
    const semRamos = ramos.filter(r => r.semestre === sem);
    if (semRamos.length === 0) continue;

    const grupo = document.createElement("div");
    grupo.innerHTML = `<h2>Semestre ${sem}</h2>`;
    semRamos.forEach(ramo => {
      const linea = document.createElement("div");
      linea.className = "ramo-input";
      linea.innerHTML = `
        <span>${ramo.nombre} (${ramo.creditos} cr)</span>
        <input type="number" min="1.0" max="7.0" step="0.1" data-creditos="${ramo.creditos}" />
      `;
      grupo.appendChild(linea);
    });

    // Botón para calcular promedio de este semestre
    const boton = document.createElement("button");
    boton.textContent = "Calcular promedio";
    boton.className = "boton-promedio";

    const resultado = document.createElement("div");
    resultado.className = "resultado";

    boton.onclick = () => {
      const inputs = grupo.querySelectorAll("input");
      let total = 0, suma = 0;
      inputs.forEach(inp => {
        const nota = parseFloat(inp.value);
        const cred = parseInt(inp.dataset.creditos);
        if (!isNaN(nota)) {
          suma += nota * cred;
          total += cred;
        }
      });
      if (total > 0) {
        resultado.textContent = `Promedio ponderado: ${(suma / total).toFixed(2)}`;
      } else {
        resultado.textContent = "Ingresa al menos una nota 😅";
      }
    };

    grupo.appendChild(boton);
    grupo.appendChild(resultado);
    contenedor.appendChild(grupo);
  }
});
