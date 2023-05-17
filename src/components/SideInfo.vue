<template>
  <div class="wl-container">
    <div class="wl-content-title">{{ title }}</div>
    <div class="wl-content-content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "SideInfo",
  props: {
    title: {
      type: String,
      default: "我是标题:)"
    },
    content: {
      type: String,
      default: "我是内容:D"
    }
  }
}
</script>

<style scoped>
  .wl-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: rgba(23, 25, 25, 0.3);
    padding: 8px 12px;
    float: left;
    color: white;
  }

  .wl-content-title {
    display: block;
    text-align: left;
    font-size: 16px;
  }

  .wl-content-content {
    display: block;
    text-align: left;
    font-size: 16px;
  }

</style>