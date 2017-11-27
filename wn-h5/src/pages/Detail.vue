<template>
  <div class="">
  <el-row>
  <el-col class="detailhead"><img src="../../static/images/zhuanjia.jpg"></img></el-col>
    <el-col :span="24" class="headInfo"><h4>盖伟伟</h4><h5>美团酒店事业部技术专家</h5></el-col>
</el-row>
</el-row>
<el-row class="pingjia">
  <el-col :span="8">好评率100%</el-col>
  <el-col :span="8">已服务26次</el-col>
  <el-col :span="8">北京</el-col>
</el-row>
<el-row class="line">
  <el-col :span="24"></el-col>
</el-row>
<el-row class="answer">
<el-row v-for="item in 3" :key="item">
  <el-col :span="8">简答一：</el-col>
  <el-col :span="8">语音</el-col>
  <el-col :span="8">视频</el-col>
</el-row>
</el-row>
<el-row class="line">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row class="answer">
<el-row  v-for="item in 3" :key="item" >
  <el-col :span="8">职位一：</el-col>
  <el-col :span="8">java高级工程师</el-col>
  <el-col :span="8">北京</el-col>
</el-row>
</el-row>
<el-row class="line">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row class="introduce">
  <h4>老师介绍</h4>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div>
  <p>我毕业于清华大学，先后在国有大型ERP研发中心，和百度担任JAVA工程师，数据库工程师超过8年，擅长大型web系统架构，数据库架构，曾负责过亿级数据的存储，以及百度客户数据仓库的设计，希望我的经验能帮助到你。</p>
  </el-col>
</el-row>
 <c-footer></c-footer>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '老师详情'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.detailhead {
  height:150px;
  width:100%;
}
.detailhead img{
  width:100%;
  height:100%;
}
.headInfo{
  position:absolute;
  bottom:10px;
  left:0;
  color:#fff
}
.pingjia{
  font-size:14px;
  height:40px;
  line-height:40px;
  color:#ff6f84;
}
.answer{
  color:#fff;
}
.answer .el-row{
  background:#ff6f84;
  height:40px;
  line-height:40px;
  margin:5px 10px;
  font-size:14px;
}
.line{
  background:#ccc;
  height:8px;
}
.introduce h4{
  text-align:left;
  padding:10px
}
.introduce p{
  padding:0 10px;
  text-align:left;
  text-indent: 2rem
}
</style>
