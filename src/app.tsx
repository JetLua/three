import {renderer, stage, Ticker} from '~/core'

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, .01, 10)
camera.position.z = 1
const box = new THREE.BoxGeometry(.2, .2, .2)
const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(box, material)
stage.add(mesh)

renderer.setSize(innerWidth, innerHeight)
renderer.setAnimationLoop((t) => {
  mesh.rotation.x = t / 2e3
  mesh.rotation.y = t / 2e3
  renderer.render(stage, camera)
})


const ticker = new Ticker()

ticker.add(function() {console.log(1, this)}, {ok: 1}, Ticker.PRIORITY.UTILITY)
ticker.add(() => console.log(3), null, Ticker.PRIORITY.NORMAL)
ticker.add(() => console.log(10), null, Ticker.PRIORITY.HIGH)
ticker.add(() => console.log(3.1), null, Ticker.PRIORITY.NORMAL)
ticker.add(() => console.log(10.1), null, Ticker.PRIORITY.HIGH)
ticker.addOnce(() => console.log(1.1), null, Ticker.PRIORITY.UTILITY)


ticker.update()
ticker.update()
