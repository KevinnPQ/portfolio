export const projects = [
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
  }
];
