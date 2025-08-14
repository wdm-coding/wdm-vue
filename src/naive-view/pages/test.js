const v2 = {}
let name = 'xxx'
Object.defineProperty(v2,'name',{
  get: function(){
    return name
  },
  set: function(val){
    name = val
  }
})

console.log(v2.name)
v2.name = 'yyy'
console.log(v2.name)
