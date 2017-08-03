<template>
    <div class="page dragContainer">
        <div class="heade_group_botton">
            <el-button type="primary" @click="handleRouteEdit" size="small">批量分组</el-button>
            <el-button type="text" @click="handleRouteAdd" size="small">添加分组</el-button>
        </div>
        <div v-model="packList"   @dragover="dragOver" @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd">
                <div v-for="item,index in packList" :key="item.id" class="packListItem" @drop="drop($event,item)">
                    <div :class="item.cho?'head active':'head'">
                        <div class="left" @click="updateGroupName(item)">
                            <i :class="item.cho?'el-icon-arrow-down':'el-icon-arrow-right'" @click.stop="item.cho=!item.cho"></i>
                            <span>{{item.groupName}}</span>
                        </div>
                        <div class="right">
                            <i class='el-icon-delete' v-if="item.cho" @click="deleteGroupList(item,packList,index)"></i>
                        </div>
                    </div>
                    <ul class="itemList" v-if="item.cho">
                        <li @click="handleRouterAddPack(item.groupCode)">
                            <img src="./img/add.png" alt="">
                        </li>
                        <li v-for="itemList,index2 in item.groBusPackagesList" @mouseover="itemList.edit=true" @click.stop="handleRouteDetail(itemList)" @mouseleave="itemList.edit=false" :id="itemList.id" @dragstart="dragStart(itemList,index,index2)" draggable="true" >
                                <img src="./img/list_temp.png" alt="">
                                <span :contenteditable="itemList.editAble" autofocus="true">{{itemList.busPackageName}}</span>
                                <div class="tips" v-if="itemList.edit">
                                    <div class="del" @click.stop="deleteGroup(itemList,index2,item)">
                                        <i class='el-icon-delete'></i>
                                        <span>删除</span>
                                    </div>
                                    <div class="edit" @click.stop="handleRouteupdate(itemList)">
                                        <i class='el-icon-information'></i>
                                        <span>编辑</span>
                                    </div>
                                </div>
                            <el-dialog
                                    title="编辑包名"
                                    :visible.sync="itemList.editAble"
                                    :show-close="false"
                                    @close="close"
                                    size="tiny"
                            >
                                <el-input class="packName" v-model="itemList.busPackageName"></el-input>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click.stop="itemList.editAble=false">取 消</el-button>
                                    <el-button type="primary" @click.stop="rename(itemList)">确 定</el-button>
                                  </span>
                            </el-dialog>
                        </li>
                    </ul>
                    <el-dialog
                            title="编辑组名"
                            :visible.sync="item.editAble"
                            size="tiny"
                    >
                        <el-input class="groupName" v-model="item.groupName"></el-input>
                        <span slot="footer" class="dialog-footer">
                                    <el-button @click="item.editAble=false">取 消</el-button>
                                    <el-button type="primary" @click="renameGroup(item)">确 定</el-button>
                                  </span>
                    </el-dialog>
                </div>
        </div>

        <el-dialog
                title="添加分组"
                :visible.sync="addFormDialog"
                size="tiny"
        >
            <el-input class="groupName" v-model="group_name"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormDialog = false">取 消</el-button>
                <el-button type="primary" @click="addGroupList(packList)">确 定</el-button>
              </span>
        </el-dialog>


    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                packListFrom:{},//要拖动的目标
                pos1:null,//要拖动的包在哪一个组
                pos2:null,//要拖动的包在组的哪一个位置
                addFormDialog:false,
                updateFormDialog:false,
                group_name:'', //新增组名

            }
        },
        computed:{
            ...mapState(['packList']),
        },
        created(){
            this.getPackList();
        },
        methods:{
            ...mapActions(['getPackList']),
            dragStart(pack,pos1,pos2){
                //list 待拖动的目标
                this.packListFrom=Object.assign({},pack);
                this.pos1=pos1;
                this.pos2=pos2;
            },
            dragOver(e){
                e.preventDefault();
            },
            dragEnter(e){

            },
            dragLeave(e){

            },
            drop(e,list){
                e.preventDefault();
                let id = this.packListFrom.id;
                //console.log(list)
                let groupid = list.groupCode
                //console.log(groupid)
               AJAX.get('website/pack/moveGroup',{id:id,groupid:groupid},(res)=>{
                        //console.log(res)
                })
                this.packList[this.pos1].groBusPackagesList.splice(this.pos2,1);
                list.groBusPackagesList.push(this.packListFrom);

            },
            dragEnd(e){
            },
            handleRouteEdit(){
                this.$router.push('/pack/listEdit')
            },
            updateGroupName(item){
               // console.log(item)
                item.editAble=true;
            },
            renameGroup(item){
               // console.log(item)
                AJAX.post('website/pack/renameGroup',{
                    groupName:item.groupName,id:item.id,groupCode:item.groupCode},(res)=>{
                    //console.log(res.data.id)
                    item.editAble=false;
                })
            },
            handleRouteAdd(){
                this.group_name = '';
                this.addFormDialog=true;

            },
            rename(itemList){
                //console.log(itemList)

                AJAX.post('website/pack/rename',{
                    busPackageName:itemList.busPackageName,id:itemList.id,groupCode:itemList.groupCode},(res)=>{
                    //console.log(res.data.id)
                   // console.log("222222222222")
                    itemList.editAble=false;
                })
            },
            handleRouteupdate(itemList,index,index1){
                itemList.editAble=true;


            },
            addGroupList(packList){
                let group_name = this.group_name;
                //console.log(group_name);
                //console.log(packList);
                AJAX.post('website/pack/saveGroupList',{groupName:group_name},(res)=>{
                    //console.log(res.data.id)
                    let id = res.data.id
                    this.addFormDialog=false;
                   packList.push({
                        groupName:group_name,
                        id:id,
                        groBusPackagesList:'',
                        cho:false,
                    })
                })
            },
            handleRouterAddPack(id){
                this.$router.push(
                   '/pack/listAdd/'+id
                )
            },
            handleRouteDetail(item){
                this.$router.push({
                    path:'/pack/packDetail',
                    query:{
                        id:item.id,
                        name:item.busPackageName
                    }

                })
            },
            deleteGroup(itemList,index,list){
               this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //console.log(itemList)
                   let id = itemList.id;
                    //console.log(list);
                   AJAX.delete('website/pack/deleteGroup',{id:id},(res)=>{

                       list.groBusPackagesList.splice(index,1);
                   })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteGroupList(list,packList,index){
                if(index=="0"){
                    this.$message.error("未分组的包不能删除!");
                }else{
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       // console.log(packList)
                        let id = list.id;
                        let groupCode = list.groupCode;
                        AJAX.delete('website/pack/deleteGroupList',{id:id,groupCode:groupCode},(res)=>{
                            //console.log(res)
                            packList.splice(index,1);
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            close(){
               event.stopPropagation()
            }

        },

    };
</script>

<style lang="scss" scoped>
    .heade_group_botton{
        height:50px;
        display: flex;
        flex-flow: row-reverse;
        align-items: center;
        .el-button{
            margin-right:0.4rem;
        }
    }
    .packListItem{
        .head{
            height:0.6rem;
            line-height:0.6rem;
            background:#eee;
            display: flex;
            justify-content: space-between;
            padding:0 0.4rem 0 0.2rem;
            &.active{
                color:#333
            }
        }
        .el-icon-delete{
            color:red;
        }
        .itemList{
            display: flex;
            flex-wrap:wrap ;
            li{
                margin-top:0.1rem;
                list-style: none;
                width:1.8rem;
                height:1.5rem;
                display: flex;
                justify-content: center;
                flex-wrap:wrap ;
                cursor:pointer;
                position:relative;
                img{
                    margin:0 0.15rem;
                    width:1.2rem;
                    height:1.2rem;
                }
                span{
                    width:1.2rem;
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
                .tips{
                    position:absolute;
                    right:-0.2rem;
                    top:-0.2rem;
                    span{
                        display: inline-block;
                        margin-top:0.02rem;
                        width:0.5rem;
                        background:yellow;
                        padding:0.01rem 0.05rem;
                        font-size:0.12rem;
                        color:#333;
                    }
                    .edit{
                        i{
                            color:green;
                        }
                    }
                }
            }
        }
    }
</style>
