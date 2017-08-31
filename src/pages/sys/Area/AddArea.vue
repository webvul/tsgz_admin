<template>
    <div class="DataSourceConfig"  ref="dataSourceContainer">
        <el-form :model="sendForm" :rules="rules" ref="areaName" >
            <el-form-item label="上级区域" :label-width="formLabelWidth">
                <el-select-tree v-model="sendForm.parentId"
                                :treeData="gccList"

                                :propNames="defaultProps"
                                :multiple="false"
                                placeholder="请选择上级区域"
                                clearable
                                :value="sendForm.parentId"
                                @setSelectedId="setSelectedId"
                >
                </el-select-tree>
            </el-form-item>
            <el-form-item label="区域类型" :label-width="formLabelWidth">
                <el-select v-model="sendForm.type" filterable placeholder="请选择类型"
                          class="select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域名称" :label-width="formLabelWidth" prop="name" >
                <el-input v-model="sendForm.name" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="区域编码" :label-width="formLabelWidth">
                <el-input v-model="sendForm.code" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="sendForm.remarks" auto-complete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button size="small" icon="plus" type="primary" @click="submitForm('areaName')" v-text="">保存</el-button>
                <el-button size="small" type="primary" @click="goback" icon="delete">返回
                </el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import selectTree from "../../../components/tableTree/selectTree.vue"
    import AJAX from '../../../assets/js/ajax';

    export default {
        components: {
            'el-select-tree': selectTree,
            },
          props:['form','gccList'],
        data() {
            return {
              sendForm:{},
                options: [{
                    value: '1',
                    label: '国家'
                }, {
                    value: '2',
                    label: '省份、直辖市'
                }, {
                    value: '3',
                    label: '地市'
                }, {
                    value: '4',
                    label: '区县'
                }],
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
              }
            }
        },
        created(){

        },
        mounted(){
         this.sendForm=this.form;
        },
      computed:{

      },
        methods: {
            setSelectedId(val){
                console.log(val);
              this.sendForm.parentId=val;
            },

            submitForm (formName) {
              console.log(this.sendForm.type)
             // console.log(this.$refs[formName])
              let _this = this;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  //alert('submit!');

                 AJAX.post('website/sys/area/add', {
                    id:_this.sendForm.id,
                    parent: _this.sendForm.parentId,
                    type: _this.sendForm.type,
                    code: _this.sendForm.code,
                    remarks: _this.sendForm.desc,
                    name: _this.sendForm.name,
                  }, function (data) {
                     //_this.$emit('getGccList')
                    _this.$emit("handleChangeStatus",1);
                  })
                } else {
                  return false;
                }
              });

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
