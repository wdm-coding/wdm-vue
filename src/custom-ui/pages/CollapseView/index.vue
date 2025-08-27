<script setup lang="ts">
  import XZCollapse from '@/custom-ui/components/XZCollapse/index.vue'
  import XZCollapseItem from '@/custom-ui/components/XZCollapse/xz-collapse-item.vue'
  defineOptions({
    name: 'CollapseView'
  })
  const arr = ref<string[]>([])
</script>


<template>
  <div class='collapse_view_wrap'>
    <XZCollapse
      v-model:value="arr"
      accordion
      @change="(val) => { console.log('change',val) }"
    >
      <XZCollapseItem name="a" title="这是一个折叠标题1">
        <p>这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</p>
      </XZCollapseItem>
      <XZCollapseItem name="b" title="这是一个折叠标题2">
        <p>这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</p>
      </XZCollapseItem>
      <XZCollapseItem name="c">
        <template #title>
          <h2>自定义title</h2>
        </template>
        <p>这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。</p>
      </XZCollapseItem>
      <XZCollapseItem name="c" title="这是一个禁用的折叠面板" disabled />
    </XZCollapse>
  </div>
</template>


<style lang='scss' scoped>
.collapse_view_wrap{
  width: 500px;
  padding: 20px;
}
</style>
