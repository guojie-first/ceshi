<template>
  <el-table :data="tableData" :border="true" :stripe="true" style="width: 100%">
    <!-- <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="province" label="省份" width="120"></el-table-column>-->
    <el-table-column prop="city" :index="indexFn" type="index" label="编号" width="120"></el-table-column>
    <el-table-column prop="name" label="名称" width="120"></el-table-column>
    <el-table-column prop="desc" label="描述" aligh="center" width></el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="qqq">
        <!--  scope对应的是当前这一行对应的那一条数据-->
        <el-button type="default" size="small" @click="edit(qqq)">编辑</el-button>
        <el-button type="danger" @click="deleteRow(qqq)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getDepList, removeDep } from "@/api/api.js";
export default {
  methods: {
    edit(obj) {
      this.$router.push("/org/add?id=" + obj.row.id);
      /*  this.$router.push({
        path:'/org/add',
        query:{
          id:obj.row.id
        }
      }) */
    },
    deleteRow(obj) {
      //obj $index 对应的是这条数据索引
      //obj.row 对应的是这一条数据
      console.log(obj);
      //this.tableData.splice(obj.$index, 1);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //obj.row是当前这条数据
          removeDep(obj.row.id).then(data => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.tableData.splice(obj.$index, 1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    indexFn(n) {
      //n是从0开始的
      return "索引是：" + (n + 1);
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  created() {
    getDepList().then(data => {
      console.log(data);
      //
      this.tableData = data.data;
    });
  }
};
</script>