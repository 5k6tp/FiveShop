<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 中間內容區域 -->
  <div class="main-content">
    <h2>訂單列表</h2>
    <el-tab-pane>
      <el-table :data="orderList" style="width: 100%">
        <el-table-column prop="id" label="訂單編號" ></el-table-column>
        <el-table-column prop="name" label="購買人" ></el-table-column>
        <el-table-column prop="status" label="訂單狀態"></el-table-column>
        <el-table-column prop="total" label="訂單金額"></el-table-column>
        <el-table-column prop="createdAt" label="成立日期"></el-table-column>
      </el-table>
    </el-tab-pane>
  </div>
</template>

<script>
import apiClient from '@/common/api'; // 确保你的 API 客户端正确导入

export default {
  data() {
    return {
      orderList: [] // 初始化订单列表为空数组
    };
  },
  methods: {
    getOrderList() {
      apiClient.get('/order/list')
        .then(res => {
          console.log("API 响应:", res.data); // 打印 API 响应
          this.orderList = res.data.map(order => ({
            ...order,
            createdAt: this.formatDate(order.createdAt), // 格式化创建日期
            status: this.getStatusText(order.status) // 转换状态数字为文本
          })) || []; // 确保这里是数组
        })
        .catch(err => {
          console.error("获取订单数据失败:", err); // 捕获错误
        });
    },
    formatDate(createdAt) {
      const [year, month, day, hour, minute, second] = createdAt;
      // 格式化为 YYYY-MM-DD HH:mm:ss
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    },
    getStatusText(status) {
      const statusMap = {
        0: '已取消',
        1: '待付款',
        2: '已付款',
        5: '已完成'
      };
      return statusMap[status] || '未知状态';
    }
  },
  created() {
    this.getOrderList(); // 组件创建时获取订单列表
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
}

.main-content {
  flex: 1; /* 讓中間內容區域佔據容器剩餘的空間 */
  padding: 20px;
}

body {
  margin: 0;
}
</style>
