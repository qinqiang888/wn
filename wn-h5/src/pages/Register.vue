<template>
  <div class="">
    <el-row>
        <el-col :span="24">
        <div class="register">
            <!--<el-row class="tab"><el-col :span="24" ><span @click="loginType" data-type="0"></span></el-col></el-row>-->
            <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm">
            <el-form-item prop="mobile">
                <el-input type="text" v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号" :maxlength="11">
                <i slot="prefix" class="login-info"><img src="../assets/icon-my.png"></i>
                </el-input>
                
            </el-form-item>
            <el-form-item prop="authCode">
                <el-col :span="12">
                <el-input type="text" v-model="ruleForm.authCode" auto-complete="off"  placeholder="请输入验证码">
                <i slot="prefix" class="login-info"><img src="../assets/icon-yzm.png"></i>
                </el-input>
                </el-col>
                 <el-col :span="2">&nbsp</el-col>
                <el-col :span="10">
                <el-button type="primary" @click="authcodeSend" class="loginbutton">{{codemsg}}</el-button>
                </el-col>
            </el-form-item>
                       <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码" :maxlength="16">
                <i slot="prefix" class="login-info"><img src="../assets/icon-pass.png"></i>
                </el-input>
                
            </el-form-item>
               <el-form-item prop="confirmPass">
                <el-input type="password" v-model="ruleForm.confirmPass" auto-complete="off" placeholder="请再次输入密码" :maxlength="16">
                <i slot="prefix" class="login-info"><img src="../assets/icon-pass.png"></i>
                </el-input>
                
               
            </el-form-item>
             <!--
              <el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
              <el-option label="学生" value="1" ></el-option>
              <el-option label="老师" value="2" ></el-option>
             </el-select>
          </el-form-item>
          -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="loginbutton">注册</el-button>
                <el-button type="text" @click="redict_login">我是老用户，去登录-></el-button>
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
      var authCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }
         callback()
      };
      return {
        flag:true,
        codemsg:'获取验证码',
        ruleForm: {
          mobile: '',
          pass: '',
          confirmPass:'',
          authCode:'',
          authCodeId:'',
          userType:'1'
          
        },
        rules2: {
          mobile: [
            { validator: checkmobile, trigger: 'blur' }
          ],
          authCode: [
            { required: false, message: '请输入验证码', trigger: 'change' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          confirmPass: [
            { required: true, message: '请再次输入密码', trigger: 'change' }
          ],
          userType: [
            { required: false, message: '请选择用户类型', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.pass==this.ruleForm.confirmPass){
                this.register()
              }else{
                this.$message.error('密码不一致'); 
              }
          } else {
           this.$message.error('输入手机号/密码'); 
            return false;
          }
        });
      },
      //获取验证码
      authcodeSend(){
        let _this=this;
        let time=60;
        if(!this.flag){
          return
        }
        // let dt=encodeURI("{userMobile:'13345678999'}")
        let dt = {
          data: JSON.stringify({function:'getSmsAuthCode',phone:_this.ruleForm.mobile})
        }
        if(_this.ruleForm.mobile==''){
           _this.$message.error('请输入手机号');
        }else{
            api.RegistVerifiCode(dt)
                .then(res => {
                  console.log(res)
                    if(res.code=="0000") {
                      _this.flag=false
                      _this.authCodeId=res.data.authCodeId
                      clearInterval(sendtime)
                      let sendtime=setInterval(function(){
                         time--
                        _this.codemsg=`${time}s后重新获取`
                        if(time<=0){
                           _this.codemsg='重新获取'
                           _this.flag=true
                           clearInterval(sendtime)
                        }
                      },1000)
 
                        // let userInfo = Object.assign()
                        // this.$store.dispatch('setLoadingState', false)
                        // this.setUserInfo(res.data)
                        // this.$router.replace('/home')
                    }else{
                      _this.$message.success(res.msg);
                    }
                })
                .catch(error => {
                    console.log('error')
                    _this.flag=true
                })
        }
      },
      register(){
        let _this=this;
        let mobile=this.ruleForm.mobile;
        let authCodeId=this.ruleForm.authCodeId;
        let authCode=this.ruleForm.authCode;
        let password=this.ruleForm.pass;
        let userType=this.ruleForm.userType;
        let dt={
        data:JSON.stringify({
          function:'register',
          mobile:mobile,
          password:password,
          authCode:authCode,
          authCodeId:authCodeId,
          userType:userType
        })
      } 
        this.$api.Register(dt)
        .then(res =>{
          if(res.code=="0000"){
             _this.$message.success(res.msg);
                setTimeout(function(){
                    _this.$router.push({path: '/'});
                },1000)
          }else{
            return _this.$message.error(res.msg); 
          }
        })
        .catch(error=>{
          return _this.$message.error(res.message); 
        })
      },
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      redict_login(){
        this.$router.push({path: '/login'});
      },
      loginType(e){
        console.log(e)
        console.log(this)
        this.ruleForm.type=e.target.dataset.type
      },
    },
    created(){
      document.title='注册'
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
.register{
  padding:10px;
    
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
