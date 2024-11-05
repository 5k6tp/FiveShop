<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="layout">
    <!-- 标题导航栏 -->
    <HeaderNavVue />

    <div class="container">
      <!-- 左侧栏 -->
      <SiderMenu />

      <!-- 中间内容区域 -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SiderMenu from '@/views/admin/inc/SiderMenu.vue';
import HeaderNavVue from '@/views/admin/inc/HeaderNav.vue';

export default {
  components: {
    SiderMenu,
    HeaderNavVue
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
  flex: 1; /* 让容器占据剩余的空间 */
  margin-top: 60px; /* 给容器增加顶部空间，避免内容压到头部 */
}

.main-content {
  flex: 1; /* 让中间内容区域占据容器剩余的空间 */
  /* padding: 20px; */
  margin-left: 120px; /* 确保中间内容区域不覆盖左侧栏 */
  box-sizing: border-box; /* 包含内边距在宽度计算中 */
}

body {
  margin: 0;
}
</style>
