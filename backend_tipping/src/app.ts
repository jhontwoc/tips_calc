import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(bodyParser.json());


// Rutas de propinas
app.use('/api/tipping', router);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
