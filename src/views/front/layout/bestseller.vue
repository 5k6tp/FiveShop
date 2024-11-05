<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="new-arrivals-container">
      <h1>新品上市</h1>
      <div class="big-new-listed-box">
        <div class="two-item-box">
          <div>
            <img :src="newArrivals[0].image" alt="" />
            <p>限時特價</p>
          </div>
          <div>
            <img :src="newArrivals[1].image" alt="" />
          </div>
        </div>
        <div class="three-item-box">
          <div>
            <img :src="newArrivals[2].image" alt="" />
          </div>
          <div>
            <img :src="newArrivals[3].image" alt="" />
          </div>
          <div>
            <img :src="newArrivals[4].image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newArrivals: [
          { image: './images/新品上市/u1d.jpg' },
          { image: './images/新品上市/u8.jpg' },
          { image: './images/新品上市/ls8.jpg' },
          { image: './images/新品上市/a1.jpg' },
          { image: './images/新品上市/sr5.jpg' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .big-new-listed-box {
    margin: 0 auto;
    width: 1140px;
    height: 696px;
  }
  
  .big-new-listed-box .two-item-box,
  .big-new-listed-box .three-item-box {
    width: 1140px;
    height: 277px;
    background-color: pink;
  }
  
  .big-new-listed-box .two-item-box div,
  .big-new-listed-box .three-item-box div {
    position: relative;
    float: left;
    width: 570px;
    height: 277px;
    background-color: red;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  
  .big-new-listed-box .two-item-box div img,
  .big-new-listed-box .three-item-box div img {
    width: 570px;
    height: 277px;
  }
  
  .big-new-listed-box .two-item-box p {
    position: absolute;
    left: 100px;
    top: 139px;
    margin-top: -20px;
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    text-align: center;
    color: #f1f1f4;
    background-color: red;
    cursor: pointer;
  }
  
  .big-new-listed-box .two-item-box p:hover {
    color: red;
    background-color: white;
    border: 2px solid red;
  }
  
  .big-new-listed-box .three-item-box {
    width: 1140px;
    height: 419px;
    background-color: greenyellow;
  }
  
  .big-new-listed-box .three-item-box div {
    float: left;
    width: 380px;
    height: 419px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  
  .big-new-listed-box .three-item-box div img {
    width: 380px;
    height: 419px;
  }
  </style>