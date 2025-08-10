import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/Addons.js'
import testVertexShader from '../static/shaders/vertex.glsl'
import testFragmentShader from '../static/shaders/fragment.glsl'

/**
 * SETUP
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')


/**
 * INTERFACE
 */

// HTML tags
const body = document.getElementById('body')
const container = document.getElementById("container")

const exitFullscreen = document.getElementById('exit_fullscreen')
const fullScreenText = document.getElementById('full_screen')
const exitFullscreenBtn = document.getElementById('exit_fullscreen_btn')

const zhizwhaH = document.getElementById('zhizhwa')
const modal1 = document.getElementById("modal1")
const modalClose1 = document.getElementById("modal_close1")
const modalBtn1 = document.getElementById("modal_btn")
const zText = document.getElementById("z_text")
const zTitle = document.getElementById("z_title")
let isTech = false;

const modal = document.getElementById("modal")
const a_link = document.getElementById("link")
const modalClose = document.getElementById("modal_close")

// Generals
window.addEventListener("orientationchange", () => {
    location.reload()
})

// Modal Zhizhwa
zhizwhaH.addEventListener("click", () => {
    modal1.classList.toggle("is-hidden")
})

modalClose1.addEventListener("click", () => {
    modal1.classList.toggle("is-hidden")
})

modalBtn1.addEventListener("click", () => {
    if (!isTech) {
        zText.textContent = "Zhizhwa es una obra de arte digital creada mediante programación gráfica a través del lenguaje de shaders GLSL. La información visual se envía directamente a la tarjeta gráfica desde el código, frame a frame, sin depender de archivos de video, y permitiendo la interactividad. La animación se crea y desaparece a cada fotograma; no es posible avanzar ni retroceder, solo existe en el instante presente. Los controles deslizantes (sliders) están conectados directamente al fragment shader, lo que habilita al usuario modificar en tiempo real algunos de sus valores, influyendo así en la visualización de la animación."
        zTitle.textContent = ""
        modalBtn1.textContent = "Concepto"
        isTech = true
    } else if (isTech) {
        zText.textContent = "Inspirada en el universo VJ (mezcla de video en tiempo real), Zhizhwa es una interfaz web que permite al visitante modificar en tiempo real una animación generada por código, dando lugar a infinitas variaciones de una forma que se dibuja y desdibuja continuamente. Formas danzantes que acompañadas de música tienden a la sincronía, produciendo una experiencia sinestésica: fusión de percepciones sensoriales."
        zTitle.textContent = "Zhizhwa - De la lengua muisca: garabato"
        modalBtn1.textContent = "Técnica"
        isTech = false
    }
})

// Modal
a_link.addEventListener("click", () => {
    modal.classList.toggle("is-hidden")
})

modalClose.addEventListener("click", () => {
    modal.classList.toggle("is-hidden")
})

// WakeLock
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen')
        console.log("wakeLock")
    } catch (err) {
        console,error(err.message)
    } 
}

function desactivarWakeLock() {
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log("!wakeLock")
    }
}


// FullScreen
exitFullscreen.addEventListener("click", () => {
    if(!document.fullscreenElement) {

        if (body.requestFulscreen) {
            body.requestFullscreen()
        } else if (body.webkitRequestFullscreen) {
            body.webkitRequestFullscreen()
        } else if (body.msRequestFullscreen) {
            body.msRequestFullscreen()
        }

    }

    if(document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
    }
})

document.addEventListener("fullscreenchange", handler);
document.addEventListener("webkitfullscreenchange", handler); // Safari
document.addEventListener("mozfullscreenchange", handler);    // Firefox
document.addEventListener("MSFullscreenChange", handler);     // IE11 (raro, pero a veces...)

