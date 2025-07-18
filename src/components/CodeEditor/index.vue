<script setup lang="ts">
  import * as monaco from 'monaco-editor'
  defineOptions({
    name: 'CodeEditor'
  })
  interface CodeEditorProps {
    width?: string;
    height?: string;
    language?: string;
    readOnly?: boolean;
  }
  const props = withDefaults(defineProps<CodeEditorProps>(), {
    width: '100%',
    height: '100%',
    language: 'javascript',
    readOnly: false
  })
  const codeEditorRef = ref<HTMLElement | null>(null)
  const codeEditorInstance = shallowRef<any>(null)
  const modelValue = defineModel<string>()
  // 初始化代码编辑器
  const initCodeEditor = () => {
    if (!codeEditorRef.value) return
    // 清理已有实例
    if (codeEditorInstance.value) {
      codeEditorInstance.value.dispose()
    }
    codeEditorInstance.value = monaco.editor.create(codeEditorRef.value, {
      value: modelValue.value, // 初始代码内容
      language: props.language, // 语言
      theme: 'vs-dark', // 主题
      folding: true, // 是否折叠
      foldingHighlight: true, // 折叠等高线
      foldingStrategy: 'indentation', // 折叠方式  auto | indentation
      showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
      disableLayerHinting: true, // 等宽优化
      emptySelectionClipboard: false, // 空选择剪切板
      selectionClipboard: false, // 选择剪切板
      automaticLayout: true, // 自动布局
      codeLens: false, // 代码镜头
      scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
      lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
      lineNumbersMinChars: 5, // 行号最小字符   number
      readOnly: props.readOnly //是否只读  取值 true | false
    })
    codeEditorInstance.value.onDidChangeModelContent(() => {
      modelValue.value = codeEditorInstance.value.getValue()
    })
  }
  onMounted(() => {
    initCodeEditor()
  })
  onBeforeUnmount(() => {
    if (codeEditorInstance.value) {
      codeEditorInstance.value.dispose()
      codeEditorInstance.value = null
    }
  })
</script>


<template>
  <div
    class='code_editor_wrap'
    ref="codeEditorRef" 
    :style="{ width:props.width,height: props.height }"
  />
</template>


<style lang='scss' scoped>

</style>
