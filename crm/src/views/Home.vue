<template>
  <div class="home">
    <!-- 首页 -->
    <!-- 这个是用来展示home子路由对应组件的 -->
    <!-- <router-view></router-view> -->
    <el-container>
      <el-header class="header">
        <h1>CRM管理系统</h1>
        <div class="middle">
          <router-link to="/crm">客户管理</router-link>
          <router-link to="/org">组织管理</router-link>
        </div>
        <div class="right">
          欢迎您：<!-- {{$store.state.userInfo.userName}} -->{{username}}
          <span @click="logout">安全退出</span>
        </div>
      </el-header>
      <router-view></router-view>
      <el-footer class="footer">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { logout } from "@/api/api.js";
import { SETUSERINFO } from "../store/types";
export default {
  name: "Home",
  components: {},
  data(){
    return{
    }
  },
  computed:{
    username(){
      console.log(this.$store.state.userInfo)
      return this.$store.state.userInfo.userName
    }
  },
  methods:{
    logout(){
      //调用退出接口
      logout().then((data)=>{
        //退出成功之后 要
        /* 
          1.清空localStorage
          2.清空vuex的响应信息
          3.跳转到登录页
        */
       localStorage.removeItem('crmUserInfo');
       this.$store.commit(SETUSERINFO,{});
       this.$router.push('/login');
       
      })
    }
  }
};
</script>
<style lang='less'>
.header {
  display: flex;
   
  h1{
    width:200px;
  }
  .right{
    width:200px;
  }
  .middle{
    flex: auto;
    text-align: left;
    padding-left:50px;
    a{
      padding:0 20px;
      text-decoration: none;
      color:#fff;
      font-weight: bold;
      font-size: 20px;
    }
    a.current{
      background: fuchsia;
    }
  }
}
.footer{
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
}
.container {
  position: absolute;
  top:60px;
  bottom:60px;
  width:100%;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    text-align: center;
    line-height: 60px;
    height: 60px;
    color:#fff;
  }
  .el-header{
    background: #000;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
</style>
