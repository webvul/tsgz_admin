<template>
    <div class="page dragContainer">
        <div class="heade_group_botton">
            <el-button type="primary" @click="handleSave" size="small">保存</el-button>
            <el-button type="primary" @click="handleRouteBack" size="small">取消</el-button>
            <el-button type="danger" @click="handleRemoveGroup" size="small">移出分组</el-button>
            <el-dropdown @command="handleCommandCopy">
                <el-button type="primary" size="small">复制到分组</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="item,key in editPackList" :key="key" :command="JSON.stringify(key)"><span style="font-size:12px">{{item.groupName}}</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommandMove">
                <el-button type="primary" size="small">移动到分组</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="item,key in editPackList" :key="key" :command="JSON.stringify(key)"><span style="font-size:12px">{{item.groupName}}</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>已选中{{choNum}}项</span>
        </div>
        <div v-model="editPackList"   @dragover="dragOver" @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd">
            <div v-for="item,index in editPackList" :key="item.id" class="packListItem" @drop="drop($event,index,item)">
                <div :class="item.cho?'head active':'head'">
                    <div class="left">
                        <i :class="item.cho?'el-icon-arrow-down':'el-icon-arrow-right'" @click.stop="item.cho=!item.cho"></i>
                        <span contenteditable="true">{{item.groupName}}</span>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <ul class="itemList" v-if="item.cho">
                    <li :class="itemList.edit?'active':''" v-for="itemList,index2 in item.groBusPackagesList" @click="handleChoItem(itemList,index,index2)"  @dragstart="dragStart(itemList,index,index2)" draggable="true" >
                        <span :class="itemList.edit?'icon_cho':'null'"></span>
                        <img src="./img/list_temp.png" alt="">
                        <span :class="itemList.edit?'active':''">{{itemList.busPackageName}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                choNum:0,//已选中的数目
                choPos:[],//选中的位置集合

            }
        },
        computed:{
            ...mapGetters(['editPackList']),
        },
        created(){

        },
        methods:{
            //选中保存位置
            handleChoItem(item,pos1,pos2){
               if(!item.edit){
                   item.edit=true;
                   this.choNum++;
                   this.choPos.push([pos1,pos2]);
               }else{
                   item.edit=false;
                   this.choNum--;
                   this.choPos.map((item,key)=>{
                       if(item[0]===pos1&&item[1]===pos2) this.choPos.splice(key,1);
                   })
               }
               //二维数组排序，非常有必要,这样删除数组时会删除干净，不会留下尾巴
                this.choPos=this.choPos.sort((x,y)=>{
                   return y[1]-x[1]
                });

            },
            //移动到分组
            handleCommandMove(key){
                this.addList(key);
                this.deletList();
                this.init();
            },
            //复制到分组
            handleCommandCopy(key){
                this.addList(key);
                this.init();
            },
            //移出分组
            handleRemoveGroup(){
                this.addList(0);
                this.deletList();
                this.init();
            },
            //将保存的数据从当前组中移除
            deletList(){
                this.choPos.map((item)=>{
                    this.editPackList[item[0]].groBusPackagesList.splice(item[1],1);
                })
            },
            //初始化方法
            init(){
                this.choPos=[];//重置
                this.choNum=0;
            },
            //往组里面添加数据的方法
            addList(group){
                this.choPos.map((item)=>{
                    this.editPackList[group].groBusPackagesList.push({
                        edit:false,
                        id:this.editPackList[item[0]].groBusPackagesList[item[1]].id,
                        busPackageName:this.editPackList[item[0]].groBusPackagesList[item[1]].busPackageName
                    });
                })

            },
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
            drop(e,key,list){
                e.preventDefault();
                //如果有选中，执行选中的拖拽
                if(this.choPos.length){
                    this.addList(key);
                    this.deletList();
                    this.init();
                }else{
                    //如果没选中，执行单次拖拽
                    this.editPackList[this.pos1].groBusPackagesList.splice(this.pos2,1);
                    list.groBusPackagesList.push(this.packListFrom);
                }

            },
            dragEnd(e){
            },
            handleRouteBack(){
                this.$router.go(-1);
            },
            handleSave(){
                this.$router.push('/groupList')
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
            margin-right:0.1rem;
        }
        span{
            color:orange
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
                background:#ddd
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
                margin-right:0.1rem;
                list-style: none;
                width:1.8rem;
                height:1.5rem;
                display: flex;
                justify-content: center;
                flex-wrap:wrap ;
                cursor:pointer;
                position:relative;
                &.active{

                }
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
                    color:#555;
                    &.active{
                        color:#fff
                    }
                }
            }
        }
    }
    .null{
        display: none;
    }
    /*对勾角标*/
    .icon_cho{
        display:inline-block;
        width:15px !important;
        height:15px !important;
        background:#3daae9;
        vertical-align:middle;
        position:absolute;
        left:0;
        top:0
    }
    .icon_cho:after{
        opacity: 1;
        content: "";
        position: absolute;
        width: 4px;
        height: 10px;
        background: transparent;
        top: 0;
        right: 5px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(35deg);
    }
    .el-dropdown-menu__item{
        height:30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
