import { useState, useEffect } from "react";

export default function Form({ guardarElemento, elementoAEditar, cancelarEdicion }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Detecta si se presionó el botón "Editar" en algún ítem externo
  useEffect(() => {
    if (elementoAEditar) {
      setInput(elementoAEditar.texto);
    } else {
      setInput("");
    }
    setError("");
  }, [elementoAEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: No vacío, ni espacios vacíos (Commit 2)
    if (!input.trim()) {
      setError("❌ El campo no puede estar vacío ni contener solo espacios.");
      return;
    }

    guardarElemento(input.trim());
    setInput("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="input-group">
        <input
          type="text"
          placeholder="Escribe algo aquí..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(""); // Limpia el error al escribir
          }}
          className="input-field"
        />
        <button type="submit" className="btn-guardar">
          {elementoAEditar ? "Actualizar" : "Agregar"}
        </button>
      </div>
      
      {error && <p className="error-mensaje">{error}</p>}
      
      {elementoAEditar && (
        <button type="button" onClick={cancelarEdicion} className="btn-cancelar">
          Cancelar Edición
        </button>
      )}
    </form>
  );
}