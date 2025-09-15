<script setup lang='ts'>
  import './style.scss'
  import type {
    SelectProps,SelectEmits, SelectOption,SelectStates
  } from './types'
  import type { TooltipInstance } from '../XZTooltip/types'
  import Tooltip from '../XZTooltip/index.vue'
  import Input from '../XZInput/index.vue'
  import useClickOutside from '../hooks/useClickOutside'
  const popperOptions:any = {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4]
        }
      },
      {
        name: 'sameWidth',
        enabled: true,
        fn: ({ state }:{state:any}) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        phase: 'beforeWrite',
        requires: ['computeStyles']
      }
    ]
  }
  const emit = defineEmits<SelectEmits>()
  const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: '请选择',
    disabled: false,
    clearable: true,
    filterable: false,
    options: () => []
  })
  const selectedValue = defineModel<string | number>('value',{ default: '' })
  const tooltipRef = useTemplateRef<TooltipInstance>('tooltip')
  const selectRef = useTemplateRef<HTMLDivElement>('selectRef')
  const isDropdownShow = ref(false)
  const controlDropdown = (show: boolean) => {
    if(show){
      tooltipRef.value?.show()
    }else{
      tooltipRef.value?.hide()
    }
    isDropdownShow.value = show
    emit('visible-change', show)
  }
  const toggleDropdown = () => {
    if(props.disabled) return
    controlDropdown(!isDropdownShow.value)
  }
  useClickOutside(selectRef, () => {
    if(isDropdownShow.value) controlDropdown(false)
  })
  const findOption = (value: string | number) => {
    const result = props.options.find(option => option.value === value)
    return result
  }
  const initialOption = findOption(selectedValue.value)
  const states = reactive<SelectStates>({
    inputValue: initialOption ? initialOption.label : null,
    selectOption: initialOption!
  })
  const itemSelect = (item:SelectOption) => {
    if(item.disabled) return
    selectedValue.value = item.value
    states.inputValue = item.label
    states.selectOption = item
    emit('change', item.value)
    controlDropdown(false)
  }
  defineOptions({
    name: 'XZSelect'
  })
</script>


<template>
  <div 
    class='xz-select'
    :class="{
      'is-disabled': disabled
    }"
    @click="toggleDropdown"
    ref="selectRef"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltip"
      :popperOptions="popperOptions"
    >
      <Input
        v-model:value="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="!filterable"
      />
      <template #content> 
        <div class="xz-select__menu">
          <template
            v-for="item in options"
            :key="item.value"
          >
            <div
              class="xz-select__menu-item"
              :class="{
                'is-selected': item.value === selectedValue,
                'is-disabled': item.disabled
              }"
              :id="`xz-select__menu-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </div>
      </template>
    </Tooltip>
  </div>
</template>
