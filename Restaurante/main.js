import { usuarios } from './usuarios.js';

const form = document.getElementById("Form");
const errorMensaje = document.getElementById("errorMensaje");

// Manejo del formulario de login
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioNombre = document.getElementById("usuarioNombre").value;
    const contraseña = document.getElementById("contraseña").value;

    errorMensaje.textContent = usuarioNombre && contraseña ? "" : "Por favor, ingresa tanto tu usuario como la contraseña.";

    if (!usuarioNombre || !contraseña) return;

    const usuarioValido = usuarios.find(usuario => usuario.username === usuarioNombre && usuario.password === contraseña);

    if (usuarioValido) {
        // Guardar el nombre de usuario y el cargo en localStorage
        localStorage.setItem("usuarioNombre", usuarioValido.username);
        localStorage.setItem("usuarioCargo", usuarioValido.cargo);
        
        // Redirigir a la página de mesas
        window.location.href = "mesas.html";
    } else {
        errorMensaje.textContent = "Usuario o contraseña incorrectos.";
    }
});

// En mesas.html, al cargar, actualizar los datos del usuario
window.addEventListener("load", function() {
    const usuarioNombre = localStorage.getItem("usuarioNombre");
    const usuarioCargo = localStorage.getItem("usuarioCargo");

    // Verificar si existen los datos guardados en localStorage
    if (usuarioNombre && usuarioCargo) {
        // Actualizar los elementos con los valores recuperados
        document.getElementById("usuarioNombre").textContent = usuarioNombre;
        document.getElementById("usuarioCargo").textContent = usuarioCargo;
    } else {
        // Si no hay datos, mostrar un mensaje predeterminado o tomar alguna acción
        console.error("No se encontró el nombre o cargo del usuario en el almacenamiento local.");
        
    }
});
