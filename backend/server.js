const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors());
app.use(express.json());

// Obtener puntajes de todas las especialidades
app.get("/api/puntajes", async (req, res) => {
  try {
    const result = await db.query("SELECT id AS especialidad, puntaje FROM resultados_test ORDER BY puntaje DESC");
    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener puntajes" });
  }
});

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "red_social",
  password: "ilyemily",
  port: 5432
});
const MAPA_ESPECIALIDADES = {
  civiles: "Construcciones Civiles",
  electricidad: "Electricidad",
  electronica: "Electrónica",
  electromecanica: "Electromecánica",
  informatica: "Informática",
  mecanica: "Mecánica Industrial",
  automotriz: "Mecánica Automotriz",
  quimica: "Química"
};

// Endpoint que suma puntaje
app.post("/api/resultados", async (req, res) => {
  const { especialidad } = req.body; // ej: "civiles"
  const nombre = MAPA_ESPECIALIDADES[especialidad]; // ej: "Construcciones Civiles"
  try {
    await db.query(
      "UPDATE resultados_test SET puntaje = puntaje + 1 WHERE id = $1",
      [nombre]
    );
    res.json({ status: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al actualizar puntaje" });
  }
});

// Obtener todas las publicaciones con id, fuente y tamaño
app.get("/api/publicaciones", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, titulo, descripcion, imagen_url, fecha_publicacion, fuente, tipo FROM publicaciones ORDER BY fecha_publicacion DESC"
    );
    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
});

// Crear publicación
app.post("/api/publicaciones", async (req, res) => {
  const { titulo, descripcion, imagen_url, fuente = "Arial", tipo = "secundaria" } = req.body;
  const fecha = new Date();

  try {
    // Si la nueva publicación es principal, cambiar la existente a secundaria
    if (tipo === "principal") {
      await db.query("UPDATE publicaciones SET tipo = 'secundaria' WHERE tipo = 'principal'");
    }

    const result = await db.query(
      "INSERT INTO publicaciones (titulo, descripcion, imagen_url, fecha_publicacion, fuente, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [titulo, descripcion, imagen_url, fecha, fuente, tipo]
    );
    res.json({ status: "ok", id: result.rows[0].id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al guardar" });
  }
});

// Actualizar publicación (texto, fuente, tamaño)
app.put("/api/publicaciones/:id", async (req, res) => {
  const id = req.params.id;
  const { descripcion, fuente, tamano } = req.body;
  try {
    await db.query(
      "UPDATE publicaciones SET descripcion = COALESCE($1, descripcion), fuente = COALESCE($2, fuente), tamano = COALESCE($3, tamano) WHERE id = $4",
      [descripcion, fuente, tamano, id]
    );
    res.json({ status: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al actualizar" });
  }
});

// Eliminar publicación
app.delete("/api/publicaciones/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM publicaciones WHERE id = $1", [id]);
    res.json({ status: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al eliminar" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
