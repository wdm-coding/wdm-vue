import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
interface BasePassType {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  width: number;
  height: number;
}
interface ComposerType {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
}
// 创建EffectComposer后处理对象函数
export const createComposer = (params:ComposerType) => {
   const {
    renderer,
    scene,
    camera
  } = params
  // 1. 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer)
  // 2. 创建渲染通道RenderPass，第一个参数是场景，第二个参数是相机
  const renderPass = new RenderPass(scene,camera)
  // 3. 给EffectComposer添加一个渲染器通道RenderPass
  composer.addPass(renderPass)
  return composer
}
// OutlinePass渲染函数 描边效果
export const outlinePassRender = (params:BasePassType) => {
  const {
    renderer,
    scene,
    camera,
    width,
    height
  } = params
  // 1. 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer)
  // 2. 创建渲染通道RenderPass，第一个参数是场景，第二个参数是相机
  const renderPass = new RenderPass(scene,camera)
  // 3. 给EffectComposer添加一个渲染器通道RenderPass
  composer.addPass(renderPass)
  // 4. OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(width, height)
  const outlinePass = new OutlinePass(v2, scene, camera)
  return { outlinePass,composer }
}
// Bloom渲染函数 发光效果
export const bloomRender = (params:BasePassType) => {
  const {
    renderer,
    scene,
    camera,
    width,
    height
  } = params
  // 1.创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer)
  // 2.创建渲染通道RenderPass，第一个参数是场景，第二个参数是相机
  const renderPass = new RenderPass(scene,camera)
  // 3.给EffectComposer添加一个渲染器通道RenderPass
  composer.addPass(renderPass)
  // 4.发光通道：UnrealBloomPass第一个参数v2的尺寸和canvas画布保持一致 第二个参数是强度 第三个参数是高斯模糊半径 第四个参数是阈值
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height),1,0.05,0.1)
  return { bloomPass,composer }
}
// Glitch渲染函数 闪屏效果
export const glitchConstor = () => {
  const glitchPass = new GlitchPass()
  return glitchPass
}