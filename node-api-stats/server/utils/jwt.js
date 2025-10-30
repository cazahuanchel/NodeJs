const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// ----------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN JWT
// ----------------------------------------------------
const authenticateJWT = (req, res, next) => {
    // El token se espera en el encabezado 'Authorization' como 'Bearer <token>'
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Extraer el token de "Bearer <token>"
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                // Token inválido o expirado
                return res.status(403).json({ error: 'Token JWT inválido o expirado.' });
            }

            // Token válido. Adjuntar la carga útil (payload) al request si es necesario
            req.user = user; 
            next(); // Continuar con el siguiente handler (calculateMatrixStats)
        });
    } else {
        // No hay encabezado de autorización
        res.status(401).json({ error: 'Acceso denegado. Se requiere Token JWT.' });
    }
};

// Exportamos la función
module.exports = {
    authenticateJWT
};