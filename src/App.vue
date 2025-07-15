<script setup lang="ts">
  defineOptions({
    name: 'App'
  })
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss">
  .app_wrap{
    width: 100vw;
		height: 100vh;
		background-color: $homebg;
    overflow-x: hidden;
  }
  .app_header{
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02);
    display: flex;
    .doc_url_wrap{
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: auto;
      .doc_item{
        padding: 0 30px;
        cursor: pointer;
        &:hover{
          color: $primary;
        }
      }
    }
  }
	.app_main {
		width: 100%;
    height: calc(100vh - 60px);
    .framework_wrap{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .framework_list{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding-top: 50px;
        .framework_item{
          width: 300px;
          height: 200px;
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px rgba(0, 0, 0, 0.02);
          border-radius: 12px;
          padding: 12px;
          padding: 10px;
          cursor: pointer;
          .picture{
            width: 100%;
            height: 150px;
            background-color: #fff000;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
        }
      }
    }
	}
</style>
