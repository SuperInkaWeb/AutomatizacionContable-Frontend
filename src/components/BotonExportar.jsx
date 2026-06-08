import * as XLSX from "xlsx";

export default function BotonExportar({ filas, tipo }) {
  function exportar() {
    if (!filas.length) return;
    const datos = filas.map(({ id, created_at, file_url, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tipo);
    XLSX.writeFile(wb, `autodoc_${tipo}_${Date.now()}.xlsx`);
  }

  return (
    <button
      onClick={exportar}
      disabled={!filas.length}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Exportar Excel
    </button>
  );
}