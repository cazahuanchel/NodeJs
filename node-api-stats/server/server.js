const express = require('express');
const app = express();
require('dotenv').config({ path: './server/config/.env' });

// Puerto 3001 para evitar conflictos con la API de Go (puerto 3000)
const PORT = 3001; 

// Middleware para parsear el cuerpo de la solicitud JSON
// Esto es crucial para poder leer la matriz enviada por la API de Go
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const statsRoutes = require('./routes/route_stats');
app.use('/stats', statsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 API Node.js (Estadísticas) escuchando en http://localhost:${PORT}`);
});