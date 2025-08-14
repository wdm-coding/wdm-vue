<script setup lang="ts">
  defineOptions({
    name: 'EHome'
  })
  const value = ref('2025-08-14')
  const isHoliday = date => {
    console.log(date)
    return date.text === 20
  }
</script>

<template>
  <div class="comName_wrap">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
    >
      <template #default="cell">
        <div class="cell" :class="{ 'current-date': cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday" />
        </div>
      </template>
    </el-date-picker>
  </div>
</template>

<style lang="scss">
.cell.current-date .text{
  color: #f5089a !important;
}
.cell .holiday {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #6ac23c;
  color: #67c23a;
  font-weight: bold;
}
</style>
