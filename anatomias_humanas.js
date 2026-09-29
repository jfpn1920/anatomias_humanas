//-------------------------------------//
//--|funcionalidad_anatomias_humanas|--//
//-------------------------------------//
const tarjetas = document.querySelectorAll(".tarjeta_parte");
const botonRestablecer = document.querySelector("#restablecerTodos");
const mensajeGeneral = document.querySelector("#mensajeGeneral");
const datosIniciales = {
    1: {
        nombre: "Cerebro",
        categoria: "Sistema nervioso",
        descripcion: "Órgano encargado de controlar diferentes funciones del cuerpo.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Human_brain.png"
    },
    2: {
        nombre: "Corazón",
        categoria: "Sistema circulatorio",
        descripcion: "Órgano muscular que impulsa la sangre por todo el organismo.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Diagram_of_the_human_heart.svg"
    },
    3: {
        nombre: "Pulmones",
        categoria: "Sistema respiratorio",
        descripcion: "Órganos que permiten realizar el intercambio de gases durante la respiración.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Lungs_diagram_simple.svg"
    }
};
//--------------------------------------//
//--|obtener_datos_usado_localsotrage|--//
//--------------------------------------//
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`anatomia_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
//-------------------------//
//--|mostrando_los_datos|--//
//-------------------------//
function mostrarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const datos = obtenerDatos(id);
    tarjeta.querySelector(".nombre_parte").textContent = datos.nombre;
    tarjeta.querySelector(".categoria_parte").textContent = datos.categoria;
    tarjeta.querySelector(".descripcion_parte").textContent = datos.descripcion;
    tarjeta.querySelector(".imagen_parte").src = datos.imagen;
    tarjeta.querySelector(".campo_nombre").value = datos.nombre;
    tarjeta.querySelector(".campo_categoria").value = datos.categoria;
    tarjeta.querySelector(".campo_descripcion").value = datos.descripcion;
    tarjeta.querySelector(".campo_imagen").value = datos.imagen;
}
//-----------------------------------------//
//--|guardando_los_datos_en_localstorage|--//
//-----------------------------------------//
function guardarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const nombre = tarjeta.querySelector(".campo_nombre").value.trim();
    const categoria = tarjeta.querySelector(".campo_categoria").value.trim();
    const descripcion = tarjeta.querySelector(".campo_descripcion").value.trim();
    const imagen = tarjeta.querySelector(".campo_imagen").value.trim();
    const mensaje = tarjeta.querySelector(".mensaje");
    if (!nombre || !categoria || !descripcion || !imagen) {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }
    const datos = {
        nombre,
        categoria,
        descripcion,
        imagen
    };
    localStorage.setItem(`anatomia_${id}`, JSON.stringify(datos));
    mostrarDatos(tarjeta);
    mensaje.textContent = "Información guardada correctamente.";
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
//-----------------------------------------------//
//--|restaurar_todos_los_datos_en_localstorage|--//
//-----------------------------------------------//
function restaurarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const mensaje = tarjeta.querySelector(".mensaje");
    localStorage.removeItem(`anatomia_${id}`);
    mostrarDatos(tarjeta);
    mensaje.textContent = "Información restaurada.";
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
function restablecerTodos() {
    tarjetas.forEach((tarjeta) => {
        const id = tarjeta.dataset.id;
        localStorage.removeItem(`anatomia_${id}`);
        mostrarDatos(tarjeta);
    });
    mensajeGeneral.textContent = "Todas las partes fueron restablecidas.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2500);
}
//--------------------------------------//
//--|eventos_de_las_partes_del_cuerpo|--//
//--------------------------------------//
tarjetas.forEach((tarjeta) => {
    const botonGuardar = tarjeta.querySelector(".boton_guardar");
    const botonRestaurar = tarjeta.querySelector(".boton_restaurar");
    mostrarDatos(tarjeta);
    botonGuardar.addEventListener("click", () => {
        guardarDatos(tarjeta);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(tarjeta);
    });
});
//-----------------------------//
//--|evento_restablecer_todo|--//
//-----------------------------//
botonRestablecer.addEventListener("click", () => {
    const confirmar = confirm("¿Quieres restablecer todas las partes?");
    if (confirmar) {
        restablecerTodos();
    }
});