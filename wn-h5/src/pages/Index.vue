<template>
  <div class="hello">
    <el-container>
    <el-header style="height:150px">
   <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item,index) in banner" :key="index">
         <img :src="item.path"></img>
        </el-carousel-item>
      </el-carousel>
    </div>
    </el-header>
    <el-main>
    <div class="profession">
    <el-row>
    <el-col :span="6"><router-link to="/list"><el-button type="text">人工智能</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">大数据</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">JAVA</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">WEB前端</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">PHP</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">安卓</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">IOS</el-button></router-link></el-col>
    <el-col :span="6"><router-link to="/list"><el-button type="text">运维</el-button></router-link></el-col>
    </el-row>
  </div>
  <el-row class="re_title"><span>每日推荐</span></el-row>
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
  </el-main>
    <c-footer></c-footer>
  </el-container>
  </div>
</template>

<script>
import cFooter from '../components/Footer.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '首页',
      banner:[
        {
          name:'one',
          path:'wn-career/wn-h5/src/assets/one.jpg'
        },
        {
          name:'two',
          path:'wn-career/wn-h5/src/assets/two.jpg'
        },
        {
          name:'three',
          path:'wn-career/wn-h5/src/assets/three.jpg'
        },
        {
          name:'four',
          path:'wn-career/wn-h5/src/assets/four.jpg'
        }
        ]
    }
  },
  components:{
    cFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import '../assets/css/common.css';
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
.el-button{
    margin:10px 1px;
}
li{
  list-style:none;
  float:left;
  display: inline-block;
}
.profession{
    color:#ff6f84;
}

</style>
