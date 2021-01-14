import * as THREE from 'three'

import {camera, stage} from '~/core'

const loader = new THREE.TextureLoader()
loader.setPath('/static/texture/')

let group: THREE.Group

function init() {
  group = new THREE.Group()
  addMap()
  addBox()
  camera.position.z = 10
  stage.add(group)
}

export function show() {
  if (!group) return init()
  group.visible = true
}

export function hide() {
  group.visible = false
}

async function addMap() {
  const d3 = await import('d3-geo')
  const data = await import('@/static/map.china.json')
  const project = d3.geoMercator().center([104, 37.5]).scale(10).translate([0, 0])

  project.reflectY(true)

  for (const feature of data.features) {
    if (!feature.properties.center) continue

    const center = project(feature.properties.center as any)

    for (const coord of feature.geometry.coordinates) {
      for (const points of coord) {
        const shape = new THREE.Shape()

        points.forEach((point: [number, number], i) => {
          const [x, y] = project(point)
          i ? shape.lineTo(x, y) : shape.moveTo(x, y)
        })

        const texture = await loader.loadAsync('1.jpg') as THREE.Texture
        // const texture = window.textureCache['1.jpg'].clone()
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        // texture.offset.x = center[0]
        // texture.offset.y = center[1]

        const line = new THREE.Mesh(
          // new THREE.ShapeGeometry(shape),
          new THREE.ExtrudeGeometry(shape, {depth: .1, bevelEnabled: false}),
          new THREE.MeshBasicMaterial({
            map: texture
          })
        )

        console.log(line.geometry.faceVertexUvs)

        group.add(line)
      }
    }
  }
}

async function addBox() {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(.1, .1, .1),
    new THREE.MeshBasicMaterial({
      map: window.textureCache['1.jpg']
    })
  )

  console.log(box.geometry.faceVertexUvs)



  group.add(box)
}
