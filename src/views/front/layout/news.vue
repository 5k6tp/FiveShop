<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
      <h1 v-if="news.length === 0" class="isshow">最新消息</h1>
      <h1 v-else>最新消息</h1>
      <div class="news-container">
        <div class="box" v-for="(item, index) in news" :key="index">
          <a :href="item.link">
            <img :src="item.image" :alt="item.altText">
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        news: [
          {
            link: "#",
            image: "./images/景象圖/wpicon_img_31.jpg",
            altText: "最新消息 1"
          },
          {
            link: "#",
            image: "./images/景象圖/wpicon_img_32.jpg",
            altText: "最新消息 2"
          },
          {
            link: "#",
            image: "./images/景象圖/wpicon_img_33.jpg",
            altText: "最新消息 3"
          },
          {
            link: "#",
            image: "./images/景象圖/wpicon_img_34.jpg",
            altText: "最新消息 4"
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .news-container {
    display: flex;
    justify-content: space-between;
    gap: 20px; /* 控制盒子之間的間距 */
    padding: 0 10px;
  }
  
  .box {
    flex: 1;
    background-color: #f0f0f0;
    height: 300px; /* 設定盒子的高度 */
    width: 300px;
    text-align: center;
    line-height: 200px; /* 水平置中 */
    font-size: 24px;
    border-radius: 0px 20px 0 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .box img {
    width: 100%;
    border-radius: 0px 20px 0 20px;
  }
  </style>
  