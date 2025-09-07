import type {
    TooltipProps
  } from '../XZTooltip/types'
import type {DropdownProps,menuOption} from './types'
import XZTooltip from '../XZTooltip/index.vue'
 import RenderVnode from '@/custom-ui/utils/RenderVnode'
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
  },
  setup(props,{slots}) {
    const tooltipProps = computed(() => {
      const result: DropdownProps = { ...props }
      delete result.menuOptions
      delete result.content
      result.placement = 'bottom'
      return result
    })
    console.log('props',props);
    const itemClick = (item: menuOption) => {
      if (item.disabled) return
      console.log('itemClick', item)
      // emits('select', item.key)
      // props.hideAfterClick && instance.value?.hide()
    }
    const optionsEle = computed(()=>{
      return props.menuOptions?.map(item=>{
        return (
          <Fragment key={item.key}>
            {item.divided ? <div class="xz-dropdown__menu-item is-divided"></div> : null}
            <div 
              class="xz-dropdown__menu-item"
              id={`xz-dropdown-item-${item.key}`}
            >
              {item.label}
            </div>
          </Fragment>
        )
      })
    })
    return ()=>(
      <div class='xz-dropdown'>
        <XZTooltip {...tooltipProps.value}>
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