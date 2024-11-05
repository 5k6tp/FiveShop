<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <div>
      <carousel />
      <bestseller />
      <news />
    </div>
  </template>
  
  <script>
  import carousel from './layout/carousel.vue';
  import bestseller from './layout/bestseller.vue';
  import News from './layout/news.vue';
  
  export default {
    components: {
      carousel,
      bestseller,
      News
    }
  }
  </script>
  
  <style>

  </style>
  