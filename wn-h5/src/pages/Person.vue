<template>
  <div class="hello">
<el-row class="personInfo">
  <el-col :span="8" class="headpic">
  <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </el-col>
  <el-col :span="16" class="personInfo">
    盖伟伟
  </el-col>
</el-row>
<el-row class="myOption">
  <el-col :span="24"><div class="grid-content bg-purple-dark">我的老师 <i class="el-icon-arrow-right"></i></div></el-col>
</el-row>
<el-row class="myOption">
  <el-col :span="24"><div class="grid-content bg-purple-dark">我的老师<i class="el-icon-arrow-right"></i></div></el-col>
</el-row>
<el-row class="myOption">
  <el-col :span="24"><div class="grid-content bg-purple-dark">成为老师<i class="el-icon-arrow-right"></i></div></el-col>
</el-row>
<el-row class="myOption">
  <el-col :span="24"><div class="grid-content bg-purple-dark">关于我们<i class="el-icon-arrow-right"></i></div></el-col>
</el-row>
<el-row class="loginOut">
<router-link to="/Login">
  <el-col :span="24"> <el-button type="info">退出</el-button></el-col>
  </router-link>
</el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '个人中心',
      imageUrl:'/wn-career/wn-h5/src/assets/head1.jpg'
    }
  },
  methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
.headpic{
  text-align:left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius:50%;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    border-radius:50%;
  }
  .personInfo{
    padding:20px;
    background:#ff6f84;
    font-size:14px;
    
  }
  .myOption{
    text-align:left;
    padding:15px 20px;
    font-size:14px;
    border-bottom:1px solid #ccc;
  }
  .loginOut{
    padding-top:100px;
  }
  .loginOut .el-button{
    width:100%;
    background:#ccc;
    border:none;
  }
  .el-icon-arrow-right{
    float:right;
  }
  
</style>
