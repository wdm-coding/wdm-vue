import { defineComponent } from "vue";
import jsxSon from "./jsx-son.jsx";
export default defineComponent({
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    const flag = ref(false)
    const changeFlag = () => {
      flag.value = !flag.value
    }
    // 生命周期
    onMounted(()=>{
        console.log("mounted-father");
    });
    const sonChange = val => {
      console.log('sonChange----',val);
    }
    return () => (
      <div class="counter">
        <h2>JSX Counter</h2>
        <p>Count: {count.value}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={changeFlag}>changeFlag</button>
        {
          flag.value && 
          <jsxSon onChange={sonChange} id={666}>
            {{
              default: ()=><div>我是默认slot</div>,
              footer: () => <div>我是具名slot</div>,
              header: ({name,age}) => <div>我是作用域slot-{name}-{age}</div>
            }}
          </jsxSon>
        }
      </div>
    )
  }
});