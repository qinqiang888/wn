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
    <li class="bor_rt" v-for="(item,index) in teachList" :key="index" data-userId="item.userId">
    <router-link :to="'/Detail/'+item.userId">
    <div class="index_icon1">
    <img :src="item.headPic">
    </div>
    <div class="index_icor1">
    <b style="font-size:16px">{{item.userName}}</b>
    <b>{{item.company}}</b><b>{{item.position}}</b>
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
  data () {
    return {
      msg: '首页',
      pageNo:'1',
      pageSize:'4',
      isScroll:'true',
      totalPage:'',
      teachList:'',
      banner:[
        {
          name:'one',
          path:'http://www.yihu365.com/images/footertu.png'
        },
        {
          name:'two',
          path:'http://www.yihu365.com/images/footertu.png'
        },
        {
          name:'three',
          path:'http://www.yihu365.com/images/footertu.png'
        },
        {
          name:'four',
          path:'http://www.yihu365.com/images/footertu.png'
        }
        ]
    }
  },
  components:{
    cFooter
  },
  methods:{
    //获取老师列表
    getHelperList(pageNo){
      let pageSize=this.pageSize
      let _this=this;
      let dt={
          data:JSON.stringify({
              function:'getHelperList',
              pageNo:pageNo.toString(),
              pageSize:pageSize
          })
      }
      this.$api.getHelperList(dt)
        .then(res =>{
          if(res.code=="0000"){
              console.log(res)
              _this.teachList=res.data.list;
              // _this.totalPage=res.totalPage
          }else{
           this.$message.error(res.msg); 
          }
      })
      .catch(error=>{
            return false
        })
    },
    Scroll(){
      let _this=this
      window.onscroll = function () {
        console.log(1111)
        return
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (_this.isScroll && _this.pageNo < _this.totalPage) {
            // if (wh + top >= listHeight) {
            if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                /*var load = document.createElement('div');
                  load.className = 'dropload-down';
                  load.innerHTML = '<div class="dropload-load">已暂无数据</div>';
                  target.appendChild(load);*/
                _this.pageNo++;
                _this.isScroll = false;
                // target.appendChild(load);
                setTimeout(function () {
                    _this.getHelperList(_this.pageNo++);
                }, 800);
            }
        }
    }
    },
  },
  created(){
    this.getHelperList(1)
    this.Scroll()
    document.title="蜗牛生涯"
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
    margin:20px 0px;
}
li{
  list-style:none;
  float:left;
  display: inline-block;
}
.profession{
    color:#409eff;
}

</style>
