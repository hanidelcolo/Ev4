import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import "./App.css";

export default function App() {
  // Inicializa el estado cargando desde LocalStorage si existe
  const [elementos, setElementos] = useState(() => {
    const guardados = localStorage.getItem("elementos_crud");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [elementoAEditar, setElementoAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState(""); // Estado para el Buscador (Commit 3)

  // Efecto para guardar en LocalStorage automáticamente ante cualquier cambio
  useEffect(() => {
    localStorage.setItem("elementos_crud", JSON.stringify(elementos));
  }, [elementos]);

  // Agregar o actualizar elemento
  const guardarElemento = (texto) => {
    if (elementoAEditar) {
      // Modo edición
      setElementos(
        elementos.map((el) =>
          el.id === elementoAEditar.id ? { ...el, texto: texto } : el
        )
      );
      setElementoAEditar(null);
    } else {
      // Modo creación nuevo (por defecto no está completado)
      const nuevo = {
        id: Date.now(),
        texto: texto,
        completado: false,
      };
      setElementos([...elementos, nuevo]);
    }
  };

  // Eliminar con confirmación (Commit 2)
  const eliminarElemento = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setElementos(elementos.filter((el) => el.id !== id));
      if (elementoAEditar && elementoAEditar.id === id) {
        setElementoAEditar(null);
      }
    }
  };

  // Alternar completado/tachado (Commit 3)
  const toggleCompletado = (id) => {
    setElementos(
      elementos.map((el) =>
        el.id === id ? { ...el, completado: !el.completado } : el
      )
    );
  };

  // Borrar todo de una vez (Commit 3)
  const borrarTodo = () => {
    const confirmar = window.confirm("¿Seguro que quieres borrar TODOS los elementos?");
    if (confirmar) {
      setElementos([]);
      setElementoAEditar(null);
    }
  };

  // Filtrado de elementos en tiempo real (Commit 3)
  const elementosFiltrados = elementos.filter((el) =>
    el.texto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="card">
        <h1>📝 CRUD con LocalStorage</h1>
        
        {/* Buscador en Tiempo Real */}
        <div className="buscador-container">
          <input
            type="text"
            placeholder="🔍 Buscar elementos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-buscador"
          />
        </div>

        {/* Formulario de Entrada */}
        <Form 
          guardarElemento={guardarElemento} 
          elementoAEditar={elementoAEditar} 
          cancelarEdicion={() => setElementoAEditar(null)}
        />

        {/* Contador de Elementos (Commit 2) */}
        <div className="contador-box">
          <p>Total elementos: <strong>{elementos.length}</strong></p>
        </div>

        {/* Lista de Resultados */}
        <List
          elementos={elementosFiltrados}
          eliminarElemento={eliminarElemento}
          setElementoAEditar={setElementoAEditar}
          toggleCompletado={toggleCompletado}
        />

        {/* Botón Borrar Todo (Commit 3) */}
        {elementos.length > 0 && (
          <button onClick={borrarTodo} className="btn-borrar-todo">
            🗑️ Borrar Todo
          </button>
        )}
      </div>
    </div>
  );
}
