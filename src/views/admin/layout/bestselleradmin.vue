<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-card class="box-card" style="width: 800px; margin: 20px auto;">
    <div class="main-content">
      <h2>輪播圖</h2>

      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="主標題">
          <el-input v-model="form.mainTitle" required></el-input>
        </el-form-item>

        <el-form-item label="副標題">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>

        <el-form-item label="內容">
          <el-input v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="狀態" required>
          <div class="statusbtn">
            <!-- 使用 :key 属性确保正确渲染 -->
            <el-radio v-model="form.status" :label="1" key="show">顯示</el-radio>
            <el-radio v-model="form.status" :label="0" key="hide">隱藏</el-radio>
          </div>
        </el-form-item>

        <el-form-item label="上傳圖片" required>
          <el-upload
            ref="upload"
            action="http://localhost:8081/api/upload/image"
            list-type="picture-card"
            :limit="4"
            :auto-upload="true"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove">
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item class="submitbtn">
          <el-button type="primary" @click="onSubmit(1)">儲存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      form: {
        mainTitle: '',
        subtitle: '',
        content: '',
        status: 1, // 預設為顯示狀態
        imageUrls: [],
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      limit: 4,
    };
  },
  methods: {
    async onSubmit(id) {
      await this.$refs.upload.submit();
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        console.log("更新前的數據：" + JSON.stringify(this.form, null, 2));
        const res = await apiClient.put(`/layout/update/${id}`, {
          ...this.form,
          imageUrls: this.form.imageUrls,
        });
        console.log(res);
        this.$message.success("更新成功！");
        this.getLayoutList(id);
      } catch (error) {
        console.error('Error updating layout:', error);
        this.$message.error("更新失敗！");
      }
    },
    getLayoutList(id) {
      apiClient.get(`/layout/${id}`).then(res => {
        this.form = {
          mainTitle: res.data.mainTitle,
          subtitle: res.data.subtitle,
          content: res.data.content,
          status: Number(res.data.status),
          imageUrls: [],
        };
        
        this.fileList = res.data.imageUrls.map((item, index) => ({
          name: `Image ${index + 1}`,
          url: item.imageUrl,
        }));

        this.form.imageUrls = this.fileList.map(file => file.url);
      }).catch(error => {
        console.error('Error fetching layout data:', error);
      });
    },
    handleExceed() {
      this.$message.warning(`最多可以選擇 ${this.limit} 張圖片`);
    },
    handleUploadSuccess(response) {
      if (this.form.imageUrls.length < this.limit) {
        this.form.imageUrls.push(response.data);
        this.fileList.push({
          name: `Image ${this.fileList.length + 1}`,
          url: response.data,
        });
      }
      console.log(this.form.imageUrls);
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(f => f.url === file.url);
      if (index !== -1) {
        this.fileList.splice(index, 1);
        this.form.imageUrls.splice(index, 1);
      }
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    cancel() {
      this.$router.push({ name: 'YourPreviousRouteName' });
    }
  },
  created() {
    this.getLayoutList(1);
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

body {
  margin: 0;
}

h2 {
  margin: 20px;
  margin-bottom: 50px;
}

.el-form-item__label {
  text-align: left;
}

.el-input {
  width: 500px;
}

.submitbtn {
  text-align: center;
  margin-top: 70px;
}

.statusbtn {
  text-align: left;
  margin-left: 60px;
}
</style>
