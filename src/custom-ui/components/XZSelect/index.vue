<script setup lang='ts'>
  import './style.scss'
  import type {
    SelectProps,SelectEmits, SelectOption,SelectStates
  } from './types'
  import type { TooltipInstance } from '../XZTooltip/types'
  import Tooltip from '../XZTooltip/index.vue'
  import Input from '../XZInput/index.vue'
  import type { InputInstance } from '../XZInput/types'
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  import RenderVnode from '@/custom-ui/utils/RenderVnode.ts'
  const popperOptions:any = {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 1]
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
    clearable: false,
    filterable: false,
    options: () => [],
    remote: false
  })
  const timeout = computed(() => props.remote ? 300 : 0)
  const findOption = (value: string | number) => props.options.find(option => option.value === value)
  const selectedValue = defineModel<string | number>('value',{ default: '' })
  const initialOption = findOption(selectedValue.value)
  const states = reactive<SelectStates>({
    inputValue: initialOption ? initialOption.label : null,
    selectOption: initialOption!,
    mouseHover: false,
    empty: false,
    loading: false,
    highlightIndex: -1
  })
  if(props.options.length === 0 ) {
    states.empty = true
  }
  const filterOptions = ref<SelectOption[]>([...props.options])
  const generateFilterOptions = async (query: string) => {
    if(!props.filterable) return
    if(props.filterMethod && typeof props.filterMethod === 'function'){
      filterOptions.value = props.filterMethod(query, props.options)
    }else if(props.remote && props.remoteMethod && typeof props.remoteMethod === 'function'){
      states.empty = false
      states.loading = true
      try {
        filterOptions.value = await props.remoteMethod(query)
      } catch (error) {
        filterOptions.value = []
      } finally{
        states.loading = false
      }
    }else{
      filterOptions.value = props.options.filter(option => option.label.includes(query))
    }
    states.empty = filterOptions.value.length === 0
    states.highlightIndex = -1
  }
  let timer:any = null
  const debounceFilter = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      onFilter()
    }, timeout.value)
  }
  const onFilter = () => {
    generateFilterOptions(states.inputValue as string)
  }
  const tooltipRef = useTemplateRef<TooltipInstance>('tooltip')
  const inputRef = useTemplateRef<InputInstance>('inputRef')
  const selectRef = useTemplateRef<HTMLDivElement>('selectRef')
  const isDropdownShow = ref(false)
  const controlDropdown = (show: boolean) => {
    if(show){
      if(props.filterable && states.selectOption){
        states.inputValue = ''
        onFilter()
      }
      tooltipRef.value?.show()
    }else{
      tooltipRef.value?.hide()
      if(props.filterable && states.selectOption){
        states.inputValue = states.selectOption.label
      }
      states.highlightIndex = -1
    }
    isDropdownShow.value = show
    emit('visible-change', show)
  }
  const filterPlaceholder = computed(() => {
    if(props.filterable && states.selectOption && isDropdownShow.value){
      return states.selectOption.label
    }else{
      return props.placeholder
    }
  })
  const toggleDropdown = () => {
    if(props.disabled) return
    controlDropdown(!isDropdownShow.value)
  }
  const isManual = ref(false)
  watch(() => selectedValue.value, val => {
    if(isManual.value) return
    const option = findOption(val)
    if(option) {
      states.inputValue = option.label
      states.selectOption = option
    }else{
      states.inputValue = null
      states.selectOption = null
    }
  })
  const itemSelect = async (item:SelectOption) => {
    if(item.disabled) return
    isManual.value = true
    selectedValue.value = item.value
    states.inputValue = item.label
    states.selectOption = item
    emit('change', item.value)
    controlDropdown(false)
    await nextTick()
    isManual.value = false
  }
  const clickOutside = () => {
    controlDropdown(false)
  }
  const showClearable = computed(() => {
    return props.clearable && states.mouseHover && states.inputValue !== null
  })
  const onClear = async () => {
    controlDropdown(false)
    states.inputValue = null
    states.selectOption = null
    selectedValue.value = ''
    emit('clear')
    emit('change', '')
  }
  const inputKeydown = (e: KeyboardEvent) => {
    switch(e.key) {
      case 'Escape':
        controlDropdown(false)
        break
      case 'Enter':
        if(!isDropdownShow.value){
          controlDropdown(true)  
        }else{
          if(states.highlightIndex > -1 && filterOptions.value[states.highlightIndex]) {
            itemSelect(filterOptions.value[states.highlightIndex])
          }else{
            controlDropdown(false)
          }
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if(states.highlightIndex === -1 || states.highlightIndex === filterOptions.value.length - 1){
          states.highlightIndex = 0
        }else{
          states.highlightIndex++
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if(states.highlightIndex === -1 || states.highlightIndex === 0){
          states.highlightIndex = filterOptions.value.length - 1
        }else{
          states.highlightIndex--
        }
        break
      default:
        break
    }
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
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltip"
      :popperOptions="popperOptions"
      :showArrow="false"
      @click-outside="clickOutside"
    >
      <Input
        v-model:value="states.inputValue"
        :disabled="disabled"
        :placeholder="filterPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        ref="inputRef"
        @input="debounceFilter"
        @keydown="inputKeydown"
      >
        <template #suffix>
          <XZIcon
            v-if="showClearable"
            icon="circle-xmark"
            @mousedown.prevent
            @click.stop="onClear"
          />
          <XZIcon
            v-else
            class="xz-select__icon"
            :class="{
              'is-reverse': isDropdownShow
            }"
            icon="caret-down"
          />
        </template>
      </Input>
      <template #content> 
        <div class="xz-select_menu-loading" v-if="states.loading">
          <XZIcon icon="spinner" spin />
        </div>
        <div class="xz-select_menu-empty" v-if="states.empty">
          数据为空
        </div>
        <div class="xz-select__menu" v-if="!states.loading && !states.empty">
          <template
            v-for="(item,index) in filterOptions"
            :key="item.value"
          >
            <div
              class="xz-select__menu-item"
              :class="{
                'is-selected': item.value === selectedValue,
                'is-disabled': item.disabled,
                'is-highlight':states.highlightIndex === index
              }"
              :id="`xz-select__menu-item-${item.value}`"
              @mousedown.prevent
              @click.stop="itemSelect(item)"
            >
              <span>
                <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
              </span>
            </div>
          </template>
        </div>
      </template>
    </Tooltip>
  </div>
</template>
