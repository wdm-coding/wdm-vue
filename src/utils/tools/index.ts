// 1.判断连接是否是网络连接
export function isNetwork(url: string): boolean {
  const pattern = /^https?:\/\//i // 正则表达式，匹配以http或https开头的URL
  return pattern.test(url)
}
// 2.判断对象是否为空
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
// 3. 判断对象的每个属性是否为空
export function isEmptyObjectValue(obj: object): boolean {
  return Object.values(obj).every( value => value === null || value === undefined )
}
// 4. 监测对象的属性是否为空，为空则删除这个属性，返回一个新的对象
export function hasValueObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const newObj: Partial<T> = {}
  for (const key in obj) {
    if (!isEmptyObjectValue(obj[key])) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}


