import React from "react";

export default function Item({ item, eliminarElemento, setElementoAEditar, toggleCompletado }) {
  return (
    <li className={`item-fila ${item.completado ? "completado" : ""}`}>
      {/* Checkbox para completar / tachar (Commit 3) */}
      <input
        type="checkbox"
        checked={item.completado}
        onChange={() => toggleCompletado(item.id)}
        className="item-checkbox"
      />

      {/* Texto del ítem (Se tacha vía CSS con la clase .completado) */}
      <span className="item-texto">{item.texto}</span>

      {/* Botones de Acción diferenciados por clase (Commit 1) */}
      <div className="item-acciones">
        <button 
          onClick={() => setElementoAEditar(item)} 
          className="btn-editar"
          disabled={item.completado}
        >
          Editar
        </button>
        <button 
          onClick={() => eliminarElemento(item.id)} 
          className="btn-eliminar"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}