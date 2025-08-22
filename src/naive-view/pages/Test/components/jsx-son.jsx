import { defineComponent } from "vue";

export default defineComponent({
  props: ['id'],
  emits: ['change'],
  setup(prop,ctx){
    console.log('prop', prop,ctx);
    // 生命周期
    onMounted(()=>{
        console.log("mounted-son");
        ctx.emit('change', {
          mas:'son已加载',
          id:prop.id,
          name:'son'
        });
    });
    const list = [1,2,3];
    const render = () => {
        return (
          <div>
            <p>jsx-son</p>
            {list.map((item) => <li key={item}>{item}</li>)}
            {/* 插槽 */}
            <div style="display:flex">
              默认插槽：{ctx.slots.default?.()}
            </div>
            <div style="display:flex">
              具名插槽：{ctx.slots.footer?.()}
            </div>
            <div style="display:flex">
              作用域插槽：{ctx.slots.header?.({name:'son-header',age:18})}
            </div>
          </div>
        );
    }
    return render;
  }
});