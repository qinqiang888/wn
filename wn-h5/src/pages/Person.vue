<template>
  <div class="hello">
<el-row class="personInfo">
  <el-col :span="8" class="headpic">
  <el-upload
  class="avatar-uploader"
  action="http://www.woniucareer.com:8082/upload/upload.action?userId=1"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  header="{Access-Control-Allow-Origin: *}"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </el-col>
  <el-col :span="16" class="personInfo">
    <span @click="PerfectInfo">{{userMobile}}</span>
  </el-col>
</el-row>
<el-row class="myOption">
  <router-link :to="{path:'/Accout',query: {type: 1}}"><el-col :span="24"><div class="grid-content bg-purple-dark">我的账户<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="myOption">
  <router-link :to="{path:'/OrderList',query: {type: 1}}"><el-col :span="24"><div class="grid-content bg-purple-dark">我的预约<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="myOption" v-if="userType==2">
  <router-link :to="{path:'/OrderList',query: {type: 2}}"><el-col :span="24"><div class="grid-content bg-purple-dark">我的接单<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="myOption" v-if="userType==1&&certificationFlag==0">
  <router-link :to="{path:'/Certification',query: {type: 2}}"><el-col :span="24"><div class="grid-content bg-purple-dark">成为老师<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="myOption" v-if="userType==1&&certificationFlag==1">
  <router-link :to="{path:'/RegisterTeach',query: {type: 2}}"><el-col :span="24"><div class="grid-content bg-purple-dark">成为老师<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="myOption">
  <router-link :to="{path:'/AboutMe',query: {type: 2}}"><el-col :span="24"><div class="grid-content bg-purple-dark">关于我们<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>

<el-row class="myOption">
  <router-link to="/BackInfo"><el-col :span="24"><div class="grid-content bg-purple-dark">我要反馈<i class="el-icon-arrow-right"></i></div></el-col></router-link>
</el-row>
<el-row class="loginOut">
  <el-col :span="24"> <el-button type="info" @click="loginOut">退出</el-button></el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '个人中心',
      imageUrl:'http://www.yihu365.com/images/footertu.png',
      userHeadPic:'',//更新用户信息时的头像
      dialogImageUrl: '',
      dialogVisible: false,
      userType:'',
      userMobile:'',
      userName:'',
      userRealName:'',
      userIdCardNo:'',
      status:'',
      referrerMobile:'',
      sex:'',
      email:'',
      certificationFlag:''

    }
  },
  methods: {
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = "http://www.woniucareer.com:8082/"+res.msg;
        this.userHeadPic = res.msg;
        this.updateUserInfo()
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
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      PerfectInfo(){
        this.$router.push("/PerfectInfo")
      },
      loginOut(){
        let _this=this;
        let dt={
          data:JSON.stringify({
            function:'loginOut',
            token:localStorage.token
          })
        }
        this.$api.loginOut(dt)
          .then(res => {
              if(res.code=="0000") {
                localStorage.token='';
                this.$router.push("/Login")
              }else if(res.code=="0001"){
                this.$router.push("/Login")
              } 
              else{
                _this.$message.error(res.msg);
              }
          })
          .catch(error => {
              console.log('error')
          })
       
      },
      getUserInfo(){
        let _this=this;
        let dt={
          data:JSON.stringify({
            function:'getUserInfo',
            token:localStorage.token
          })
        }
        this.$api.loginOut(dt)
          .then(res => {
              if(res.code=="0000") {
               _this.imageUrl=res.data.headPic?res.data.headPic:'http://www.yihu365.com/images/footertu.png'
               _this.userType=res.data.userType
               _this.userMobile=res.data.userMobile
               _this.userRealName=res.data.userRealName
               _this.userIdCardNo=res.data.userIdCardNo
               _this.referrerMobile=res.data.referrerMobile
               _this.status=res.data.status
               _this.email=res.data.email
               _this.sex=res.data.sex
               _this.certificationFlag=res.data.certificationFlag
              }else if(res.code=="0001"){
                this.$router.push("/Login")
                
              } 
              else{
                _this.$message.error(res.msg);
              }
          })
          .catch(error => {
              console.log('error')
          })
       
      },
      updateUserInfo(){
        let ruleForm=this.ruleForm
        let dt={
            data:JSON.stringify({
                function:'updateUserInfo',
                userName:this.userName,
                userMobile:'',
                userRealName:this.userRealName,
                userIdCardNo:this.userIdCardNo,
                email:this.email,
                sex:this.sex,
                userHeadPic:this.userHeadPic,
                status:this.status,
                referrerMobile:this.referrerMobile,
                token:localStorage.token
            })
        }
        this.$api.updateUserInfo(dt)
        .then(res =>{
          if(res.code="0000"){
            this.$router.push("/Person")
          }else if(res.code=="0001"){
               this.$router.push("/Login")
            } else{
            return false
          }
        })
        .catch(error=>{
            return false
        })
      }
    },
     created(){
          document.title='我的'
          this.getUserInfo()
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
    background:#409eff;
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
  a{
    color:#2c3e50
  }
  
</style>
