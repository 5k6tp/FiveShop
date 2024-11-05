<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="checkout-page">
        <h2>訂單結帳</h2>
        <el-card class="recipient-info" :body-style="{ padding: '20px' }">
            <el-table :data="productList" style="width: 100%" border>
                <el-table-column prop="productId" label="商品貨號" width="180"></el-table-column>
                <el-table-column prop="productName" label="商品名稱" width="180"></el-table-column>
                <el-table-column prop="unitPrice" label="價格" width="100"></el-table-column>
                <el-table-column prop="quantity" label="數量" width="100"></el-table-column>
                <el-table-column label="小計">
                    <template v-slot="scope">
                        <span>{{ scope.row.unitPrice * scope.row.quantity }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="total-amount">
                總計金額: <span>{{ totalAmount }}</span>
            </div>
        </el-card>

        <el-form :model="form" label-width="100px" class="form">
            <el-card class="recipient-info" :body-style="{ padding: '20px' }">
                <h3>付款方式</h3>
                <el-form-item label="付款方式" class="position">
                    <el-radio-group v-model="form.paymentMethod">
                        <el-radio label="0">線上刷卡</el-radio>
                        <el-radio label="1">ATM轉帳</el-radio>
                        <el-radio label="2">貨到付款</el-radio>
                        <el-radio label="3">代碼繳費</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-card>

            <el-card class="recipient-info" :body-style="{ padding: '20px' }">
                <h3>運送方式</h3>
                <el-form-item label="運送方式" class="position">
                    <el-select v-model="form.shippingMethod" placeholder="選擇運送方式">
                        <el-option label="標準" value="0"></el-option>
                        <el-option label="快遞" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-card>

            <!-- 收件人和地址區塊 -->
            <el-card class="recipient-info" :body-style="{ padding: '20px' }">
                <h3>收件人資訊</h3>
                <el-form-item label="收件人">
                    <el-input v-model="form.recipientName" placeholder="請輸入收件人姓名"></el-input>
                </el-form-item>
                <el-form-item label="手機">
                    <el-input v-model="form.recipientPhone" placeholder="請輸入手機號碼"></el-input>
                </el-form-item>
                <el-form-item label="信箱">
                    <el-input v-model="form.recipientEmail" placeholder="請輸入信箱"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.recipientAddress" placeholder="請輸入運送地址"></el-input>
                </el-form-item>
            </el-card>

            <el-card class="recipient-info" :body-style="{ padding: '20px' }">
                <h3>備註</h3>
                <el-form-item>
                    <el-input type="textarea" v-model="form.remarks" placeholder="備註 (選填)" :rows="5"></el-input>
                </el-form-item>
            </el-card>
        </el-form>

        <div class="buttons">
            <el-button type="primary" @click="submitOrder">成立訂單</el-button>
            <el-button @click="goHome">回首頁</el-button>
        </div>
    </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
    data() {
        return {
            productList: [], // 用於存放產品列表
            form: {
                paymentMethod: '',
                shippingMethod: '',
                recipientName: '',
                recipientPhone: '',
                recipientEmail: '',
                recipientAddress: '',
                remarks: ''
            }
        };
    },
    computed: {
        totalAmount() {
            return this.productList.reduce((total, product) => {
                return total + (product.unitPrice * product.quantity);
            }, 0);
        }
    },
    methods: {
        submitOrder() {
    const orderData = {
        ...this.form,
        products: this.productList.map(product => ({
            productId: product.productId,
            productName: product.productName,
            unitPrice: product.unitPrice,
            quantity: product.quantity
        }))
    };

            apiClient.post('/order/add', orderData).then(res => {
                console.log(JSON.stringify(res));
                this.$message.success("訂單提交成功");
                this.$router.push({ 
                    path: '/cart/checkok', 
                    query: { 
                        orderNo: JSON.stringify(res.data)
                    }
                    })
            }).catch(error => {
                console.error("訂單提交失敗:", error);
                this.$message.error("訂單提交失敗");
            });
        },
        goHome() {
            this.$router.push('/index');
        },
        getProdList() {
            apiClient.get('/cart/list').then(res => {
                console.log(JSON.stringify(res));
                this.productList = res.data; // 更新產品列表
            });
        }
    },
    created() {
        this.getProdList();
    }
};
</script>

<style scoped>
.checkout-page {
    padding: 20px;
}

.form {
    margin-top: 20px;
}

.buttons {
    margin-top: 20px;
}

.position {
    text-align: left;
}

.recipient-info {
    margin-top: 20px;
}

.total-amount {
    margin-top: 15px;
    font-weight: bold;
    color: #f56c6c; /* 这里可以根据需要调整颜色 */
    text-align: right;
}
</style>
