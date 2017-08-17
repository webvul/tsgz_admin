<template>
    <div class="tableContainer" :style="'overflow:auto;height:'+($store.state.screenHeight-200)+'px'">
      <TableTree
          :data-source="areaList"
          :columns="columns"
          :tree-structure="true"
          @updateHandle="update"
          @addNextHandle="addNext"
          @handleDelete="deleteData"
      >
      </TableTree>
      <!--<el-button type="primary" @click="update">update</el-button>-->

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
              areaList:[],
              columns: [
                {
                  text: '区域名称',
                  dataIndex: 'name'
                },
                {
                  text: '区域编码',
                  dataIndex: 'code'
                },
                {
                  text: '区域类型',
                  dataIndex: 'type'
                },
                {
                  text: '备注',
                  dataIndex: 'remarks'
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

              AJAX.get('/website/sys/area/list',{},(res)=>{
               // console.log(res.data)

                _this.areaList = res.data;
                //console.log(_this.areaList)
              })
          },
            update(data){
             // console.log(data)
              this.$emit("changeStatusBySaveup",2,'修改',data);
            },
          addNext(id){
            //console.log(id)
            this.$emit("changeStatusBySaveup",2,'修改',id);
          },
          deleteData(data){
           // console.log(data)
            AJAX.post('/website/sys/area/delete', {
                    id:data.id,
                    parent_ids: data.parent_ids,
              }, (res)=>{
              /!*console.log(res)*!/
              //_this.areaList = res;
              this.ajax();
            })
          }
        },
    };
</script>

<style lang="scss" scoped>
      .tableContainer{
        overflow-y: auto;
        height:500px;
      }
</style>
