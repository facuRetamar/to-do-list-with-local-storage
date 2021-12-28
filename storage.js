
const formularioUI = document.querySelector(".formularioUI")
const formulario = document.querySelector("#input_actividad")
const boton = document.querySelector("#boton_submit")
const fechaAsignada = document.querySelector("#input_fecha")
let listaActividades = []
const contenedorLista = document.querySelector(".container_actividades")
let actividadesCompletadas = []
const contenedorCompletadas = document.querySelector(".actividades_terminadas")
const temporizador = document.querySelector(".temporizador")

//funciones
function crearActividad(actividad, fecha ){
    if( fechaAsignada.value === "" || formulario.value === ""){
        alert("debe completar ambos campos")
        return
    }else{
    let item = {
        actividad: actividad,
        
        fechaLimite: fecha
    }

    listaActividades.push(item)

    
    return item
}
}


function crearActividadTerminada(texto){
    let actividadTer = {
        nombre: texto
    }
    actividadesCompletadas.push(actividadTer)
    guardarTerminadaEnLocal()
    pasarATerminadas()
}

function guardarTerminadaEnLocal(){
    localStorage.setItem("actividadTerminada", JSON.stringify( actividadesCompletadas))
}

function  guardarEnLocal(){
    localStorage.setItem("rutina", JSON.stringify( listaActividades))

    
}

function pasarATerminadas(){
    contenedorCompletadas.innerHTML = ""
    actividadesCompletadas = JSON.parse(localStorage.getItem("actividadTerminada"))
    if(actividadesCompletadas === null){
        actividadesCompletadas = []
    }else{
        actividadesCompletadas.forEach(elemento =>{
            contenedorCompletadas.innerHTML += `<div class="LI_actividad-terminada">
            <p id="nombre_actividad-terminada">${elemento.nombre}</p>
            <span id="boton_actividad-terminada">X</span>
        </div>`
        })
    }
}

function plasmarLocal(){
    contenedorLista.innerHTML = ""
    listaActividades = JSON.parse(localStorage.getItem("rutina"))
    
    
    if(listaActividades === null){
        listaActividades = []
    }else{
        listaActividades.forEach(elemento =>{
            contenedorLista.innerHTML += `<div class="activity_li"><p class="nombre_activity">${elemento.actividad}</p><p class="prioridad_activity">
                                            <p>fecha limite: </p>${elemento.fechaLimite}</p><span><p class="icono icono_agregar">+</p><p class="icono icono_borrar">X</p></span></div>`
        }




        )
    }
   
}




function  editarDB(actividad){
    let indexArray = listaActividades.findIndex(trash => trash.actividad === actividad);
    console.log(indexArray)
   

    
    crearActividadTerminada(actividad)

    listaActividades.splice(indexArray, 1)
    guardarEnLocal()
    
}



function eliminarDB(actividad){
    let indexArray
    listaActividades.forEach((elemento, index )=>{
       
        if(elemento.actividad === actividad){
        indexArray = index
        }

        console.log(index)
    })
    listaActividades.splice(indexArray, 1)
    guardarEnLocal()
}

function eliminarDeLocal(nombre){
    let indexTerminado = actividadesCompletadas.findIndex(elemento => elemento.nombre === nombre );
    console.log(indexTerminado)

    actividadesCompletadas.splice(indexTerminado, 1)
    guardarTerminadaEnLocal()
    pasarATerminadas()
}

formularioUI.addEventListener("submit", e=>{
    e.preventDefault()

    let actividadTexto = formulario.value
        fechaValue = fechaAsignada.value
    
    
    crearActividad(actividadTexto, fechaValue)

    guardarEnLocal()
    formularioUI.reset()
    plasmarLocal()
})

document.addEventListener("DOMContentLoaded", plasmarLocal)

document.addEventListener("DOMContentLoaded", pasarATerminadas)

contenedorLista.addEventListener("click", (e)=>{
    e.preventDefault()
    


    if(e.target.innerHTML === "+" || e.target.innerHTML === "X"){
        let texto = e.path[2].childNodes[0].innerHTML

        
        if(e.target.innerHTML === "+" ){
            editarDB(texto)
        }
    
        if(e.target.innerHTML === "X" ){
            eliminarDB(texto)
        }
    }
    plasmarLocal()
   
})


contenedorCompletadas.addEventListener("click", e=>{
    e.preventDefault();
    if(e.target.innerHTML === "X"){
        let nombre = e.path[1].childNodes[1].innerHTML
        
        
        
            eliminarDeLocal(nombre)
      
    }
})

/*function getTime(){
    let time = new Date()
    contador = time.innerHTML

     setInterval(() => {
       
        getTime()
     }, 1000);
     
     temporizador.innerHTML = ` ${contador} `

}

getTime()


*/