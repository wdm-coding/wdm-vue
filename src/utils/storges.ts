type StorageType = 'localStorage' | 'sessionStorage'
class Storage {
  // 默认命名空间，防止键名冲突
  private namespace: string
  // 存储类型，默认为localStorage
  private storageType: StorageType = 'localStorage'
  constructor(namespace: string = 'wdm-xz',storageType:StorageType = 'sessionStorage') {
    this.namespace = namespace
    this.storageType = storageType
  }
  // 生成带命名空间的键名
  private getNamespacedKey(key: string): string {
    return `${this.namespace}:${key}`
  }
  // 设置存储数据
  set<T>(key: string, value: T,expire?:number): void {
    try {
      const storageValue = {
        value,
        expire: expire ? Date.now() + expire : null
      }
      const serializedValue = JSON.stringify(storageValue)
      window[this.storageType].setItem(this.getNamespacedKey(key), serializedValue)
    }catch (error) {
      console.error('LocalStorage set error:', error)
    }
  }
  get<T>(key: string): T | null {
    try {
      const namespacedKey = this.getNamespacedKey(key)
      const serializedValue = window[this.storageType].getItem(namespacedKey)
      if (!serializedValue) return null
      const { value, expire } = JSON.parse(serializedValue)
      if (expire && Date.now() > expire) {
        // 过期了，删除该键值对
        this.remove(key)
        return null
      }
      return value as T
    }catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  }
  remove(key: string): void {
    try {
      window[this.storageType].removeItem(this.getNamespacedKey(key))
    }catch (error) {
      console.error('LocalStorage remove error:', error)
    }
  }
  clear(): void {
    try {
      const keys = Object.keys(window[this.storageType])
        .filter(key => key.startsWith(this.namespace))
      for (let i = 0; i < keys.length; i++) {
        window[this.storageType].removeItem(keys[i])
      }
    }catch (error) {
      console.error('LocalStorage clear error:', error)
    }
  }
}

// 默认导出实例（使用默认命名空间）
const storage = new Storage()

// 导出类以便需要时创建自定义实例
export { Storage, storage as default }