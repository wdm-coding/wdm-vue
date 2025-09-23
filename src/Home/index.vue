<script setup lang="ts">
  import { docUrl, framework } from '@/assets/db/home.json'
  import storage from '@/utils/storges'
  const router = useRouter()
  defineOptions({
    name: 'Home'
  })
  const jumpDoc = (item: any) => {
    window.open(item.url)
  }
  const jumpFramework = async (item: any) => {
    console.log('jumpFramework', item.path)
    switch (item.path) {
      case '/custom-ui':
        storage.set('active-modules', 'custom-ui')
        storage.set('isDynamicRoutesLoaded', false)
        storage.set('menuData', [])
        router.push(item.path)
        break
      case '/webgl':
        storage.set('active-modules', 'webgl')
        storage.set('isDynamicRoutesLoaded', false)
        storage.set('menuData', [])
        router.push(item.path)
        break
      default:
        router.push(item.path)
        break
    }
  }
  const title = import.meta.env.VITE_HOME_TITLE
</script>

<template>
  <div class="home_wrap">
    <header class="home_header">
      <div class="doc_url_wrap">
        <span
          v-for="(item, index) in docUrl"
          :key="index"
          class="doc_item"
          @click="jumpDoc(item)"
        >
          {{item.name}}
        </span>
      </div>
    </header>
    <main class="home_main">
      <section class="framework_wrap">
        <h1>{{title}}</h1>
        <div class="framework_list">
          <div
            class="framework_item"
            v-for="(item, index) in framework"
            :key="index"
            @click="jumpFramework(item)"
          >
            <div class="picture" :style="{ background: item.bgColor }">
              <img :src="item.icon[0]" style="width: 40px; height: 40px">
              <span style="font-size: 28px">+</span>
              <img :src="item.icon[1]" style="width: auto; height: 40px">
            </div>
            <div style="font-weight: bold; color: #000; padding-top: 10px">{{ item.title }}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
	.home_wrap {
		width: 100vw;
		height: 100vh;
		background-color: $homebg;
		overflow-x: hidden;
		.home_header {
			width: 100%;
			height: 60px;
			background-color: #fff;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
			display: flex;
			.doc_url_wrap {
				height: 100%;
				display: flex;
				align-items: center;
				margin-left: auto;
				.doc_item {
					padding: 0 30px;
					cursor: pointer;
					&:hover {
						color: $primary;
					}
				}
			}
		}
		.home_main {
			width: 100%;
			height: calc(100vh - 60px);
			.framework_wrap {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.framework_list {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 20px;
					padding-top: 50px;
					.framework_item {
						width: 300px;
						height: 200px;
						background-color: #fff;
						box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
						border-radius: 12px;
						padding: 12px;
						padding: 10px;
						cursor: pointer;
						.picture {
							width: 100%;
							height: 150px;
							background-color: #fff000;
							display: flex;
							align-items: center;
							justify-content: space-around;
						}
						&:nth-child(1){
							&:hover{
								filter: drop-shadow(0 0 2em rgba(66, 184, 131, 0.667));
							}
						}
						&:nth-child(2){
							&:hover{
								filter: drop-shadow(0 0 2em rgba(178,239,255,0.8));
							}
						}
						&:nth-child(3){
							&:hover{
								filter: drop-shadow(0 0 2em rgba(218,226,255,0.8));
							}
						}
						&:nth-child(4){
							&:hover{
								filter: drop-shadow(0 0 2em rgba(255,217,220,0.8));
							}
						}
					}
				}
			}
		}
	}
</style>
