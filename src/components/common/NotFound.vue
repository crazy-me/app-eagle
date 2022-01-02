<template>
  <div class="main-container">
    <div class="error-area pt-50 alignCenter">
      <div class="container">
        <div class="error-content">
          <h2>404</h2>
          <p>Ooops! Something went wrong .</p>
          <router-link :to="{ path: 'home' }">回到首页</router-link>
          <a class="ml-10"
             @click="$router.go(-1)">返回上一页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-container {
  width: 100%;
  min-height: 100vh;
  background: #f3f8fb;

  .error-content {
    background: #fff;
    width: 50%;
    margin: auto;
    padding: 70px 30px;
  }

  .error-content h2 {
    font-size: 98px;
    font-weight: 800;
    color: #3367d6;
    margin-bottom: 28px;
    text-shadow: -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 3px 3px 0 #ffffff,
      4px 4px 0 #6569dc, 5px 5px 0 #6569dc, 6px 6px 0 #6569dc, 7px 7px 0 #6569dc;
    font-family: 'lato', sans-serif;
  }

  .error-content img {
    margin-bottom: 50px;
  }

  .error-content p {
    font-size: 17px;
    color: #3367d6;
    font-weight: 600;
  }

  .error-content a {
    text-decoration: none;
    display: inline-block;
    margin-top: 40px;
    background: #3367d6;
    color: #fff;
    padding: 16px 26px;
    border-radius: 3px;
  }
}
</style>
