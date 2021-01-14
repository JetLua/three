import * as THREE from 'three'

import './env'
import {Ticker} from '~/util'

const {
  innerWidth: width,
  innerHeight: height
} = window

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas')
})

renderer.setSize(width, height)
renderer.setClearColor(0xffffff)

const stage = new THREE.Scene()
const ticker = new Ticker()
const camera = new THREE.PerspectiveCamera(70, width / height, .01, 1000)

ticker.add(() => {
  renderer.render(stage, camera)
})

renderer.setAnimationLoop(t => {
  ticker.update(t)
})

export {
  stage,
  camera,
  ticker,
  renderer
}
