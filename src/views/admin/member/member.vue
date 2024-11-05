<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-content">
    <h2>會員名單</h2>
    <div class="search" style="display: flex; align-items: center;">
      <el-input v-model="input" placeholder="請輸入會員姓名" style="width: 200px; margin-right: 10px;"></el-input>
      <el-button @click="getMemberList" type="primary" icon="el-icon-search" style="background-color: #588157; border: none;">搜尋</el-button>
    </div>
    <div style="overflow-x:auto; margin-top: 20px;">
      <el-table
        :data="tableData"
        stripe
        :resizable="false" 
        style="width: 100%">
        <el-table-column
          prop="memberId"
          label="會員ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="電子郵件"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="電話號碼"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="registrationDate"
          label="註冊日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="membershipLevel"
          label="會員等級"
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="狀態"
          width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.status == 1 ? 'success' : 'danger'"
              disable-transitions>
              {{ scope.row.status == 1 ? '有效' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登錄時間">
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
        :page-sizes="[5, 10, 20, 50]"
        style="margin-top: 20px;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      input: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    getMemberList() {
      apiClient.get('/memberlist/list', {
        params: {
          currentPage: this.currentPage, // 改為 currentPage
          currentSize: this.pageSize, // 改為 currentSize
          name: this.input // 改為 name，以便能夠搜尋
        }
      }).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch(error => {
        console.error('Error fetching member list:', error);
      });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getMemberList();
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getMemberList();
    }
  },
  created() {
    this.getMemberList();
  }
};
</script>
