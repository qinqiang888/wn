<template>
  <div class="">
  <el-row>
  <el-col class="detailhead"><img :src="DetailInfo.headPic"></img></el-col>
    <el-col :span="24" class="headInfo"><h4>{{DetailInfo.userName}}</h4><h5>{{DetailInfo.company}}{{DetailInfo.position}}</h5></el-col>
</el-row>
</el-row>
<el-row class="pingjia">
  <el-col :span="8">好评率{{DetailInfo.evaluationRate*100}}%</el-col>
  <el-col :span="8">已服务{{DetailInfo.serviceCount}}次</el-col>
  <el-col :span="8">北京</el-col>
</el-row>
<el-row class="line">
  <el-col :span="24"></el-col>
</el-row>
<el-row class="answer">
<router-link v-for="(item,index) in DetailInfo.serviceList" :key="index" :to="'/Course/'+item.id">
<el-row >
  <el-col :span="8">{{item.name}}</el-col>
  <el-col :span="8">{{item.meetType}}</el-col>
  <el-col :span="8">{{item.price}}</el-col>
</el-row>
</router-link>
</el-row>
<el-row class="line" v-if=" DetailInfo.serviceList&&DetailInfo.serviceList.length>0">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row class="answer">
<router-link v-for="(item,index) in DetailInfo.positionList" :key="index" :to="'/Course/'+item.id" >
<el-row>
  <el-col :span="8">{{item.name}}</el-col>
  <el-col :span="8">{{item.company}}</el-col>
  <el-col :span="8">{{item.monthmoney}}</el-col>
</el-row>
</router-link>
</el-row>
<el-row class="line" v-if="DetailInfo.positionList&& DetailInfo.positionList.length>0">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row class="introduce">
  <h4>老师介绍</h4>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div>
  <p>{{DetailInfo.introduction}}</p>
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
      msg: '老师详情',
      serviceId:this.$route.params.id,
      DetailInfo:''
      
    }
  },
  methods:{
    getHelperDetail(){
      let _this=this;
      let dt={
        data:JSON.stringify({
          function:'getHelperDetailInfo',
          userId:this.serviceId,
          token:localStorage.token
        })
      }
      this.$api.getHelperDetail(dt)
        .then(res => {
            if(res.code=="0000") {
              _this.DetailInfo=res.data
            }else if(res.code=="0001"){
               this.$router.push("/Login")
            } else{
              _this.$message.error(res.msg);
            }
        })
        .catch(error => {
            console.log('error')
        })
    }
  },
  created(){
    console.log(this.serviceId)
    this.getHelperDetail()
    document.title="老师详情"
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
  color: #fff;
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
  color:#409eff;
}
.answer{
  color:#fff;
}
.answer .el-row{
  background:#409eff;
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
