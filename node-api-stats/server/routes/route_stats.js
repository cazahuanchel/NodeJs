const express = require('express');
const router = express.Router(); // ¡Se crea el enrutador!

// Usamos '../' para subir un nivel desde 'routes'
const { calculateMatrixStats } = require('../logic/logic_stats');
const { authenticateJWT } = require('../utils/jwt');

// ----------------------------------------------------
// Handler: Recibe la matriz rotada y calcula las estadísticas
// ----------------------------------------------------
// NOTA: La ruta ahora es '/' porque el prefijo '/calculate-stats' 
// se definirá en server.js al cargar este enrutador.
router.post('/calculateMatrixStats', authenticateJWT, (req, res) => {
    // La API de Go enviará la matriz rotada directamente en el cuerpo (body)
    const rotatedMatrix = req.body; 

    // Validación básica
    if (!rotatedMatrix || !Array.isArray(rotatedMatrix) || rotatedMatrix.length === 0) {
        return res.status(400).json({ error: 'Formato de matriz inválido o vacío.' });
    }

    try {
        const stats = calculateMatrixStats(rotatedMatrix);
        
        return res.status(200).json({
            message: 'Estadísticas calculadas con éxito.',
            stats: stats
        });
    } catch (error) {
        // Manejar errores si la función de cálculo falla
        console.error("Error al calcular estadísticas:", error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar la matriz.' });
    }
});

// Exportamos el enrutador
module.exports = router;
