const form = document.getElementById("formEstudio");
const tabla = document.getElementById("tablaEstudio");

const totalSesiones = document.getElementById("totalSesiones");
const totalHoras = document.getElementById("totalHoras");
const sesionesImportantes = document.getElementById("sesionesUrgentes");

const filtroMateria = document.getElementById("filtroMateria");

let sesiones = 0;
let horasTotales = 0;
let importantes = 0;

function limpiarTexto(texto){
return texto.replace(/[^\w\s]/gi,"");
}

form.addEventListener("submit",function(e){

e.preventDefault();

let materia = limpiarTexto(document.getElementById("materia").value);
let tema = limpiarTexto(document.getElementById("tema").value);
let horas = document.getElementById("horas").value;
let dificultad = document.getElementById("dificultad").value;

let prioridad = document.querySelector('input[name="prioridad"]:checked').value;

let fecha = document.getElementById("fecha").value;

if(materia==="" || tema==="" || horas==="" || fecha===""){

alert("Completa todos los campos");
return;

}

let fila=document.createElement("tr");

if(prioridad==="importante"){
fila.classList.add("importante");
importantes++;
}

if(prioridad==="repaso"){
fila.classList.add("repaso");
}

fila.innerHTML=`

<td>${materia}</td>
<td>${tema}</td>
<td>${horas}</td>
<td class="${dificultad}">${dificultad}</td>
<td>${prioridad}</td>
<td>${fecha}</td>
<td>

<button class="completar">Completar</button>
<button class="eliminar">Eliminar</button>

</td>

`;

tabla.appendChild(fila);

sesiones++;
horasTotales+=Number(horas);

actualizarResumen();

fila.querySelector(".eliminar").addEventListener("click",function(){

tabla.removeChild(fila);

sesiones--;
horasTotales-=Number(horas);

if(fila.classList.contains("importante")){
importantes--;
}

actualizarResumen();

});

fila.querySelector(".completar").addEventListener("click",function(){

fila.classList.toggle("completado");

});

form.reset();

});

function actualizarResumen(){

totalSesiones.textContent=sesiones;
totalHoras.textContent=horasTotales;
sesionesImportantes.textContent=importantes;

}

filtroMateria.addEventListener("keyup",function(){

let texto=filtroMateria.value.toLowerCase();

let filas=tabla.getElementsByTagName("tr");

for(let fila of filas){

let materia=fila.children[0].textContent.toLowerCase();

if(materia.includes(texto)){
fila.style.display="";
}else{
fila.style.display="none";
}

}

});