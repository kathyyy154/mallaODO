const cursos = {
  // Semestre 1
  "Morfofunción I": [],
  "Matemáticas": [],
  "Biología General": [],
  "Química General": [],
  "Introducción a la Odontología": [],

  // Semestre 2
  "Morfofunción II": ["Morfofunción I"],
  "Biofísica": ["Matemáticas"],
  "Bioquímica": ["Biología General", "Química General"],
  "Habilidades y Destrezas I": ["Introducción a la Odontología"],

  // Semestre 3
  "Anatomía Aplicada": ["Morfofunción II"],
  "Microbiología y Parasitología": ["Morfofunción II", "Bioquímica"],
  "Patología General": ["Morfofunción II"],
  "Bioética": ["Introducción a la Odontología"],

  // Semestre 4
  "Preclínico y Biomateriales Dentales": ["Biofísica", "Habilidades y Destrezas I"],
  "Microbiología Oral": ["Microbiología y Parasitología"],
  "Protección Radiológica": ["Biofísica"],
  "Patología Oral I": ["Patología General"],
  "Epidemiología": ["Matemáticas"],

  // Semestre 5
  "Diagnóstico por Imágenes I": ["Anatomía Aplicada", "Protección Radiológica"],
  "Patología Oral II": ["Patología Oral I", "Microbiología Oral"],

  // Semestre 5–6
  "Farmacología General y Clínica": ["Microbiología Oral", "Patología Oral I"],
  "Preclínico Rehabilitación y Cariología": ["Anatomía Aplicada", "Preclínico y Biomateriales Dentales", "Microbiología Oral"],
  "Cirugía Bucal": ["Microbiología Oral", "Patología Oral I", "Anatomía Aplicada"],
  "Oclusión y TTM": ["Anatomía Aplicada", "Preclínico y Biomateriales Dentales"],

  // Semestre 6
  "Diagnóstico por Imágenes II": ["Diagnóstico por Imágenes I"],
  "Patología Oral III": ["Patología Oral II"],

  // Clínicos 7–8
  "Clínica Niño y Ortodoncia I": ["Farmacología General y Clínica", "Preclínico Rehabilitación y Cariología", "Diagnóstico por Imágenes II", "Patología Oral III"],
  "Clínica Rehabilitación Oral": ["Farmacología General y Clínica", "Preclínico Rehabilitación y Cariología", "Cirugía Bucal", "Oclusión y TTM", "Diagnóstico por Imágenes II", "Patología Oral III"],
  "Clínica Endodoncia": ["Farmacología General y Clínica", "Preclínico Rehabilitación y Cariología", "Oclusión y TTM", "Diagnóstico por Imágenes II", "Patología Oral III"],
  "Clínica Periodoncia": ["Farmacología General y Clínica", "Preclínico Rehabilitación y Cariología", "Oclusión y TTM", "Diagnóstico por Imágenes II", "Patología Oral III"],
  "Cirugía y Trauma B.D.": ["Farmacología General y Clínica", "Cirugía Bucal", "Diagnóstico por Imágenes II", "Patología Oral III"],
  "Inglés I": ["Habilidades y Destrezas I"],

  // Clínicos 9–10
  "Clínica Niño y Ortodoncia II": ["Clínica Niño y Ortodoncia I"],
  "Clínica Integral del Adulto y Senescente": ["Clínica Rehabilitación Oral", "Clínica Endodoncia", "Clínica Periodoncia", "Cirugía y Trauma B.D."],
  "Cirugía Maxilofacial": ["Cirugía y Trauma B.D."],
  "Promoción y Prevención": ["Epidemiología", "Preclínico Rehabilitación y Cariología", "Clínica Niño y Ortodoncia I", "Clínica Periodoncia"],
  "Inglés II": ["Inglés I"],

  // Semestre 10
  "Odontología Legal": ["Clínica Niño y Ortodoncia I", "Clínica Rehabilitación Oral", "Clínica Endodoncia", "Clínica Periodoncia", "Cirugía y Trauma B.D."],
  "Gestión en Salud": ["Promoción y Prevención"],

  // Semestre 11–12
  "Metodología de la Investigación": ["Odontología Legal", "Gestión en Salud"],
  "Internado Asistencial": ["Odontología Legal", "Gestión en Salud"],
  "Seminario de Investigación": ["Metodología de la Investigación"]
};

const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));
const g = new dagreD3.graphlib.Graph().setGraph({ rankdir: "LR" });

Object.keys(cursos).forEach((curso) => {
  const estado = getEstado(curso);
  g.setNode(curso, {
    label: curso,
    class: estado,
    rx: 8,
    ry: 8
  });
});

Object.entries(cursos).forEach(([curso, prereqs]) => {
  prereqs.forEach((req) => {
    g.setEdge(req, curso);
  });
});

const render = new dagreD3.render();
const svg = d3.select("svg");
const inner = svg.append("g");
render(inner, g);

const zoom = d3.zoom().on("zoom", (event) => {
  inner.attr("transform", event.transform);
});
svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(0.75).translate(20, 20));

svg.selectAll("g.node").on("click", function () {
  const label = d3.select(this).select("text").text();
  if (aprobados.has(label)) {
    aprobados.delete(label);
  } else {
    aprobados.add(label);
  }
  localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
  location.reload();
});

function getEstado(curso) {
  if (aprobados.has(curso)) return "aprobado";
  const prereqs = cursos[curso];
  if (prereqs.length === 0) return "disponible";
  return prereqs.every((r) => aprobados.has(r)) ? "disponible" : "bloqueado";
}
