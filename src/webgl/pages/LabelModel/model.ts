import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// html元素标签
export const createHtml = (dom:HTMLElement) => {
  const tag = new CSS2DObject(dom)
  return tag
}
// 工程模型
export const createCone = () => {
  const group = new THREE.Group()
  // 实例化加载器对象
  const loader = new GLTFLoader()
  // 加载模型
  loader.load('/public/three-js/glb/gc.glb',gltf => {
    group.add(gltf.scene)
    const tag = createHtml(document.querySelector('.tag1') as HTMLElement)
    const obj = gltf.scene.getObjectByName('设备B') as THREE.Object3D
    const axesHelperLine = new THREE.AxesHelper(200)
    obj.add(axesHelperLine)
    obj.add(tag)
  })
  return group
}