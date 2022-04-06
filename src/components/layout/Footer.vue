<template>
  <div class="fixed-footer">
    <div class='ba-content'>
      <span >©2019 申锦祥 </span>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14010602060605">
        <img src="@/assets/images/batb.png" />
        <p>晋公网安备 14010602060605号</p>
      </a>
      <a href="http://www.beian.miit.gov.cn/" target="blank" class="gitbook-link">
        晋ICP备19013438号
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'vFooter',
});
</script>
<style lang="less">
.fixed-footer {
  text-align: center;
  position: fixed;
  bottom: 0px;
  height: 40px;
  background: #fff;
  width: 100%;
  background: #eee;
  .ba-content {
    margin: 0px auto;
    height: 40px;
    display: inline-block;
  }
  span {
    font-size: 12px;
    display: inline-block;
    padding: 10px 5px;
    float: left;
  }
  a {
    float: left;
    font-size: 12px;
    display: inline-block;
    color: rgb(54, 65, 73);
    text-decoration: none;
    padding: 10px 15px;
    cursor: pointer;
    color:#939393;
    height: 20px;
    line-height: 20px;
  }
  a img {
    float: left;
    margin: 0px 0px 0px 5px;
  }
  a p {
    float: left;
    margin: 0px 0px 0px 5px;
  }
}
</style>
