<template>
  <div class="container">
    <el-card class="product-detail">
      <el-row :gutter="20" justify="center">
        <el-col :span="12">
          <div class="product-images">
            <el-image
              :src="mainImage"
              alt="商品大圖"
              @mouseover="showZoom = true"
              @mouseout="showZoom = false"
              @mousemove="moveZoom"
              style="width: 300px; border-radius: 8px; cursor: pointer;"
            />
            <div
              class="zoom-result"
              v-show="showZoom"
              ref="zoomResult"
              :style="{ backgroundImage: `url(${mainImage})` }"
            ></div>

            <div class="smalllist">
              <img
                v-for="(image, index) in product.imageUrls"
                :key="index"
                :src="image.imageUrl" 
                class="small-image"
                :class="{ selected: mainImage === image.imageUrl }"
                @click="mainImage = image.imageUrl"
              />
            </div>
          </div>
        </el-col>

        <el-col :span="12" class="product-info">
          <h1>{{ product.name }}</h1>
          <p>商品貨號：{{ product.id }}</p>
          <p class="price">${{ product.price }}</p>
          <p>商品規格：<span>{{ product.specifications }}</span></p>

          <div class="product-actions1">
            <el-input-number v-model="quantity" :min="1" />
          </div>
          <div class="product-actions2">
            <el-button type="danger" @click="addToCart">加入購物車</el-button>
            <el-button type="warning" @click="buyNow">立即結帳</el-button>
            <el-button type="info" @click="addToWishlist">加入收藏</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center" style="margin-top: 20px; text-align: left;">
        <el-col :span="24">
          <el-card shadow="never">
            <h2>商品詳細說明</h2>
            <p>{{ product.description }}</p>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center" style="margin-top: 20px; text-align: left;">
        <el-col :span="24">
          <el-card shadow="never">
            <h2>評價</h2>
            <div v-for="review in product.reviews" :key="review.id" class="review">
              <p><strong>{{ review.username }}</strong> 評價：{{ review.rating }} ★</p>
              <p>{{ review.comment }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import apiClient from '@/common/api';

export default {
  data() {
    return {
      product: {
        id: "",
        name: "",
        price: "",
        specifications: "",
        description: "",
        imageUrls: [],
        reviews: []
      },
      mainImage: "",
      quantity: 1,
      showZoom: false,
    };
  },
  methods: {
    addToCart() {
      const cartitem ={
        memberId: 11300000050,
        productId: this.product.id,
        quantity: this.quantity,
        unitPrice: this.product.price,
      }
      apiClient.post('/cart/add', cartitem).then(res=>{
        console.log(res);
        this.$message.success("新增購物車成功！");
      })
    },
    buyNow() {
      console.log("立即結帳");
    },
    addToWishlist() {
    const wishlistItem = {
      memberId: 11300000050, // 用户ID，假设你已知
      productId: this.product.id,
      productPrice: this.product.price,
    };

    apiClient.post('/favorites/addlist', wishlistItem) // 假设后端的收藏 API 为 /favorites/add
      .then(res => {
        console.log(res);
        this.$message.success("加入收藏成功！");
      })
      .catch(err => {
        console.error("加入收藏失败：", err);
        this.$message.error("加入收藏失败！");
      });
    },
    moveZoom(event) {
      const zoomElement = this.$refs.zoomResult;
      const rect = zoomElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      zoomElement.style.backgroundPosition = `${x}% ${y}%`;
    },
    getProductDetail() {
      const id = this.$route.params.id; 
      apiClient.get(`/product/productDetail/${id}`).then((res) => {
        console.log("看這裡" + JSON.stringify(res.data))
        this.product = res.data; // 更新 product

        this.mainImage = this.product.imageUrls.length > 0 ? this.product.imageUrls[0].imageUrl : ""; // 设置主图为第一张图片
      }).catch((error) => {
        console.error("Failed to fetch product details:", error);
      });
    }
  },
  created() {
    this.getProductDetail();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-detail {
  margin-top: 40px;
  width: 100%;
}

.smalllist {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.small-image {
  width: 20%;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.small-image:hover {
  transform: scale(1.05);
}

.small-image.selected {
  border: 2px solid #e63946;
}

.product-info {
  text-align: left;
}

.product-info h1,
.product-info p {
  margin-bottom: 10px;
}

.product-actions2 {
  margin-top: 10px;
}

.zoom-result {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border: 1px solid #eee;
  position: absolute;
  z-index: 9999;
  background-size: 200%; 
  background-repeat: no-repeat;
}
</style>
