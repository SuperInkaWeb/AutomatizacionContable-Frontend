import { useRef, useState } from "react";

const ACCEPT = {
  factura:    ".pdf,.jpg,.jpeg,.png",
  recibo:     ".pdf,.jpg,.jpeg,.png",
  asistencia: ".pdf,.jpg,.jpeg,.png,.xlsx",
};

export default function ZonaCarga({ tipo, onArchivo, cargando }) {
  const inputRef = useRef(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [archivo, setArchivo] = useState(null);

  function manejarArchivo(file) {
    setArchivo(file);
    onArchivo(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setArrastrando(false);
    const file = e.dataTransfer.files[0];
    if (file) manejarArchivo(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
      onDragLeave={() => setArrastrando(false)}
      onDrop={onDrop}
      onClick={() => !cargando && inputRef.current.click()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
        arrastrando ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 bg-gray-50"
      } ${cargando ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[tipo]}
        className="hidden"
        onChange={(e) => e.target.files[0] && manejarArchivo(e.target.files[0])}
      />

      {cargando ? (
        <p className="text-blue-600 font-medium animate-pulse">Procesando documento...</p>
      ) : archivo ? (
        <div>
          <p className="text-green-600 font-medium">{archivo.name}</p>
          <p className="text-gray-400 text-sm mt-1">Clic para cambiar archivo</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-500 font-medium">Arrastra tu archivo aquí</p>
          <p className="text-gray-400 text-sm mt-1">o haz clic para seleccionar</p>
          <p className="text-gray-300 text-xs mt-2">{ACCEPT[tipo].toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}