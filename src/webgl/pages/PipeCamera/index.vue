<script setup lang='ts'>
  import * as THREE from 'three'
  // 引入轨道控制器扩展库OrbitControls.js
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import type {
    Scene, OrthographicCamera, WebGLRenderer,PerspectiveCamera
  } from 'three'
  import { perCamera } from '../../threejs-utils/camera'
  import { dirLight,ambLight } from '../../threejs-utils/light'
  import { glRender } from '../../threejs-utils/render'
  import { createMesh,getPoints } from './model'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera | OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls 
  // 将管道路径点作为相机控制目标
  const pointsArr = getPoints()
  const initThree = () => {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    const group = createMesh()
    scene.add(group)

    //光源设置
    const directionalLight = dirLight({}) // 平行光颜色、强度
    scene.add(directionalLight) // 将平行光添加到场景中
    const ambientLight = ambLight({}) // 环境光颜色、强度
    scene.add(ambientLight) // 将环境光添加到场景中

    // 创建相机
    const cameraParams = {
      width: container.value.clientWidth,
      height: container.value.clientHeight
    }
    camera = perCamera(cameraParams)
    camera.position.set(292, 223, 185)
    camera.lookAt(0, 0, 0)
    const i = 100
    // 相机位置设置在当前点位置
    camera.position.copy(pointsArr[i])
    // 曲线上当前点pointsArr[i]和下一个点pointsArr[i+1]近似模拟当前点曲线切线
    // 设置相机观察点为当前点的下一个点，相机视线和当前点曲线切线重合
    camera.lookAt(pointsArr[i + 1])
    // 创建渲染器
    renderer = glRender()
    renderer.setPixelRatio(window.devicePixelRatio) //防止输出模糊
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    // 创建相机控件
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.copy(pointsArr[i + 1])
    controls.enableDamping = true // 启用阻尼效果
    controls.enablePan = false // 禁用平移
    controls.enableRotate = false // 禁用旋转
    // 辅助线设置
    const axesHelper = new THREE.AxesHelper(450) // 辅助坐标轴
    scene.add(axesHelper) // 添加到场景中
    const gridHelper = new THREE.GridHelper(400, 50) // 网格辅助线 大小500，分割线50
    scene.add(gridHelper)
    gridHelper.visible = false
  }
  // 管道漫游动画
  let t = 0
  function pipeRoam() {
    if (t < pointsArr.length - 1) {
      camera.position.copy(pointsArr[t])
      camera.lookAt(pointsArr[t + 1])
      controls.target.copy(pointsArr[t + 1])
      t++
    }else{
      t = 0
    }
  }
  // 动画循环函数
  const animationId = ref<any|null>(null)
  function animate() {
    pipeRoam()
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
    name: 'PipeCamera'
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
