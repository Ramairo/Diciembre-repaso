function calcularMonto(montoInput, medioPagoInput, resultadoElement) {
    const monto = parseFloat(montoInput.value);
    const medioPago = medioPagoInput.value;

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    const resultado = facturacion(monto, medioPago);
    resultadoElement.textContent = `Resultado: ${resultado}`;
}

function facturacion(monto, medioPago) {
    if (monto < 200) return monto;

    let descuento = 0;
    if (monto > 400) {
        descuento = 0.4;
    } else {
        if (medioPago === 'E') descuento = 0.3;
        else if (medioPago === 'D') descuento = 0.2;
         else if (medioPago==='MP') descuento = 0.15; 
        else if (medioPago === 'C') descuento = 0.1;
    }

    return monto * (1 - descuento);
}
