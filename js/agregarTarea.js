//Importamos la funcion recursiva de escribir tabla
import { escribirTabla } from './actualizarTabla.js';
//Sacamos los datos del formulario
const formulario = document.getElementById("formularioEntradaTareas");
const divFechaVencimiento = document.getElementById("divFechaVencimiento");
const dateInput = document.getElementById("dateInput");

document.addEventListener('DOMContentLoaded', () => {

    // Evento para sacar el input type date del input con posicion absoluta
    divFechaVencimiento.addEventListener('click', () => {
        // Obtener la posición de divFechaVencimiento
        const rect = divFechaVencimiento.getBoundingClientRect();

        dateInput.style.position = "absolute";
        dateInput.style.top = `${rect.top + window.scrollY}px`;
        dateInput.style.left = `${rect.right + window.scrollX - dateInput.offsetWidth}px`; // Posiciona en la derecha
        dateInput.style.display = "block";
    });
    //Aqui sacamos la fecha que se ha seleccionado (por control de entrada de datos)
    dateInput.addEventListener('change', () => {
        console.log(dateInput.value);
    });
});
//Manejamos el evento submit del formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    //Quitamos el input de la fecha de la pantalla
    dateInput.style.display = "none";
    // Obtenemos el valor actualizado de taskInput al enviar el formulario
    const descripcionTarea = document.getElementById("taskInput").value;
    const fechaAsignada = dateInput.value;
    const datos = {
        descripcion: descripcionTarea,
        fechaAsignada: fechaAsignada
    };

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    //Entreamos en el php de insertarTarea
    fetch('php/insertarTarea.php', fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se ha establecido la conexion con insertarTarea.php');
                }
                return response.json();
            })
            .then(data => {
                // Si la hemos insertado vamos a la funcion de escribir la tabla
                if (data.exito) {
                    console.log(data.exito);
                    escribirTabla();
                } else if (data.error) {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
});