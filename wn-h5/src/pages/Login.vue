<template>
  <div class="">
    <el-row>
        <el-col :span="24">
        <div class="login">
            <el-row class="tab"><el-col :span="10">密码登录</el-col><el-col :span="4">|</el-col><el-col :span="10">验证码登录</el-col></el-row>
            <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm">
            <el-form-item prop="mobile">
                <el-input type="text" v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号">
                <i slot="prefix" class="login-info"><img src="../assets/icon-my.png"></i>
                </el-input>
                
            </el-form-item>
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"  placeholder="请输入密码">
                <i slot="prefix" class="login-info"><img src="../assets/icon-pass.png"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="loginbutton">提交</el-button>
            </el-form-item>
            </el-form>
        </div>
        </el-col>
    </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      var checkmobile= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'));
        }
         callback()
      };
      return {
        ruleForm: {
          mobile: '',
          pass: '',
        },
        rules2: {
          mobile: [
            { validator: checkmobile, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$message.success('登录成功'); 
             this.$router.push({path: '/'});
          } else {
           this.$message.error('输入手机号/密码'); 
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
.login{
    margin:40% 20px;
    height:300px;
    font-size:14px;
    
}
.el-form-item{
    text-align:left;
    width:100%;
}
.loginbutton{
    width:100%;
}
.el-form-item__label{
    text-align: center;
}
.el-form-item__content{
    margin-left:0;
}
h3{
    padding:20px 0px;
}
.tab{
    padding:10px;
    font-weight:bold;
}
.login-info{
	height: 40px;
    line-height:40px;

}
.login-info img{
    width:15px;
    height:15px;
}
.el-input__prefix, .el-input__suffix{
    top:2px;
}
</style>
