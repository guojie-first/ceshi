<template>
  <div>
    <div class="til">
      <el-select v-model="value" placeholder="请选择部门">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :border="true"
      :stripe="true"
      max-height="450"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column type="index" label="编号" width="120"></el-table-column> -->
      <!-- :index='indexFn'  自定义索引 -->
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column label="性别" width="100">
        <template slot-scope="qqq">
          <strong>{{qqq.row.sex == 0 ? '男' : '女'}}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="100"></el-table-column>
      <el-table-column prop="job" label="职务" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="100"></el-table-column>
      <el-table-column prop="phone" label="电话" width="100"></el-table-column>
      <el-table-column prop="desc" align="center" label="描述"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="qqq">
          <!-- qqq 对应的是 当前这一行所对应的那一条数据 -->
          <el-button @click="edit(qqq)" type="default" size="small">编辑</el-button>
          <el-button @click="deleteRow(qqq)" type="danger" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
import { getDepList, getUserList } from "@/api/api.js";
export default {
  name: "userList",
  data() {
    return {
      input2: "",
      tableData: [],
      multipleSelection: [],
      options: [],
      value: ""
    };
  },
  watch: {
    value(val) {
      console.log(val);
      this.getList({
        departmentId: val,
        search: this.input2
      });
    }
  },
  created() {
    getDepList().then(data => {
      console.log(data);
      //性能优化 冻结，因为这些数据不需要被劫持
      let ary = data.data || [];
      ary.unshift({
          id:0,
          name:'全部'
      });
      //Object.freeze是用来冻结对象的，可以做性能优化
      ary = ary.map(item => Object.freeze(item));
      this.options = ary;
    });
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    getList(option) {
      getUserList(option).then(data => {
        console.log(data);
        let ary = data.data || [];
        //纯展示的数据 因为不需要响应式，所以为了性能优化，可以避免做数据劫持 所以用Object.freeze把他们冻结
        ary = ary.map(item => Object.freeze(item));
        this.tableData = ary;
      });
    },
    edit(obj) {
      console.log(obj);
    }
  }
};
</script>
<style lang="less">
.til {
  text-align: right;
  .el-input {
    margin-left: 20px;
    width: auto;
  }
}
</style>