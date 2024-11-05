<template>
  <div>
    <h2>會員中心</h2>
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="會員資料" style="width: 500px; margin: 20px auto;">
        <h3>會員資料</h3>
        <el-form v-if="membercenter" ref="form" :model="membercenter" label-width="80px">
          <el-form-item label="會員名稱">
            <el-input v-model="membercenter.name"></el-input>
          </el-form-item>

          <el-form-item label="信箱">
            <el-input v-model="membercenter.email"></el-input>
          </el-form-item>

          <el-form-item label="手機號碼">
            <el-input v-model="membercenter.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item label="住址">
            <el-input v-model="membercenter.address"></el-input>
          </el-form-item>

          <el-form-item label="會員生日" style="text-align: left;" label-width="100px">
            <span>{{ formattedBirthday }}</span>
          </el-form-item>

          <el-form-item label="會員等級" style="text-align: left;">
            <span>{{ membercenter.membershipLevel }}</span>
          </el-form-item>

          <el-form-item label="最後登入時間" style="text-align: left;" label-width="100px">
            <span>{{ formattedLastLoginTime }}</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editMember(5)">儲存</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="我的收藏" @tab-click="handleTabClick">
        <h3>我的收藏</h3>
        <el-row>
          <el-col :span="8" v-for="(favorite, index) in favorites" :key="favorite.productid" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <div>{{ favorite.productName }}</div>
                <div>${{ favorite.productPrice }}</div>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">移除收藏</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="我的訂單">
        <h3>我的訂單</h3>
        <el-table :data="orderList" style="width: 100%">
          <el-table-column prop="id" label="訂單編號" width="180"></el-table-column>
          <el-table-column prop="name" label="購買人" width="180"></el-table-column>
          <el-table-column prop="status" label="訂單狀態"></el-table-column>
          <el-table-column prop="total" label="訂單金額"></el-table-column>
          <el-table-column prop="createdAt" label="成立日期"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="常見收件人">
        <h3>常用收件人</h3>
        <el-dialog title="常用收件人" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手機" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="信箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">新 增</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </span>
        </el-dialog>

        <el-card class="box-card" v-for="recipient in form.recipientsList" :key="recipient.id">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">新增收件人</el-button>
          </div>
          <div class="text item">
            {{ '收件人 ' + recipient.name }}<br>
            {{ '手機 ' + recipient.phone }}<br>
            {{ '信箱 ' + recipient.email }}<br>
            {{ '地址 ' + recipient.address }}
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      membercenter: {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        membershipLevel: '',
        birthday: '',
        lastLoginTime: ''
      },
      favorites: [],
      dialogVisible: false,
      form: {
        name: '',
        phone: '',
        email: '',
        address: '',
        recipientsList: []
      },
      orderList: [],
      rules: {
        name: [{ required: true, message: '姓名是必填的', trigger: 'blur' }],
        phone: [
          { required: true, message: '手機是必填的', trigger: 'blur' },
          { pattern: /^[0-9]{10}$/, message: '手機號碼格式不正確', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '信箱是必填的', trigger: 'blur' },
          { type: 'email', message: '信箱格式不正確', trigger: ['blur', 'change'] }
        ],
        address: [{ required: true, message: '地址是必填的', trigger: 'blur' }]
      }
    };
  },
  computed: {
    formattedLastLoginTime() {
      return this.formatDate(this.membercenter.lastLoginTime);
    },
    formattedBirthday() {
      return this.formatDate(this.membercenter.birthday, true);
    }
  },
  methods: {
    formatDate(timestamp, isBirthday = false) {
      if (timestamp) {
        const date = new Date(timestamp);
        return isBirthday ? date.toLocaleDateString() : date.toLocaleString();
      }
      return '';
    },
    getMemberList(memId) {
      apiClient.get(`/memberlist/get/${memId}`).then(res => {
        this.membercenter = res.data || {};
      }).catch(err => {
        console.error("获取会员数据失败:", err);
      });
    },
    handleTabClick(tab) {
      switch (tab.label) {
        case '會員資料':
          this.getMemberList(5);
          break;
        case '我的收藏':
          this.getFavoritesList(11300000050);
          break;
        case '常見收件人':
          this.getRecipients();
          break;
          case '我的訂單':
          this.geOrderList();
          break;
      }    
    },
    editMember(memId) {
      apiClient.put(`/memberlist/edit/${memId}`, this.membercenter).then(() => {
        this.$message.success("會員資料編輯成功！");
      });
    },
    getFavoritesList(memId) {
      apiClient.get(`/favorites/getlist/${memId}`).then(res => {
        this.favorites = res.data || [];
      }).catch(err => {
        console.error("获取收藏数据失败:", err);
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.form = {
        name: '',
        phone: '',
        email: '',
        address: '',
        recipientsList: []
      };
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiClient.post('memberlist/recipients/add', this.form).then(() => {
            this.$message.success("新建常用收件人成功！");
            this.resetForm();
            this.dialogVisible = false;
          });
        } else {
          console.log('表單驗證失敗');
        }
      });
    },
    getRecipients() {
      apiClient.get('memberlist/recipients/list').then(res => {
        this.form.recipientsList = res.data || [];
      });
    },
    geOrderList() {
      apiClient.get('/order/list').then(res => {
        console.log(JSON.stringify(res.data));
        this.orderList = res.data || {};
      }).catch(err => {
        console.error("获取会员数据失败:", err);
      });
    },
  },
  created() {
    this.getMemberList(5);
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
</style>
