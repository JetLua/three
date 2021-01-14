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
  const min = {x: Infinity, y: Infinity}
  const max = {x: -Infinity, y: -Infinity}
  const groups = []
  const size = {width: 0, height: 0}

  project.reflectY(true)

  for (const feature of data.features) {
    for (const coord of feature.geometry.coordinates) {
      for (const points of coord) {
        const group = []
        groups.push(group)
        points.forEach((point: [number, number], i) => {
          point = project(point)
          group.push(point)
          if (point[0] < min.x) min.x = point[0]
          if (point[0] > max.x) max.x = point[0]
          if (point[1] < min.y) min.y = point[1]
          if (point[1] > max.y) max.y = point[1]
        })
      }
    }
  }

  size.width = max.x - min.x
  size.height = max.y - min.y
}

async function addBox() {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(.1, .1, .1),
    new THREE.MeshBasicMaterial({
      map: window.textureCache['1.jpg']
    })
  )
  group.add(box)
}
