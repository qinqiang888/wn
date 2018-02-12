<template>
  <div class="">
  <el-col :span="18"><el-input
    placeholder="请输入姓名、公司或者问题搜索行家"
    prefix-icon="el-icon-search"
    v-model="searchKey">
  </el-input>
  </el-col>
    <el-col :span="6">
      <el-button type="primary" @click="getHelperList('1')">搜索</el-button>
      </el-col>
    <div class="recomend">
  <ul v-if="(teachList.length)>0">
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
  <ul v-else>没有搜到相关信息</ul>
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
      searchKey:'',
      pageNo:'1',
      pageSize:'10',
      isScroll:'true',
      totalPage:'',
      teachList:'',
    }
  }, 
  methods:{
    //获取老师列表
    getHelperList(pageNo){
      let pageSize=this.pageSize;
      let _this=this;
      let dt={
          data:JSON.stringify({
              function:'getHelperList',
              pageNo:pageNo.toString(),
              pageSize:pageSize,
              searchKey:_this.searchKey
          })
      }
      this.$api.getHelperList(dt)
        .then(res =>{
          if(res.code=="0000"){
            if(pageNo==1){
              _this.teachList=res.data.list;
            }else if(res.code=="0001"){
               this.$router.push("/Login")
            } else{
               _this.teachList=_this.teachList.concat(res.data.list);
            }
              _this.totalPage=res.data.count
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
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (_this.isScroll && _this.pageNo <= _this.totalPage) {
            // if (wh + top >= listHeight) {
            if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
              console.log(document.body.scrollTop + window.innerHeight)
              console.log(document.body.offsetHeight)
                /*var load = document.createElement('div');
                  load.className = 'dropload-down';
                  load.innerHTML = '<div class="dropload-load">已暂无数据</div>';
                  target.appendChild(load);*/
                _this.pageNo++;
                _this.isScroll = false;
                // target.appendChild(load);
                setTimeout(function () {
                    _this.getHelperList(_this.pageNo);
                }, 800);
            }
        }
    }
    },
  },
  created(){
    this.getHelperList(1)
    this.Scroll()
    document.title="老师列表"
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

}
a {
  color: #42b983;
}
</style>
