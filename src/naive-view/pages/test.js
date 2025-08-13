const arr = [10,20,30]

const sum = arr.reduce(
  (prev, cur) => {
    console.log(prev,cur) // 此处的prev是上一次迭代的返回值，也就是下一次迭代的初始值 cur是当前迭代的值
    return prev + cur // 此处的返回值是下一次迭代的prev值
  }, 
  1
)
console.log('sum', sum)