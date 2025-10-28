<script setup lang='ts'>
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import type {
    Scene, OrthographicCamera, WebGLRenderer,PerspectiveCamera
  } from 'three'
  import { perCamera } from '../../threejs-utils/camera'
  import { ambLight } from '../../threejs-utils/light'
  import { glRender } from '../../threejs-utils/render'
  import { orbControl } from '../../threejs-utils/controls'
  import {
    axesHelperLine
  } from '../../threejs-utils/helper'
  import { glitchConstor,outlinePassRender } from '../../threejs-utils/effectComposer'
  import { createModel } from './model'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera | OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls
  let composer: any
  const initThree = () => {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    const group = createModel()
    scene.add(group)

    //光源设置
    const ambLightIns = ambLight({ intensity: 1 }) // 环境光颜色、强度
    scene.add(ambLightIns ) // 将环境光添加到场景中
    // 创建相机
    const cameraParams = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    camera = perCamera(cameraParams)
    camera.position.set(50, 50, 50)
    camera.lookAt(0, 0, 0)
    // 创建渲染器
    renderer = glRender()
    renderer.setPixelRatio(window.devicePixelRatio) //防止输出模糊
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中

    // 创建相机控件
    controls = orbControl(camera, renderer.domElement)

    // xyz辅助线设置
    axesHelperLine(scene,450) // 辅助坐标轴

    // 初始化轮廓线渲染器
    const params = {
      renderer,
      scene,
      camera,
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    const { outlinePass,composer: composerRen } = outlinePassRender(params)
    composer = composerRen
    outlinePass.selectedObjects = [group]
    composer.addPass(outlinePass)
    // 添加GlitchPass效果
    const glitchPass = glitchConstor()
    composer.addPass(glitchPass)
  }
  // 动画循环函数
  const animationId = ref<any|null>(null)
  function animate() {
    controls.update()
    composer.render() // 渲染场景和相机到渲染器中
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

  // 组件名称定义
  defineOptions({
    name: 'GlitchPass'
  })
</script>
<template>
  <div class='three-d-view'>
    <div ref="container" class="three-container" />
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
  }
}
</style>
