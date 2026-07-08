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
      // Modo creación nuevo
      const nuevo = {
        id: Date.now(),
        texto: texto,
        completado: false,
      };
      setElementos([...elementos, nuevo]);
    }
  };


  const eliminarElemento = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setElementos(elementos.filter((el) => el.id !== id));
      if (elementoAEditar && elementoAEditar.id === id) {
        setElementoAEditar(null);
      }
    }
  };


  const toggleCompletado = (id) => {
    setElementos(
      elementos.map((el) =>
        el.id === id ? { ...el, completado: !el.completado } : el
      )
    );
  };

  const borrarTodo = () => {
    const confirmar = window.confirm("¿Seguro que quieres borrar TODOS los elementos?");
    if (confirmar) {
      setElementos([]);
      setElementoAEditar(null);
    }
  };


  const elementosFiltrados = elementos.filter((el) =>
    el.texto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="card">
        <h1>🌸 Mi CRUD 🌸</h1>
        
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


        <Form 
          guardarElemento={guardarElemento} 
          elementoAEditar={elementoAEditar} 
          cancelarEdicion={() => setElementoAEditar(null)}
        />


        <div className="contador-box">
          <p>Total elementos: <strong>{elementos.length}</strong></p>
        </div>


        <List
          elementos={elementosFiltrados}
          eliminarElemento={eliminarElemento}
          setElementoAEditar={setElementoAEditar}
          toggleCompletado={toggleCompletado}
        />


        {elementos.length > 0 && (
          <button onClick={borrarTodo} className="btn-borrar-todo">
            🗑️ Borrar Todo
          </button>
        )}
      </div>
    </div>
  );
}