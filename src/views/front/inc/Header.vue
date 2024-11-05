<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="navbar">
      <div class="logo">
        <a href="../index.php">55SHOP MALL</a>
      </div>
      <div class="menu">
        <div class="dropdown">
          <a href="../index.php">首頁</a>
        </div>
        <div class="dropdown" v-for="(menu, index) in menus" :key="index">
          <a href="#">{{ menu.title }}</a>
          <div class="dropdown-content">
            <a v-for="(link, linkIndex) in menu.links" :key="linkIndex" href="#">{{ link }}</a>
          </div>
        </div>
      </div>
      <div class="center-content">
        <div class="search-box">
          <input type="text" placeholder="Search.." v-model="searchText">
          <button class="search-btn" @click="search">Search</button>
        </div>
      </div>
      <template v-if="isLoggedIn">
        <span class="welcome">歡迎, {{ userName }}</span>
        <el-badge >
          <el-button size="medium" @click="navigateTo('memberCenter')">會員中心</el-button>
        </el-badge>
        <el-badge :value="this.count" class="cart-badge">
          <el-button size="medium" @click="navigateTo('cart')">購物車</el-button>
        </el-badge>
        <el-badge >
          <el-button size="medium" >登出</el-button>
        </el-badge>
      </template>
      <template v-else>
        <button class="login" @click="navigateTo('login')">登入</button>
        <button class="register" @click="navigateTo('register')">註冊</button>
      </template>
    </div>
  </template>
  
  <script>
import apiClient from '@/common/api';

  export default {
    data() {
      return {
        isLoggedIn: false,
        userName: '',
        searchText: '',
        count:'',
        menus: [
          { title: '新聞', links: ['Link 1', 'Link 2', 'Link 3'] },
          { title: 'Menu', links: ['Link 1', 'Link 2', 'Link 3'] }
        ]
      };
    },
    mounted() {
      // 假設從 API 中取得登入狀態與使用者名稱
      this.isLoggedIn = true; // 假設為已登入
      this.userName = 'User Name'; // 假設從 API 獲取的使用者名稱
    },
    methods: {
      search() {
        console.log(`Searching for: ${this.searchText}`);
        // 實現搜尋邏輯
      },
      navigateTo(page) {
        switch (page) {
          case 'memberCenter':
          if(this.$route.path == '/member/center'){
              return
            }else{
              this.$router.push('/member/center');
            }
            break;
          case 'cart':
            if(this.$route.path == '/cart/list'){
              return
            }else{
              this.$router.push('/cart/list');
            }
            break;
          case 'login':
            window.location.href = './login.php';
            break;
          case 'register':
            window.location.href = './register.php';
            break;
          default:
            break;
        }
      },
      logout() {
        this.isLoggedIn = false;
        this.userName = '';
        console.log('User logged out');
        // 實現登出邏輯
      },
      getCartCount(memId){
        apiClient.get(`/cart/${memId}`).then(res=>{
          this.count = res.data;
        })
      }
    },
    created(){
      this.getCartCount(11300000050);
    }
  };
  </script>
  
  <style scoped>
  /* 導覽列樣式與 PHP 頁面相同 */
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 1200px;
  }
  .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: #333;
      overflow: visible;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      z-index: 1000;
  }
  .navbar a {
      color: white;
      text-align: center;
      padding: 14px 20px;
      text-decoration: none;
      display: block;
  }
  .navbar a:hover {
      background-color: #575757;
  }
  .navbar .logo {
      color: white;
      margin-left: 7px;
  }
  .navbar .menu {
      display: flex;
      align-items: center;
  }
  .navbar .menu .dropdown {
      position: relative;
      display: inline-block;
  }
  .navbar .menu .dropdown-content {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1000;
      border: 1px solid #333;
  }
  .navbar .menu .dropdown-content a {
      color: #333;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      text-align: left;
  }
  .navbar .menu .dropdown-content a:hover {
      background-color: #575757;
      color: white;
  }
  .navbar .menu .dropdown:hover .dropdown-content {
      display: block;
  }
  .navbar .center-content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
  }
  .navbar .search-box input[type="text"] {
      padding: 10px;
      margin-right: 10px;
      border: none;
      border-radius: 4px;
  }
  .navbar .search-btn {
      background-color: #d1b39f;
      border: none;
      color: white;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
  }
  .navbar .welcome {
      color: white;
      padding: 0 10px;
  }
  .navbar .admin,
  .navbar .cart,
  .navbar .logout,
  .navbar .login,
  .navbar .register {
      background-color: #575757;
      border: none;
      color: white;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
  }

  .el-badge{
    padding: 5px;
  }
  
  .cart-badge {
  position: relative; /* 确保它具有定位上下文 */
  z-index: 10; /* 设置 z-index 值，确保在最上层 */
}
  </style>
  