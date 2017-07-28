<template>
    <div class="page goodsPage" ref="el">
        <el-table
                ref="tabTree"
                :data="showData"
                :height="height"
                border
                style="width: 99%">
            <el-table-column
                    label="名称"
                    :resizable="true"
            >
                <template scope="scope">
                    <i :style="'margin-left:'+(scope.row.rank*10)+'px'" :class="scope.row.open?'el-icon-caret-right open':'el-icon-caret-right'" v-if="scope.row.isNextnode==='1'" @click="showIndex2(scope.$index,scope.row)"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="排序"
                             width="100"
            >
                <template scope="scope">
                    <el-input v-model="scope.row.sort" placeholder="" ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="可见"
                             width="70"
            >
                <template scope="scope">
                    <span>{{scope.row.isShow==1?'显示':'影藏'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="权限标识" width="100" >
                <template scope="scope">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">添加下级菜单
                    </el-button>
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">添加商品代码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                gccList:[],
                height:0,
                showData:[],
                filterRules:1
            }
        },
        computed:{
        },
        created(){
            let _this = this;
            AJAX.get('gcc/gccContror/findGccList',{},function(data){
                _this.gccList = data.data;
                _this.gccList.map((item,key)=>{
                    if(item.parentId==='1'){
                        item.rank =1; //排名第一
                        item.open=false; //初始为关闭状态
                        _this.showData.push(item);
                    }
                });
                /*_this.showData.map(function(item,key){
                 trans_arr(item,_this.gccList,item.rank,key)
                 })
                 function trans_arr(temp,old_arr,rank,key){
                 let ran =rank;
                 old_arr.map(function (item1,key1){
                 if(temp.isNextnode==='1'&&temp.id===item1.parentId&&temp.rank===rank){
                 item1.rank=ran+1;
                 item1.open=true;
                 _this.showData.splice(key+1,0,item1)
                 }
                 })
                 }*/


            })
        },
        mounted(){
            let _this =this;
            console.log(_this.showData);
            this.height=this.$refs.el.offsetHeight-60;
            $(window).resize(function(){
                _this.height=$(window).height()-150;
            })

        },
        methods:{
            showIndex2(index,row){
                let _this = this;
                let _temp =row.rank;
                //判断菜单的开合
                if(!row.open){
                    this.showData[index].open=true;
                    _this.gccList.map((item,key)=>{
                        if(item.parentId===row.id){
                            item.rank =_temp+1; //排名第一
                            item.open=false; //初始为关闭状态
                            _this.showData.splice(index+1,0,item);
                        }
                    })
                }else{
                    this.showData[index].open=false;
                    for(var i=_this.showData.length-1;i>=0;i--){
                        if(_this.showData[i].parentId===row.id){
                            _this.showData.splice(i,1)
                        }
                    }
                }

            }
        },

    };
</script>

<style lang="scss" scoped>
    .goodsPage{
        padding:0.1rem;
    }
    .el-icon-caret-right{
        color:#666;
        font-size:12px;
    }
    .open{
        transform: rotate(90deg);
    }
    .activeRow{
        background:pink;
    }
</style>
