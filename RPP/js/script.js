
import {
    obtenerMascotas,
    obtenerId,
    actualizarLista,
    altaMascota,
    guardarDatos
} from './controller/logica.js';

import {
    limpiar,
    idSeleccionado
} from './entidades/tabla.js';


let frm;
let divTabla;
let listaMascotas;
let proximoId;
let btnCancelar;
let btnDelete;
let btnEdit;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {


    listaMascotas = obtenerMascotas();

    proximoId = obtenerId();

    divTabla = document.getElementById('divTabla');

    actualizarLista(listaMascotas);
    console.log(listaMascotas);
    frm = document.forms[0];
    frm.addEventListener('submit', e => {
        e.preventDefault();

        //creo anuncio mascota
        const nuevaMascota = altaMascota(frm, proximoId);

        if (nuevaMascota) {
            listaMascotas.push(nuevaMascota);
            proximoId++;
            guardarDatos(listaMascotas, proximoId);
            actualizarLista(listaMascotas);
        }
        setTimeout(() => {
            alert('Anuncio Creado.');
        }, 3001);
        
    });
}


btnCancelar = document.getElementById('btnCancel');
btnCancelar.addEventListener('click', e => {
    e.preventDefault();
    limpiar();
})

btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', e => {
    e.preventDefault();
    //Eliminar de la lista y actualizar
    console.log(idSeleccionado);

    listaMascotas = listaMascotas.filter(mascota => mascota['id'] != idSeleccionado);

    actualizarLista(listaMascotas);
    limpiar();
    guardarDatos(listaMascotas);
    
    setTimeout(() => {
        alert('Anuncio eliminado.');
    }, 3001);
    
})

btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', e => {
    e.preventDefault();
    //Eliminar de la lista y actualizar
    // console.log(idSeleccionado);

    let mascota = listaMascotas.find(element => element['id'] == idSeleccionado);
    console.log(mascota);
    mascota.titulo = frm.titulo.value;
    mascota.descripcion = frm.descripcion.value;
    mascota.precio = frm.precio.value;
    mascota.animal = frm.animal.value;
    mascota.raza = frm.raza.value;
    mascota.fecha = frm.fecha.value;
    mascota.vacuna = frm.vacuna.value;

    actualizarLista(listaMascotas);
    limpiar();
    guardarDatos(listaMascotas);
    
    setTimeout(() => {
        alert('Anuncio Modificado.');
    }, 3001);
})

