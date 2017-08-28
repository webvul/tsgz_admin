<template>
  <section :style="'position:relative;height:'+($store.state.screenHeight-190)+'px'">
    <div class="formDate">
      <el-form :inline="true" v-model="management.form" class="demo-form-inline">
        <el-form-item labelWidth="30px"></el-form-item>
        <el-form-item label="归属公司：">
          <el-select-tree v-model="management.form.companyId"
                          :treeData="management.companyTree"
                          :propNames="defaultProps"
                          placeholder="请选择归属公司"
                          @setSelectedId="setSelectedId"
          >
          </el-select-tree>
        </el-form-item>
        <el-form-item label="登录名：">
          <el-input size="small" v-model="management.form.loginName" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" v-model="management.form" class="demo-form-inline">
        <el-form-item labelWidth="30px"></el-form-item>
        <el-form-item label="归属部门：">
          <el-select-tree
            v-model="management.form.officeId"
            :treeData="management.officeTree"
            :propNames="defaultProps"
            clearable
            :type="2"
            @setSelectedId="setSelectedOffiveId"
            placeholder="必须选择部门">
          </el-select-tree>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input size="small" v-model="management.form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableTree">
      <el-table
        :data="management.data.data"
        :height="($store.state.screenHeight-325)"
        border
      >
        <el-table-column
          label="归属公司"
        >
          <template scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="归属部门"
        >
          <template scope="scope">
            <p>{{ scope.row.officeName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="登录名"
        >
          <template scope="scope">
            <p>{{ scope.row.loginName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="姓名"

        >
          <template scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话"

        >
          <template scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机"

        >
          <template scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"

        >
          <template scope="scope">
            <el-button
              size="small"
              type="text"
              @click.native="handleEdit(scope.$index, scope.row)">修改
            </el-button>
            <el-button
              size="small"
              type="text"
              @click.native="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageFooter">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="management.pageNo"
                     :page-sizes="[10,15,20]" :page-size="management.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="management.total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
  import selectTree from "../../../../components/tableTree/selectTree.vue"
  export default {
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        tableHeight: '',
      }
    },
    props: ['management'],
    components: {
      'el-select-tree': selectTree,
    },
    mounted(){
        console.log(11);
    },
    methods: {
      setSelectedId(val){
        this.management.form.companyId = val;
      },
      setSelectedOffiveId(val){
        this.management.form.officeId = val;
      },
      search(){
        this.$emit('submitUserList');

      },
      handleSizeChange(page){
        this.$emit("changeSizePage", page)
      },
      handleCurrentChange(page){
        this.$emit("changeCurrentPage", page)
      },
      handleDelete(index, row){
        this.$emit('handleDeleteGet', index, row);
      },
      handleEdit(index, row){
        this.$emit('handleEditData', index, row)
      }

    }
  }
</script>

<!--使用sass语法进行编译样式-->
<style lang="scss" scoped>
  .el-form {
    .el-form-item {
      margin-bottom: 1px;
      margin-top: 5px;
    }
  }

  .pageFooter {
    position: absolute;
    height: 40px;
    bottom: 0;
    .el-pagination{
      position:relative;
      top:5px;
    }
  }

</style>
