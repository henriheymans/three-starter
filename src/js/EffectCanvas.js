import * as THREE from 'three'
import vertexShader from "../shaders/vertexShader.glsl"
import fragmentShader from "../shaders/fragmentShader.glsl"

export default class EffectCanvas {
    constructor() {
        this.element = document.querySelector('body')

        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        })

        this.canvas = this.renderer.domElement

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.viewport.width / this.viewport.height,
            .1,
            10
        )

        this.clock = new THREE.Clock()

        this.update = this.update.bind(this)

        this.init()
    }

    init() {
        this.addCanvas()
        this.addCamera()
        this.addMesh()
        this.addEventListeners()
        this.onResize()
        this.update()
    }

    /**
     * STAGE
     */
    addCanvas() {
        this.canvas.classList.add('webgl')
        document.body.appendChild(this.canvas)
    }

    addCamera() {
        this.camera.position.set(0, 0, 2.5)
        this.scene.add(this.camera)
    }

    // MESH
    addMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64)

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    /**
     * EVENTS
     */
    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this))
    }

    onResize() {
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.camera.aspect = this.viewport.width / this.viewport.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.viewport.width, this.viewport.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }

    /**
     * LOOP
     */
    update() {
        this.render()
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.01
        window.requestAnimationFrame(this.update)
    }

    /**
     * RENDER
     */
    render() {
        this.renderer.render(this.scene, this.camera)
    }
}