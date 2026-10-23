import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const { Pool } = pg;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'sistema_importacion',
  user: process.env.DB_USER || 'importador',
  password: process.env.DB_PASSWORD
});

app.get('/', (_req, res) => {
  res.json({
    aplicacion: 'ImportaSys',
    mensaje: 'API de gestión de importaciones',
    estado: 'activa'
  });
});

app.get('/api/salud', async (_req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT current_database() AS base_datos, NOW() AS hora'
    );

    res.json({
      estado: 'correcto',
      mensaje: 'La API se conecta a PostgreSQL',
      baseDatos: resultado.rows[0].base_datos,
      hora: resultado.rows[0].hora
    });
  } catch (error) {
    console.error('Error al consultar PostgreSQL:', error.message);
    res.status(503).json({
      estado: 'error',
      mensaje: 'La API funciona, pero no logra conectarse a PostgreSQL'
    });
  }
});

// CONSULTAR TODOS LOS PROVEEDORES
app.get('/api/proveedores', async (_req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id_proveedor, nombre, pais, correo FROM proveedores ORDER BY id_proveedor'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar proveedores:', error.message);
    res.status(500).json({ mensaje: 'No fue posible consultar los proveedores.' });
  }
});

// CONSULTAR UN PROVEEDOR
app.get('/api/proveedores/:id', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id_proveedor, nombre, pais, correo FROM proveedores WHERE id_proveedor = $1',
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar proveedor:', error.message);
    res.status(500).json({ mensaje: 'No fue posible consultar el proveedor.' });
  }
});

// REGISTRAR UN PROVEEDOR
app.post('/api/proveedores', async (req, res) => {
  const { nombre, pais, correo } = req.body;

  if (!nombre?.trim() || !pais?.trim()) {
    return res.status(400).json({
      mensaje: 'El nombre y el país son obligatorios.'
    });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO proveedores (nombre, pais, correo)
       VALUES ($1, $2, $3)
       RETURNING id_proveedor, nombre, pais, correo`,
      [nombre.trim(), pais.trim(), correo?.trim() || null]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        mensaje: 'Ya existe un proveedor con ese correo electrónico.'
      });
    }

    console.error('Error al registrar proveedor:', error.message);
    res.status(500).json({ mensaje: 'No fue posible registrar el proveedor.' });
  }
});

// ACTUALIZAR UN PROVEEDOR
app.put('/api/proveedores/:id', async (req, res) => {
  const { nombre, pais, correo } = req.body;

  if (!nombre?.trim() || !pais?.trim()) {
    return res.status(400).json({
      mensaje: 'El nombre y el país son obligatorios.'
    });
  }

  try {
    const resultado = await pool.query(
      `UPDATE proveedores
       SET nombre = $1, pais = $2, correo = $3
       WHERE id_proveedor = $4
       RETURNING id_proveedor, nombre, pais, correo`,
      [nombre.trim(), pais.trim(), correo?.trim() || null, req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        mensaje: 'Ya existe un proveedor con ese correo electrónico.'
      });
    }

    console.error('Error al actualizar proveedor:', error.message);
    res.status(500).json({ mensaje: 'No fue posible actualizar el proveedor.' });
  }
});

// ELIMINAR UN PROVEEDOR
app.delete('/api/proveedores/:id', async (req, res) => {
  try {
    const resultado = await pool.query(
      'DELETE FROM proveedores WHERE id_proveedor = $1 RETURNING id_proveedor',
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado.' });
    }

    res.json({ mensaje: 'Proveedor eliminado correctamente.' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({
        mensaje: 'No se puede eliminar este proveedor porque tiene importaciones relacionadas.'
      });
    }

    console.error('Error al eliminar proveedor:', error.message);
    res.status(500).json({ mensaje: 'No fue posible eliminar el proveedor.' });
  }
});

// ===============================
// CRUD DE PRODUCTOS
// ===============================

// Consultar todos los productos
app.get('/api/productos', async (_req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id_producto, nombre, categoria, precio FROM productos ORDER BY id_producto'
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar productos:', error.message);
    res.status(500).json({ mensaje: 'No fue posible consultar los productos.' });
  }
});

// Consultar un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT id_producto, nombre, categoria, precio FROM productos WHERE id_producto = $1',
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar producto:', error.message);
    res.status(500).json({ mensaje: 'No fue posible consultar el producto.' });
  }
});

// Registrar un producto
app.post('/api/productos', async (req, res) => {
  const { nombre, categoria, precio } = req.body;
  const precioNumero = Number(precio);

  if (!nombre?.trim() || precio === '' || precio === null ||
      precio === undefined || !Number.isFinite(precioNumero) || precioNumero < 0) {
    return res.status(400).json({
      mensaje: 'El nombre es obligatorio y el precio debe ser un número mayor o igual a cero.'
    });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO productos (nombre, categoria, precio)
       VALUES ($1, $2, $3)
       RETURNING id_producto, nombre, categoria, precio`,
      [nombre.trim(), categoria?.trim() || null, precioNumero]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al registrar producto:', error.message);
    res.status(500).json({ mensaje: 'No fue posible registrar el producto.' });
  }
});

// Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  const { nombre, categoria, precio } = req.body;
  const precioNumero = Number(precio);

  if (!nombre?.trim() || precio === '' || precio === null ||
      precio === undefined || !Number.isFinite(precioNumero) || precioNumero < 0) {
    return res.status(400).json({
      mensaje: 'El nombre es obligatorio y el precio debe ser un número mayor o igual a cero.'
    });
  }

  try {
    const resultado = await pool.query(
      `UPDATE productos
       SET nombre = $1, categoria = $2, precio = $3
       WHERE id_producto = $4
       RETURNING id_producto, nombre, categoria, precio`,
      [nombre.trim(), categoria?.trim() || null, precioNumero, req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    res.status(500).json({ mensaje: 'No fue posible actualizar el producto.' });
  }
});

// Eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const resultado = await pool.query(
      'DELETE FROM productos WHERE id_producto = $1 RETURNING id_producto',
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente.' });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({
        mensaje: 'No se puede eliminar este producto porque está asociado a un detalle de importación.'
      });
    }

    console.error('Error al eliminar producto:', error.message);
    res.status(500).json({ mensaje: 'No fue posible eliminar el producto.' });
  }
});
app.listen(port, () => {
  console.log(`ImportaSys API disponible en http://localhost:${port}`);
});
