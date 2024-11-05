<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-content">
    <h2>商品列表</h2>
    <div class="create-button">
      <el-button type="primary" @click="navigateToCreate">新建商品</el-button>
    </div>

    <div class="search-container">
      <el-row :gutter="20" class="search-row">
        <el-col :span="11">
          <el-input placeholder="商品名稱" v-model="searchName"></el-input>
        </el-col>
        <el-col :span="11">
          <el-select v-model="statusFilter" placeholder="上下架">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="date-row">
        <el-col :span="10">
          <el-date-picker v-model="startDate" type="date" placeholder="開始銷售日期"></el-date-picker>
        </el-col>
        <el-col :span="10">
          <el-date-picker v-model="endDate" type="date" placeholder="結束銷售日期"></el-date-picker>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            @click="getProductList"
            icon="el-icon-search"
            class="search-button"
          >
            搜尋
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="products" stripe>
      <el-table-column label="商品名稱">
        <template #default="{ row }">
          <div class="flex">
            <img :src="row.imageUrls[0]?.imageUrl" alt="商品圖片" />
            <div>
              <p>{{ row.name }}</p>
              <p>商品貨號：{{ row.id }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="售價" prop="price"></el-table-column>
      <el-table-column label="庫存" prop="stock"></el-table-column>
      <el-table-column label="狀態" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" disable-transitions>
            {{ row.status === 1 ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="銷售日期">
        <template #default="{ row }">
          <span>{{ row.saleDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="editProduct(row.id)" type="primary" size="small">編輯</el-button>
          <el-button @click="deleteProduct(row.id)" type="danger" size="small">刪除</el-button>
          <el-button type="warning" size="small">上架</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, sizes, total"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :page-sizes="[1, 10, 20, 50]"
      style="margin-top: 20px;"
    >
    </el-pagination>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      searchName: '',
      statusFilter: '',
      startDate: null,
      endDate: null,
      products: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    navigateToCreate() {
      window.location.href = 'add';
    },
    editProduct(id) {
      window.location.href = `add/${id}`;
    },
    deleteProduct(product) {
      console.log('删除', product);
    },
    async getProductList() {
      try {
        const res = await apiClient.get('product/list', {params: {
          currentPage: this.currentPage,
          currentSize: this.pageSize, 
          searchName: this.searchName,
          statusFilter: this.statusFilter,
          startDate: this.startDate,
          endDate: this.endDate
      }});
        console.log(res);
        this.products = res.data.records.map(product => {
          const start = product.saleStartTime;
          const end = product.saleEndTime;

          // 格式化销售日期
          const startDate = new Date(start[0], start[1] - 1, start[2]);
          const endDate = new Date(end[0], end[1] - 1, end[2]);
          product.saleDate = `${startDate.toLocaleDateString()} ～ ${endDate.toLocaleDateString()}`.trim();
          return product;
        });
        this.total = res.data.total; // 确保总数设置在这里
      } catch (error) {
        console.error("获取商品列表失败", error);
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getProductList();
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getProductList();
    },
  },
  created() {
    this.getProductList();
  },
};
</script>

<style scoped>
.main-content {
  padding: 20px;
}

.flex {
  display: flex;
  align-items: center;
}

.flex img {
  width: 100px;
  margin-right: 10px;
}

.create-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-row, .date-row {
  margin-bottom: 10px;
  text-align: left;
}

.search-button {
  background-color: #588157;
  border: none;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 540px;
}
</style>
