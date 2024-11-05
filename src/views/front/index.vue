<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-components -->
<template>
    <div class="layout">
      <!-- 標題導航欄 -->
      <Header />
  
      <!-- 中間內容區域 -->
      <div class="container">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/views/front/inc/Header.vue';
  import Footer from '@/views/front/inc/Footer.vue';
  
  export default {
    components: {
        Header,
        Footer
    }
  }
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .container {
    display: flex;
    flex: 1; /* 讓容器佔據剩餘的空間 */
    margin-top: 70px;
  }
  
  .main-content {
    flex: 1; /* 讓中間內容區域佔據容器剩餘的空間 */
    /* padding: 20px; */
    /* background-color: #f5f5f5; */
  }
  
  body {
    margin: 0;
  }
  </style>
  