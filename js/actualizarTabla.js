//De inicio, se llama a la funcion escribirTabla para sacar las tareas de la lista
document.addEventListener('DOMContentLoaded', () => {
    escribirTabla();
});

//Funcion recursiva para escribir la tabla y actualizarla

export function escribirTabla() {
    //Entra en el php para sacar el json de todas las tareas
    fetch('php/sacarTodasTareas.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se ha establecido la conexión con sacarTodasTareas.php');
                }
                return response.json();
            })
            .then(data => {

                //Una vez las saca crea una lista

                const listaTareasElemento = document.getElementById("listaTareas");
                const tareasCompletadasElemento = document.getElementById("tareasCompletadas");

                // Limpiar listas antes de agregar nuevas tareas
                listaTareasElemento.innerHTML = "";
                tareasCompletadasElemento.innerHTML = "";
                //Comprueba el haya tareas y que sean un array
                if (data.tareas && Array.isArray(data.tareas)) {
                    data.tareas.forEach(tarea => {

                        console.log('TAREA: ' + tarea.id + " " + tarea.completada);
                        // Creamos los elementos
                        //Creamos el li
                        const li = document.createElement("li");
                        li.id = `tarea-${tarea.id}`;
                        //Creamos el checkbox
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.className = "complete-btn";
                        checkbox.checked = tarea.completada === "1";
                        //Creamos el evento para cuando cambia el estado del checkbox
                        checkbox.addEventListener('change', () => {
                            //Formateamos el id para que sea el mismo de la base de datos
                            const idNumerico = parseInt(li.id.replace('tarea-', ''));
                            //Comprobamos el estado despues del cambio
                            const nuevoEstado = checkbox.checked ? 1 : 0;
                            console.log("Nuevo estado de " + tarea.id + " es " + nuevoEstado + " (" + typeof nuevoEstado + ")");
                            //Creamos un json de los datos
                            const datos = {
                                id: idNumerico,
                                estado: nuevoEstado
                            };
                            //Ponemos las opciones que le vamos a pasar al php
                            const fetchOptions = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(datos)
                            };
                            //Enviamos el request al php
                            fetch('php/actualizarTarea.php', fetchOptions)
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('No se ha establecido la conexión con actualizarTarea.php');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        //Cuando encuentra, se imprime el mensaje de exito y vuelve la funcion a iniciarse
                                        if (data.exito) {
                                            console.log(data.exito);
                                            escribirTabla();
                                        }
                                        if (data.error) {
                                            console.log(data.error);
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            // Recogemos cuando se ha pulsado el checbox
                            const fechaCompletada = new Date();
                            //Formateamos la fecha para que sea mas legible
                            const fechaCompletadaFormateada = fechaCompletada.toISOString().split('T')[0];
                            console.log(fechaCompletadaFormateada);

                            //Recogemos los datos
                            const datosFecha = {
                                id: idNumerico,
                                fechaCompletada: fechaCompletadaFormateada
                            };

                            const fetchOptionsFecha = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(datosFecha)
                            };
                            //Enviamos esa fecha al php para que actualice
                            fetch('php/actualizarTarea.php', fetchOptionsFecha)
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('No se ha podido establecer la conexon con atualizarTarea.php');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        // Si ha habido exito en la operación, se reescribe la lista
                                        if (data.exito) {
                                            console.log('Se ha actualizado la fechaCompletada, ' + data.exito);
                                            escribirTabla();
                                        }
                                        if (data.error) {
                                            console.log('Ha habido un error: ' + data.error);
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                        });
                        // REcogemos la descripcion de la tarea
                        const descripcion = document.createElement("p");
                        descripcion.textContent = tarea.descripcion;

                        //Creamos el div de la fecha asignada

                        const divFechaAsignada = document.createElement("div");
                        divFechaAsignada.className = "fecha-asignada";

                        // Volvemos a formatear la fecha (me salía la hora), tambien comprobamos is esta null o no
                        const fechaAsignadaFormateada = tarea.fechaAsignada ? tarea.fechaAsignada.split(' ')[0] : 'No asignada';

                        divFechaAsignada.innerHTML = `<strong>Fecha Asignada:</strong> ${fechaAsignadaFormateada}`;
                        // Creamos el boton de eliminar
                        const botonEliminar = document.createElement("button");
                        botonEliminar.className = "delete-btn";
                        botonEliminar.textContent = "❌";
                        // Creamos un evento de click
                        botonEliminar.addEventListener('click', () => {
                            // Formateamos el id
                            const idNumerico = parseInt(li.id.replace('tarea-', ''));
                            //Construimos el json de los datos
                            const datos = {
                                id: idNumerico
                            };
                            //Sacamos las opciones del fetch
                            const fetchOptions = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(datos)
                            };
                            // Entramos en php de borrar tarea
                            fetch('php/borrarTarea.php', fetchOptions)
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('No se ha establecido la conexión con borrarTarea.php');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {

                                        //Si da exito, significa que se ha obrrado, por tanto se borra de la base de datos y actualizamos
                                        if (data.exito) {
                                            console.log(data.exito);
                                            //li.remove(); 
                                            console.log("Se ha eliminado la tarea con el id: " + idNumerico);
                                            escribirTabla();
                                        }
                                        if (data.error) {
                                            console.log(data.error);
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                        });

                        // Agregamos los elementos dentro del <li>
                        li.appendChild(checkbox);
                        li.appendChild(descripcion);
                        li.appendChild(divFechaAsignada);
                        li.appendChild(botonEliminar);

                        // Filtramos para añadir una tarea a un div o a otro
                        // Si el campo de la bbdd es 1, se añade a completado
                        if (tarea.completada === "1") {
                            console.log("Tarea completada: " + li);
                            tareasCompletadasElemento.appendChild(li);

                            //Comparamos al fecha en la que se ha completado con la fecha asignada, para mostrar un mensaje u otr
                            if (tarea.fechaCompletada < tarea.fechaAsignada) {
                                divFechaAsignada.innerHTML = 'La tarea se ha realizado a tiempo';
                            } else {

                                divFechaAsignada.innerHTML = `La tarea no ha sido completada a tiempo`;
                            }
                            //Si no se añade a la lista de tareas pendientes
                        } else {
                            console.log("Tarea no completada " + li);
                            listaTareasElemento.appendChild(li);
                        }
                    });
                } else {
                    console.log("No hay tareas disponibles.");
                }
            })
            .catch(error => {
                console.log("Error en la petición:", error);
            });
}
