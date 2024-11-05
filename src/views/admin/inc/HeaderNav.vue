<template>
  <div>
    <el-header class="header-nav">
      <h2>FiveShop</h2>
      <div class="avatar-group">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
        <span class="auth-button">承哲</span>
        <span class="auth-button">登出</span>
        <span class="auth-button">登入</span>
      </div>
    </el-header>
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
        <el-submenu index="1">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      size: "small"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.header-nav {
  width: 100%; /* 满版宽度 */
  background-color: #588157;
  color: #fefae0;
  text-align: center;
  line-height: 60px; /* 头部高度 */
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed; /* 固定头部位置 */
  top: 0; /* 靠顶部 */
  left: 0; /* 靠左 */
  z-index: 10; /* 确保在侧边栏之上 */
}

.avatar-group {
  display: flex;
  align-items: center;
}

.auth-button {
  margin-left: 15px; /* 间隙 */
  cursor: pointer; /* 鼠标悬停指针 */
  transition: transform 0.3s; /* 添加平滑过渡 */
}

.auth-button:hover {
  transform: translateY(-3px); /* 悬停时滑入效果 */
}

.sider-menu {
  width: 240px; /* 设置侧边栏的宽度 */
  height: calc(100vh - 60px); /* 让侧边栏占满高度减去头部高度 */
  background-color: #545c64; /* 背景色与 el-menu 保持一致 */
  border-right: 1px solid #4a4a4a; /* 添加右边框 */
  position: fixed; /* 固定侧边栏的位置 */
  left: 0; /* 靠左对齐 */
  top: 60px; /* 从头部下方开始显示 */
}

.el-menu-vertical-demo {
  width: 100%; /* 让 el-menu 填满 sider-menu 容器 */
  height: 100%; /* 填满整个侧边栏 */
  text-align: left; /* 菜单内容靠左对齐 */
}

/* 其余样式保持不变 */
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

h2{
  margin: 0;
}
</style>