function handler() {
  if (!document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
    fullScreenText.textContent = "Full Screen";
    exitFullscreenBtn.classList.add("fullscreen_btn")
    exitFullscreenBtn.classList.remove("exit_fullscreen_btn")
    exitFullscreenBtn.textContent = ""
    desactivarWakeLock()

  } else {
    fullScreenText.textContent = "Exit Full Screen";
    exitFullscreenBtn.classList.remove("fullscreen_btn")
    exitFullscreenBtn.classList.add("exit_fullscreen_btn")
    exitFullscreenBtn.textContent = "X"
    requestWakeLock()
  }
}


// Buttons

function isMobile() {
    return /Mobi|Android|iPhone/.test(navigator.userAgent)
}

function getOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return 'portrait'
    } else if (window.matchMedia("(orientation: landscape").matches) {
        return 'landscape'
    }
    return 'unkown'
}

console.log(getOrientation())

if (isMobile()) {
    container.style.justifyContent = "start"
}

const slidersDiv = document.getElementById("dbSliders")
const slidersBtn = document.getElementById("bSliders")
const slidersList = document.getElementById("listSliders")
const dataDiv = document.getElementById("dbData")
const dataBtn = document.getElementById("bData")
const dataList = document.getElementById("listData")
const weightDiv = document.getElementById("dbWeight")
const weightBtn = document.getElementById("bWeight")
const weightList = document.getElementById("listWeight")

if (isMobile() && getOrientation() === "landscape") {

    slidersList.classList.remove("see")
    slidersBtn.classList.add('rotation')

    slidersDiv.addEventListener('click', () => {
        zhizwhaH.classList.toggle('hide')
        slidersList.classList.toggle('see')
        slidersBtn.classList.toggle('rotation')
        dataDiv.classList.toggle('hide')
        weightDiv.classList.toggle('hide')
    })

    dataDiv.addEventListener('click', () => {
        zhizwhaH.classList.toggle('hide')
        dataList.classList.toggle('see')
        dataBtn.classList.toggle('rotation')
        slidersDiv.classList.toggle('hide')
        weightDiv.classList.toggle('hide')
    })

    weightDiv.addEventListener('click', () => {
        zhizwhaH.classList.toggle('hide')
        weightList.classList.toggle('see')
        weightBtn.classList.toggle('rotation')
        dataDiv.classList.toggle('hide')
        slidersDiv.classList.toggle('hide')
    })
} else {
    slidersDiv.addEventListener('click', () => {
        slidersList.classList.toggle('see')
        slidersBtn.classList.toggle('rotation')
    
    })
    
    dataDiv.addEventListener('click', () => {
        dataList.classList.toggle('see')
        dataBtn.classList.toggle('rotation')
    })
    
    weightDiv.addEventListener('click', () => {
        weightList.classList.toggle('see')
        weightBtn.classList.toggle('rotation')
    })
}

// Temporizador ocultar

let temporizador
let temporizador_textes

function ocultar() {
    slidersDiv.style.opacity = "0"
    dataDiv.style.opacity = "0"
    weightDiv.style.opacity = "0"
    exitFullscreen.style.opacity = "0"
    a_link.style.opacity = "0"
    zhizwhaH.style.opacity = "0"
}

function ocultar_textes() {
    slidersList.style.opacity = "0"
    dataList.style.opacity = "0"
    weightList.style.opacity = "0"
}

function reiniciarInactividad(e) {

    if (e && slidersList.contains(e.target)) {
        slidersList.style.opacity = "1"
        dataList.style.opacity = "1"
        weightList.style.opacity = "1"
        return 
    }
    
    slidersDiv.style.opacity = "1"
    dataDiv.style.opacity = "1"
    weightDiv.style.opacity = "1"
    exitFullscreen.style.opacity = "1"
    a_link.style.opacity = "1"
    slidersList.style.opacity = "1"
    dataList.style.opacity = "1"
    weightList.style.opacity = "1"
    zhizwhaH.style.opacity = "1"

    clearTimeout(temporizador)
    temporizador = setTimeout(ocultar,3000)

    clearTimeout(temporizador_textes)
    temporizador_textes = setTimeout(ocultar_textes, 15000)
}



['mousemove', 'touchstart', 'keydown'].forEach(e => {
    window.addEventListener(e, reiniciarInactividad);
})

