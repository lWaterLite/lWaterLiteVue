<template>
  <div class="page-1" id="page-1" @wheel="wheelHandle($event, 0)">
    <side-info class="fixed-element side-info" v-bind="backgroundObject.sideInfoText"/>
    <div class="fixed-element background" :style="{backgroundImage: 'url('+backgroundObject.backgroundUrl+')'}"/>
    <div class="container">
      <div class="header"></div>
      <div class="content">
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
                  <div class="text-center" style="font-size: 24px; height: 30%">{{ dateString }}</div>
                  <div class="text-center"
                       style="font-family: Digital7,serif;user-select: none;
                       font-size: 96px; height: 40%">{{ clockFormat(currentTime) }}</div>
                  <div class="text-center" style="font-size: 24px;height: 30%">{{ weatherString }}</div>
                </div>
              </div>
            </div>
            <div class="page-project">
              <application-card v-for="(item, index) in applicationInfo" :class="index" v-bind="item"
                                :style="{gridRow: Math.ceil(index/4), gridColumn: index%4+1}"/>
            </div>
        </div>
      </div>
      <div class="footer">
        <div class="page-button">
          <img src="./assets/down-arrow.png" alt="down" @click.prevent="pageScrollHandle(1)"/>
        </div>
      </div>
    </div>
  </div>
  
  <div class="page-2" id="page-2" @wheel="wheelHandle($event, 1)">
    <side-info class="fixed-element side-info" title="pid:105118231" content="咒术师: 暮雨"/>
    <div class="fixed-element background" style="background-image: url('/background/page-2.jpg')"/>
    <div class="container">
      <div class="header">
        <div class="page-button">
          <img src="./assets/upper-arrow.png" alt="upper" @click.prevent="pageScrollHandle(0)">
        </div>
      </div>
      <div class="content">
        <div class="text-center card wip-wrap">
          <div class="sentence">Per aspera ad astra</div>
          <div class="sentence">循此苦旅，直抵群星</div>
          <div class="wip">This page is still in WIP.</div>
        </div>
      </div>
      <div class="footer" ref="twoFooter">
        <div class="page-button">
          <img src="./assets/down-arrow.png" alt="down" @click.prevent="pageScrollHandle(2)">
        </div>
      </div>
    </div>
  </div>
  
  <div class="message-board" id="message-board" @wheel="wheelHandle($event, 2)">
    <side-info class="fixed-element side-info" title="pid:106387169" content="咒术师: 暮雨"/>
    <div class="fixed-element background" style="background-image: url('/background/message-board.png')"/>
    <div class="header">
      <div class="page-button">
        <img src="./assets/upper-arrow.png" alt="upper" @click.prevent="pageScrollHandle(1)">
      </div>
    </div>
    <div class="content">
      <div class="commit-box">
        <commit-box @submit-success="getCommitList"/>
      </div>
      <div class="commit-list">
        <commit-display v-for="item in commentList" v-bind="item"/>
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
import CommitBox from "./components/CommitBox.vue";
import CommitDisplay from "./components/CommitDisplay.vue";
import axios from "axios";
import DevicePixelRatio from "./utils/DevicePixelRatio.js";
import staticData from "/public/data.json"
import axiosPrefix from "./utils/axios.js";
import {pageScrollHandle, wheelScrollHandle} from "./utils/PageScrollHandle.js";
import _ from 'lodash'

import "./css/page-1.css"
import "./css/page-2.css"
import "./css/message-board.css"

export default {
  components: {
    CommitDisplay,
    CommitBox,
    ApplicationCard,
    MediaList,
    SideInfo,
    AdaptiveTextBox,
  },
  data() {
    return {
      // introduction: "",
      // mediaList: [
      //   {
      //     icoUrl: "",
      //     naviUrl: ""
      //   }
      // ],
      // backgroundObject: {
      //   sideInfoText: {},
      //   backgroundUrl: ""
      // },
      // famous: {
      //   text: "",
      //   fontSize: 0,
      // },
      // regionName: "",
      // weatherRnd: [],
      // applicationInfo: [],
      introduction: staticData.introduction,
      mediaList: staticData.mediaList,
      backgroundObject: staticData.backgroundObject[Math.floor(Math.random() * staticData.backgroundObject.length)],
      famous: staticData.famous[Math.floor(Math.random() * staticData.famous.length)],
      regionName: staticData.regionName[Math.floor(Math.random() * staticData.regionName.length)],
      weatherRnd: staticData.weatherRnd[Math.floor(Math.random() * staticData.weatherRnd.length)],
      applicationInfo: staticData.applicationInfo,
      currentTime: new Date(),
      dateString: "",
      timer: undefined,
      weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      weatherString: "",
      commentList: []
    }
  },
  mounted() {
    // this.jsonInit();
    this.getWeather();
    this.getCommitList();
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
  created() {
    new DevicePixelRatio().init();
  },
  methods: {
    pageScrollHandle,
    // jsonInit() {
    //   axios.get('./data.json')
    //           .then(res => {
    //             this.introduction = res.data.introduction;
    //             this.mediaList = res.data.mediaList;
    //             this.backgroundObject = res.data.backgroundObject[Math.floor(Math.random() * res.data.backgroundObject.length)];
    //             this.famous = res.data.famous[Math.floor(Math.random() * res.data.famous.length)];
    //             this.regionName = res.data.regionName;
    //             this.weatherRnd = res.data.weatherRnd;
    //             this.applicationInfo = res.data.applicationInfo;
    //           })
    // },
    getWeather() {
      axios.get('https://v0.yiketianqi.com/free/day', {
        params: {
          appid: '93427426',
          appsecret: 'Qawn8HlD',
          vue: '1'
        }
      }).then(res => {
                // noinspection JSUnresolvedReference
                this.weatherString = this.regionName + " " + res.data.wea + " " + res.data.tem + "°C " + res.data.win + res.data.win_speed;
      }).catch(err => {
                console.log(err)
                this.weatherString = this.regionName + " " + this.weatherRnd[Math.floor(Math.random() * this.weatherRnd.length)]
              })
    },
    dateFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
      let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
      let week = this.weekArr[time.getDay()]
      return year + "年" + month + "月" + day + "日" + week;
    },
    clockFormat(time) {
      let hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
      let minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      let seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
      return hours + ":" + minutes + ":" + seconds
    },
    // pageScrollHandle(index) {
    //   if (index === 0) document.getElementById("page-1").scrollIntoView({
    //     behavior: "smooth"
    //   })
    //   else if (index === 1) document.getElementById("page-2").scrollIntoView({
    //     behavior: "smooth"
    //   })
    //   else if (index === 2) document.getElementById("message-board").scrollIntoView({
    //     behavior: "smooth"
    //   })
    // },
    getCommitList() {
      axios.get(axiosPrefix + "/comm/comm", {
        params: {
          path: 1
        }
      }).then(res => {
        this.commentList = res.data.commentList
      })
    },
    wheelHandle:
      _.throttle(function (event, index) {
        wheelScrollHandle(event, index)
      }, 500)
    }
  
}
</script>

<style scoped>

.page-1, .page-2, .message-board {
  height: 100%;
  position: relative;
}

.side-info {
  bottom: 6%;
  left: 3%;
}
</style>
