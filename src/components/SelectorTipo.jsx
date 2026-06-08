const TIPOS = [
  { id: "factura",    label: "Factura" },
  { id: "recibo",     label: "Recibo de Luz" },
  { id: "asistencia", label: "Asistencia Laboral" },
];

export default function SelectorTipo({ tipo, onChange }) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {TIPOS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
            tipo === t.id
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}