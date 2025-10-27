import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { MapControls } from 'three/examples/jsm/Addons.js'

export const orbControl = (camera:any,dom:any) => {
  const controls = new OrbitControls(camera, dom)
  return controls
}
export const mapControl = (camera:any,dom:any) => {
  const controls = new MapControls(camera, dom)
  return controls
}