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
      }
    ],
    links: { github: null, report: null, live: null }
  },
  {
    id: "volatilidad-vegetales-canasta-basica",
    eyebrow: "Estudio - Volatilidad - Canasta basica",
    title: "Volatilidad de precios en vegetales de la canasta basica",
    shortDescription:
      "Analisis de la relacion entre oferta mayorista y precio al consumidor para papa, tomate y cebolla.",
    technologies: ["SQL", "Excel", "Python", "Plotly"],
    meta: {
      source: "CENADA + INEC",
      period: "2020-2024",
      dataset: "Oferta mayorista y precios (precio por kilo)"
    },
    article: {
      sections: [
        {
          kind: "text",
          title: "Resumen ejecutivo",
          text:
            "Se analiza el impacto de la oferta mayorista en el gasto de los hogares y como los cambios estacionales afectan el precio final."
        },
        {
          kind: "list",
          title: "Metodologia",
          items: [
            "Integracion de CENADA (oferta) e INEC (precios).",
            "Estandarizacion de precios a costo por kilo.",
            "Depuracion de outliers, fechas y nomenclaturas."
          ]
        },
        {
          kind: "charts",
          title: "Graficos interactivos",
          charts: [
            {
              type: "html",
              title: "Papa",
              src: "/src/charts/grafico_papa.html",
              caption: "Relacion entre oferta y precio para papa."
            },
            {
              type: "html",
              title: "Tomate",
              src: "/src/charts/grafico_tomate.html",
              caption: "Relacion entre oferta y precio para tomate."
            },
            {
              type: "html",
              title: "Cebolla",
              src: "/src/charts/grafico_cebolla.html",
              caption: "Relacion entre oferta y precio para cebolla."
            }
          ]
        },
        {
          kind: "table",
          title: "Correlacion global por verdura",
          columns: ["Verdura", "Pearson Global", "R² Global", "P-Value Global"],
          rows: [
            {
              Verdura: "PAPA",
              "Pearson Global": "-0.69733",
              "R² Global": "0.48627",
              "P-Value Global": "2.5919e-12"
            },
            {
              Verdura: "TOMATE",
              "Pearson Global": "-0.65445",
              "R² Global": "0.42830",
              "P-Value Global": "1.4383e-10"
            },
            {
              Verdura: "CEBOLLA",
              "Pearson Global": "-0.20494",
              "R² Global": "0.04200",
              "P-Value Global": "7.5748e-02"
            }
          ]
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
      "Flagged segments with low activation events as primary churn drivers."
    ],
    links: { github: null, report: null, live: null }
  }
];
