<template>
  <div class="">
    <el-row>
        <el-col :span="24">
        <div class="login">
            <el-row class="tab"><el-col :span="10" ><span @click="loginType" data-type="0">密码登录</span></el-col><el-col :span="4">|</el-col><el-col :span="10" ><span @click="loginType" data-type="1">验证码登录</span></el-col></el-row>
            <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm">
            <el-form-item prop="mobile">
                <el-input type="text" v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号" :maxlength="11">
                <i slot="prefix" class="login-info"><img src="../assets/icon-my.png"></i>
                </el-input>
                
            </el-form-item>
            <el-form-item prop="pass" v-if="ruleForm.type==0">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"  placeholder="请输入密码" :maxlength="16">
                <i slot="prefix" class="login-info"><img src="../assets/icon-pass.png"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="authCode" v-else>
                <el-col :span="12">
                <el-input type="password" v-model="ruleForm.authCode" auto-complete="off"  placeholder="请输入验证码" :maxlength="6">
                <i slot="prefix" class="login-info"><img src="../assets/icon-pass.png"></i>
                
                </el-input>
                </el-col>
                 <el-col :span="2">&nbsp</el-col>
                <el-col :span="10">
                <el-button type="primary" @click="authcodeSend" class="loginbutton">{{codemsg}}</el-button>
                </el-col>
            </el-form-item>
            <!--<el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" placeholder="请选择用户类型" style="width:160px;">
              <el-option label="学生" value="1" ></el-option>
              <el-option label="老师" value="2" ></el-option>
             </el-select>
          </el-form-item>
          -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="loginbutton">登录</el-button>
                <el-button type="text" @click="redict_register">我是新用户，去注册-></el-button>
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
          type:'0',
          authCode:'',
          authCodeId:'',
          userType:'1'
          
        },
        rules2: {
          mobile: [
            { validator: checkmobile, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userType: [
            { required: false, message: '请选择用户类型', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              // if(this.$api.checkSmsAuthCode()){
                this.login()
              // }else{
              //   this.$message.error('验证码不正确'); 
              // }
              
          } else {
            let errmsg=this.type="0"?'输入手机号/密码码':'输入手机号/验证码'
           this.$message.error(errmsg); 
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
            console.log(this)
            this.$api.RegistVerifiCode(dt)
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
                      _this.$message.error(res.msg);
                    }
                })
                .catch(error => {
                    console.log('error')
                    _this.flag=true
                })
        }
      },
      //登录
      login(){
        let _this=this;
        let mobile=this.ruleForm.mobile;
        let password=this.ruleForm.pass;
        let authCodeId=this.ruleForm.authCodeId;
        let authCode=this.ruleForm.authCode;
        let userType=this.ruleForm.userType;
        let dt={
        data:JSON.stringify({
          function:'login',
          mobile:mobile,
          password:password,
          authCode:authCode,
          authCodeId:authCodeId,
          userType:userType
        })
      }
        this.$api.Login(dt)
        .then(res =>{
          if(res.code=="0000"){
             _this.$message.success(res.msg);
             localStorage.token=res.data.token;
              _this.$router.push({path: '/'});
          }else{
            _this.$message.error(res.msg); 
          }
        })
        .catch(error=>{
          _this.$message.error(res.msg); 
        })
      },
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //去注册
      redict_register(){
        this.$router.push({path: '/register'});
      },
      loginType(e){
        console.log(e)
        console.log(this)
        this.ruleForm.type=e.target.dataset.type
      },
    },
    created(){
      document.title='登录'
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

.el-input__prefix, .el-input__suffix{
    top:2px;
}
</style>
