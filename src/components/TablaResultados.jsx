import { useState } from "react";
import api from "../api";

const COLUMNAS = {
  factura: [
    "ruc_proveedor","razon_social_prov","ruc_cliente","razon_social_cli",
    "fecha","serie","numero_doc","subtotal","igv","total",
  ],
  recibo: [
    "ruc_proveedor","razon_social_prov","ruc_cliente","razon_social_cli",
    "fecha","serie","numero_doc","subtotal","igv","total",
  ],
  asistencia: [
    "trabajador","dni","fecha","hora_entrada","hora_salida","turno","firma_presente",
  ],
};

const LABEL = {
  ruc_proveedor: "RUC Proveedor",   razon_social_prov: "Razón Social Prov.",
  ruc_cliente: "RUC Cliente",       razon_social_cli: "Razón Social Cli.",
  fecha: "Fecha",                   serie: "Serie",
  numero_doc: "Número",             subtotal: "Subtotal",
  igv: "IGV",                       total: "Total",
  trabajador: "Trabajador",         dni: "DNI",
  hora_entrada: "Entrada",          hora_salida: "Salida",
  turno: "Turno",                   firma_presente: "Firma",
};

const RUTA = {
  factura: "facturas",
  recibo: "recibos",
  asistencia: "asistencia",
};

export default function TablaResultados({ tipo, filas, onActualizar }) {
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState({});

  const columnas = COLUMNAS[tipo] || [];
  const campoBusqueda = tipo === "asistencia" ? "trabajador" : "razon_social_prov";

  const filasFiltradas = filas.filter((f) =>
    String(f[campoBusqueda] || "").toLowerCase().includes(filtro.toLowerCase())
  );

  function cambiarCelda(id, campo, valor) {
    setEditando((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [campo]: valor },
    }));
  }

  async function guardarFila(id) {
    const cambios = editando[id];
    if (!cambios) return;
    await api.put(`/${RUTA[tipo]}/${id}`, cambios);
    setEditando((prev) => { const s = { ...prev }; delete s[id]; return s; });
    onActualizar();
  }

  if (!filas.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <input
          type="text"
          placeholder={`Filtrar por ${LABEL[campoBusqueda]}...`}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-blue-400"
        />
        <span className="text-gray-400 text-sm">{filasFiltradas.length} registro(s)</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columnas.map((col) => (
                <th key={col} className="px-4 py-2 text-left text-gray-600 font-medium whitespace-nowrap">
                  {LABEL[col] || col}
                </th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filasFiltradas.map((fila) => (
              <tr key={fila.id} className="border-b border-gray-100 hover:bg-gray-50">
                {columnas.map((col) => (
                  <td key={col} className="px-4 py-2">
                    <input
                      type="text"
                      value={editando[fila.id]?.[col] !== undefined ? editando[fila.id][col] : String(fila[col] ?? "")}
                      onChange={(e) => cambiarCelda(fila.id, col, e.target.value)}
                      className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none px-1 py-0.5 min-w-20"
                    />
                  </td>
                ))}
                <td className="px-4 py-2">
                  {editando[fila.id] && (
                    <button
                      onClick={() => guardarFila(fila.id)}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Guardar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}