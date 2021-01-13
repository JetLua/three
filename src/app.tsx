import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {transform} from '~/util'
import {ticker, stage, camera, renderer} from '~/core'
import mapChina from '@/static/map.china.json'

const min = {
  x: Infinity,
  y: Infinity
}

const max = {
  x: -Infinity,
  y: -Infinity
}

const groups = []

for (const feature of mapChina.features) {
  for (const coord of feature.geometry.coordinates) {
    for (const group of coord) {
      const _group = []
      groups.push(_group)
      for (let [x, y] of group) {
        if (x < min.x) min.x = x
        if (x > max.x) max.x = x
        if (y < min.y) min.y = y
        if (y > max.y) max.y = y
        _group.push([x, y])
      }
    }
  }
}

const center = {x: (min.x + max.x) / 2, y: (min.y + max.y) / 2}

for (const group of groups) {
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({vertexColors: true})
  const shape = new THREE.Line(geometry, material)
  const color = new THREE.Color(0x00bcd4)
  stage.add(shape)
  for (let [x, y] of group) {
    geometry.vertices.push(new THREE.Vector3((x - center.x), (y - center.y), -100))
    geometry.colors.push(color)
  }
}

camera.position.z = 10

const control = new OrbitControls(camera, renderer.domElement)
