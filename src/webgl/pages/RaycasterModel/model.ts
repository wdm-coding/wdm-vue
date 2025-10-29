import { isUtf8 } from 'buffer'
import * as THREE from 'three'
export const createModel = () => {
  const model = new THREE.Group()
  const geometry1 = new THREE.BoxGeometry(50, 50, 50)
  const material1 = new THREE.MeshLambertMaterial({ color: 0x00ffff, side: THREE.DoubleSide })
  const mesh1 = new THREE.Mesh(geometry1, material1)
  model.add(mesh1)
  const geometry2 = new THREE.BoxGeometry(50, 50, 50)
  const material2 = new THREE.MeshLambertMaterial({ color: 0xff00ff, side: THREE.DoubleSide })
  const mesh2 = new THREE.Mesh(geometry2, material2)
  mesh2.position.set(200, 0, 0)
  model.add(mesh2)
  const params = {
    origin: new THREE.Vector3(-100,0,0),
    direction: new THREE.Vector3(1, 0, 0).normalize()
  }
  const raycaster = new THREE.Raycaster()
  raycaster.ray.origin = params.origin
  raycaster.ray.direction = params.direction
  const result = raycaster.intersectObjects([mesh1,mesh2])
  console.log(result)
  return model
}