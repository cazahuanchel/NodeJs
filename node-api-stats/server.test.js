// node-api-stats/server.test.js

const { calculateMatrixStats } = require('./utils/stats');

// Definición de las pruebas con Jest
describe('calculateMatrixStats', () => {
    
    test('Calcula correctamente las estadísticas para una matriz 2x3', () => {
        const matrix = [
            [4, 1], 
            [5, 2], 
            [6, 3]
        ]; // Suma: 21, Total: 6, Max: 6, Min: 1
        const stats = calculateMatrixStats(matrix);

        expect(stats.sumaTotal).toBe(21);
        expect(stats.valorMaximo).toBe(6);
        expect(stats.valorMinimo).toBe(1);
        expect(stats.promedio).toBe(21 / 6); // 3.5
        expect(stats.matrizDiagonal).toBe(false); // No es cuadrada
    });

    test('Identifica correctamente una matriz diagonal (matriz cuadrada)', () => {
        const matrix = [
            [10, 0, 0], 
            [0, 5, 0], 
            [0, 0, 2]
        ];
        const stats = calculateMatrixStats(matrix);

        expect(stats.sumaTotal).toBe(17);
        expect(stats.matrizDiagonal).toBe(true); 
    });
    
    test('Identifica que una matriz no cuadrada no es diagonal', () => {
        const matrix = [
            [1, 0, 0], 
            [0, 1, 0]
        ];
        const stats = calculateMatrixStats(matrix);
        
        expect(stats.matrizDiagonal).toBe(false); 
    });

    test('Maneja una matriz vacía', () => {
        const stats = calculateMatrixStats([]);

        expect(stats.sumaTotal).toBe(0);
        expect(stats.valorMaximo).toBe(null);
        expect(stats.valorMinimo).toBe(null);
    });
});