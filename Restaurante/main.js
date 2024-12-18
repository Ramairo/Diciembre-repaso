import { usuarios } from './usuarios.js';

const form = document.getElementById("Form");
const errorMensaje = document.getElementById("errorMensaje");


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioNombre = document.getElementById("usuarioNombre").value;
    const contraseña = document.getElementById("contraseña").value;

    errorMensaje.textContent = usuarioNombre && contraseña ? "" : "Por favor, ingresa tanto tu usuario como la contraseña.";

    if (!usuarioNombre || !contraseña) return;

    const usuarioValido = usuarios.find(usuario => usuario.username === usuarioNombre && usuario.password === contraseña);

    if (usuarioValido) {
 
        localStorage.setItem("usuarioNombre", usuarioValido.username);
        localStorage.setItem("usuarioCargo", usuarioValido.cargo);
        
        window.location.href = "mesas.html";
    } else {
        errorMensaje.textContent = "Usuario o contraseña incorrectos.";
    }
});


window.addEventListener("load", function() {
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioCargo = localStorage.getItem("usuarioCargo");

    
    if (usuarioNombre && usuarioCargo) {
        
        document.getElementById("usuarioNombre").textContent = usuarioNombre;
        document.getElementById("usuarioCargo").textContent = usuarioCargo;
    } else {
        
        console.error("No se encontró el nombre o cargo del usuario en el almacenamiento local.");
        
    }
});
