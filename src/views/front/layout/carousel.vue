<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-carousel :interval="5000" arrow="always" height="500px">
    <el-carousel-item v-for="(image, index) in imageUrls" :key="index">
      <div>
        <img :src="image.imageUrl" alt="" style="width: 100%; height: auto;"> 
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      imageUrls: [] // 用于存储图片 URLs
    };
  },
  methods: {
    getLayoutList(id) {
      apiClient.get(`/layout/${id}`).then(res => {
        // 假设 res.data.imageUrls 是一个 URL 数组
        this.imageUrls = res.data.imageUrls; // 直接使用返回的 URLs
        console.log("来：" + JSON.stringify(this.imageUrls));
      }).catch(error => {
        console.error('获取布局数据失败:', error);
      });
    }
  },
  created() {
    this.getLayoutList(1); // 在组件创建时获取数据
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
