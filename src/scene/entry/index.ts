import * as THREE from 'three'

import {camera, stage} from '~/core'

const loader = new THREE.TextureLoader()
loader.setPath('/static/texture/')

let group: THREE.Group

function init() {
  group = new THREE.Group()
  addMap()
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
  const texture = window.textureCache['1.jpg']

  project.reflectY(true)

  for (const feature of data.features) {
    for (const coord of feature.geometry.coordinates) {
      for (const points of coord) {
        const shape = new THREE.Shape()

        points.forEach((point: [number, number], i) => {
          const [x, y] = project(point)
          i ? shape.lineTo(x, y) : shape.moveTo(x, y)
        })

        const line = new THREE.Line(
          new THREE.ShapeGeometry(shape),
          new THREE.MeshBasicMaterial({
            color: 0x00bcd4
          })
        )

        line.computeLineDistances()

        group.add(line)
      }
    }
  }
}
