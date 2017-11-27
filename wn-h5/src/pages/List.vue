<template>
  <div class="">
     <el-input
    placeholder="请输入姓名、公司或者问题搜索行家"
    prefix-icon="el-icon-search"
    v-model="searchInfo">
  </el-input>
    <div class="recomend">
  <ul>
    <li class="bor_rt" v-for="item in 4" :key="item">
    <router-link to="/Detail">
    <div class="index_icon1">
    <img src="../assets/touxiang.jpg">
    </div>
    <div class="index_icor1">
    <b style="font-size:20px">李霞</b>
    <b>第一视频Java高级经理</b>
    <p><span>擅长:&nbsp&nbsp</span>java,职业规划</p>
    </div>
   </router-link>
    </li>
  </ul>
  </div>
   <c-footer></c-footer>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '列表',
      searchInfo:'',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import '../assets/css/common.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
