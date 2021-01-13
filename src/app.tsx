import * as d3 from 'd3-geo'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {ticker, stage, camera, renderer} from '~/core'
import mapChina from '@/static/map.china.json'

const project = d3.geoMercator().center([104, 37.5]).scale(5).translate([0, 0])
project.reflectY(true)

for (const feature of mapChina.features) {
  for (const coord of feature.geometry.coordinates) {
    for (const group of coord) {
      const shape = new THREE.Shape()

      group.forEach((point: [number, number], i) => {
        const [x, y] = project(point)
        i ? shape.lineTo(x, y) : shape.moveTo(x, y)
      })

      // const geometry = new THREE.ShapeGeometry(shape)
      const geometry = new THREE.ExtrudeBufferGeometry(shape, {depth: 0, bevelEnabled: false})
      const edge = new THREE.EdgesGeometry(geometry)
      const line = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 2}))
      const material = new THREE.MeshBasicMaterial({color: 0x00bcd4, side: THREE.BackSide})
      const mesh = new THREE.Mesh(geometry, material)
      stage.add(mesh, line)
    }
  }
}

camera.position.z = 10

const control = new OrbitControls(camera, renderer.domElement)
