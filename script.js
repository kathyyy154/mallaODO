// Relaciones de prerrequisitos reales según la malla const prerequisitos = { morfo2: ["morfo1"], biofisica: ["mate"], bioquimica: ["bio", "quim"], habilidades1: ["intro"],

anato: ["morfo2"], micropara: ["morfo2", "bioquimica"], patogen: ["morfo2"], bioetica: ["intro"],

preclinico: ["biofisica", "habilidades1"], microoral: ["micropara"], rad: ["biofisica"], patoral1: ["patogen"], epidemio: ["mate"],

imagenes1: ["anato", "rad"], patoral2: ["patoral1", "microoral"],

farmacologia: ["microoral", "patoral1"], rehab: ["anato", "preclinico", "microoral"], cirugia: ["microoral", "patoral1", "anato"], oclusion: ["anato", "preclinico"],

imagenes2: ["imagenes1"], patoral3: ["patoral2"],

nino1: ["farmacologia", "rehab", "imagenes2", "patoral3"], rehaboral: ["farmacologia", "rehab", "cirugia", "oclusion", "imagenes2", "patoral3"], endo: ["farmacologia", "rehab", "oclusion", "imagenes2", "patoral3"], perio: ["farmacologia", "rehab", "oclusion", "imagenes2", "patoral3"], trauma: ["farmacologia", "cirugia", "imagenes2", "patoral3"], ingles1: ["habilidades1"],

nino2: ["nino1"], adulto: ["rehaboral", "endo", "perio", "trauma"], maxilo: ["trauma"], promoprev: ["epidemio", "rehab", "nino1", "perio"], ingles2: ["ingles1"],

legal: ["nino1", "rehaboral", "endo", "perio", "trauma"], gestion: ["promoprev"],

invest: ["legal", "gestion"], internado: ["legal", "gestion"], seminario: ["invest"] };

let aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");

function aprobar(id) { const ramo = document.getElementById(id); if (ramo.classList.contains("bloqueado")) return;

if (ramo.classList.contains("aprobado")) { ramo.classList.remove("aprobado"); aprobados = aprobados.filter(x => x !== id); } else { ramo.classList.add("aprobado"); aprobados.push(id); }

localStorage.setItem("aprobados", JSON.stringify(aprobados)); actualizarDisponibilidad(); }

function actualizarDisponibilidad() { document.querySelectorAll(".ramo").forEach(ramo => { const id = ramo.id; if (aprobados.includes(id)) { ramo.classList.remove("bloqueado", "disponible"); ramo.classList.add("aprobado"); } else { const reqs = prerequisitos[id] || []; const desbloqueado = reqs.every(req => aprobados.includes(req));

ramo.classList.remove("aprobado");

  if (reqs.length === 0) {
    ramo.classList.remove("bloqueado");
    ramo.classList.add("disponible");
  } else if (desbloqueado) {
    ramo.classList.remove("bloqueado");
    ramo.classList.add("disponible");
  } else {
    ramo.classList.remove("disponible");
    ramo.classList.add("bloqueado");
  }
}

}); }

actualizarDisponibilidad();

