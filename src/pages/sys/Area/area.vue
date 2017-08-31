<template>
    <div class="page DataSourceConfig"  ref="dataSourceContainer">

        <div class="content">
            <div class="header">
                <ul>
                    <li :class="status===1?'active':''" @click="handleChangeNav(1)">区域列表</li>
                    <li :class="status===2?'active':''"  @click="handleChangeNav(2)">区域{{saveUp}}</li>
                </ul>
            </div>
          <list
            v-if="status===1"
            @changeStatusBySaveup="changeStatusBySaveup"
            @getGccList="ajax"
          >
          </list>
          <ListAdd
            :form="form"
            v-if="status===2"
            :gccList="gccList"
            @getGccList="ajax"
            @handleChangeStatus="changeStatus"
          >

          </ListAdd>

        </div>

    </div>
</template>

<script>
    import AJAX from '../../../assets/js/ajax';
    import List from './AreaList.vue'
    import ListAdd from './AddArea.vue'
    import {tranlateDataTreeManagement} from './../../../utils';
    export default {
        components: {

            List,
            ListAdd
        },
        data() {
            return {
                status:1,
                saveUp:'添加',
                gccList:[],
                form:{
                  id: null,
                  name: '',
                  type:'',
                  code:'',
                  parentId: null,
                  desc: '',
                },
            }
        },       computed:{
        },
        created(){
          this.ajax();
        },
        mounted(){

        },
        methods: {
          ajax(){
            let _this =this;
            AJAX.get('/website/sys/area/treeData',{},(res)=>{
             // console.log(res.data)
              _this.gccList = tranlateDataTreeManagement(res.data);
            })
          },
          handleChangeNav(status){
            this.form={
              id: null,
              name: '',
              type:'',
              code:'',
              parentId: null,
              desc: '',
            };
                this.status=status;
                this.saveUp='添加';
          },
          changeStatus(sta){

            //this.ajax();
            this.form={
              id: null,
              name: '',
              type:'',
              code:'',
              parentId: null,
              desc: '',
            };
            this.status=sta;
            this.saveUp='添加';
          },
          changeStatusBySaveup(sta,saveUp,data){
            switch (data.type){
              case'国家':{
                data.type='1';
                  break;
              }
              case'省份、直辖市':{
                data.type='2';
                break;
              }
              case'地市':{
                data.type='3';
                break;
              }
              case'区县':{
                data.type='4';
                break;
              }
              default:{
                  break;
              }
            }
            this.form={
              id: null,
              name: '',
              type:'',
              code:'',
              parentId: null,
              desc: '',
            };
            this.status=sta;
            this.saveUp=saveUp;
            //console.log(typeof data)
            if(typeof data=='string'){
              this.form.parentId=data;
            }else{
              this.form=Object.assign({},data)
            }

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
