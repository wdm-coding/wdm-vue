import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { create3DHtml,create3DSprite } from '../../threejs-utils/render'
export const createGroup = () => {
  const group = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/public/three-js/glb/gc.glb', gltf => {
    const gc = gltf.scene
    const arr = ['设备A', '设备B', '停车场']
    for(let i = 0;i < arr.length;i++) {
      const dom = document.querySelector('.tag')?.cloneNode() as HTMLElement
      const tag = create3DSprite(dom)
      dom.style.pointerEvents = 'none'
      dom.textContent = arr[i]
      const obj = gc.getObjectByName(`${arr[i]}标注`) as THREE.Mesh
      obj.add(tag)
      tag.scale.set(0.1, 0.1, 0.1)
    }
    group.add(gc)
  })
  return group
}