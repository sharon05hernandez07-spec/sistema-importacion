import React, { useEffect, useState } from 'react';

const API = 'http://localhost:3000/api';

const modulos = [
  { nombre: 'Proveedores', icono: '♙', descripcion: 'Empresas que suministran mercancía' },
  { nombre: 'Productos', icono: '▦', descripcion: 'Catálogo de productos importados' },
  { nombre: 'Importaciones', icono: '⇄', descripcion: 'Registro y control de importaciones' },
  { nombre: 'Detalles', icono: '☷', descripcion: 'Productos asociados a cada importación' }
];

const formularioInicial = { nombre: '', pais: '', correo: '' };

export default function App() {
  const [conexion, setConexion] = useState('comprobando');
  const [mensaje, setMensaje] = useState('');
  const [seccion, setSeccion] = useState('Inicio');
  const [proveedores, setProveedores] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [productos, setProductos] = useState([]);
const [formularioProducto, setFormularioProducto] = useState({
  nombre: '',
  categoria: '',
  precio: ''
});
const [editandoProducto, setEditandoProducto] = useState(null);

  async function cargarProveedores() {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`${API}/proveedores`);
      const datos = await respuesta.json();

      if (!respuesta.ok) throw new Error(datos.mensaje || 'Error al consultar proveedores.');

      setProveedores(datos);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los proveedores.');
    } finally {
      setCargando(false);
    }
  }
async function cargarProductos() {
  setCargando(true);
  setError('');

  try {
    const respuesta = await fetch(`${API}/productos`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'Error al consultar productos.');
    }

    setProductos(datos);
  } catch (err) {
    setError(err.message || 'No se pudieron cargar los productos.');
  } finally {
    setCargando(false);
  }
}

