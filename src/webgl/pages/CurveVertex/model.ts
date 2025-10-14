
/* 曲线Curve */
import * as THREE from 'three'
export const createMesh = () => {
  const model = new THREE.Group()
  // const curve  = new THREE.EllipseCurve( // 椭圆曲线
  //   0, // 圆点x坐标
  //   0, // 圆点y坐标
  //   120, // x轴半径
  //   60, // y轴半径
  //   0, // 起始角度
  //   2 * Math.PI, // 结束角度
  //   true, // 椭圆是否按照顺时针方向来绘制，默认值为false。
  //   0 // 以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0
  // )
  const curve = new THREE.ArcCurve(
    0, // 圆心x坐标
    0, // 圆心y坐标
    60, // 半径
    0, // 起始角度
    Math.PI * 2, // 结束角度
    false // 是否按照顺时针方向来绘制，默认值为false
  ) // 圆弧曲线
  // const points = curve.getPoints(100) // 生成顶点数组 间距根据曲线长度自动分配
  const points = curve.getSpacedPoints(100) // 生成顶点数组，间距相等
  const geometry = new THREE.BufferGeometry().setFromPoints(points) // 顶点几何体
  const material = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
  model.add(mesh) // 将线模型添加到组中
  return model
}
