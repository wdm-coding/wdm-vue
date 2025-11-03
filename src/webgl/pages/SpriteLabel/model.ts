import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { create3DHtml,create3DSprite } from '../../threejs-utils/render'
export const createGroup = () => {
  const group = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/public/three-js/glb/gc.glb', gltf => {
    const gc = gltf.scene
    const arr = ['设备A', '设备B', '停车场']
    const img = ['故障.png','警告.png','雪花.png']
    for(let i = 0;i < arr.length;i++) {
      const dom = document.querySelector('.tag')?.cloneNode() as HTMLElement
      const tag = create3DSprite(dom)
      dom.style.pointerEvents = 'none'
      dom.textContent = arr[i]
      const obj = gc.getObjectByName(`${arr[i]}标注`) as THREE.Mesh
      const texLoader = new THREE.TextureLoader()
      const texture = texLoader.load(`/public/three-js/环境贴图/${img[i]}`)
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(10, 10, 1)
      sprite.position.set(0, 5, 0)
      obj.add(sprite)
    }
    group.add(gc)
  })
  return group
}