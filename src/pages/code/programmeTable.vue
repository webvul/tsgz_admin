<template>
  <div class="page goodsPage">
    <div class="header">
      <el-form v-model="labelData" label-position="right" label-width="90px" class="ServiceTableForm">
        <el-form-item label="方案名称：">
          <el-input v-model="labelData.name" size="small"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" class="btn1" @click="getList">
          查询
        </el-button>
        <el-button type="primary" size="small" class="btn1" @click="add">
          生成方案添加
        </el-button>
      </el-form>
    </div>
    <el-table
      :data="schemeList"
      border
      style="width: 99%">
      <el-table-column label="方案名称">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生成模块">
        <template scope="scope">
          <p>{{ scope.row.packageName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="模块名">
        <template scope="scope">
          <span>{{scope.row.moduleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能名">
        <template scope="scope">
          <span>{{scope.row.functionName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能作者">
        <template scope="scope">
          <span>{{scope.row.functionAuthor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="text"
            @click="handleEdit(scope.row)">修改
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="left">
        <span style="padding-left:10px;">选择页数：</span>
        <el-select v-model="pageSize"  placeholder="选择页数" class="pageSize" size="small" @change="getList">
          <el-option
            v-for="item in pageSizeOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <el-pagination class="button" layout="prev, pager, next" @current-change="getList" :page-size="pageSize" :total="total" style="padding-right:20px;">
      </el-pagination>
    </el-col>

    <!--添加或修改弹出框-->
    <el-dialog
      title="生成方案添加"
      :visible.sync="addFormDialog"
      size="tiny"
    >
      <el-form>
        <el-form-item label="方案名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="模板分类">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="增删改查(单表)" value="curd"></el-option>
            <el-option label="增删改查(一对多)" value="2"></el-option>
            <el-option label="仅持久层" value="3"></el-option>
            <el-option label="树结构表(一体)" value="4"></el-option>
            <el-option label="树结构表(左树右表)" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成包路径">
          <el-input v-model="form.packageName"></el-input>
        </el-form-item>
        <el-form-item label="生成模块名">
          <el-input v-model="form.moduleName"></el-input>
        </el-form-item>
        <el-form-item label="生成子模块名">
          <el-input v-model="form.subModuleName"></el-input>
        </el-form-item>
        <el-form-item label="生成功能描述">
          <el-input v-model="form.functionName"></el-input>
        </el-form-item>
        <el-form-item label="生成功能名">
          <el-input v-model="form.functionNameSimple"></el-input>
        </el-form-item>
        <el-form-item label="生成功能作者">
          <el-input v-model="form.functionAuthor"></el-input>
        </el-form-item>
        <el-form-item label="业务表名">
          <el-select v-model="form.genTable" filterable placeholder="请选择">
            <el-option
              v-for="item in tableList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成选项">
          <el-checkbox-group v-model="form.replaceFile">
            <el-checkbox label="是否替换现有文件" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddFormList(0)">保存方案</el-button>
        <el-button type="primary" @click="submitAddFormList(1)">保存并生成代码</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AJAX from './../../assets/js/ajax';
  export default {
    data() {
      return {
        schemeList:[],
        labelData:{
          name:'',
        },
        form:{
          id:'',
          name:'',
          category:'',
          packageName:'',
          moduleName:'',
          subModuleName:'',
          functionName:'',
          functionNameSimple:'',
          functionAuthor:'',
          genTable:'',
          replaceFile:'',
        },
        //配置实体
        genScheme:'',
        //业务列表
        tableList: [{
          value: '',
          label: ''
        }],
        total: 0, //总页数
        page: 1, //当前页数
        pageSize:15,
        pageSizeOptions:[15,20,25],
        tableHeight:0,//表格容器的高度
        addFormDialog:false,
        editFormDialog:false
      }
    },
    computed: {

    },
    created() {
      let _this = this
      //获取业务表列表
      AJAX.get("website/gen/genScheme/getList",{
        pageNo:this.page,
        pageSize:this.pageSize
      },function(data){
        _this.schemeList = data.data.list;
        _this.total=data.data.count;
      })
    },
    methods: {
      getList(page){
        let _this = this
        let labelData = this.labelData
        this.page = page;
        //获取业务表列表
        AJAX.get("website/gen/genScheme/getList",{
          name:labelData.name,
          pageNo:this.page,
          pageSize:this.pageSize
        },function(data){
          _this.schemeList = data.data.list;
          _this.total=data.data.count;
        })
      },
      //新增
      add(){
        this.addFormDialog=true;
        this.form = {};
        AJAX.get("website/gen/genScheme/getGenSchemeInfo",{},(data)=>{
          this.tableList = data.data.tableList;
        })
      },
      submitAddFormList(flag){
        let _this = this;
        let form = _this.form;
        AJAX.post('website/gen/genScheme/saveOrEdit',
          {
            id:form.id,
            name:form.name,
            category:form.category,
            packageName:form.packageName,
            moduleName:form.moduleName,
            subModuleName:form.subModuleName,
            functionName:form.functionName,
            functionNameSimple:form.functionNameSimple,
            functionAuthor:form.functionAuthor,
            genTable:form.genTable,
            replaceFile:form.replaceFile,
            flag:flag,
          },(res)=>{
            _this.form.id = '';
            if(res.data.stateCode.code===200){
              this.addFormDialog=false;
              this.getList(1)
            }else{
              this.$message.error(res.data.stateCode.msg);
            }
          })
      },
      handleEdit(scope){
        let _this = this
        _this.addFormDialog=true;
        AJAX.get("website/gen/genScheme/getGenSchemeInfo",{id:scope.id},(data)=>{
          console.log(data.data.genScheme)
          _this.form = data.data.genScheme;
          _this.tableList = data.data.tableList;
        })
      },
      handleDelete(scope){
        let dat = Object.assign(scope,{
          pageSize:this.pageSize,
          pageNo:this.page
        });
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          AJAX.post('website/gen/genScheme/delete',{id:dat.id},(res)=>{
            this.getList(dat.pageNo)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

  };
</script>

<style lang="scss" scoped>
  .goodsPage {
    padding: 0.1rem;
  }
</style>
