import type {DropdownProps,menuOption} from './types'
  import type { TooltipInstance } from '../XZTooltip/types'
import XZTooltip from '../XZTooltip/index.vue'
import { Fragment } from 'vue/jsx-runtime'
export default defineComponent({
  name: 'XZDropdownTsx',
  components: {},
  props:{
    showArrow: Boolean,
    menuOptions: Array as PropType<DropdownProps['menuOptions']>,
    placement: {
      type:String as PropType<DropdownProps['placement']>,
      default: 'bottom',
    },
    hideAfterClick: Boolean,
    trigger: {
      type:String as PropType<DropdownProps['trigger']>,
      default:'hover'
    }
  },
  emits: ['select','visible-change'],
  setup(props,{slots,emit,expose}) {
    const instance = useTemplateRef<TooltipInstance>('tooltipRef')
    const tooltipProps = computed(() => {
      const result: DropdownProps = { ...props }
      delete result.menuOptions
      delete result.content
      result.placement = 'bottom'
      return result
    })
    const itemClick = (item: menuOption) => {
      if (item.disabled) return
      emit('select', item.key)
      props.hideAfterClick && instance.value?.hide()
    }
    const visibleChange = (visible: boolean) => {
      emit('visible-change', visible)
    }
    expose({ 
      show: () => instance.value?.show(),
      hide: () => instance.value?.hide()
     })
    const optionsEle = computed(()=>{
      return props.menuOptions?.map(item=>{
        return (
          <Fragment key={item.key}>
            {item.divided ? <div class="xz-dropdown__divided"></div> : null}
            <div 
              class={{ 'xz-dropdown__menu-item': true, 'is-disabled': item.disabled, 'is-divided': item.divided }}
              id={`xz-dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </div>
          </Fragment>
        )
      })
    })
    return ()=>(
      <div class='xz-dropdown'>
        <XZTooltip 
          {...tooltipProps.value}
          ref='tooltipRef'
          onChange={(visible)=>visibleChange(visible)}
        >
          {{
            default: () => slots.default?.(),
            content: () => (
              <div class="xz-dropdown__menu">
                {optionsEle.value}
              </div>
            )
          }}
        </XZTooltip>
      </div>
    )
  }
})

// -- 00:30:21 -- //