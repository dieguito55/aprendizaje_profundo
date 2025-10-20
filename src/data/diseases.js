export const DISEASES_DATA = [
  {
    id: 0,
    name: "Eccema",
    scientificName: "Dermatitis Ecematosa",
    description: "Condición inflamatoria crónica de la piel caracterizada por enrojecimiento, picazón intensa y sequedad extrema. Afecta principalmente a niños pero puede persistir en la edad adulta.",
    symptoms: [
      "Piel extremadamente seca y sensible",
      "Picazón intensa que empeora por la noche",
      "Enrojecimiento e inflamación visible",
      "Ampollas pequeñas que pueden supurar",
      "Engrosamiento de la piel en áreas crónicas",
      "Grietas y descamación"
    ],
    treatments: [
      "Hidratantes y emolientes de alta calidad",
      "Corticosteroides tópicos según severidad",
      "Inhibidores de calcineurína (tacrolimus)",
      "Antihistamínicos para controlar picazón",
      "Terapia con luz ultravioleta (UVB)",
      "Biológicos dupilumab para casos severos"
    ],
    prevention: [
      "Baños cortos con agua tibia",
      "Uso inmediato de crema hidratante post-baño",
      "Evitar jabones agresivos",
      "Usar ropa de algodón suave",
      "Controlar factores desencadenantes (alérgenos)",
      "Mantener humedad ambiental adecuada"
    ],
    severity: "Moderada",
    prevalence: "Alta (15-20% población)",
    contagious: false,
    riskFactors: ["Genética", "Alergias", "Asma", "Ambiente seco"],
    color: "#FAF0EA",
    icon: "🟤",
    images: ["/images/eccema-1.jpg", "/images/eccema-2.jpg"],
    specialty: "Dermatología General"
  },
  {
    id: 1,
    name: "Melanoma",
    scientificName: "Melanoma Maligno Cutáneo",
    description: "Tipo más grave de cáncer de piel que se origina en los melanocitos. Puede desarrollarse en lunares existentes o aparecer como nuevas lesiones. Detección temprana es crucial para el pronóstico.",
    symptoms: [
      "Lunar que cambia de tamaño, color o forma",
      "Lesión con bordes irregulares y asimétricos",
      "Coloración múltiple (negro, marrón, azul, rojo)",
      "Diámetro mayor a 6mm",
      "Picazón, dolor o sangrado espontáneo",
      "Elevación o crecimiento rápido"
    ],
    treatments: [
      "Cirugía de escisión amplia con márgenes",
      "Biopsia de ganglio centinela",
      "Inmunoterapia (pembrolizumab, nivolumab)",
      "Terapia dirigida (BRAF/MEK inhibidores)",
      "Quimioterapia sistémica",
      "Radioterapia para metástasis cerebrales"
    ],
    prevention: [
      "Protector solar FPS 30+ diario",
      "Evitar exposición solar 10am-4pm",
      "Uso de ropa protectora y sombrero",
      "Autoexamen mensual de piel",
      "Dermatoscopia anual con especialista",
      "Evitar cámaras de bronceado"
    ],
    severity: "Alta",
    prevalence: "Media (en aumento)",
    contagious: false,
    riskFactors: ["Piel clara", "Quemaduras solares", "Muchos lunares", "Historia familiar"],
    color: "#0f172a",
    icon: "⚫",
    images: ["/images/melanoma-1.jpg", "/images/melanoma-2.jpg"],
    specialty: "Dermatología Oncológica",
    urgent: true,
    survivalRate: "98% si detectado temprano"
  },
  {
    id: 2,
    name: "Dermatitis Atópica",
    scientificName: "Eccema Atópico",
    description: "Forma crónica y severa de eccema asociada con predisposición genética y alteración de la barrera cutánea. Frecuentemente relacionada con asma y rinitis alérgica.",
    symptoms: [
      "Piel seca y quebradiza con liquenificación",
      "Prurito intenso que interrumpe el sueño",
      "Lesiones en pliegues (codos, rodillas)",
      "Piel engrosada con aumento del marcado",
      "Infecciones bacterianas secundarias",
      "Hiperpigmentación post-inflamatoria"
    ],
    treatments: [
      "Corticosteroides tópicos potentes",
      "Inmunomoduladores tópicos (pimecrolimus)",
      "Antibióticos para sobreinfección",
      "Antihistamínicos sedantes nocturnos",
      "Ciclosporina en casos severos",
      "Dupilumab para dermatitis atópica moderada-severa"
    ],
    prevention: [
      "Rutina estricta de hidratación",
      "Identificar y evitar alérgenos",
      "Control ambiental (ácaros, polen)",
      "Dieta de eliminación si hay alergias alimentarias",
      "Manejo del estrés",
      "Baños de avena coloidal"
    ],
    severity: "Moderada-Alta",
    prevalence: "Alta (20% niños, 3% adultos)",
    contagious: false,
    riskFactors: ["Historia familiar", "Mutación filagrina", "Vivir en ciudad", "Clima frío"],
    color: "#E9CECE",
    icon: "🔴",
    images: ["/images/atopica-1.jpg", "/images/atopica-2.jpg"],
    specialty: "Dermatología Pediátrica"
  },
  {
    id: 3,
    name: "Carcinoma Basocelular",
    scientificName: "Carcinoma Basocelular (BCC)",
    description: "Tipo más común de cáncer de piel, de crecimiento lento y rara vez metastatiza. Se origina en las células basales de la epidermis. Relacionado con exposición solar acumulativa.",
    symptoms: [
      "Nódulo perlado con telangiectasias",
      "Lesión plana similar a cicatriz",
      "Úlcera que no cura o sangra fácilmente",
      "Área elevada de color rosa o rojo",
      "Crecimiento lento durante meses/años",
      "Borde enrollado y traslúcido"
    ],
    treatments: [
      "Cirugía de Mohs para máxima conservación",
      "Escisión quirúrgica simple",
      "Electrodesecación y curetaje",
      "Crioterapia con nitrógeno líquido",
      "Terapia fotodinámica",
      "Crema de imiquimod para casos superficiales"
    ],
    prevention: [
      "Protección solar desde temprana edad",
      "Exámenes dermatológicos anuales",
      "Evitar quemaduras solares repetidas",
      "Uso de sombreros de ala ancha",
      "Autoexamen de piel regular",
      "Evitar exposición laboral al arsénico"
    ],
    severity: "Baja (baja metástasis)",
    prevalence: "Muy Alta",
    contagious: false,
    riskFactors: ["Edad avanzada", "Piel clara", "Exposición solar crónica", "Inmunosupresión"],
    color: "#A69AAD",
    icon: "🟣",
    images: ["/images/bcc-1.jpg", "/images/bcc-2.jpg"],
    specialty: "Dermatología Quirúrgica"
  },
  {
    id: 4,
    name: "Nevus Melanocítico",
    scientificName: "Nevus Melanocítico Benigno (NV)",
    description: "Acumulación benigna de melanocitos en la piel, comúnmente conocido como lunar. La mayoría son inofensivos pero algunos pueden transformarse en melanoma.",
    symptoms: [
      "Mácula o pápula pigmentada uniforme",
      "Color marrón homogéneo",
      "Bordes bien definidos y regulares",
      "Tamaño estable en el tiempo",
      "Puede ser plano o elevado",
      "Sin síntomas de picazón o dolor"
    ],
    treatments: [
      "Observación y seguimiento",
      "Dermatoscopia digital",
      "Escisión si hay cambios sospechosos",
      "Extirpación por razones cosméticas",
      "Biopsia por punch si diagnóstico dudoso"
    ],
    prevention: [
      "Fotoprotección desde la infancia",
      "Mapeo digital de lunares",
      "Seguimiento con dermatólogo anual",
      "Documentar cambios con fotos",
      "Evitar traumatismos en lunares"
    ],
    severity: "Muy Baja",
    prevalence: "Universal",
    contagious: false,
    riskFactors: ["Exposición solar", "Piel clara", "Número alto de lunares", "Historia familiar"],
    color: "#7380A1",
    icon: "🔵",
    images: ["/images/nevus-1.jpg", "/images/nevus-2.jpg"],
    specialty: "Dermatología de Lunares"
  },
  {
    id: 5,
    name: "Queratosis Benigna",
    scientificName: "Lesiones Benignas Tipo Queratosis (BKL)",
    description: "Grupo de lesiones cutáneas benignas que incluyen queratosis seborreicas, lentigos solares y otros crecimientos epidérmicos no cancerosos.",
    symptoms: [
      "Manchas marrones o negras cerosas",
      "Lesiones que parecen 'pegadas' a la piel",
      "Superficie verrugosa o costrosa",
      "Múltiples lesiones en tronco y cara",
      "Crecimiento lento durante años",
      "Sin cambios malignos típicos"
    ],
    treatments: [
      "Crioterapia para lesiones pequeñas",
      "Curetaje y electrodesecación",
      "Extirpación con bisturí",
      "Láser para lesiones faciales",
      "Observación si asintomáticas"
    ],
    prevention: [
      "Protección solar constante",
      "Exámenes regulares para descartar malignidad",
      "Evitar traumatismos en lesiones",
      "Fotoprotección desde joven"
    ],
    severity: "Muy Baja",
    prevalence: "Alta en adultos mayores",
    contagious: false,
    riskFactors: ["Edad avanzada", "Exposición solar", "Genética"],
    color: "#C3D5E4",
    icon: "⚪",
    images: ["/images/bkl-1.jpg", "/images/bkl-2.jpg"],
    specialty: "Dermatología General"
  },
  {
    id: 6,
    name: "Psoriasis",
    scientificName: "Psoriasis Vulgaris",
    description: "Enfermedad autoinmune crónica que acelera el ciclo de vida de las células cutáneas, causando acumulación rápida en la superficie de la piel.",
    symptoms: [
      "Placas rojas cubiertas de escamas plateadas",
      "Piel seca y agrietada que puede sangrar",
      "Picazón, ardor o dolor",
      "Uñas picadas y despegadas",
      "Rigidez e hinchazón articular (artritis psoriásica)",
      "Lesiones en codos, rodillas, cuero cabelludo"
    ],
    treatments: [
      "Corticosteroides tópicos",
      "Análogos de vitamina D (calcipotriol)",
      "Fototerapia (UVB, PUVA)",
      "Metotrexato para casos extensos",
      "Biológicos (anti-TNF, anti-IL)",
      "Retinoides orales (acitretina)"
    ],
    prevention: [
      "Manejo del estrés",
      "Evitar trauma cutáneo (fenómeno de Koebner)",
      "Hidratación intensiva",
      "Evitar alcohol y tabaco",
      "Pérdida de peso si hay obesidad",
      "Exposición solar moderada"
    ],
    severity: "Moderada-Crónica",
    prevalence: "2-3% población mundial",
    contagious: false,
    riskFactors: ["Genética", "Estrés", "Infecciones", "Obesidad", "Tabaquismo"],
    color: "#2D608F",
    icon: "🔵",
    images: ["/images/psoriasis-1.jpg", "/images/psoriasis-2.jpg"],
    specialty: "Dermatología y Reumatología"
  },
  {
    id: 7,
    name: "Queratosis Seborreica",
    scientificName: "Queratosis Seborreica Benigna",
    description: "Tumores cutáneos benignos muy comunes que aparecen en la edad adulta. No son premalignos ni se relacionan con cáncer de piel.",
    symptoms: [
      "Lesiones elevadas de aspecto verrugoso",
      "Color marrón, negro o color carne",
      "Superficie cerosa o escamosa",
      "Sensación de 'estar pegadas'",
      "Múltiples lesiones en tronco, cara",
      "Crecimiento lento durante años"
    ],
    treatments: [
      "Crioterapia con nitrógeno líquido",
      "Curetaje simple",
      "Electrocirugía",
      "Extirpación con bisturí",
      "Láser para áreas cosméticas",
      "Observación si no molestan"
    ],
    prevention: [
      "No hay prevención específica",
      "Protección solar general",
      "Evaluación profesional para diagnóstico correcto"
    ],
    severity: "Muy Baja",
    prevalence: "Muy Alta en >50 años",
    contagious: false,
    riskFactors: ["Edad", "Genética", "Exposición solar"],
    color: "#E9CECE",
    icon: "🟤",
    images: ["/images/seborreica-1.jpg", "/images/seborreica-2.jpg"],
    specialty: "Dermatología General"
  },
  {
    id: 8,
    name: "Infecciones Fúngicas",
    scientificName: "Dermatofitosis / Candidiasis Cutánea",
    description: "Infecciones causadas por hongos dermatofitos o levaduras que afectan la piel, uñas y mucosas. Muy comunes en climas tropicales y húmedos.",
    symptoms: [
      "Manchas rojas escamosas que se expanden",
      "Picazón intensa",
      "Bordes activos con vesículas",
      "Descamación y maceración",
      "Alopecia en áreas infectadas (tiña capitis)",
      "Uñas engrosadas y quebradizas (onicomicosis)"
    ],
    treatments: [
      "Antifúngicos tópicos (clotrimazol, ketoconazol)",
      "Antifúngicos orales (terbinafina, itraconazol)",
      "Shampoos medicados para cuero cabelludo",
      "Lacas de uñas antifúngicas",
      "Crioterapia para onicomicosis resistente"
    ],
    prevention: [
      "Mantener piel seca y limpia",
      "Usar calzado en duchas públicas",
      "Cambiar ropa húmeda rápidamente",
      "No compartir toallas o peines",
      "Ventilar calzado regularmente",
      "Usar talcos antifúngicos"
    ],
    severity: "Leve-Moderada",
    prevalence: "Alta mundial",
    contagious: true,
    riskFactors: ["Clima húmedo", "Inmunosupresión", "Diabetes", "Obesidad", "Mala higiene"],
    color: "#A69AAD",
    icon: "🟢",
    images: ["/images/fungica-1.jpg", "//images/fungica-2.jpg"],
    specialty: "Dermatología y Micología"
  },
  {
    id: 9,
    name: "Infecciones Virales",
    scientificName: "Infecciones Virales Cutáneas",
    description: "Lesiones cutáneas causadas por virus, incluyendo verrugas virales, molusco contagioso y herpes. Altamente contagiosas pero generalmente benignas.",
    symptoms: [
      "Verrugas elevadas de superficie rugosa",
      "Pápulas perladas con umbilicación central (molusco)",
      "Vesículas agrupadas en base roja (herpes)",
      "Pueden ser únicas o múltiples",
      "Generalmente asintomáticas",
      "Posible picazón leve"
    ],
    treatments: [
      "Crioterapia para verrugas",
      "Curetaje para molusco",
      "Ácido salicílico tópico",
      "Imiquimod para estimular inmunidad",
      "Láser para verrugas resistentes",
      "Antivirales para herpes (aciclovir)"
    ],
    prevention: [
      "No rascar o tocar lesiones",
      "Usar preservativos para herpes genital",
      "No compartir toallas o ropa",
      "Vacuna VPH para verrugas genitales",
      "Mantener sistema inmune fuerte"
    ],
    severity: "Leve",
    prevalence: "Muy Alta",
    contagious: true,
    riskFactors: ["Contacto directo", "Inmunosupresión", "Edad pediátrica", "Actividad sexual"],
    color: "#7380A1",
    icon: "🟡",
    images: ["/images/viral-1.jpg", "/images/viral-2.jpg"],
    specialty: "Dermatología y Virología"
  }
];

// Función utilitaria para obtener enfermedad por ID
export const getDiseaseById = (id) => {
  return DISEASES_DATA.find(disease => disease.id === id);
};

// Función para obtener enfermedades por severidad
export const getDiseasesBySeverity = (severity) => {
  return DISEASES_DATA.filter(disease => disease.severity === severity);
};

// Función para enfermedades urgentes
export const getUrgentDiseases = () => {
  return DISEASES_DATA.filter(disease => disease.urgent);
};