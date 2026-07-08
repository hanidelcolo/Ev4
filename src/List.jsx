import React from "react";
import Item from "./Item";

export default function List({ elementos, eliminarElemento, setElementoAEditar, toggleCompletado }) {
  if (elementos.length === 0) {
    return <p className="lista-vacia">No hay elementos en la lista.</p>;
  }

  return (
    <ul className="lista-contenedor">
      {elementos.map((item) => (
        <Item
          key={item.id}
          item={item}
          eliminarElemento={eliminarElemento}
          setElementoAEditar={setElementoAEditar}
          toggleCompletado={toggleCompletado}
        />
      ))}
    </ul>
  );
}