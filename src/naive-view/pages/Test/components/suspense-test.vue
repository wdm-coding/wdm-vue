<template>
  <div class='suspense_test'>
    <h1>Suspense</h1>
  </div>
</template>

<script>
  export default {
    name: 'SuspenseTest',
    async setup() {
      const instance =  getCurrentInstance()
      console.log('instance',instance)
      await new Promise(resolve => setTimeout(() => resolve(), 3000))
      const obj = reactive({
        name: 'suspense',
        age: 20
      })
      return {
        obj
      }
    }
  }

</script>