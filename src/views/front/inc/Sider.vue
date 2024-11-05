<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="sider-menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#252422"
        text-color="#fefae0"
        active-text-color="#a7c957"
        :collapse="false"
        :unique-opened="true" 
      >
        <!-- 侧边栏内容 -->
        <el-submenu index="1"> <!-- 每個子選單需要有唯一的 index -->
          <template v-slot:title>
            <i class="el-icon-s-tools"></i>
            <span>系統管理</span>
          </template>
          <router-link to="/admin/systemmenu"><el-menu-item index="1-1"> ╴ 分類設定</el-menu-item></router-link>
          <router-link to="/admin/systempage"><el-menu-item index="1-2"> ╴ 頁面設定</el-menu-item></router-link>
        </el-submenu>
  
        <el-submenu index="2">
          <template v-slot:title>
            <i class="el-icon-user-solid"></i>
            <span>會員管理</span>
          </template>
          <router-link to="/admin/member/list"><el-menu-item index="2-1"> ╴ 會員清單</el-menu-item></router-link>
          <router-link to="/admin/member/black"><el-menu-item index="2-2"> ╴ 會員黑名單</el-menu-item></router-link>
          <router-link to="/admin/member/group"><el-menu-item index="2-3"> ╴ 會員群組</el-menu-item></router-link>
        </el-submenu>
  
        <el-submenu index="3">
          <template v-slot:title>
            <i class="el-icon-s-goods"></i>
            <span>商品管理</span>
          </template>
          <router-link to="/admin/product/add"><el-menu-item index="3-1"> ╴ 新增商品</el-menu-item></router-link>
          <router-link to="/admin/product/list"><el-menu-item index="3-2"> ╴ 我的商品</el-menu-item></router-link>
        </el-submenu>
  
        <el-submenu index="4">
          <template v-slot:title>
            <i class="el-icon-s-order"></i>
            <span>訂單管理</span>
          </template>
          <router-link to="/admin/orderlist"><el-menu-item index="4-1"> ╴ 訂單列表</el-menu-item></router-link>
        </el-submenu>
  
        <el-submenu index="5">
          <template v-slot:title>
            <i class="el-icon-edit-outline"></i>
            <span>佈置管理</span>
          </template>
          <router-link to="/admin/layout/carousel"><el-menu-item index="5-1"> ╴ 輪播圖</el-menu-item></router-link>
          <router-link to="/admin/layout/bestseller"><el-menu-item index="5-2"> ╴ 新品上市</el-menu-item></router-link>
          <router-link to="/admin/layout/news"><el-menu-item index="5-3"> ╴ 最新消息</el-menu-item></router-link>
        </el-submenu>
      </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup>
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
  };
  
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
  };
  </script>
  
  <style scoped>
  .sider-menu {
    width: 240px; /* 设置侧边栏的宽度 */
    height: 100%; /* 让侧边栏占满高度 */
    background-color: #545c64; /* 背景色与 el-menu 保持一致 */
    border-right: 1px solid #4a4a4a; /* 添加右边框 */
  }
  
  .el-menu-vertical-demo {
    width: 100%; /* 让 el-menu 填满 sider-menu 容器 */
    height: 100%; /* 让 el-menu 填满高度 */
    text-align: left; /* 菜单内容靠左对齐 */
  }
  
  .el-submenu__title {
    font-size: 16px; /* 子菜单标题的字体大小 */
    font-weight: bold; /* 加粗标题 */
  }
  
  .el-menu-item {
    font-size: 14px; /* 一级菜单项的字体大小 */
    padding: 10px 15px; /* 添加内边距 */
    transition: background-color 0.3s; /* 添加背景色过渡效果 */
  }
  
  .el-menu-item:hover {
    background-color: rgba(167, 201, 87, 0.2); /* 悬停时的背景色 */
  }
  
  .el-menu-item i {
    margin-right: 5px; /* 图标与文本之间的间距 */
  }
  
  body {
    margin: 0;
  }
  </style>
  