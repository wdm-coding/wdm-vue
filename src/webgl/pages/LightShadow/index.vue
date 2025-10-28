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
  import { axesHelperLine,cameraHelperLine } from '../../threejs-utils/helper'
  import { createMesh } from './model'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera | OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls 
  const initThree = () => {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    const group = createMesh()
    scene.add(group)

    //光源设置
    const ambientLight = ambLight({}) // 环境光颜色、强度
    scene.add(ambientLight) // 将环境光添加到场景中
    const directionalLight = dirLight({ intensity: 2 }) // 平行光颜色、强度
    directionalLight.castShadow = true // 平行光投射阴影设置
    directionalLight.position.set(200, 20, 50) // 设置平行光位置斜45度方向
    // 平行光阴影相机就是一个正交相机
    directionalLight.shadow.camera.left = -50 // 设置阴影相机的左边界
    directionalLight.shadow.camera.right = 50 // 设置阴影相机的右边界
    directionalLight.shadow.camera.top = 150 // 设置阴影相机的上边界
    directionalLight.shadow.camera.bottom = -50 // 设置阴影相机的下边界
    directionalLight.shadow.camera.near = 1 // 设置阴影相机的近裁剪面
    directionalLight.shadow.camera.far = 600 // 设置阴影相机的远裁
    scene.add(directionalLight) // 将平行光添加到场景中

    // 可视化平行光阴影摄像机辅助对象
    const cameraHelper = cameraHelperLine(scene,directionalLight.shadow.camera)
    // 创建相机
    const cameraParams = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    camera = perCamera(cameraParams)
    camera.position.set(292, 223, 185)
    camera.lookAt(0, 0, 0)

    // 创建渲染器
    renderer = glRender()
    renderer.setPixelRatio(window.devicePixelRatio) //防止输出模糊
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    renderer.shadowMap.enabled = true // 渲染器开启阴影贴图
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
    name: 'LightShadow'
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
