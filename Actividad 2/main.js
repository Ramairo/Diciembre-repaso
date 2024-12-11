let productos = []; // Lista para almacenar los productos

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let monto = parseFloat(document.getElementById("monto").value);
    let medioPago = document.getElementById("pago").value;

    if (!nombre || isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese datos válidos.");
        return;
    }

    let producto = {
        nombre: nombre,
        monto: monto,
        pago: medioPago
    };

    productos.push(producto);
    mostrarProductos();
}

function mostrarProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let item = productos[i];
        lista.innerHTML += `<li>${item.nombre} - $${item.monto} (${item.pago})</li>`;
    }
}

function calcularFacturacion() {
    let detalle = "";
    let totalProductos = productos.length;
    let totalAPagar = 0;

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let descuento = calcularDescuento(producto.monto, producto.pago);
        let montoFinal = producto.monto - (producto.monto * descuento);

        detalle += `<p>${producto.nombre}: $${producto.monto} - Desc: ${descuento * 100}% - Final: $${montoFinal}</p>`;

        totalAPagar += montoFinal;
    }

    let resumen = document.getElementById("resumen");
    resumen.innerHTML = `
        <h3>Detalle:</h3>
        ${detalle}
        <p><b>Total de productos:</b> ${totalProductos}</p>
        <p><b>Total a pagar:</b> $${totalAPagar}</p>
    `;
}

function calcularDescuento(monto, pago) {
    let descuento = 0;

    if (monto < 200) {
        descuento = 0;
    } else if (monto > 400) {
        descuento = 0.4;
    } else {
        if (pago === "E") {
            descuento = 0.3;
        } else if (pago === "D") {
            descuento = 0.2;
        } else {
            descuento = 0.1;
        }
    }

    return descuento;
}
