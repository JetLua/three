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
  const groups: number[][][] = []
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

  for (const _group of groups) {
    const shape = new THREE.Shape()
    _group.forEach(([x, y], i) => {
      i ? shape.lineTo(x, y) : shape.moveTo(x, y)
    })

    const texture = window.textureCache['3.jpg'].clone()
    texture.needsUpdate = true

    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: .1,
        bevelEnabled: false,
        UVGenerator: {
          generateSideWallUV(geometry, vertices, a, b, c, d) {
            // 挤压面的纹理映射，没有反而更好看
            return [
              new THREE.Vector2(0, 0),
              new THREE.Vector2(0, 0),
              new THREE.Vector2(0, 0),
              new THREE.Vector2(0, 0),
            ]
          },

          generateTopUV(geometry, vertices, a, b, c) {
            const ax = (vertices[a * 3] - min.x) / size.width
            const ay = (vertices[a * 3 + 1] - min.y) / size.height
            const bx = (vertices[b * 3] - min.x) / size.width
            const by = (vertices[b * 3 + 1] - min.y) / size.height
            const cx = (vertices[c * 3] - min.x) / size.width
            const cy = (vertices[c * 3 + 1] - min.y) / size.height

            return [new THREE.Vector2(ax, ay), new THREE.Vector2(bx, by), new THREE.Vector2(cx, cy)]
          },
        }
      }),
      new THREE.MeshBasicMaterial({
        map: texture
      })
    )

    group.add(mesh)

    // return
  }
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
