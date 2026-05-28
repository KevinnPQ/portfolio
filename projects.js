export const projects = [
  {
    id: "retail-sales-dashboard",
    eyebrow: "Retail - Profitability - Dashboard",
    title: "Retail Sales Performance Dashboard",
    shortDescription:
      "Explored two years of transactions to find profit drivers, seasonality, and low-margin SKUs.",
    overview:
      "Built a repeatable analysis flow from raw transactions to KPIs and a stakeholder-friendly dashboard view.",
    technologies: ["Excel", "SQL", "Power BI"],
    approach: [
      "Cleaned product/category mappings and standardized dates/currency fields.",
      "Wrote SQL for margin, return rate, and time-series baselines (week/month).",
      "Designed KPIs and drilldowns for region, category, and channel performance."
    ],
    results: [
      "Identified 3 categories contributing about 60% of profit and 2 low-margin segments driving returns.",
      "Reduced weekly reporting time by automating the query plus dashboard refresh workflow.",
      "Recommended SKU rationalization and pricing adjustments based on margin and returns."
    ],
    charts: [
      {
        type: "svg",
        caption: "Revenue and margin trend by month.",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monthly trend">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<path d="M40 250 C 90 230, 120 200, 160 205 C 210 212, 230 160, 280 165 C 330 170, 360 130, 410 140 C 470 152, 510 110, 600 95 L 600 310 L 40 310 Z" fill="rgba(99,102,241,0.22)"/>' +
          '<path d="M40 250 C 90 230, 120 200, 160 205 C 210 212, 230 160, 280 165 C 330 170, 360 130, 410 140 C 470 152, 510 110, 600 95" fill="none" stroke="rgba(99,102,241,0.95)" stroke-width="4"/>' +
          "</svg>"
      },
      {
        type: "svg",
        caption: "Profit concentration by category (Pareto-style).",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Category pareto">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="110" y="110" width="48" height="180" rx="10" fill="rgba(34,211,238,0.25)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="190" y="150" width="48" height="140" rx="10" fill="rgba(34,211,238,0.20)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="270" y="80" width="48" height="210" rx="10" fill="rgba(34,211,238,0.28)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="350" y="170" width="48" height="120" rx="10" fill="rgba(34,211,238,0.18)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="430" y="130" width="48" height="160" rx="10" fill="rgba(34,211,238,0.22)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="510" y="95" width="48" height="195" rx="10" fill="rgba(34,211,238,0.26)" stroke="rgba(255,255,255,0.10)"/>' +
          "</svg>"
      }
    ],
    links: {
      github: null,
      report: null,
      live: null
    }
  },
  {
    id: "volatilidad-vegetales-canasta-basica",
    eyebrow: "Estudio - Volatilidad - Canasta basica",
    title: "Volatilidad de precios en vegetales de la canasta basica",
    shortDescription:
      "Analisis de la relacion entre oferta mayorista y precio al consumidor para papa, tomate y cebolla, con visualizaciones interactivas y correlaciones.",
    technologies: ["SQL", "Excel", "Python", "Plotly"],
    meta: {
      source: "CENADA + INEC",
      period: "Ej. 2020-2024 (ajusta segun tu data)",
      dataset: "Oferta mayorista y precios (estandarizado a precio por kilo)"
    },
    article: {
      sections: [
        {
          kind: "text",
          title: "1. Titulo y resumen ejecutivo",
          text:
            "Estudio de volatilidad de precios en vegetales de la canasta basica. Se analiza el impacto de la oferta mayorista en el gasto de los hogares y como los cambios estacionales afectan el precio final."
        },
        {
          kind: "list",
          title: "2. Metodologia y origen de los datos",
          items: [
            "Se utilizan bases de datos del CENADA (oferta mayorista) y del INEC (precios).",
            "Se estandariza el precio a una unidad comun (precio por kilo).",
            "Ejemplos de conversion: mallas de 45 kg (papa) y cajas de 18 kg (tomate) se convierten a costo por kg para comparacion consistente.",
            "Se depuran registros, se alinean fechas y se unifican nombres de productos."
          ]
        },
        {
          kind: "charts",
          title: "3. Exploracion visual (Plotly)",
          charts: [
            {
              type: "html",
              title: "Oferta vs precio (interactivo)",
              src: "charts/oferta-vs-precio.html",
              caption:
                "Grafico interactivo: oferta mayorista vs precio. Coloca aqui tu HTML exportado de Plotly."
            },
            {
              type: "html",
              title: "Picos estacionales",
              src: "charts/picos-estacionales.html",
              caption:
                "Marca los meses mas caros (por ejemplo, con estrellas doradas) y explica el contexto (clima, escasez, etc.)."
            }
          ]
        },
        {
          kind: "table",
          title: "4. Analisis estadistico (Pearson y R2)",
          columns: ["Producto", "Pearson (r)", "R2", "Interpretacion"],
          rows: [
            {
              Producto: "Papa",
              "Pearson (r)": "0.00",
              R2: "0.00",
              Interpretacion:
                "Reemplaza con tus valores reales. Deberia reflejar relacion fuerte oferta-precio."
            },
            {
              Producto: "Tomate",
              "Pearson (r)": "0.00",
              R2: "0.00",
              Interpretacion:
                "Reemplaza con tus valores reales. Se espera relacion fuerte si la oferta local domina el precio."
            },
            {
              Producto: "Cebolla",
              "Pearson (r)": "0.00",
              R2: "0.00",
              Interpretacion:
                "Anomalia: un R2 bajo sugiere mercado intervenido por importaciones, rompiendo la correlacion con oferta local."
            }
          ]
        },
        {
          kind: "list",
          title: "5. Conclusiones y takeaways",
          items: [
            "La volatilidad estacional impacta directamente el presupuesto de los hogares.",
            "Para papa y tomate se valida una relacion fuerte entre oferta mayorista y precio.",
            "La cebolla se comporta distinto: importaciones o intervenciones pueden explicar un R2 bajo.",
            "Se recomienda monitoreo continuo y analisis por temporada para anticipar picos de gasto."
          ]
        },
        {
          kind: "links",
          title: "Links",
          links: {
            report: null,
            github: null,
            live: null
          }
        }
      ]
    },
    links: { github: null, report: null, live: null }
  },
  {
    id: "customer-churn-cohorts",
    eyebrow: "Subscriptions - Cohorts - Retention",
    title: "Customer Churn and Retention Cohort Analysis",
    shortDescription:
      "Cohort-based analysis to understand retention curves and drivers of churn over time.",
    overview:
      "Used cohorting and funnel metrics to map churn risk by plan, tenure, and engagement behavior.",
    technologies: ["SQL", "Excel", "Python"],
    approach: [
      "Defined cohorts by first paid month and computed retention by tenure.",
      "Engineered features for activity, support tickets, and usage frequency.",
      "Summarized churn signals to prioritize product and lifecycle interventions."
    ],
    results: [
      "Found the highest churn risk in the first 30 days and a plateau after month 3.",
      "Flagged segments with low activation events as primary churn drivers.",
      "Produced recommendations for onboarding nudges and plan-specific messaging."
    ],
    charts: [
      {
        type: "svg",
        caption: "Example cohort retention curve across months.",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Retention curve">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<path d="M70 90 C 140 112, 170 150, 240 170 C 310 188, 360 210, 430 225 C 500 240, 545 265, 590 280" fill="none" stroke="rgba(165,180,252,0.95)" stroke-width="4"/>' +
          '<circle cx="70" cy="90" r="5" fill="rgba(165,180,252,0.95)"/>' +
          '<circle cx="240" cy="170" r="5" fill="rgba(165,180,252,0.95)"/>' +
          '<circle cx="430" cy="225" r="5" fill="rgba(165,180,252,0.95)"/>' +
          '<circle cx="590" cy="280" r="5" fill="rgba(165,180,252,0.95)"/>' +
          "</svg>"
      },
      {
        type: "svg",
        caption: "Relative impact (illustrative) of key churn drivers.",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Churn drivers">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="110" y="135" width="48" height="155" rx="10" fill="rgba(99,102,241,0.24)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="190" y="165" width="48" height="125" rx="10" fill="rgba(99,102,241,0.18)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="270" y="110" width="48" height="180" rx="10" fill="rgba(99,102,241,0.28)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="350" y="190" width="48" height="100" rx="10" fill="rgba(99,102,241,0.16)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="430" y="145" width="48" height="145" rx="10" fill="rgba(99,102,241,0.22)" stroke="rgba(255,255,255,0.10)"/>' +
          "</svg>"
      }
    ],
    links: {
      github: null,
      report: null,
      live: null
    }
  },
  {
    id: "marketing-funnel-optimization",
    eyebrow: "Marketing - Funnel - Experiment ideas",
    title: "Marketing Funnel Drop-off Analysis",
    shortDescription:
      "Analyzed funnel conversion to quantify drop-off and propose experiment opportunities.",
    overview:
      "Mapped the funnel end-to-end and quantified drop-offs to focus optimization on the highest-leverage step.",
    technologies: ["Excel", "SQL"],
    approach: [
      "Created a funnel table with consistent event definitions and deduped users.",
      "Computed conversion rates by channel and landing page group.",
      "Produced prioritized experiment ideas based on impact and effort."
    ],
    results: [
      "Pinpointed the largest conversion loss at signup to activation.",
      "Highlighted channel segments with high intent but low activation.",
      "Delivered a test backlog with expected uplift ranges."
    ],
    charts: [
      {
        type: "svg",
        caption: "Illustrative funnel conversion step-down.",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Funnel">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<path d="M120 90 H520 L465 150 H175 Z" fill="rgba(34,211,238,0.22)" stroke="rgba(255,255,255,0.12)"/>' +
          '<path d="M175 150 H465 L430 210 H210 Z" fill="rgba(34,211,238,0.18)" stroke="rgba(255,255,255,0.12)"/>' +
          '<path d="M210 210 H430 L408 260 H232 Z" fill="rgba(34,211,238,0.15)" stroke="rgba(255,255,255,0.12)"/>' +
          '<path d="M232 260 H408 L396 300 H244 Z" fill="rgba(34,211,238,0.12)" stroke="rgba(255,255,255,0.12)"/>' +
          "</svg>"
      },
      {
        type: "svg",
        caption: "Example conversion comparison by channel.",
        svg:
          '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Channel comparison">' +
          '<rect x="0" y="0" width="640" height="360" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="140" y="120" width="70" height="170" rx="12" fill="rgba(165,180,252,0.22)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="250" y="160" width="70" height="130" rx="12" fill="rgba(165,180,252,0.18)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="360" y="95" width="70" height="195" rx="12" fill="rgba(165,180,252,0.26)" stroke="rgba(255,255,255,0.10)"/>' +
          '<rect x="470" y="175" width="70" height="115" rx="12" fill="rgba(165,180,252,0.16)" stroke="rgba(255,255,255,0.10)"/>' +
          "</svg>"
      }
    ],
    links: {
      github: null,
      report: null,
      live: null
    }
  }
];

