<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-content">
    <h2 style="margin-bottom: 20px;">新增商品</h2>
  

    <div class="form-container">
      <div class="upload-content" style="display: flex; align-items: flex-start; margin-bottom: 20px;">
      <label for="商品圖片" class="el-form-item__label" style="width: 120px; text-align: right; margin-right: 10px;">商品圖片</label>
      <el-upload
        class="upload-section"
        action="/api/upload/image"
        list-type="picture-card"
        :limit="4"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :on-change="handleChange"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            :title="file.name"
            alt=""
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form-section">
        <el-form-item label="商品名稱" prop="name">
          <el-input v-model="form.name" class="input-width" />
        </el-form-item>

        <el-form-item label="商品簡介" prop="introduction">
          <ckeditor v-model="form.introduction" :config="editorConfig"></ckeditor>
        </el-form-item>

        <el-form-item label="商品描述" prop="description">
          <ckeditor v-model="form.description" :config="editorConfig"></ckeditor>
        </el-form-item>

        <el-form-item label="商品分類" prop="category">
          <el-select v-model="form.category" placeholder="請選擇商品分類" class="input-width">
            <el-option-group 
              v-for="parentCategory in categories" 
              :key="parentCategory.categoryId" 
              :label="parentCategory.name"
            >
              <el-option 
                v-for="subCategory in parentCategory.children" 
                :key="subCategory.categoryId" 
                :label="subCategory.name" 
                :value="subCategory.categoryId" 
              />
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="商品規格" prop="specifications">
          <el-input
            v-model="form.specifications" 
            placeholder="請輸入商品規格" 
            class="input-width"
          />
        </el-form-item>

        <el-form-item label="商品售價" prop="price">
          <el-input v-model="form.price" class="input-width" />
        </el-form-item>

        <el-form-item label="商品庫存" prop="stock">
          <el-input v-model="form.stock" class="input-width" />
        </el-form-item>

        <el-form-item label="銷售開始時間" prop="saleStartTime">
          <el-date-picker 
            type="datetime" 
            placeholder="選擇銷售開始時間" 
            v-model="form.saleStartTime" 
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="銷售結束時間" prop="saleEndTime">
          <el-date-picker 
            type="datetime" 
            placeholder="選擇銷售結束時間" 
            v-model="form.saleEndTime" 
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="狀態" class="status-form-item somethinginput" prop="status">
          <el-radio-group v-model="form.status" class="input-width radioclas" style="text-align: left;">
            <el-radio label="1">上架</el-radio>
            <el-radio label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="background-color: #588157; border: 0;">新建商品</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import apiClient from '@/common/api';
import CKEditor from 'ckeditor4-vue';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() { 
    return {
      form: {
        name: '',
        introduction: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        saleStartTime: '',
        saleEndTime: '',
        status: '1',
        specifications: '',
        imageUrls: [], // 存放圖片URL的數組
      },
      rules: {
        name: [{ required: true, message: '請輸入商品名稱', trigger: 'blur' }],
        specifications: [{ required: true, message: '請輸入商品規格', trigger: 'blur' }],
        price: [{ required: true, message: '請輸入商品售價', trigger: 'blur' }],
        stock: [{ required: true, message: '請輸入商品庫存', trigger: 'blur' }],
        status: [{ required: true, message: '請選擇狀態', trigger: 'blur' }],
        saleStartTime: [{ required: true, message: '請選擇銷售開始時間', trigger: 'blur' }],
        saleEndTime: [{ required: true, message: '請選擇銷售結束時間', trigger: 'blur' }]
      },
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      editorConfig: {},
      categories: [], // 类别数据
      limit: 4
    };
  },
  methods: {
    handleChange(file) {
      const formData = new FormData();
      formData.append('file', file.raw);

      apiClient.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        this.handleUploadSuccess(response.data, file);
      })
      .catch(error => {
        console.error("上传失败", error);
        this.$message.error("上传失败：" + error.message);
      });
    },
    handleExceed() {
      this.$message.warning(`选择的文件数量超过限制，最多可以选择 ${this.limit} 个文件`);
    },
    handleUploadSuccess(response, file) {
      if (response) {
        const uploadedFileUrl = response; // 这里假设返回的响应是图片的 URL
        this.form.imageUrls.push(uploadedFileUrl);
        file.url = uploadedFileUrl;
        console.log("成功：" + uploadedFileUrl);
      } else {
        console.error("上传返回的数据不包含 URL:", response);
        this.$message.error("上传失败：返回的数据不包含有效的 URL");
      }
    },
    handleRemove(file) {
      this.form.imageUrls.splice(this.form.imageUrls.indexOf(file.url), 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getCategoryList() {
      apiClient.get('/category/list').then(res => {
        console.log("获取的商品分类:", res.data); // 输出获取的数据
        this.categories = this.buildCategoryTree(res.data);
      }).catch(err => {
        console.error("获取商品分类失败", err);
      });
    },
    buildCategoryTree(categories) {
      const categoryMap = {};
      const categoryTree = [];

      // 首先将所有分类放入一个 Map 中
      categories.forEach(category => {
        categoryMap[category.categoryId] = { ...category, children: [] };
      });

      // 然后根据 parentId 将子分类放到父分类的 children 中
      categories.forEach(category => {
        if (category.parentId === null) {
          categoryTree.push(categoryMap[category.categoryId]);
        } else {
          categoryMap[category.parentId].children.push(categoryMap[category.categoryId]);
        }
      });

      return categoryTree;
    },
    fetchProductData() {
      console.log("來到這");
      const id = this.$route.params.id; // 获取路由参数中的 ID
      console.log(id);
      if (id) {
        apiClient.get(`/product/add/${id}`).then(res => {
          this.form = res.data; // 将获取的商品信息填充到表单中
          this.form.imageUrls = res.data.imageUrls || []; // 确保 imageUrls 被正确设置
        }).catch(err => {
          console.error("获取商品信息失败", err);
          this.$message.error("获取商品信息失败：" + err.message);
        });
      }
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const url = this.$route.params.id ? `/product/update/${this.$route.params.id}` : '/product/add';
          apiClient.post(url, this.form)
            .then(response => {
              console.log(response);
              this.$message.success("商品操作成功");
              this.$router.push("/products"); // 提交成功后跳转
            })
            .catch(error => {
              console.error("提交失败", error);
              this.$message.error("提交失败：" + error.message);
            });
        } else {
          console.log("表单验证失败");
        }
      });
    },
  },
  created() {
    this.getCategoryList(); // 获取商品分类
    this.fetchProductData(); // 获取商品信息
  },
};
</script>

<style scoped>
.upload-content {
  margin-bottom: 20px;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.input-width {
  width: 100%;
}

.status-form-item {
  margin-bottom: 20px;
}
</style>
