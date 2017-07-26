<template>
    <div class="page dragContainer">
        <div class="heade_group_botton">
            <el-button type="primary" @click="handleRouteEdit" size="small">批量分组</el-button>
            <el-button type="text" @click="handleRouteAdd" size="small">添加分组</el-button>
        </div>
        <div v-model="packList"   @dragover="dragOver" @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd">
                <div v-for="item,index in packList" :key="item.id" class="packListItem" @drop="drop($event,item)">
                    <div :class="item.cho?'head active':'head'">
                        <div class="left">
                            <i :class="item.cho?'el-icon-arrow-down':'el-icon-arrow-right'" @click.stop="item.cho=!item.cho"></i>
                            <span>{{item.groupName}}</span>
                        </div>
                        <div class="right">
                            <i class='el-icon-delete' v-if="item.cho"></i>
                        </div>
                    </div>
                    <ul class="itemList" v-if="item.cho">
                        <li @click="handleRouterAddPack(item.id)">
                            <img src="./img/add.png" alt="">
                        </li>
                        <li v-for="itemList,index2 in item.groBusPackagesList" @mouseover="itemList.edit=true" @click="handleRouteDetail(itemList)" @mouseleave="itemList.edit=false" :id="itemList.id" @dragstart="dragStart(itemList,index,index2)" draggable="true" >
                                <img src="./img/list_temp.png" alt="">
                                <span>{{itemList.busPackageName}}</span>
                                <div class="tips" v-if="itemList.edit">
                                    <div class="del">
                                        <i class='el-icon-delete'></i>
                                        <span>删除</span>
                                    </div>
                                    <div class="edit">
                                        <i class='el-icon-information'></i>
                                        <span>编辑</span>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </div>
        </div>
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
                        console,log(res)
                })
                this.packList[this.pos1].groBusPackagesList.splice(this.pos2,1);
                list.groBusPackagesList.push(this.packListFrom);

            },
            dragEnd(e){
            },
            handleRouteEdit(){
                this.$router.push('/listEdit')
            },
            handleRouteAdd(){

            },
            handleRouterAddPack(id){
                this.$router.push(
                   '/listAdd/'+id
                )
            },
            handleRouteDetail(item){
                this.$router.push({
                    path:'/packDetail',
                    query:item
                })
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
