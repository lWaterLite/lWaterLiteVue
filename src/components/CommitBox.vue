<script>
import {defineComponent} from 'vue'
import axios from "axios";
import axiosPrefix from "../utils/axios.js";

export default defineComponent({
  name: "CommitBox",
  data() {
    return {
      user: "",
      comment: "",
      error: "",
      isErrorShow: false
    }
  },
  methods: {
    isCommentValid() {
      this.user = this.user.trim()
      this.comment = this.comment.trim()
      if (this.user === '') {
        this.error = "请留下你的大名吧!"
        this.isErrorShow = true
        return false
      }
      if (this.comment === "") {
        this.error = "请留下你宝贵的评论吧!"
        this.isErrorShow = true
        return false
      }
      if (this.user.length > 20) {
        this.error = "用户名称不要超过20个字符哦。";
        this.isErrorShow = true;
        return false
      }
      if (this.comment.length > 256) {
        this.error = "虽然很感谢，但是你的评论太长啦!请不要超过256个字符哦。";
        this.isErrorShow = true;
        return false;
      }
      return true;
    },
    submitComment() {
      if (this.isCommentValid()) {
       axios.post(axiosPrefix + "/comm/upload", JSON.stringify({
         "user": this.user,
         "comment": this.comment
       }), {
         headers: {
           "Content-Type": "application/x-www-form-urlencoded"
         }
       }).then(() => {
         this.error = "";
         this.isErrorShow = false;
         this.user = "";
         this.comment = "";
         this.$emit("submitSuccess");
       }).catch(() => {
         this.error = "额，服务器好像出错了，请稍后再尝试吧。"
         this.isErrorShow = true;
       })
      }
    }
  }
})
</script>

<template>
  <div class="wrap">
    <input placeholder="君の名字?" v-model="user"/>
    <div class="row-2">
      <textarea placeholder="留下你的评论吧." v-model="comment"/>
      <div class="button-wrap">
        <button @click="submitComment">发布</button>
      </div>
    </div>
    <div class="error" v-show="isErrorShow">{{ error }}</div>
  </div>
</template>

<style scoped>
input {
  padding: 5px 10px;
  width: 50%;
  box-sizing: border-box;
  outline: none;
  border-radius: 8px;
  border: none;
  background: rgba(25, 25, 25, 0.3);
  font-size: 12px;
  height: 32px;
  color: white;
}

input:hover, input:focus {
  border: #c9ccd0 1px solid;
}

input::placeholder {
  color: white;
}

textarea {
  padding: 5px 10px;
  margin-top: 4px;
  width: 100%;
  height: 64px;
  resize: none;
  box-sizing: border-box;
  text-rendering: auto;
  writing-mode: horizontal-tb;
  appearance: none;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  column-count: auto;
  background: rgba(25, 25, 25, 0.3);
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 12px;
  color: white;
  transition: height 0.3s ease;
}

textarea:hover, textarea:focus {
  border: #c9ccd0 1px solid;
  height: 72px;
  transition: height 0.3s ease;
}

textarea::placeholder {
  color: white;
}

.row-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button-wrap {
  width: 88px;
  margin-left: 16px;
}

.button-wrap button {
  height: 56px;
  width: 100%;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 8px;
  background-color: #7fd6f5;
  transition: background-color 0.1s ease;
  user-select: none;
}

.button-wrap button:hover {
  background-color: #00aeec;
  transition: background-color 0.1s ease;
}

.error {
  color: #F93415;
}
</style>