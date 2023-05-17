<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AdaptiveTextBox",
  props: {
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
})
</script>

<template>
  <div class="textbox-wrap" ref="TextBoxWrap" :style="{fontSize: fontSize + 'px'}">
    <span> {{text}} </span>
  </div>
</template>

<style scoped>
.textbox-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.textbox-wrap span {
  text-align: center;
  white-space: pre;
}
</style>