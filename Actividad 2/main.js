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
    let procesados = productos.map(producto => {
        let descuento = calcularDescuento(producto.monto, producto.pago);
        let montoFinal = producto.monto - (producto.monto * descuento);
        return { ...producto, descuento, montoFinal };
    });

    let detalle = "";
    for (let i = 0; i < procesados.length; i++) {
        let p = procesados[i];
        detalle += `<p>${p.nombre}: $${p.monto} - Desc: ${p.descuento * 100}% - Final: $${p.montoFinal}</p>`;
    }

    let totalAPagar = procesados.reduce((total, p) => total + p.montoFinal, 0);
    let totalProductos = procesados.length;

    let resumen = document.getElementById("resumen");
    resumen.innerHTML = `
        <h3>Detalle:</h3>
        ${detalle}
        <p><b>Total de productos:</b> ${totalProductos}</p>
        <p><b>Total a pagar:</b> $${totalAPagar}</p>
    `;
}

function calcularDescuento(monto, pago) {
    if (monto < 200) {
        return 0;
    } else if (monto > 400) {
        return 0.4;
    } else {
        if (pago === "E") {
            return 0.3;
        } else if (pago === "D") {
            return 0.2;
        } else {
            return 0.1;
        }
    }
}
