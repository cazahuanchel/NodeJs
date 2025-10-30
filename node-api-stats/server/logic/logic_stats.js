// node-api-stats/utils/stats.js

/**
 * Calcula estadísticas sobre una matriz 2D.
 * @param {Array<Array<number>>} matrix - La matriz de números.
 * @returns {object} Un objeto con valorMaximo, valorMinimo, promedio, sumaTotal y matrizDiagonal.
 */
function calculateMatrixStats(matrix) {
    let sumTotal = 0;
    let valorMaximo = -Infinity;
    let valorMinimo = Infinity;
    let totalElementos = 0;
    let isDiagonal = true;

    // Iterar sobre las filas (i) y columnas (j)
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const value = row[j];
            
            // Verificación de matriz diagonal
            if (matrix.length !== row.length) {
                isDiagonal = false; 
            } else if (i !== j && value !== 0) {
                isDiagonal = false;
            }
            
            // Cálculo de estadísticas
            sumTotal += value;
            totalElementos++;
            
            if (value > valorMaximo) {
                valorMaximo = value;
            }
            if (value < valorMinimo) {
                valorMinimo = value;
            }
        }
    }

    // Cálculo del promedio
    const promedio = totalElementos > 0 ? sumTotal / totalElementos : 0;

    return {
        valorMaximo: valorMaximo === -Infinity ? null : valorMaximo,
        valorMinimo: valorMinimo === Infinity ? null : valorMinimo,  
        promedio: promedio,
        sumaTotal: sumTotal,
        matrizDiagonal: isDiagonal 
    };
}

// Exportamos la función
module.exports = {
    calculateMatrixStats
};