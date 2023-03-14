let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.querySelector('.seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.querySelector('.reiniciar')
    sectionReiniciar.style.display = 'none'
    
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)

    let inputs = document.getElementsByName('mascota')
    inputs.forEach(item => {
        item.addEventListener('change', seleccionarTarjeta)
    })
    revisarCorazones()
}

function seleccionarMascotaJugador() {
    let radios = document.getElementsByName("mascota")
    radios = Array.from(radios)
    if (radios.find(item => item.checked)) {
        let sectionSeleccionarMascota = document.querySelector('.seleccionar-mascota')
        sectionSeleccionarMascota.style.display = 'none'
    
        let sectionSeleccionarAtaque = document.querySelector('.seleccionar-ataque')
        sectionSeleccionarAtaque.style.display = 'flex'

        let inputValue = radios.find(item => item.checked).value
        let mascotaJugador = document.getElementById('mascota-jugador')

        mascotaJugador.innerHTML = inputValue

        seleccionarMascotaEnemigo()
    } else {
        alert('Selecciona una mascota')
    }
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = Math.floor((Math.random()*3)+1)
    let mascotaEnemigo = document.getElementById('mascota-enemigo')

    if (mascotaAleatoria == 1) {
        mascotaEnemigo.innerHTML = 'Bulbasaur'
    } else if (mascotaAleatoria == 2) {
        mascotaEnemigo.innerHTML = 'Squirtle'
    } else {
        mascotaEnemigo.innerHTML = 'Charmander'
    }

}

function ataqueFuego() {
    ataqueJugador = 'FUEGO 🔥'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA 💧'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA 🌱'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = Math.floor((Math.random()*3)+1)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO 🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA 💧'
    } else {
        ataqueEnemigo = 'TIERRA 🌱'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador=='FUEGO 🔥' && ataqueEnemigo=='TIERRA 🌱') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador=='AGUA 💧' && ataqueEnemigo=='FUEGO 🔥') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador=='TIERRA 🌱' && ataqueEnemigo=='AGUA 💧') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    
    let spanAtaquesJugador = document.getElementById('ataques-jugador')
    let spanAtaquesEnemigo = document.getElementById('ataques-enemigo')
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    spanAtaquesJugador.appendChild(nuevoAtaqueDelJugador)
    spanAtaquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    // console.log(nuevoAtaqueDelEnemigo);

    revisarCorazones()
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste 😊")
        document.querySelector('.mensaje-final').innerHTML = '¡GANASTE!'
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste 😢')
        document.querySelector('.mensaje-final').innerHTML = 'PERDISTE'
    }
}

function revisarCorazones (){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    spanVidasJugador.innerHTML = 'Tu: ' + ('❤ ').repeat(vidasJugador)
    spanVidasEnemigo.innerHTML = 'PC: ' + ('❤ ').repeat(vidasEnemigo)
}

function crearMensaje(resultado) {
    let resultadoMensaje = document.querySelector('#resultado')
    
    resultadoMensaje.innerHTML = '<span class="span-mensaje">' + resultado + '</span><br>' + 'Jugador - ' + ataqueJugador + '.<br>Enemigo - ' + ataqueEnemigo + '.'
}

function crearMensajeFinal(resultadoFinal) {
    let resultadoMensaje = document.querySelector('#resultado')

    resultadoMensaje.innerHTML = resultadoFinal

    document.getElementById('boton-fuego').disabled = true
    document.getElementById('boton-agua').disabled = true
    document.getElementById('boton-tierra').disabled = true

    document.querySelector('.reiniciar').style.display = 'flex'
}

function reiniciarJuego() {
    location.reload()
}

function seleccionarTarjeta() {
    let media = window.matchMedia("(max-width: 600px)")
    let radios = document.getElementsByName("mascota")
    radios.forEach(radio => {
        if (radio.checked) {
            radio.labels[0].style.background = "#b4b272"
            if (media.matches) {
                radio.labels[0].style.transform = "translateX(-6px)"
            } else {
                radio.labels[0].style.transform = "translateY(-6px)"
            }
        } else {
            radio.labels[0].style.background = ""
            radio.labels[0].style.transform = "initial"
        }
    })
}


window.addEventListener('load', iniciarJuego)