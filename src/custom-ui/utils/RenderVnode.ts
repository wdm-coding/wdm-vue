export default defineComponent({
  props: {
    vNode: {
      type: [String,Object],
      requested: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})