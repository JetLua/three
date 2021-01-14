import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {camera, renderer} from '~/core'
import {preload, entry} from '~/scene'


await preload()
entry.show()

new OrbitControls(camera, renderer.domElement)
