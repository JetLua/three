import * as THREE from 'three'

const loader = new THREE.TextureLoader()

loader.setPath('/static/texture/')

window.textureCache = {}

export default async function() {
  const textures = ['1.jpg', '2.jpg', '3.jpg']
  for (const id of textures) {
    window.textureCache[id] = await loader.loadAsync(id)
  }
}
