<template>
  <div class="login_box">
    <h1>CRM管理系统</h1>
    <div class="content">
      <!-- suffix-icon="el-icon-date" -->
      <el-input v-model="name" placeholder="请输入用户名">
        <i slot="prefix" class="el-input__icon lid el-icon-user"></i>
      </el-input>
      <el-input v-model="psw" placeholder="请输入密码" show-password>
        <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
      </el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "@/api/api.js";
import { SETUSERINFO } from "../store/types";
export default {
  name: "login", //不能是已经存在的html标签
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    login() {
      login({
        account: this.name,
        password: this.psw
      }).then(data => {
        //登录成功之后，把用户信息存储到vuex中
        if (data.code == 0) {
          this.$store.commit(SETUSERINFO, {
            userName: this.name,
            power: data.power
          });

          localStorage.setItem('crmUserInfo',JSON.stringify({
            userName: this.name,
            power: data.power
          }))
          //编程式导航 push  replace，这两个函数的参数 跟router-link 的to属性跟的值一样
        //   this.$router.push('/') //push会产生历史
        //   //this.$router.replace({path:'/'}) //替换 ，不会产生历史
        //   console.log(this.$router)
        this.$alert("CRM欢迎您！", "登录成功", {
            confirmButtonText: "确定",
            callback: action => {
              // 点击确定走的函数
              this.$router.push('/')
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.login_box {
  width: 100%;
  height: 100%;
  background: #eee;
  padding-top: 50px;
  .content {
    width: 500px;
    // height: 300px;
    margin: 50px auto;
    padding: 30px;
    background: #fff;
    .el-input {
      width: 60%;
      margin: 30px auto;

      display: block;
    }
    button {
      margin: 30px;
    }
  }
}
</style>