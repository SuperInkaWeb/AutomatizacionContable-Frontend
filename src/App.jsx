import { useState, useEffect, useCallback } from "react";
import api from "./api";
import SelectorTipo from "./components/SelectorTipo";
import ZonaCarga from "./components/ZonaCarga";
import TablaResultados from "./components/TablaResultados";
import BotonExportar from "./components/BotonExportar";

const ENDPOINT_UPLOAD = {
  factura:    "/upload/factura",
  recibo:     "/upload/recibo",
  asistencia: "/upload/asistencia",
};

const ENDPOINT_LIST = {
  factura:    "/facturas",
  recibo:     "/recibos",
  asistencia: "/asistencia",
};

const TITULO = {
  factura:    "Facturas",
  recibo:     "Recibos de Luz",
  asistencia: "Asistencia Laboral",
};

export default function App() {
  const [tipo, setTipo]         = useState("factura");
  const [filas, setFilas]       = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError]       = useState(null);

  const cargarRegistros = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINT_LIST[tipo]);
      setFilas(res.data);
    } catch {
      setFilas([]);
    }
  }, [tipo]);

  useEffect(() => {
    setFilas([]);
    setError(null);
    cargarRegistros();
  }, [tipo, cargarRegistros]);

  async function manejarArchivo(file) {
    setError(null);
    setCargando(true);
    const form = new FormData();
    form.append("file", file);
    try {
      await api.post(ENDPOINT_UPLOAD[tipo], form);
      await cargarRegistros();
    } catch (e) {
      const msg = e.response?.data?.detail || "Error al procesar el documento";
      setError(msg);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">AutoDoc Peru</h1>
          <p className="text-xs text-gray-400">Extracción automática de documentos</p>
        </div>
        <BotonExportar filas={filas} tipo={tipo} />
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Selector */}
        <SelectorTipo tipo={tipo} onChange={setTipo} />

        {/* Zona de carga */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Subir {TITULO[tipo]}
          </h2>
          <ZonaCarga tipo={tipo} onArchivo={manejarArchivo} cargando={cargando} />
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Registros — {TITULO[tipo]}
          </h2>
          {filas.length === 0 ? (
            <p className="text-gray-400 text-sm mt-4 text-center py-8">
              No hay registros todavía. Sube un documento para comenzar.
            </p>
          ) : (
            <TablaResultados tipo={tipo} filas={filas} onActualizar={cargarRegistros} />
          )}
        </div>
      </main>
    </div>
  );
}