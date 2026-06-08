import { useState, useEffect } from "react";
import Papa from "papaparse";

export interface DataTableProps {
  csvData?: string;
  fileUrl?: string;
}

export default function DataTable({ csvData, fileUrl }: DataTableProps) {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseCSV = (data: string) => {
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.meta.fields) {
            setColumns(results.meta.fields);
            setRows(results.data);
          }
          setLoading(false);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setLoading(false);
        }
      });
    };

    if (csvData) {
      parseCSV(csvData);
    } else if (fileUrl) {
      fetch(fileUrl)
        .then((response) => response.text())
        .then(parseCSV)
        .catch((err) => {
          console.error("Failed to fetch CSV:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [csvData, fileUrl]);

  const copyTable = async () => {
    if (columns.length === 0) return;
    const header = columns.join("\t");
    const body = rows.map((row) => columns.map((col) => String(row[col] ?? "")).join("\t")).join("\n");
    await navigator.clipboard.writeText(`${header}\n${body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <div className="animate-pulse h-32 bg-white/5 rounded-2xl" />;

  if (columns.length === 0) return <p className="text-white/50 text-sm">No hay datos disponibles.</p>;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1428]/90 p-3 my-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Vista previa de datos</p>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
          onClick={copyTable}
        >
          {copied ? "Copiado" : "Copiar tabla"}
        </button>
      </div>
      <div className="auto-hide-scrollbar overflow-x-auto rounded-xl border border-white/10 bg-[#0a0f1e]/70 max-h-[400px]">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-[#0a0f1e]">
            <tr>
              {columns.map((col) => (
                <th key={col} className="border-b border-white/10 px-3 py-2 text-left font-semibold text-white/90">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-white/[0.02]">
                {columns.map((col) => (
                  <td key={`${idx}-${col}`} className="border-b border-white/10 px-3 py-2 align-top text-[1rem] text-white/75 whitespace-nowrap">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
