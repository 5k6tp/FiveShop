<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
        <!-- 中間內容區域 -->
        <div class="main-content">
          <h2>會員群組(未開發)</h2>
        </div>
  </template>
  
  <script>
  
  export default {

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
  }
  
  .main-content {
    flex: 1; /* 讓中間內容區域佔據容器剩餘的空間 */
    padding: 20px;

  }
  
  body {
    margin: 0;
  }
  </style>
  