import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
export const createModel = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BoxGeometry(50, 50, 50)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const gc = new THREE.Mesh(geometry, material)
  model.add(gc)
  return model
}
interface OutlinePassType {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  width: number;
  height: number;
}
export const outlinePassRender = (params:OutlinePassType) => {
  const {
    renderer,
    scene,
    camera,
    width,
    height
  } = params
  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer)
  // 创建渲染通道RenderPass，第一个参数是场景，第二个参数是相机
  const renderPass = new RenderPass(scene,camera)
  // 给EffectComposer添加一个渲染器通道RenderPass
  composer.addPass(renderPass)
  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(width, height)
  const outlinePass = new OutlinePass(v2, scene, camera)
  return { outlinePass,composer }
}