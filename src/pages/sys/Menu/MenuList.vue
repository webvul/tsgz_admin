<template>
    <div class="tableContainer" :style="'overflow:auto;height:'+($store.state.screenHeight-200)+'px'">
      <TableTree
          :data-source="menuList"
          :columns="columns"
          :tree-structure="true"
          @handleDelete="deleteRow"
          @updateHandle="update"
          @addNextHandle="addNextHandle"
      >
      </TableTree>

    </div>
</template>

<script>
    import AJAX from '../../../assets/js/ajax';
    import TableTree from './../../../components/tableTree/tableTree'
    export default {
        components: {
          TableTree
        },
        data() {
            return {
              radio: '1',
              menuList:[],
              columns: [
                {
                  text: '名称',
                  dataIndex: 'name'
                },
                {
                  text: '链接',
                  dataIndex: 'href'
                },
                {
                  text: '排序',
                  dataIndex: 'sort'
                },
                {
                  text: '可见',
                  dataIndex: 'isShow'
                },
                {
                  text: '权限标识',
                  dataIndex: 'permission'
                }
              ],

            }
        },
        computed:{


        },
        created(){
            this.ajax();
        },
        mounted(){

        },
        methods: {
            ajax(){
                let _this =this;
                AJAX.get('/website/sys/menuWeb/getMenuList',{},(res)=>{
                    _this.menuList = res.data;
                })
            },
            addNextHandle(id){
                this.$emit("handleChangeNavAddTree",2, id);
            },
            deleteRow(row){
                let _this= this;
                AJAX.post('/website/sys/menuWeb/deleteMenu',{id:row.id},(res)=>{
                   if(res.data.stateCode.code === 200){
                     _this.ajax();
                   }
                })
            },
            update(data){
                let dat;
                AJAX.get('/website/sys/menuWeb/getMenu',{
                    parentId:data.parentId,
                    id:data.id
                },(res)=>{
                    dat = res.data;
                    console.log(res.data);
                    this.$emit("changeStatusBySaveup",2,'修改', dat);
                })

            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
