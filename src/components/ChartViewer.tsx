import { useState } from "react";
import { Tabs } from "@ark-ui/react/tabs";
import { Collapsible } from "@ark-ui/react/collapsible";
import { Select, createListCollection } from "@ark-ui/react/select";
import { ScrollArea } from "@ark-ui/react/scroll-area";
import {
  PanelRightOpen,
  PanelRightClose,
  Maximize2,
  GitCompare,
  X,
  ChevronDown,
  Check,
} from "lucide-react";

export interface ChartItem {
  type: "svg" | "image" | "html";
  src?: string;
  svg?: string;
  title?: string;
  caption?: string;
  alt?: string;
}

export interface ChartViewerProps {
  charts: ChartItem | ChartItem[];
}

function ChartFrame({
  chart,
  height = "560px",
}: {
  chart: ChartItem;
  height?: string;
}) {
  if (chart.type === "svg" && chart.svg) {
    return (
      <div
        className="overflow-hidden rounded-lg"
        dangerouslySetInnerHTML={{ __html: chart.svg }}
      />
    );
  }
  if (chart.type === "image" && chart.src) {
    return (
      <img
        src={chart.src}
        alt={chart.alt || chart.caption || "Gráfico"}
        className="w-full rounded-lg m-0"
      />
    );
  }
  if (chart.type === "html" && chart.src) {
    return (
      <iframe
        src={chart.src}
        title={chart.title || chart.caption || "Gráfico interactivo"}
        style={{ height }}
        className="w-full rounded-lg border border-white/10 bg-white"
      />
    );
  }
  return <p className="text-sm text-white/60">Gráfico no disponible.</p>;
}

