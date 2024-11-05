<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h2>訂單成立</h2>
        <el-descriptions class="margin-top" title="訂單列表" :column="3" :size="size" border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    訂單編號
                </template>
                {{ this.orderNo }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    訂單狀態
                </template>
                {{ checkStatus(orderData.status) }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    訂單金額
                </template>
                {{ totalAmount }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    會員姓名
                </template>
                {{ memberData.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    會員手機
                </template>
                {{ memberData.phoneNumber }}
            </el-descriptions-item>
            <el-descriptions-item :span="3">
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    收件人資料
                </template>
                <div>
                    姓名: {{ orderData.recipientName }} <br />
                    手機號碼: {{ orderData.recipientPhone }} <br />
                    信箱: {{ orderData.recipientEmail }} <br />
                    地址: {{ orderData.recipientAddress }}
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    付款方式
                </template>
                {{ checkPayment(orderData.paymentMethod) }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    運送方式
                </template>
                {{ orderData.shippingMethod }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    訂單成立時間
                </template>
                {{ formatDate(orderData.createdAt) }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    備註
                </template>
                {{ orderData.remarks }}
            </el-descriptions-item>
        </el-descriptions>

        <el-table :data="orderData.products" style="width: 100%; margin-top: 20px;" border>
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

        <!-- 回首頁按鈕 -->
        <div style="margin-top: 20px; text-align: center;">
            <el-button type="primary" @click="goHome">回首頁</el-button>
        </div>
    </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
    data() {
        return {
            size: '',
            orderNo: '',
            orderData: {},
            memberData: {},
            totalAmount: 0,
        };
    },
    methods: {
        getOrderData(orderId) {
            apiClient.get(`/order/${orderId}`).then(res => {
                console.log(JSON.stringify(res.data));
                this.orderData = res.data;
                this.calculateTotalAmount();
            });
        },
        getMemberData(memId) {
            apiClient.get(`/memberlist/get/${memId}`).then(res => {
                this.memberData = res.data;
            });
        },
        checkStatus(status) {
            switch (status) {
                case 0:
                    return '帳款確認中';
                case 1:
                    return '訂單確認中';
                case 2:
                    return '出貨中';
                case 3:
                    return '已出貨';
                case 4:
                    return '已完成';
                case 5:
                    return '訂單取消';
            }
        },
        checkPayment(paymentMethod) {
            switch (paymentMethod) {
                case 0:
                    return '線上刷卡';
                case 1:
                    return 'ATM轉帳';
                case 2:
                    return '貨到付款';
                case 3:
                    return '代碼繳費';
            }
        },
        formatDate(dateArray) {
            if (!Array.isArray(dateArray) || dateArray.length < 3) return '';
            
            const parsedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            const year = parsedDate.getFullYear();
            const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
            const day = ('0' + parsedDate.getDate()).slice(-2);

            return `${year}/${month}/${day}`;
        },
        calculateTotalAmount() {
            this.totalAmount = this.orderData.products.reduce((total, product) => {
                return total + (product.unitPrice * product.quantity);
            }, 0);
        },
        goHome() {
            this.$router.push({ path: '/' }); // 這裡的路徑可以根據實際情況修改
        }
    },
    created() {
        this.orderNo = JSON.parse(this.$route.query.orderNo).slice(6);
        this.getOrderData(this.orderNo);
        this.getMemberData(11300000005);
    }
};
</script>
