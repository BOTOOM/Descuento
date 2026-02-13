/**
 * Calculadora de Descuentos - Opción 1
 * Descuento Promocional vs Sistema
 */

class CalculadoraOpcion1 {
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
            const descProm = this.getFloatValue('DescProm');
            const descSis = this.getFloatValue('DescSis');

            // Validar datos
            if (!this.validateCalculationData(precioP, descProm, descSis)) {
                return;
            }

            // Realizar cálculo
            const resultado = this.performCalculation(precioP, descProm, descSis);

            // Mostrar resultado
            this.displayResult(resultado, precioP, descProm, descSis);

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

    validateCalculationData(precioP, descProm, descSis) {
        const errors = [];

        if (precioP <= 0) {
            errors.push('El precio del producto debe ser mayor a 0');
        }

        if (descProm < 0 || descProm > 100) {
            errors.push('El descuento promocional debe estar entre 0% y 100%');
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

    performCalculation(precioP, descProm, descSis) {
        // Fórmula: Precio Base = (Precio Original × (1 - Descuento Promocional)) ÷ (1 - Descuento Sistema)
        const precioConDescuentoPromocional = precioP * (1 - descProm / 100);
        const precioBase = precioConDescuentoPromocional / (1 - descSis / 100);
        
        return Math.round(precioBase);
    }

    displayResult(resultado, precioP, descProm, descSis) {
        const resultBox = document.getElementById('result-box');
        const valorFinalElement = document.getElementById('ValorFinal');
        const explanationElement = document.getElementById('result-explanation');

        // Formatear resultado
        const resultadoFormateado = this.formatCurrency(resultado);
        valorFinalElement.textContent = resultadoFormateado;

        // Generar explicación
        const explicacion = this.generateExplanation(resultado, precioP, descProm, descSis);
        explanationElement.innerHTML = explicacion;

        // Mostrar caja de resultados
        resultBox.style.display = 'block';

        // Hacer scroll suave al resultado
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generateExplanation(resultado, precioP, descProm, descSis) {
        const precioEsperado = precioP * (1 - descProm / 100);
        const precioConDescuentoSistema = resultado * (1 - descSis / 100);
        const diferencia = Math.abs(precioEsperado - precioConDescuentoSistema);

        return `
            <strong>Verificación del cálculo:</strong><br>
            • Precio original: ${this.formatCurrency(precioP)}<br>
            • Descuento promocional: ${descProm}%<br>
            • Precio esperado: ${this.formatCurrency(precioEsperado)}<br>
            • Ingresando ${this.formatCurrency(resultado)} con ${descSis}% de descuento<br>
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
    if (window.calculadoraOpcion1) {
        window.calculadoraOpcion1.calculate();
    } else {
        window.calculadoraOpcion1 = new CalculadoraOpcion1();
        window.calculadoraOpcion1.calculate();
    }
}

function volver() {
    location.href = "../index.html";
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.calculadoraOpcion1 = new CalculadoraOpcion1();
});