export default function ChartViewer({ charts }: ChartViewerProps) {
  const chartList = Array.isArray(charts) ? charts : [charts];
  const hasMultiple = chartList.length > 1;

  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [compareIdx, setCompareIdx] = useState<number | null>(null);
  const [expandedChart, setExpandedChart] = useState<ChartItem | null>(null);

  // Build Select collection excluding the active tab
  const compareOptions = chartList
    .map((c, i) => ({ label: c.title ?? `Gráfico ${i + 1}`, value: String(i) }))
    .filter((_, i) => i !== activeTab);
  const collection = createListCollection({ items: compareOptions });

  const handleTabChange = (details: { value: string }) => {
    const newIdx = Number(details.value);
    setActiveTab(newIdx);
    // If the comparison is now the same as the active tab, clear it
    if (compareIdx === newIdx) setCompareIdx(null);
  };

  const stopComparing = () => {
    setComparing(false);
    setCompareIdx(null);
  };

  return (
    <div className="chart-viewer relative left-1/2 w-[95vw] -translate-x-1/2 xl:w-[80vw] 2xl:w-[75vw] my-8">
      {/* ── Main panel + sidebar ── */}
      <div className="flex gap-3 items-start">
        {/* ── Chart panel ── */}
        <div className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <Tabs.Root
            value={String(activeTab)}
            onValueChange={handleTabChange}
          >
            {/* Tab list */}
            <Tabs.List className="flex items-center gap-1 px-3 pt-3 pb-0 border-b border-white/10">
              {chartList.map((chart, i) => (
                <Tabs.Trigger
                  key={i}
                  value={String(i)}
                  className="chart-tab-trigger px-3 py-2 text-sm font-semibold text-white/60 rounded-t-lg border-b-2 border-transparent data-[selected]:text-white data-[selected]:border-indigo-400 hover:text-white/80 transition-colors cursor-pointer outline-none"
                >
                  {chart.title ?? `Gráfico ${i + 1}`}
                </Tabs.Trigger>
              ))}
              <Tabs.Indicator className="hidden" />
            </Tabs.List>

            {/* Tab contents */}
            {chartList.map((chart, i) => (
              <Tabs.Content key={i} value={String(i)} className="p-3">
                {/* Normal view */}
                {!comparing && (
                  <>
                    <ChartFrame chart={chart} />
                    {chart.caption && (
                      <p className="mt-2 text-sm text-white/50 text-center">
                        {chart.caption}
                      </p>
                    )}
                  </>
                )}

                {/* Comparison view — two rows */}
                {comparing && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-2">
                        {chart.title ?? `Gráfico ${i + 1}`}
                      </p>
                      <ChartFrame chart={chart} height="420px" />
                    </div>
                    {compareIdx !== null && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-2">
                          {chartList[compareIdx].title ??
                            `Gráfico ${compareIdx + 1}`}
                        </p>
                        <ChartFrame
                          chart={chartList[compareIdx]}
                          height="420px"
                        />
                      </div>
                    )}
                    {compareIdx === null && (
                      <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-white/20 text-white/40 text-sm">
                        Selecciona un gráfico para comparar →
                      </div>
                    )}
                  </div>
                )}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>

        {/* ── Sidebar (Collapsible) ── */}
        <Collapsible.Root
          open={sidebarOpen}
          onOpenChange={(d) => setSidebarOpen(d.open)}
          className="flex-shrink-0"
        >
          <Collapsible.Trigger asChild>
            <button
              type="button"
              title={sidebarOpen ? "Cerrar barra" : "Barra de análisis"}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              {sidebarOpen ? (
                <PanelRightClose size={16} />
              ) : (
                <PanelRightOpen size={16} />
              )}
              {sidebarOpen ? "" : "Barra de análisis"}
            </button>
          </Collapsible.Trigger>

          <Collapsible.Content className="mt-2 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="w-52 rounded-xl border border-white/10 bg-[#0d1428] p-3 flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Barra de análisis
              </p>

              {/* Expand chart button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors w-full"
                onClick={() => setExpandedChart(chartList[activeTab])}
              >
                <Maximize2 size={14} />
                Expandir gráfico
              </button>

              {/* Compare button — only if > 1 chart */}
              {hasMultiple && (
                <>
                  {!comparing ? (
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-indigo-500/50 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors w-full"
                      onClick={() => setComparing(true)}
                    >
                      <GitCompare size={14} />
                      Comparar
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors w-full"
                        onClick={stopComparing}
                      >
                        <X size={14} />
                        Detener comparación
                      </button>

                      {/* Select: pick comparison chart */}
                      <div>
                        <p className="text-xs text-white/40 mb-1.5 font-medium">
                          Comparar con:
                        </p>
                        <Select.Root
                          collection={collection}
                          value={
                            compareIdx !== null ? [String(compareIdx)] : []
                          }
                          onValueChange={(d) => {
                            const val = d.value[0];
                            setCompareIdx(val !== undefined ? Number(val) : null);
                          }}
                        >
                          <Select.Control>
                            <Select.Trigger className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 cursor-pointer outline-none focus:border-indigo-400 transition-colors">
                              <Select.ValueText placeholder="Seleccionar..." />
                              <Select.Indicator>
                                <ChevronDown size={14} className="text-white/50" />
                              </Select.Indicator>
                            </Select.Trigger>
                          </Select.Control>

                          <Select.Positioner>
                            <Select.Content className="z-50 min-w-[12rem] rounded-xl border border-white/10 bg-[#0d1428] p-1 shadow-2xl outline-none">
                              {collection.items.map((item) => (
                                <Select.Item
                                  key={item.value}
                                  item={item}
                                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 cursor-pointer outline-none data-[highlighted]:bg-white/10 data-[selected]:text-indigo-300 transition-colors"
                                >
                                  <Select.ItemText>{item.label}</Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check size={12} className="text-indigo-400" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      {/* ── Full-screen modal ── */}
      {expandedChart && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setExpandedChart(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[1400px] overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f1e]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <p className="text-sm font-semibold text-white/80">
                {expandedChart.title ?? "Gráfico"}
              </p>
              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors"
                onClick={() => setExpandedChart(null)}
              >
                Cerrar
              </button>
            </div>

            {/* Modal content — wrapped in ScrollArea */}
            <ScrollArea.Root className="max-h-[calc(90vh-56px)] overflow-hidden">
              <ScrollArea.Viewport className="h-full w-full p-3">
                <ChartFrame chart={expandedChart} height="80vh" />
                {expandedChart.caption && (
                  <p className="mt-2 text-sm text-white/50 text-center">
                    {expandedChart.caption}
                  </p>
                )}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex w-2 touch-none select-none p-0.5 transition-colors"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/20 hover:bg-white/30" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        </div>
      )}
    </div>
  );
}
