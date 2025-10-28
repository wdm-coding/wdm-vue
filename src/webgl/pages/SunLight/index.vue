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
    axesHelperLine,dirLightHelperLine,cameraHelperLine 
  } from '../../threejs-utils/helper'
  import { createMesh } from './model'
  import gui from '../../threejs-utils/gui'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera | OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls 
  if(gui){
    gui.destroy()
  }
  const initThree = () => {
    if (!container.value) return

    // gui面板添加到容器中
    container.value.appendChild(gui.domElement)

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    const group = createMesh()
    scene.add(group)

    //光源设置
    const disLightIns = dirLight({ intensity: 5 }) // 环境光颜色、强度
    scene.add(disLightIns) // 将环境光添加到场景中
    disLightIns.position.set(100,100,0) // 设置平行光的位置
    disLightIns.castShadow = true // 平行光开启阴影投射
    const dirLightHelper = dirLightHelperLine(scene,disLightIns) // 平行光辅助线
    gui.addColor(disLightIns, 'color').name('平行光颜色')
    gui.add(disLightIns, 'intensity', 0, 10).name('平行光强度')
    gui.add(disLightIns.position, 'y', -200, 200).name('平行光Y轴位置').onChange(() => {
      dirLightHelper.update()
    })
    const obj = {
      R: 100,
      angle: 0
    }
    gui.add(obj,'angle',0,Math.PI * 2).name('平行光角度').onChange(() => {
      disLightIns.position.x = obj.R * Math.cos(obj.angle)
      disLightIns.position.z = obj.R * Math.sin(obj.angle)
      dirLightHelper.update()
    })
    // 设置阴影
    disLightIns.shadow.camera.left = -100
    disLightIns.shadow.camera.right = 100
    disLightIns.shadow.camera.top = 100
    disLightIns.shadow.camera.bottom = -100
    disLightIns.shadow.camera.near = 1
    disLightIns.shadow.camera.far = 300
    disLightIns.shadow.mapSize.set(1024,1024) // 设置阴影
    disLightIns.shadow.radius = 4 // 设置阴影模糊度
    const cameraHelper = cameraHelperLine(scene,disLightIns.shadow.camera) // 平行光相机辅助线
    const cameraObj = {
      left: -100,
      right: 100,
      top: 100,
      bottom: -100,
      far: 300
    }
    const cameraGUI = gui.addFolder('阴影相机参数')
    cameraGUI.add(cameraObj,'left',-200,200).name('左边界').onChange(() => {
      disLightIns.shadow.camera.left = cameraObj.left
      disLightIns.shadow.camera.updateProjectionMatrix()
      cameraHelper.update()
    })
    cameraGUI.add(cameraObj,'right',-200,200).name('右边界').onChange(() => {
      disLightIns.shadow.camera.right = cameraObj.right
      disLightIns.shadow.camera.updateProjectionMatrix()
      cameraHelper.update()
    })
    cameraGUI.add(cameraObj,'top',-200,200).name('上边界').onChange(() => {
      disLightIns.shadow.camera.top = cameraObj.top
      disLightIns.shadow.camera.updateProjectionMatrix()
      cameraHelper.update()
    })
    cameraGUI.add(cameraObj,'bottom',-200,200).name('下边界').onChange(() => {
      disLightIns.shadow.camera.bottom = cameraObj.bottom
      disLightIns.shadow.camera.updateProjectionMatrix()
      cameraHelper.update()
    })
    cameraGUI.add(cameraObj,'far',100,500).name('远边界').onChange(() => {
      disLightIns.shadow.camera.far = cameraObj.far
      disLightIns.shadow.camera.updateProjectionMatrix()
      cameraHelper.update()
    })
    // 创建相机
    const cameraParams = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    camera = perCamera(cameraParams)
    camera.position.set(202, 123, 125)
    camera.lookAt(0, 0, 0)

    // 创建渲染器
    renderer = glRender()
    renderer.setPixelRatio(window.devicePixelRatio) //防止输出模糊
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    renderer.shadowMap.enabled = true // 渲染器开启阴影贴图
    renderer.outputColorSpace = THREE.SRGBColorSpace // 设置渲染器颜色空间为sRGB
    renderer.shadowMap.enabled = true // 开启阴影贴图
    renderer.shadowMap.type = THREE.VSMShadowMap // 使用VSM阴影贴图
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中

    // 创建相机控件
    controls = orbControl(camera, renderer.domElement)

    // xyz辅助线设置
    axesHelperLine(scene,450) // 辅助坐标轴
  }
  // 动画循环函数
  const animationId = ref<any|null>(null)
  function animate() {
    controls.update()
    renderer.render(scene, camera)
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
    name: 'SunLight'
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
