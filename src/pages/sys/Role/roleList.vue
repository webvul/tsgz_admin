<template>
  <div class="tableContainer">
    <el-table
      :data="msg"
      :max-height="1000"
      border
      style="width:100%"
    >
      <el-table-column label="角色名称">
        <template scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="英文名称">
        <template scope="scope">
          <p>{{ scope.row.enname }}</p>
        </template>
      </el-table-column>
      <el-table-column label="归属机构">
        <template scope="scope">
          <p>{{ scope.row.office.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="数据范围">
        <template scope="scope">
          <span>{{scope.row.dataScope}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="text"
            @click="edit(scope.row)">分配
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="editRow(scope.row.id)">修改
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="deleteRow(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import AJAX from '../../../assets/js/ajax';
  import TableTree from './../../../components/tableTree/tableTree'

  export default {
    components: {},

    data() {
      return {}
    },
    props:{
      msg:{
        type:Array,
        default(){
          return []
        }
      }
    },
    computed: {},
    created() {
      this.ajax();
    },
    mounted() {

    },
    methods: {
      ajax() {
        let _this = this;
        AJAX.get('/website/sys/menu/getMenuList', {}, (res) => {
          _this.menuList = res.data;
        })
      },
      deleteRow(id) {
        let _this = this;
        AJAX.post('/website/sys/role/delete', {id: id}, (res) => {
          if (res.data.stateCode.code === 200) {
            _this.$emit("handleChangeNav",1,"")
          }
        })
      },
      editRow(id) {
        let _this = this;
        _this.$emit("handleChangeNav",2,id)
        /*AJAX.get('/website/sys/role/getRole', {
          id: id
        }, (res) => {
          _this.status = 2;
          _this.saveUp = '添加'
        })*/

      },
    },
  };
</script>

<style lang="scss" scoped>
  .tableContainer {
    overflow-y: auto;
    height: 500px;
  }
</style>