async function guardarProducto(evento) {
  evento.preventDefault();
  setError('');
  setExito('');

  const url = editandoProducto
    ? `${API}/productos/${editandoProducto}`
    : `${API}/productos`;

  try {
    const respuesta = await fetch(url, {
      method: editandoProducto ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formularioProducto,
        precio: Number(formularioProducto.precio)
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No se pudo guardar el producto.');
    }

    setFormularioProducto({ nombre: '', categoria: '', precio: '' });
    setEditandoProducto(null);
    setExito(
      editandoProducto
        ? 'Producto actualizado correctamente.'
        : 'Producto registrado correctamente.'
    );

    await cargarProductos();
  } catch (err) {
    setError(err.message || 'Ocurrió un error al guardar el producto.');
  }
}

function prepararEdicionProducto(producto) {
  setFormularioProducto({
    nombre: producto.nombre,
    categoria: producto.categoria || '',
    precio: String(producto.precio)
  });

  setEditandoProducto(producto.id_producto);
  setError('');
  setExito('');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicionProducto() {
  setFormularioProducto({ nombre: '', categoria: '', precio: '' });
  setEditandoProducto(null);
  setError('');
  setExito('');
}

async function eliminarProducto(producto) {
  const confirmar = window.confirm(
    `¿Seguro que deseas eliminar el producto "${producto.nombre}"?`
  );

  if (!confirmar) return;

  setError('');
  setExito('');

  try {
    const respuesta = await fetch(
      `${API}/productos/${producto.id_producto}`,
      { method: 'DELETE' }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No se pudo eliminar el producto.');
    }

    setExito(datos.mensaje || 'Producto eliminado correctamente.');
    await cargarProductos();
  } catch (err) {
    setError(err.message || 'Ocurrió un error al eliminar el producto.');
  }
}

  useEffect(() => {
    fetch(`${API}/salud`)
      .then(async respuesta => {
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.mensaje);
        return datos;
      })
      .then(datos => {
        setConexion('conectado');
        setMensaje(`Base de datos: ${datos.baseDatos}`);
      })
      .catch(() => {
        setConexion('desconectado');
        setMensaje('Verifica que el backend esté funcionando.');
      });
  }, []);

  useEffect(() => {
    if (seccion === 'Proveedores') cargarProveedores();
  }, [seccion]);
useEffect(() => {
  if (seccion === 'Productos') {
    cargarProductos();
  }
}, [seccion]);

  function cambiarSeccion(nombre) {
    setSeccion(nombre);
    setError('');
    setExito('');
  }

  function cambiarCampo(evento) {
    setFormulario({
      ...formulario,
      [evento.target.name]: evento.target.value
    });
  }

  async function guardarProveedor(evento) {
    evento.preventDefault();
    setError('');
    setExito('');

    const url = editando
      ? `${API}/proveedores/${editando}`
      : `${API}/proveedores`;

    try {
      const respuesta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo guardar el proveedor.');

      setFormulario(formularioInicial);
      setEditando(null);
      setExito(editando ? 'Proveedor actualizado correctamente.' : 'Proveedor registrado correctamente.');
      await cargarProveedores();
    } catch (err) {
      setError(err.message || 'Ocurrió un error al guardar.');
    }
  }

  function prepararEdicion(proveedor) {
    setFormulario({
      nombre: proveedor.nombre,
      pais: proveedor.pais,
      correo: proveedor.correo || ''
    });
    setEditando(proveedor.id_proveedor);
    setError('');
    setExito('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setFormulario(formularioInicial);
    setEditando(null);
    setError('');
    setExito('');
  }

  async function eliminarProveedor(proveedor) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar al proveedor "${proveedor.nombre}"?`
    );

    if (!confirmar) return;

    setError('');
    setExito('');

    try {
      const respuesta = await fetch(`${API}/proveedores/${proveedor.id_proveedor}`, {
        method: 'DELETE'
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo eliminar el proveedor.');

      setExito(datos.mensaje || 'Proveedor eliminado correctamente.');
      await cargarProveedores();
    } catch (err) {
      setError(err.message || 'Ocurrió un error al eliminar.');
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">I</div>
          <div><strong>ImportaSys</strong><small>GESTIÓN DE IMPORTACIONES</small></div>
        </div>

        <p className="menu-label">MENÚ PRINCIPAL</p>

        {['Inicio', 'Proveedores', 'Productos', 'Importaciones', 'Detalles'].map(item => (
          <button
            key={item}
            className={`nav-item ${seccion === item ? 'active' : ''}`}
            onClick={() => cambiarSeccion(item)}
          >
            <span>{item === 'Inicio' ? '⌂' : item === 'Proveedores' ? '♙' : item === 'Productos' ? '▦' : item === 'Importaciones' ? '⇄' : '☷'}</span>
            {item}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="avatar">IS</div>
          <div><strong>Administrador</strong><small>Sistema de importación</small></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><span className="breadcrumb">Panel de control / </span>{seccion}</div>
          <div className="status">
            <span className={`status-dot ${conexion}`}></span>
            {conexion === 'conectado' ? 'Base de datos conectada' : conexion === 'comprobando' ? 'Comprobando conexión' : 'Sin conexión'}
          </div>
        </header>

        <section className="content">
          {seccion === 'Inicio' ? (
            <>
              <div className="welcome">
                <div>
                  <p className="eyebrow">PANEL DE ADMINISTRACIÓN</p>
                  <h1>Bienvenido a ImportaSys</h1>
                  <p className="subtitle">Gestiona la información de tu sistema de importaciones desde un solo lugar.</p>
                </div>
                <div className="welcome-mark">IS</div>
              </div>

              <div className={`connection-card ${conexion}`}>
                <div className="connection-icon">{conexion === 'conectado' ? '✓' : '↻'}</div>
                <div>
                  <strong>{conexion === 'conectado' ? 'Conexión establecida' : conexion === 'comprobando' ? 'Verificando el sistema' : 'Conexión pendiente'}</strong>
                  <p>{mensaje || 'Consultando el estado de la API...'}</p>
                </div>
              </div>

              <div className="section-heading">
                <div><h2>Módulos del sistema</h2><p>Accesos a las áreas principales</p></div>
                <span className="module-count">4 módulos</span>
              </div>

              <div className="module-grid">
                {modulos.map(modulo => (
                  <button className="module-card" key={modulo.nombre} onClick={() => cambiarSeccion(modulo.nombre)}>
                    <div className="module-icon">{modulo.icono}</div>
                    <h3>{modulo.nombre}</h3>
                    <p>{modulo.descripcion}</p>
                    <span className="module-link">Abrir módulo <span>→</span></span>
                  </button>
                ))}
              </div>
            </>
          ) : seccion === 'Proveedores' ? (
            <>
              <div className="welcome">
                <div>
                  <p className="eyebrow">GESTIÓN DE PROVEEDORES</p>
                  <h1>Proveedores</h1>
                  <p className="subtitle">Registra y administra las empresas que suministran mercancía.</p>
                </div>
                <div className="welcome-mark">♙</div>
              </div>

              {error && <div className="alert error">{error}</div>}
              {exito && <div className="alert success">{exito}</div>}

              <div className="provider-form-card">
                <h2>{editando ? 'Editar proveedor' : 'Registrar proveedor'}</h2>
                <form onSubmit={guardarProveedor}>
                  <div className="form-grid">
                    <label>
                      Nombre *
                      <input name="nombre" value={formulario.nombre} onChange={cambiarCampo} required maxLength={100} placeholder="Nombre de la empresa" />
                    </label>
                    <label>
                      País *
                      <input name="pais" value={formulario.pais} onChange={cambiarCampo} required maxLength={80} placeholder="País de origen" />
                    </label>
                    <label className="full-field">
                      Correo electrónico
                      <input name="correo" type="email" value={formulario.correo} onChange={cambiarCampo} maxLength={120} placeholder="contacto@empresa.com" />
                    </label>
                  </div>
                  <div className="form-actions">
                    <button className="primary-button" type="submit">{editando ? 'Guardar cambios' : 'Registrar proveedor'}</button>
                    {editando && <button className="secondary-button" type="button" onClick={cancelarEdicion}>Cancelar</button>}
                  </div>
                </form>
              </div>

              <div className="provider-table-card">
                <div className="section-heading">
                  <div><h2>Lista de proveedores</h2><p>Registros almacenados en la base de datos</p></div>
                  <button className="secondary-button" onClick={cargarProveedores}>Actualizar</button>
                </div>

                {cargando ? <p>Cargando proveedores...</p> : (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr><th>ID</th><th>Nombre</th><th>País</th><th>Correo</th><th>Acciones</th></tr>
                      </thead>
                      <tbody>
                        {proveedores.length === 0 ? (
                          <tr><td colSpan="5">No hay proveedores registrados.</td></tr>
                        ) : proveedores.map(proveedor => (
                          <tr key={proveedor.id_proveedor}>
                            <td>{proveedor.id_proveedor}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.pais}</td>
                            <td>{proveedor.correo || '—'}</td>
                            <td>
                              <div className="table-actions">
                                <button className="edit-button" onClick={() => prepararEdicion(proveedor)}>Editar</button>
                                <button className="delete-button" onClick={() => eliminarProveedor(proveedor)}>Eliminar</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>

          ) : seccion === 'Productos' ? (
            <>
              <div className="welcome">
                <div>
                  <p className="eyebrow">GESTIÓN DE PRODUCTOS</p>
                  <h1>Productos</h1>
                  <p className="subtitle">
                    Registra y administra los productos de importación.
                  </p>
                </div>
                <div className="welcome-mark">IS</div>
              </div>

              {error && <div className="alert error">{error}</div>}
              {exito && <div className="alert success">{exito}</div>}

              <div className="provider-form-card">
                <h2>{editandoProducto ? 'Editar producto' : 'Registrar producto'}</h2>
                <form onSubmit={guardarProducto}>
                  <div className="form-grid">
                    <label>
                      Nombre *
                      <input
                        value={formularioProducto.nombre}
                        onChange={(e) => setFormularioProducto({
                          ...formularioProducto,
                          nombre: e.target.value
                        })}
                        maxLength={100}
                        required
                      />
                    </label>

                    <label>
                      Categoría
                      <input
                        value={formularioProducto.categoria}
                        onChange={(e) => setFormularioProducto({
                          ...formularioProducto,
                          categoria: e.target.value
                        })}
                        maxLength={80}
                      />
                    </label>

                    <label>
                      Precio *
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formularioProducto.precio}
                        onChange={(e) => setFormularioProducto({
                          ...formularioProducto,
                          precio: e.target.value
                        })}
                        required
                      />
                    </label>
                  </div>

                  <div className="form-actions">
                    <button className="primary-button" type="submit">
                      {editandoProducto ? 'Guardar cambios' : 'Registrar producto'}
                    </button>

                    {editandoProducto && (
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={cancelarEdicionProducto}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="provider-table-card">
                <div className="section-heading">
                  <div>
                    <h2>Lista de productos</h2>
                    <p>Productos guardados en la base de datos</p>
                  </div>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={cargarProductos}
                  >
                    Actualizar
                  </button>
                </div>

                {cargando ? (
                  <p>Cargando productos...</p>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Categoría</th>
                          <th>Precio</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.length === 0 ? (
                          <tr>
                            <td colSpan="5">No hay productos registrados.</td>
                          </tr>
                        ) : (
                          productos.map((producto) => (
                            <tr key={producto.id_producto}>
                              <td>{producto.id_producto}</td>
                              <td>{producto.nombre}</td>
                              <td>{producto.categoria || '—'}</td>
                              <td>
                                ${Number(producto.precio).toLocaleString('es-CO', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}
                              </td>
                              <td>
                                <div className="table-actions">
                                  <button
                                    className="edit-button"
                                    type="button"
                                    onClick={() => prepararEdicionProducto(producto)}
                                  >
                                    Editar
                                  </button>
                                  <button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => eliminarProducto(producto)}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="welcome">
              <div>
                <p className="eyebrow">MÓDULO DEL SISTEMA</p>
                <h1>{seccion}</h1>
                <p className="subtitle">Este módulo aún está pendiente de implementar.</p>
              </div>
              <div className="welcome-mark">IS</div>
            </div>
          )}

          )}

          <footer className="footer">
            <span>ImportaSys · Sistema de gestión de importaciones</span>
            <span>Versión inicial · 2026</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
