<template>
  <div>
    <h2>購物車列表</h2>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column
          prop="imageUrls"
          label="商品圖片"
          width="180"
          align="center"
          header-align="center">
        </el-table-column> -->
        <el-table-column
          prop="productName"
          label="商品名稱"
          width="180"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          label="商品單價"
          width="180"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="數量"
          align="center"
          header-align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.quantity" :step="1" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="小計"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          header-align="center">
          <template #default>
            <el-button type="success" icon="el-icon-star-off" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" class="CheckoutBtn" @click="gopay">前往前帳</el-button>
    </div>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      tableData: [
        {
          imageUrls: '',
          productName: '',
          unitPrice: '',
          quantity: 1,
          totalPrice: '',
        },
      ],
    };
  },
  methods:{
    getCartList(){
      apiClient.get('/cart/list').then(res=>{
        console.log("蠟筆小新"+JSON.stringify(res));
        this.tableData = res.data;
      })
    },
    gopay(){
      apiClient.put('/cart/update', this.tableData).then(res=>{
        console.log(JSON.stringify(res));
        this.$router.push('/cart/checkout');
      })
    }
  },
  created(){
    this.getCartList();
  }
};
</script>

<style>
h2 {
  margin: 20px;
}

.container {
  margin: 0 auto;
  width: 1200px;
  position: relative;
  padding: 20px;
}

.CheckoutBtn {
  position: absolute;
  right: 100px;
  bottom: -60px;
  width: 150px;
  height: 50px;
  font-size: 20px;
}

.CheckoutBtn span{
  font-size: 16px;
}

</style>
