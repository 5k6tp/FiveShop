<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <h1>分類管理介面</h1>
    <div class="create-button">
      <el-button type="primary" @click="openMainCategoryDialog">新建主分類</el-button>
    </div>

    <el-dialog
      title="主分類操作"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="主分類名稱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="狀態" style="text-align: left;">
          <el-radio-group v-model="form.status">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">無效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCategoryAction">{{ isEdit ? '編輯' : '新 建' }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="子分類操作"
      :visible.sync="subDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="主分類名稱">
          <h2 style="text-align: left;">{{ form.parentsName }}</h2>
        </el-form-item>

        <el-form-item label="子分類名稱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="狀態" style="text-align: left;">
          <el-radio-group v-model="form.status">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">無效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubCategoryAction">{{ isEditSub ? '編輯' : '新 建' }}</el-button>
      </span>
    </el-dialog>

    <div id="Categorys" class="card">
      <el-table :data="Categorys" style="width: 100%" @expand-change="handleExpand" :empty-text="'沒有資料'">
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-table :data="row.subCategories" style="width: 100%" class="subCategory" :show-header="false" :empty-text="'沒有資料'">
              <el-table-column prop="name" label="子分類名稱"></el-table-column>
              <el-table-column prop="status" label="狀態">
                <el-tag :type="row.status === 1 ? 'success' : 'danger'" disable-transitions>
                  {{ row.status === 1 ? '有效' : '禁用' }}
                </el-tag>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row: subCategory }">
                  <el-button size="small" type="info" @click="openSubCategoryDialog(subCategory, true, row)">編輯</el-button>
                  <el-button size="small" type="danger" @click="goToDeleteSubCategory(subCategory.categoryId)">刪除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分類名稱"></el-table-column>
        <el-table-column prop="status" label="狀態">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" disable-transitions>
              {{ row.status === 1 ? '有效' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="success" @click="openSubCategoryDialog(null, false, row)">新建</el-button>
            <el-button size="small" type="info" @click="openMainCategoryDialog(row)">編輯</el-button>
            <el-button size="small" type="danger" @click="goToDeleteCategory(row.categoryId)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      Categorys: [],
      dialogVisible: false,
      subDialogVisible: false,
      isEdit: false,
      isEditSub: false,
      form: {
        name: '',
        status: '',
        parentsName: '',
        parentId: ''
      }
    };
  },
  methods: {
    openMainCategoryDialog(category = null) {
      this.resetForm();
      this.isEdit = !!category;
      if (category) {
        this.form = {
          name: category.name,
          status: category.status,
          parentsName: '',
          parentId: category.categoryId // 存儲當前分類的 ID 以便編輯
        };
      }
      this.dialogVisible = true;
    },
    resetForm() {
      this.form = {
        name: '',
        status: '',
        parentsName: '',
        parentId: ''
      };
    },
    handleCategoryAction() {
      if (this.isEdit) {
        // eslint-disable-next-line no-unused-vars
        apiClient.put(`/category/edit/${this.form.parentId}`, this.form).then(res => {
          this.$message.success("編輯分類成功！");
        });
      } else {
        // eslint-disable-next-line no-unused-vars
        apiClient.post('/category/add', this.form).then(res => {
          this.$message.success("新建分類成功！");
        });
      }
      this.dialogVisible = false;
      this.getCategoryList();
    },
    openSubCategoryDialog(subCategory = null, isEdit = false, parentCategory = null) {
      this.resetForm();
      this.isEditSub = isEdit;
      if (subCategory) {
        this.form = {
          name: subCategory.name,
          status: subCategory.status,
          parentsName: parentCategory.name,
          parentId: parentCategory.categoryId
        };
      } else if (parentCategory) {
        this.form.parentsName = parentCategory.name;
        this.form.parentId = parentCategory.categoryId; // 設置父分類 ID
      }
      this.subDialogVisible = true;
    },
    handleSubCategoryAction() {
      if (this.isEditSub) {
        // eslint-disable-next-line no-unused-vars
        apiClient.put(`/category/edit/${this.form.parentId}`, this.form).then(res => {
          this.$message.success("編輯子分類成功！");
        });
      } else {
        // eslint-disable-next-line no-unused-vars
        apiClient.post('/category/add', this.form).then(res => {
          this.$message.success("新建子分類成功！");
        });
      }
      this.subDialogVisible = false;
      this.getCategoryList();
    },
    goToDeleteCategory(categoryId) {
      // eslint-disable-next-line no-unused-vars
      apiClient.delete(`/category/delete/${categoryId}`).then(res => {
        this.$message.success("刪除分類成功！");
        this.getCategoryList();
      });
    },
    goToDeleteSubCategory(subCategoryId) {
      // eslint-disable-next-line no-unused-vars
      apiClient.delete(`/category/delete/${subCategoryId}`).then(res => {
        this.$message.success("刪除子分類成功！");
        this.getCategoryList();
      });
    },
    handleExpand(row) {
      console.log('Expanded Row:', row);
    },
    handleClose() {
      this.dialogVisible = false;
      this.subDialogVisible = false;
      this.resetForm(); // 在關閉對話框時重置表單
    },
    getCategoryList() {
      apiClient.get('/category/list').then(res => {
        this.Categorys = []; // 清空現有的分類
        res.data.forEach(item => {
          if (item.parentId == null) {
            this.Categorys.push({ ...item, subCategories: [] }); // 初始化子分類
          } else {
            const parent = this.Categorys.find(cat => cat.categoryId === item.parentId);
            if (parent) {
              parent.subCategories.push(item); // 將子分類加入到相應的父分類下
            } else {
              console.error(`找不到父分類 ID ${item.parentId} 對應的分類`);
            }
          }
        });
        console.log(this.Categorys); // 檢查父分類及其子分類結構
      });
    }
  },
  mounted() {
    this.getCategoryList(); // 在組件加載時獲取分類列表
  }
};
</script>

<style scoped>
.subCategory {
  margin-left: 20px;
}
.card {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
}
.create-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
