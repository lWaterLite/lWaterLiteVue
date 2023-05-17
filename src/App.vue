<template>
  <div class="fixed-element background" :style="{backgroundImage: 'url('+backgroundObject.backgroundUrl+')'}"/>
  <side-info class="fixed-element side-info" v-bind="backgroundObject.sideInfoText"/>
  <div class="page">
    <div class="header"></div>

    <div class="content">
      <div class="main">
        <div class="column-1">
          <div class="page-title">
            <img alt="lWaterLite" src="./assets/web-title.gif"/>
          </div>
          <div class="page-subtitle">
            <div id="page-subtitle-content" class="card">
              <div class="quoter-subtitle quoter-left">
                <img alt="left_quoter" src="./assets/left-quoter.png"/>
              </div>
              <div id="page-subtitle-content-text">
                <adaptive-text-box :text="introduction" :font-size="24"/>
              </div>
              <div class="quoter-subtitle quoter-right">
                <img alt="right_quoter" src="./assets/right-quoter.png"/>
              </div>
            </div>
          </div>
          <div class="page-media">
            <media-list :media-list="mediaList"/>
          </div>
        </div>
        <div class="column-2">
          <div class="page-control">
            <div class="page-sub-block">
              <div class="page-sub-wrap card">
                <div class="quoter-famous quoter-left">
                  <img alt="left_quoter" src="./assets/left-quoter.png"/>
                </div>
                <div class="page-famous-text">
                  <adaptive-text-box :text="famous.text" :font-size="famous.fontSize"/>
                </div>
                <div class="quoter-famous quoter-right">
                  <img alt="right_quoter" src="./assets/right-quoter.png"/>
                </div>
              </div>
            </div>
            <div class="page-sub-block">
              <div class="page-sub-wrap card page-clock">
                <div style="font-size: 24px; margin-top: 16px; margin-bottom: 8px">{{ dateString }}</div>
                <div style="font-family: Digital7,serif;user-select: none;font-size: 72px">{{ clockFormat(currentTime) }}</div>
                <div style="font-size: 24px; margin-top: 8px;">{{ weatherString }}</div>
              </div>
            </div>
          </div>
          <div class="page-project">
            <application-card v-for="(item, index) in applicationInfo" :class="index" v-bind="item" :style="{gridRow: Math.ceil(index/4), gridColumn: index%4+1}"/>
          </div>
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import MediaList from "./components/MediaList.vue";
import SideInfo from "./components/SideInfo.vue";
import AdaptiveTextBox from "./components/AdaptiveTextBox.vue";
import ApplicationCard from "./components/ApplicationCard.vue";
import axios from "axios";

export default {
  components: {
    ApplicationCard,
    MediaList,
    SideInfo,
    AdaptiveTextBox,
  },
  data() {
    return {
      introduction: "",
      mediaList: [
        {
          icoUrl: "",
          naviUrl: ""
        }
      ],
      backgroundObject: {
        sideInfoText: {},
        backgroundUrl: ""
      },
      famous: {
        text: "",
        fontSize: 0,
      },
      regionName: "",
      weatherRnd: [],
      currentTime: new Date(),
      dateString: "",
      timer: undefined,
      weekArr: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
      weatherString: "",
      applicationInfo: []
    }
  },
  mounted() {
    this.jsonInit();
    this.getWeather();
    this.dateString = this.dateFormat(this.currentTime);
    this.timer = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    jsonInit() {
      axios.get('./data.json')
        .then(res => {
          this.introduction = res.data.introduction;
          this.mediaList = res.data.mediaList;
          // this.backgroundObject = res.data.backgroundObject[1];
          this.backgroundObject = res.data.backgroundObject[Math.floor(Math.random()*res.data.backgroundObject.length)];
          this.famous = res.data.famous[Math.floor(Math.random()*res.data.famous.length)];
          this.regionName = res.data.regionName;
          this.weatherRnd = res.data.weatherRnd;
          this.applicationInfo = res.data.applicationInfo;
        })
    },
    getWeather() {
      axios.get('https://v0.yiketianqi.com/free/day', {
        params: {
          appid: '93427426',
          appsecret: 'Qawn8HlD',
          vue: '1'
        }})
        .then(res => {
          // noinspection JSUnresolvedReference
          this.weatherString =  this.regionName[Math.floor(Math.random()*this.regionName.length)]+" "+res.data.wea+" "+res.data.tem+"°C "+res.data.win+res.data.win_speed;
        })
        .catch(err => {
          console.log(err)
          this.weatherString =  this.regionName[Math.floor(Math.random()*this.regionName.length)] + " " + this.weatherRnd[Math.floor(Math.random()*this.weatherRnd.length)]
        })
    },
    dateFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth()+1<10 ? "0"+(time.getMonth()+1) : time.getMonth()+1;
      let day = time.getDate()<10 ? "0"+time.getDate() : time.getDate();
      let week = this.weekArr[time.getDay()]
      return year+"年"+month+"月"+day+"日"+week;
    },
    clockFormat(time) {
      let hours = time.getHours()<10 ? "0"+time.getHours() : time.getHours();
      let minutes = time.getMinutes()<10 ? "0"+time.getMinutes() : time.getMinutes();
      let seconds = time.getSeconds()<10 ? "0"+time.getSeconds() : time.getSeconds();
      return hours+":"+minutes+":"+seconds
    }
  },
  computed: {
  
  }
}
</script>

<style scoped>

.fixed-element {
  position: absolute;
}

.page {
  height: 100%;
  width: 100%;
}

.background {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: -1;
  background-size: 100%;
  opacity: 0.5;
}

.side-info {
  bottom: 60px;
  left: 30px;
}

.header {
  height: 64px;
}

.footer {
  height: 32px
}

.content {
  height: calc(100% - 96px);
}

.main {
  height: 100%;
  margin: 0 108px;
  display: flex;
}

.column-1 {
  width: 35%;
  margin: 32px;
}

.page-title {
  margin: 48px 0 24px 0;
  width: 100%;
  height: 18%;
  text-align: center;
  line-height: 18%;
}

#web-title img {
  vertical-align: middle;
}

.page-subtitle {
  height: 40%;
  margin-bottom: 16px;
}

#page-subtitle-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.quoter-subtitle {
  height: 48px;
  width: 48px;
}

.quoter-subtitle img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.quoter-left {
  align-self: flex-start;
  margin-top: 8px;
  margin-left: 8px;
  user-select: none;
}

.quoter-right {
  align-self: flex-end;
  margin-bottom: 8px;
  margin-right: 8px;
  user-select: none;
}

#page-subtitle-content-text {
  flex-grow: 1;
  margin: 24px;
}

.page-media {
  margin-left: 24px;
}

.column-2 {
  width: 100%;
  height: 100%;
}

.page-control {
  height: 200px;
  margin-top: 64px;
  display: flex;
}

.page-sub-block {
  flex-grow: 1;
  position: relative;
}

.page-sub-wrap {
  margin: 12px 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.page-clock {
  text-align: center;
  color: white;
  display: flex;
}

.quoter-famous {
  height: 32px;
  width: 32px;
}

.quoter-famous img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.page-famous-text {
  flex-grow: 1;
}

.page-project {
  width: auto;
  height: calc(100% - 264px);
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 24px;
}
</style>
