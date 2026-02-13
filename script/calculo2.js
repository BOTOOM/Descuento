/**
 * Calculadora de Descuentos - Opción 2
 * Precio Final Directo
 */

class CalculadoraOpcion2 {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    }

    setupEventListeners() {
        const calculateBtn = document.getElementById('calculo');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculate());
        }

        // Agregar evento Enter para calcular
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculate();
                }
            });
        });
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        if (isNaN(value)) {
            input.setCustomValidity('Por favor ingrese un número válido');
            return false;
        }

        if (min !== undefined && value < min) {
            input.setCustomValidity(`El valor debe ser mayor o igual a ${min}`);
            return false;
        }

        if (max !== undefined && value > max) {
            input.setCustomValidity(`El valor debe ser menor o igual a ${max}`);
            return false;
        }

        input.setCustomValidity('');
        return true;
    }

    calculate() {
        try {
            // Obtener valores
            const precioP = this.getFloatValue('PrecioP');
            const descSis = this.getFloatValue('DescSis');

            // Validar datos
            if (!this.validateCalculationData(precioP, descSis)) {
                return;
            }

            // Realizar cálculo
            const resultado = this.performCalculation(precioP, descSis);

            // Mostrar resultado
            this.displayResult(resultado, precioP, descSis);

        } catch (error) {
            console.error('Error en el cálculo:', error);
            this.showError('Ocurrió un error al realizar el cálculo. Por favor verifique los datos.');
        }
    }

    getFloatValue(elementId) {
        const element = document.getElementById(elementId);
        const value = parseFloat(element.value);
        
        if (isNaN(value)) {
            throw new Error(`El valor de ${elementId} no es válido`);
        }
        
        return value;
    }

    validateCalculationData(precioP, descSis) {
        const errors = [];

        if (precioP <= 0) {
            errors.push('El precio final debe ser mayor a 0');
        }

        if (descSis < 0 || descSis >= 100) {
            errors.push('El descuento del sistema debe estar entre 0% y 99.9%');
        }

        if (errors.length > 0) {
            this.showError(errors.join('<br>'));
            return false;
        }

        return true;
    }

    performCalculation(precioP, descSis) {
        // Fórmula: Precio Base = Precio Final ÷ (1 - Descuento Sistema)
        const precioBase = precioP / (1 - descSis / 100);
        
        return Math.round(precioBase);
    }

    displayResult(resultado, precioP, descSis) {
        const resultBox = document.getElementById('result-box');
        const valorFinalElement = document.getElementById('ValorFinal');
        const explanationElement = document.getElementById('result-explanation');

        // Formatear resultado
        const resultadoFormateado = this.formatCurrency(resultado);
        valorFinalElement.textContent = resultadoFormateado;

        // Generar explicación
        const explicacion = this.generateExplanation(resultado, precioP, descSis);
        explanationElement.innerHTML = explicacion;

        // Mostrar caja de resultados
        resultBox.style.display = 'block';

        // Hacer scroll suave al resultado
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generateExplanation(resultado, precioP, descSis) {
        const precioConDescuentoSistema = resultado * (1 - descSis / 100);
        const diferencia = Math.abs(precioP - precioConDescuentoSistema);

        return `
            <strong>Verificación del cálculo:</strong><br>
            • Precio final deseado: ${this.formatCurrency(precioP)}<br>
            • Descuento del sistema: ${descSis}%<br>
            • Ingresando ${this.formatCurrency(resultado)} en el sistema<br>
            • Aplicando ${descSis}% de descuento<br>
            • Resultado final: ${this.formatCurrency(precioConDescuentoSistema)}<br>
            • Diferencia: ${this.formatCurrency(diferencia)}
        `;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    showError(message) {
        const resultBox = document.getElementById('result-box');
        const valorFinalElement = document.getElementById('ValorFinal');
        const explanationElement = document.getElementById('result-explanation');

        resultBox.style.display = 'block';
        resultBox.style.background = 'linear-gradient(135deg, #fef2f2, #fee2e2)';
        resultBox.style.borderColor = '#ef4444';
        
        valorFinalElement.textContent = 'Error';
        valorFinalElement.style.color = '#ef4444';
        
        explanationElement.innerHTML = `<strong style="color: #ef4444;">${message}</strong>`;
    }
}

// Función legacy para mantener compatibilidad
function calcular() {
    if (window.calculadoraOpcion2) {
        window.calculadoraOpcion2.calculate();
    } else {
        window.calculadoraOpcion2 = new CalculadoraOpcion2();
        window.calculadoraOpcion2.calculate();
    }
}

function volver() {
    location.href = "../index.html";
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.calculadoraOpcion2 = new CalculadoraOpcion2();
});
