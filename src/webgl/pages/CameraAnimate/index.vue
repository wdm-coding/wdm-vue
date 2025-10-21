<script setup lang='ts'>
  import * as THREE from 'three'
  // 引入轨道控制器扩展库OrbitControls.js
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import type {
    Scene, OrthographicCamera, WebGLRenderer
  } from 'three'
  import { orthographic } from './camera'
  import { createMesh } from './model'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: OrthographicCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls 
  let s:number = 3
  const initThree = () => {
    if (!container.value) return

    // 创建场景
    scene = new THREE.Scene()

    // 添加几何体
    const group = createMesh()
    scene.add(group)

    //光源设置
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 平行光颜色、强度
    directionalLight.position.set(100, 60, 50) // 设置平行光位置斜45度方向
    scene.add(directionalLight) // 将平行光添加到场景中
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient) // 将环境光添加到场景中

    // 创建相机
    camera = orthographic(container.value.clientWidth,container.value.clientHeight,s)
    camera.position.set(300, 300, 300)
    const x = 113.51,y = 33.88
    camera.position.set(x, y, 300)//与观察点x、y一样，地图平行与canvas画布
    camera.lookAt(x, y, 0)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      logarithmicDepthBuffer: true, // 对数深度缓冲区，用于解决Z-fighting问题
      preserveDrawingBuffer: true // 保留绘图缓冲区，用于截图
    })
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    renderer.outputColorSpace = THREE.SRGBColorSpace // 设置渲染器输出颜色空间为sRGB
    renderer.setClearColor(0x000000, 1) // 设置渲染器背景颜色为黑色，透明度为0
    
    // 创建相机控件
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(x, y, 0) //与lookAt参数保持一致

    // 辅助线设置
    const axesHelper = new THREE.AxesHelper(450) // 辅助坐标轴
    scene.add(axesHelper) // 添加到场景中
    axesHelper.position.set(x, y, 0) // 设置辅助坐标轴的位置
    const gridHelper = new THREE.GridHelper(400, 50) // 网格辅助线 大小500，分割线50
    scene.add(gridHelper)
    gridHelper.visible = false
  }

  // 动画循环函数
  const animationId = ref<any|null>(null)
  let angle = 0
  const R = 100
  function animate() {
    // 相机圆周运动
    angle += 0.01
    camera.position.x = R * Math.sin(angle)
    camera.position.y = R * Math.cos(angle)
    camera.lookAt(0, 0, 0) // 设置相机朝向场景的原点
    controls.update()
    renderer.render(scene, camera)
    animationId.value = requestAnimationFrame(animate)
  }
  const cameraResize = () => {
    if (!container.value) return
    const k = container.value.clientWidth / container.value.clientHeight
    camera.left = -s * k
    camera.right = s * k
  }
  // 窗口大小改变时重新设置渲染器的大小和相机的宽高比，并更新投影矩阵。
  function handleResize() {
    if (!container.value) return
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 更新渲染器大小
    cameraResize()
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
    name: 'CameraAnimate'
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
