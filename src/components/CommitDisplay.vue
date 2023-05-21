<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CommitDisplay",
  props: {
    user: {
      type: String,
      default: ""
    },
    comment: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    }
  }
})
</script>

<template>
  <div class="wrap">
    <div class="user">{{ user }}</div>
    <div class="commit">{{comment}}</div>
    <div class="footnote">{{ date }}</div>
  </div>
</template>

<style scoped>
.wrap {
  background-color: rgba(25, 25, 25, 0.3);
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
}

.user {
  font-size: 14px;
}

.commit {
  white-space: pre-wrap;
  font-size: 16px;
  margin: 0.5rem 0;
}

.footnote {
  font-size: 13px;
  color: #c5c5c5;
}
</style>