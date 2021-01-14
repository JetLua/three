declare module '*.less'

interface Window {
  textureCache: {
    [k: string]: THREE.Texture
  }
}
