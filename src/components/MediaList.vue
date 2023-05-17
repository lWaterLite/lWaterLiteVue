<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MediaList",
  props: {
    mediaList: {
      type: Array,
      default: [
        {
          icoUrl: undefined,
          naviUrl: undefined
        }
      ]
    }
  },
  methods: {
    naviToMedia(naviUrl) {
      window.open(naviUrl, '_blank')
    }
  }
})
</script>

<template>
  <div class="media-list-wrap">
    <ul>
      <li v-for="media in mediaList">
        <div @click="naviToMedia(media.naviUrl)">
          <img :src="media.icoUrl" :alt="media.icoUrl"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.media-list-wrap ul {
  margin: 0;
  padding: 0;
}

li {
  display: inline;
  float: left;
  list-style: none;
}

li div {
  margin-right: 32px;
  height: 30px;
  width: 30px;
  cursor: pointer;
}

li div img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>