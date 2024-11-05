import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/admin/HomeView.vue'
import member from '../views/admin/member/member.vue'
import memberblack from '../views/admin/member/memberblack.vue'
import membergroup from '../views/admin/member/membergroup.vue'
import systemmenu from '../views/admin/system/systemmenu.vue'
import systempage from '../views/admin/system/systempage.vue'
import productadd from '../views/admin/product/productadd.vue'
import productlist from '../views/admin/product/productlist.vue'
import orderlist from '../views/admin/order/orderlist.vue'
import index from '../views/front/index.vue'
import layout from '../views/front/layout.vue'
import carouseladmin from '../views/admin/layout/carouseladmin.vue'
import bestselleradmin from '@/views/admin/layout/bestselleradmin.vue'
import newsadmin from '@/views/admin/layout/newsadmin.vue'
import productDetail from '../views/front/productDetail.vue'
import cartList from '../views/front/cartList.vue'
import memberCenter from '../views/front/memberCenter.vue'
import cartcheckout from '@/views/front/cartcheckout.vue'
import cartcheckok from '@/views/front/cartcheckok.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/admin/member/list',
        name: 'memberList', 
        component: member
      },
      {
        path: '/admin/member/black',
        name: 'memberBlackList', 
        component: memberblack
      },
      {
        path: '/admin/member/group',
        name: 'memberGroupList', 
        component: membergroup
      },
      {
        path: '/admin/systemmenu',
        name: 'systemmenuList', 
        component: systemmenu
      },
      {
        path: '/admin/systempage',
        name: 'memberpageList', 
        component: systempage
      },
      {
        path: '/admin/product/add',
        name: 'admin/productadd', 
        component: productadd
      },
      {
        path: '/admin/product/add/:id',
        name: 'productadd', 
        component: productadd
      },
      {
        path: '/admin/product/list',
        name: 'productlist', 
        component: productlist
      },
      {
        path: '/admin/orderlist',
        name: 'orderlist', 
        component: orderlist
      },
      {
        path: '/admin/layout/carousel',
        name: 'carousel', 
        component: carouseladmin
      },
      {
        path: '/admin/layout/bestseller',
        name: 'bestseller', 
        component: bestselleradmin
      },
      {
        path: '/admin/layout/news',
        name: 'news', 
        component: newsadmin
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: index,
    children: [
      {
        path: '/index',
        name: 'index', 
        component: layout
      },
      {
        path: '/product/productDetail/:id',
        name: 'productDetail', 
        component: productDetail
      },
      {
        path: '/cart/list',
        name: 'cartList', 
        component: cartList
      },
      {
        path: '/member/center',
        name: 'memberCenter', 
        component: memberCenter
      },
      {
        path: '/cart/checkout',
        name: 'cartcheckout', 
        component: cartcheckout
      },
      {
        path: '/cart/checkok',
        name: 'cartcheckok', 
        component: cartcheckok
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
