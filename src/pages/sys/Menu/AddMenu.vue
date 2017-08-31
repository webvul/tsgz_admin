<template>
    <div class=" DataSourceConfig"  ref="dataSourceContainer">
      {{sendForm.parentId}}
        <el-form :model="sendForm" :rules="rules" ref="areaName" >
            <el-form-item label="上级菜单" :label-width="formLabelWidth">
                <el-select-tree v-model="sendForm.parentId"
                                :treeData="gccList"
                                :propNames="defaultProps"
                                @setSelectedId="setSelectedId"
                                clearable
                                placeholder="请选择上级菜单">
                </el-select-tree>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name" >
                <el-input v-model="sendForm.name" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="链接" :label-width="formLabelWidth">
                <el-input v-model="sendForm.href" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
          <el-form-item label="重定向" :label-width="formLabelWidth" prop="redirect" >
            <el-input v-model="sendForm.redirect" auto-complete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="组件" :label-width="formLabelWidth" prop="component" >
            <el-input v-model="sendForm.component" auto-complete="off" style="width:300px"></el-input>
          </el-form-item>
            <el-form-item label="目标" :label-width="formLabelWidth">
                <el-input v-model="sendForm.target" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="sendForm.sort" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="可见" style = "margin-left: 60px;">
                <el-radio-group v-model="sendForm.isShow">
                    <el-radio label="显示"></el-radio>
                    <el-radio label="隐藏"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="权限标识" :label-width="formLabelWidth">
                <el-input v-model="sendForm.permission" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="sendForm.remarks" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button size="small" icon="plus" type="primary" @click="submitForm(sendForm.id)" v-text="">保存</el-button>
                <el-button size="small" type="primary" @click="goback" icon="delete">返回
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import selectTree from "../../../components/tableTree/selectTree.vue"
    import AJAX from '../../../assets/js/ajax';

    export default {
        components: {
            'el-select-tree': selectTree,
            },
        props:['form','gccList'],
        data() {
            return {
                sendForm:{
                  id: null,
                  parentId:null,
                  name: '',
                  href:'',
                  target: 0,
                  sort: '',
                  isShow: '显示',
                  permission: '',
                  redirect:'',
                  component:'',
                  remarks:'',
                },
                formLabelWidth: '100px',
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: "id",
                },
              rules: {
                name: [
                  {required: true, message: '请输入区域名称', trigger: 'blur'},
                ],
                component:{required: true, message: '请选择组件', trigger: 'blur'},
              }
            }
        },       computed:{
        },
        created(){

        },
        mounted(){
            this.sendForm=this.form;
        },
        methods: {
          setSelectedId(val){
            this.sendForm.parentId=val;
          },
            submitForm () {
                let _this = this;
                if (_this.sendForm.isShow === '显示'){
                    _this.sendForm.isShow = 1;
                }else {
                    _this.sendForm.isShow = 0;
                }
                AJAX.post('website/sys/menuWeb/saveOrEdit', {
                    //params:_this.sendForm
                    id: _this.sendForm.id,
                    parentId:_this.sendForm.parentId,
                    name: _this.sendForm.name,
                    href:_this.sendForm.href,
                    target: _this.sendForm.target,
                    sort: _this.sendForm.sort,
                    isShow: _this.sendForm.isShow,
                    redirect:_this.sendForm.redirect,
                    component:_this.sendForm.component,
                    permission: _this.sendForm.permission,
                    remarks: _this.sendForm.remarks,
                }, function (data) {
                  if (data.data.stateCode.code === 200){
                    _this.$emit("handleChangeStatus",1);
                  }else {
                    alert(data.data.stateCode.message)
                  }
                })
            },
            goback () {
                this.$emit("handleChangeStatus",1);
            },
        },
    };
</script>

<style lang="scss">
    .DataSourceConfig{
        position:relative;
        width:100%;
        height:100%;
        overflow: scroll;
        .header{
            width:100%;
            height:50px;
            line-height: 50px;
            .DataSourceConfigFrom{
                position: relative;
                top:6px;
                display: flex;
                line-height: 50px;
                .el-form-item{
                    position:relative;
                    left:-20px;
                    &:nth-child(2){
                        left:-40px;
                    }
                    &:nth-child(3){
                        left:-30px;
                    }
                }
                .el-input{
                    width:130px;
                }
                .el-form-item__label{
                    width:50px;
                }
                .btn1{
                    margin-top:4px;
                    width:50px;
                    height:50px;
                }
            }
        }
        .toolbar{
            position: absolute;
            bottom:45px;
            height:45px;
            overflow-x: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                width:240px;
                overflow: hidden;
                .pageSize{
                    width:70px;
                    li{
                        width:50px;
                    }
                }
            }


        }
    }
</style>
