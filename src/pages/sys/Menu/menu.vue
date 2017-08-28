<template>
  <div class="page DataSourceConfig"  ref="dataSourceContainer">

    <div class="content">
      <div class="header">
        <ul>
          <li :class="status===1?'active':''" @click="handleChangeNav(1)">菜单列表</li>
          <li :class="status===2?'active':''" @click="handleChangeNav(2)">菜单{{saveUp}}</li>
        </ul>
      </div>
      <MenuList
        v-if="status===1"
        @changeStatusBySaveup="changeStatusBySaveup"
        @handleChangeNavAddTree="handleChangeNavAddTree"
      >
      </MenuList>
      <AddMenu
        v-if="status===2"
        @handleChangeStatus="changeStatus"
        :form="form"
        :gccList="gccListTree"

      >

      </AddMenu>

    </div>

  </div>
</template>

<script>
  import AJAX from  '../../../assets/js/ajax';
  import MenuList  from './MenuList.vue'
  import AddMenu from './AddMenu.vue'
  import {tranlateDataTreeManagement} from './../../../utils';
  export default {
    components: {
      MenuList,
      AddMenu
    },
    data() {
      return {
        form: {
          id: null,
          parentId:null,
          name: '',
          href:'',
          target: 0,
          sort: '',
          isShow: '',
          permission: '',
          remarks: '',
        },
        gccList:[],
        gccListTree:[],
        status:1,
        saveUp:'添加',
      }
    },       computed:{
    },
    created(){
        this.ajax();
    },
    mounted(){

    },
    methods: {
      handleChangeNav(status){
        this.status=status;
        this.saveUp='添加';
        this.form = {};
      },
      handleChangeNavAddTree(status, id){
        this.status=status;
        this.saveUp='添加';
        this.form.parentId = id;
      },
      changeStatus(sta){
        this.status=sta;
        this.saveUp='添加';
      },
      changeStatusBySaveup(sta,saveUp,data){
        this.status=sta;
        this.saveUp=saveUp;
        this.form=Object.assign({},data)
      },
      ajax(){
        let _this =this;
        AJAX.get('/website/sys/menuWeb/treeData',{},(res)=>{
            _this.gccListTree=tranlateDataTreeManagement(res.data);
            console.log(_this.gccListTree);
          _this.gccList = res.data;
        })
      },

    },
  };
</script>

<style lang="scss">
  .content{
    position: relative;
    margin-left:-15px;
    height:100%;
    background:#fff;
    flex:4;
    border-left:1px solid #ddd;
    .header{
      height:45px;
      ul{
        margin-left:5px;
        margin-top:5px;
        height:40px;
        line-height: 40px;
        list-style: none;
        border-bottom:1px solid #ddd;
        display: flex;
        li{
          cursor: pointer;
          padding:0 25px;
          position:relative;
          bottom:-1px;
          &.active{
            border:1px solid #ddd;
            border-bottom:1px solid #fff;
            background:#fff;
            color:#000;
          }
        }
      }
    }
  }
</style>
