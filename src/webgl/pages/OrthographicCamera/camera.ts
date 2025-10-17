import * as THREE from 'three'
const cameraIns = (containerWidth:number,containerHeight:number) => {
  const k = containerWidth / containerHeight // 宽高比
  const s = 500 // 缩放比 控制left,right,top,bottom的范围
  const camera = new THREE.OrthographicCamera(
    -s * k, // left // 左边的位置，与画布宽高比一致
    s * k, // right // 右边的位置，与画布宽高比一致
    s, // top
    -s, // bottom
    1, // near
    8000 // far
  )
  return camera
}

export default cameraIns