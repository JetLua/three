const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas')
})

renderer.setClearColor(0xffffff)

const stage = new THREE.Scene()

export {
  stage,
  renderer
}
