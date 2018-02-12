<template>
  <div class="hello">
      <el-row class="foot">
       <el-col :span="8"><router-link to='/'><el-button type="text" icon="el-icon-home">首页</el-button></router-link></el-col>
      <el-col :span="8"><router-link to='/List'><el-button type="text" icon="el-icon-search">找师</el-button></router-link></el-col>
      <el-col :span="8"><router-link to='/Person'><el-button type="text" icon="el-icon-edit">我的</el-button></router-link></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '列表'
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
.el-row{
  
}
.el-button--text {
    border: none;
    color: #fff;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
    padding: 0;
}
</style>
