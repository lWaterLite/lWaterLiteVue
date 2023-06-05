<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ApplicationCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "about:blank"
    }
  },
  methods: {
    openWindow(url) {
      window.open(url, '_blank')
    }
  }
})
</script>

<template>
  <a :href="link">
    <div class="wrap" @click="openWindow(link)">
      <div class="default">
        <div class="default-icon">
          <img :src="icon" :alt="title"/>
        </div>
        <span>{{ title }}</span>
      </div>
      <div class="hover">
        <span>{{ description }}</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  background: rgba(25, 25, 25, 0.3);
  cursor: pointer;
  user-select: none;
}

.default {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.hover {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.wrap:hover .default {
  display: none;
}

.wrap:hover .hover {
  display: flex;
  animation: slide-up 0.5s ease forwards;
}

.default-icon {
  height: 48px;
  width: 48px;
  margin-right: 8px;
}

.default-icon img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.wrap span {
  color: white;
}

.default span {
  font-size: 24px;
}

.hover span {
  margin: 24px 16px;
  font-size: 16px;
}
</style>