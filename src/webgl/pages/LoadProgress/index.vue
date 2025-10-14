<script setup lang='ts'>
  import * as THREE from 'three'
  // 引入轨道控制器扩展库OrbitControls.js
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import type {
    Scene, PerspectiveCamera, WebGLRenderer
  } from 'three'
  import { createMesh } from './model'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera
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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // 平行光颜色、强度
    directionalLight.position.set(400, 200, 300) // 设置平行光位置斜45度方向
    scene.add(directionalLight) // 将平行光添加到场景中
    const ambient = new THREE.AmbientLight(0xffffff, 10)
    scene.add(ambient) // 将环境光添加到场景中

    // 创建相机 透视相机（PerspectiveCamera）
    camera = new THREE.PerspectiveCamera(
      90, // 视野角度
      container.value.clientWidth / container.value.clientHeight, // 宽高比
      1, // 近剪裁面 相机距离近端截面的距离
      3000// 远剪裁面 相机距离远端截面的距离
    )
    camera.position.set(240.0, 240.0,240.0)
    camera.lookAt(0, 0, 0)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      logarithmicDepthBuffer: true, // 对数深度缓冲区，用于解决Z-fighting问题
      preserveDrawingBuffer: true // 保留绘图缓冲区，用于截图
      // alpha: true // 背景透明
    })
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    renderer.outputColorSpace = THREE.SRGBColorSpace // 设置渲染器输出颜色空间为sRGB
    renderer.setClearColor(0x000000, 1) // 设置渲染器背景颜色为黑色，透明度为0
    // 设置渲染器背景透明度为0，即完全透明
    // renderer.setClearAlpha(0)
    // 辅助线设置
    const axesHelper = new THREE.AxesHelper(250) // 辅助坐标轴
    scene.add(axesHelper) // 添加到场景中
    const gridHelper = new THREE.GridHelper(400, 50) // 网格辅助线 大小500，分割线50
    scene.add(gridHelper)
    gridHelper.visible = false

    // 创建相机控件
    controls = new OrbitControls(camera, renderer.domElement)
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
    camera.aspect = container.value.clientWidth / container.value.clientHeight // 设置相机的宽高比
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
  // 生成图片
  const createImage = () => {
    const link = document.createElement('a')
    const canves = renderer.domElement
    link.href = canves.toDataURL('image/png')
    link.download = 'three-d-view'
    link.click()
  }
  // 组件名称定义
  defineOptions({
    name: 'LoadProgress'
  })
</script>
<template>
  <div class='three-d-view'>
    <div class="progressBarContainer">
      <div id="progressBar" />
    </div>
    <div ref="container" class="three-container" />
  </div>
</template>
<style lang="scss" scoped>
.three-d-view{
  width: 100%;
  height: 100%;
  position: relative;
  .progressBarContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    color: #fff;
    border: 1px solid #4c06e4;
    width: 400px;
    border-radius: 12px;
    #progressBar{
      width: 0%;
      height: 15px;
      background-color: #057eef;
    }
  }
  .three-container {
    width: 100%;
    height: 100%;
  }
}
</style>
