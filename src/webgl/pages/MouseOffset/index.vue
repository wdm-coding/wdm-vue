<script setup lang='ts'>
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import type {
    Scene, OrthographicCamera, WebGLRenderer,PerspectiveCamera
  } from 'three'
  import { perCamera } from '../../threejs-utils/camera'
  import { ambLight,dirLight } from '../../threejs-utils/light'
  import { glRender } from '../../threejs-utils/render'
  import { orbControl } from '../../threejs-utils/controls'
  import {
    axesHelperLine
  } from '../../threejs-utils/helper'
  import { outlinePassRender } from '../../threejs-utils/effectComposer'
  import { createModel } from './model'
  // 伽马校正后处理Shader
  import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js'
  // ShaderPass功能：使用后处理Shader创建后处理通道
  import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
  // 抗锯齿Shader
  import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'
  import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera | OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls
  let composer: any
  let group:THREE.Group
  let outlinePass:any
  const initThree = () => {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    group = createModel()
    scene.add(group)

    //光源设置
    const dirLightIns = dirLight({ color: 0xffffff, intensity: 1 }) // 平行光颜色、强度
    dirLightIns.position.set(100, 100, 100)
    scene.add(dirLightIns ) // 将平行光添加到场景中
    const ambLightIns = ambLight({ intensity: 2 }) // 环境光颜色、强度
    scene.add(ambLightIns ) // 将环境光添加到场景中
    // 创建相机
    const cameraParams = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    camera = perCamera(cameraParams)
    camera.position.set(80, 80, 80)
    camera.lookAt(0, 0, 0)
    // 创建渲染器
    renderer = glRender()
    renderer.setPixelRatio(window.devicePixelRatio) //防止输出模糊
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    renderer.outputColorSpace = THREE.SRGBColorSpace
    // 创建相机控件
    controls = orbControl(camera, renderer.domElement)
    // 监听控件change事件
    controls.addEventListener('change', function () {})
    // xyz辅助线设置
    axesHelperLine(scene,450) // 辅助坐标轴
  }
  // 动画循环函数
  const animationId = ref<any|null>(null)
  function animate() {
    controls.update()
    renderer.render(scene, camera) // 渲染场景和相机
    animationId.value = requestAnimationFrame(animate)
  }
  // 窗口大小改变时重新设置渲染器的大小和相机的宽高比，并更新投影矩阵。
  function handleResize() {
    if (!container.value) return
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 更新渲染器大小
    camera.updateProjectionMatrix() // 更新投影矩阵，以便在窗口大小改变时保持正确的投影效果。
  }
  // 页面加载完成后执行initThree函数，并添加窗口大小改变的事件监听器。
  onMounted(() => {
    initThree()
    window.addEventListener('resize', handleResize)
    animate()
  })

  // 组件卸载前，移除窗口大小改变的事件监听器，并取消动画循环。同时释放渲染器的资源。
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    animationId.value && cancelAnimationFrame(animationId.value)
    renderer && renderer.dispose()
  })
  const mouseoverHandler = (event:MouseEvent) => {
    // console.log('offsetX--',event.offsetX,'offsetY--',event.offsetY)
    // console.log('clientX--',event.clientX,'clientY--',event.clientY)
    // const ox = event.offsetX // event.clientX - container.value!.getBoundingClientRect().left
    // const oy = event.offsetY // event.clientY - container.value!.getBoundingClientRect().top
    const ox = event.clientX - container.value!.getBoundingClientRect().left
    const oy = event.clientY - container.value!.getBoundingClientRect().top
    const X = (ox / container.value!.clientWidth) * 2 - 1
    const Y = -(oy / container.value!.clientHeight) * 2 + 1
    console.log('归一化坐标X:',X)
    console.log('归一化坐标Y:',Y)
  }
  // 组件名称定义
  defineOptions({
    name: 'MouseOffset'
  })
</script>
<template>
  <div class='three-d-view'>
    <div ref="container" class="three-container" @click="mouseoverHandler" />
  </div>
</template>
<style lang="scss" scoped>
.three-d-view{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .three-container {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
