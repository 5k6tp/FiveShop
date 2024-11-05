<template>
    <footer>
      <div class="footer-container">
        <div class="footer-box">
          <h3>關於我們</h3>
          <p>我們是一家致力於提供高品質產品的公司，秉持誠信、專業的經營理念，讓客戶滿意是我們最大的成就。</p>
        </div>
        <div class="footer-box">
          <h3>聯絡資訊</h3>
          <p>地址: 台北市某某路123號</p>
          <p>電話: (02) 1234-5678</p>
          <p>電子郵件: info@example.com</p>
        </div>
        <div class="footer-box">
          <h3>追蹤我們</h3>
          <a href="#">Facebook</a> | 
          <a href="#">Instagram</a> | 
          <a href="#">Twitter</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 公司名稱. 保留所有權利。</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  footer {
    background-color: #333;
    color: #f1f1f4;
    padding: 40px 20px;
    text-align: center;
    margin-top: 100px;
    width: 100%;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    max-width: 1140px;
    margin: 0 auto;
    gap: 20px;
  }
  
  .footer-box {
    flex: 1;
    text-align: left;
  }
  
  .footer-box h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  
  .footer-box p, .footer-box a {
    font-size: 1em;
    line-height: 1.5;
    color: #f1f1f4;
  }
  
  .footer-box a {
    text-decoration: none;
  }
  
  .footer-box a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    margin-top: 20px;
    border-top: 1px solid #444;
    padding-top: 10px;
    font-size: 0.9em;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .footer-box {
      margin-bottom: 20px;
    }
  }
  </style>
  