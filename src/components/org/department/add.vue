<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="depForm">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="部门创建时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="部门描述" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addDep, getDepInfo, updateDep } from "@/api/api.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        //value-formate 和rules不能同时使用  value-format="yyyy-MM-dd"  value-format="hh-mm-ss"
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    //this.$router//存放的都是方法
    //this.$route//存放的都是属性
    // 若有id就是编辑，没有id就是新增
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    //获取对应部门的数据
    this.id && this.getInfo(); //只有在编辑的情况下才需要获取数据
  },
  methods: {
    //根据id去后台要详细信息
    getInfo() {
      let id = this.$route.query.id;
      getDepInfo(id).then(data => {
        console.log(data);
        this.ruleForm.name = data.data.name;
        this.ruleForm.desc = data.data.desc;
        this.ruleForm.date1 = new Date("2020-05-29");
        this.ruleForm.date2 = new Date("2020-05-29 23:20:10");
      });
    },
    back() {
      // this.$router.back();
      this.$router.go(-1);
    },
    formateTime(time) {
      //获取时分秒
      return (
        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
      );
    },
    formateDate(date) {
      //获取年月日
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //this.id存在 那么就嗲用update
          /* this.id
            ? updateDep({
                name: this.ruleForm.name,
                desc: this.ruleForm.desc,
                departmentId: this.id,
                time:
                  this.formateDate(this.ruleForm.date1) +
                  " : " +
                  this.formateTime(this.ruleForm.date2)
              }).then(data => {
                if (data.code == 0) {
                  this.$alert("恭喜您更新成功", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      //点击确定 跳转到列表页
                      this.$router.push("/org/list");
                    }
                  });
                } else {
                  this.$alert("更新失败", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                }
                console.log(data);
              })
            : addDep({
                name: this.ruleForm.name,
                desc: this.ruleForm.desc,
                time:
                  this.formateDate(this.ruleForm.date1) +
                  " : " +
                  this.formateTime(this.ruleForm.date2)
              }).then(data => {
                if (data.code == 0) {
                  this.$alert("恭喜您新增成功", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      //点击确定 跳转到列表页
                      this.$router.push("/org/list");
                    }
                  });
                } else {
                  this.$alert("新增失败", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                }
                console.log(data);
              }); */
          //alert("submit!");
          //this.$refs[formName].resetFields();
         // let f = this.id ? updateDep : addDep;
          let obj = {
            name: this.ruleForm.name,
            desc: this.ruleForm.desc,
            time:
              this.formateDate(this.ruleForm.date1) +
              " : " +
              this.formateTime(this.ruleForm.date2)
          };
          this.id ? (obj.departmentId = this.id) : null;
         // f(obj).then(data => {
           (this.id ? updateDep(obj) : addDep(obj)).then(data=>{
            if (data.code == 0) {
              let str = this.id ? '更新':'新增'
              this.$alert("恭喜您"+str+"成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  //点击确定 跳转到列表页
                  this.$router.push("/org/list");
                }
              });
            } else {
              this.$alert(str+"失败", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.depForm {
  text-align: left;
  width: 60%;
  .line {
    text-align: center;
  }
}
</style>