reiniciarInactividad();


/**
* THREEJS
*/

// Scene
const scene = new THREE.Scene()

// Variables

const r1 = Math.random() * 0.3 + 0.7;
const g1 = Math.random() * 0.3 + 0.7;
const b1 = Math.random() * 0.3 + 0.7;

const variables = {
    speed: 0.29,
    grosor: 0.3,
    offline: 0.5,
    large: 0.9,
    twirl: 13.,
    twirl_speed: 0.03,
    radius: 1.,
    detail: 200,
    r: r1,
    g: g1,
    b: b1
}


// Interface
// Sliders

const i_zoom = document.getElementById("i_zoom")
const n_zoom = document.getElementById("n_zoom")

i_zoom.addEventListener('input', () => {
    n_zoom.textContent = i_zoom.value
    camera.position.z = i_zoom.value  
})

const i_speed = document.getElementById("i_speed")
const n_speed = document.getElementById("n_speed")

i_speed.addEventListener('input', () => {
    n_speed.textContent = i_speed.value
    material.uniforms.u_twirl_speed.value = i_speed.value
})

const i_tickness = document.getElementById("i_tickness")
const n_tickness = document.getElementById("n_tickness")

i_tickness.addEventListener('input', () => {
    n_tickness.textContent = i_tickness.value
    material.uniforms.u_grosor.value = i_tickness.value
})

const i_r = document.getElementById("i_r")
const n_r = document.getElementById("n_r")
n_r.textContent = r1
i_r.value = r1

i_r.addEventListener('input', () => {
    n_r.textContent = i_r.value
    material.uniforms.u_r.value = i_r.value
})

const i_g = document.getElementById("i_g")
const n_g = document.getElementById("n_g")
n_g.textContent = g1
i_g.value = g1

i_g.addEventListener('input', () => {
    n_g.textContent = i_g.value
    material.uniforms.u_g.value = i_g.value
})

const i_b = document.getElementById("i_b")
const n_b = document.getElementById("n_b")
n_b.textContent = b1
i_b.value = b1

i_b.addEventListener('input', () => {
    n_b.textContent = i_b.value
    material.uniforms.u_b.value = i_b.value
})

// Data Info
const mesh_x = document.getElementById("mesh_x")
const mesh_y = document.getElementById("mesh_y")
const mesh_z = document.getElementById("mesh_z")
const twril_tag = document.getElementById("twril")
const elapsedTime_tag = document.getElementById("elapsedTime")

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereGeometry(0.5, variables.detail, variables.detail)

// Material

const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    wireframe: true,
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
        u_time: { value: 0 },
        u_speed: { value: variables.speed },
        u_grosor: { value: variables.grosor },
        u_offline: { value: variables.offline },
        u_large: { value: variables.large },
        u_twirl: { value: variables.twirl},
        u_twirl_speed: { value: variables.twirl_speed},
        u_radius: {value: variables.radius},
        u_r: { value: variables.r },
        u_g: { value: variables.g },
        u_b: { value: variables.b },
    }
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateX(0)
scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 1.7)
if (sizes.width < 375) {
    camera.position.set(0, 0, 2.3)
}
scene.add(camera)

i_zoom.value = camera.position.z
n_zoom.textContent = camera.position.z 

// Controls
const controls = new TrackballControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    material.uniforms.u_time.value = elapsedTime

    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
    mesh.rotation.z += 0.0025;
    
    mesh_x.textContent = mesh.rotation.x
    mesh_y.textContent = mesh.rotation.y
    mesh_z.textContent = mesh.rotation.z
    twril_tag.textContent = Math.sin(elapsedTime * i_speed.value - 4.7 * 13.)
    elapsedTime_tag.textContent = elapsedTime
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

console.log("A1V8 is an artistic project that explores real-time interactive imagery through graphic programming. We are interested in creating aesthetic experiences through code, exploring the expressive potential of technology as a visual language. Our aim is to promote the production of web and/or non-web projects that integrate interactive visual proposals.")

