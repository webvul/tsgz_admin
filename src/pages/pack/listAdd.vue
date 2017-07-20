<template>
    <div class="page">
        <el-row  class="elContainer">
            <el-col :span="5" class="grid left">
                <div class="sql_list">
                    <h5>数据连接</h5>
                    <div v-for="item in 4" :class="defaultActive===item?'item active':'item'" @click="defaultActive=item" >demo{{item}}</div>
                </div>
                <div class="pack_list">
                    <h5>业务包</h5>
                    <div class="item" v-for="item in 8" :key="item">业务包{{item}}</div>
                </div>
            </el-col>
            <el-col :span="19" class="grid right">
                <div class="header">
                    <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            size="small"
                            v-model="inputValue"
                            :on-icon-click="handleIconClick">
                    </el-input>
                </div>
                <div class="dabeList">
                    <span v-for="item in 50" :key="item" :title="'数据表'+item" :class="choList.indexOf(item)===-1?'span':'span active'" @click="choDabe(item)">
                        <img src="./img/download.png" alt="" style="" />
                        数据表{{item}}
                    </span>
                </div>
                <div class="paginationContainer">
                    <el-pagination
                            small
                            layout="prev, pager, next"
                            :total="50">
                    </el-pagination>
                    <div class="footer">
                        <el-button size="small" @click="goback">上一步</el-button>
                        <div>
                            <span>已选择{{choList.length}}项</span>
                            <el-button type="primary" size="small" @click="pageGoStep">下一步</el-button>

                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                editable: false,
                defaultActive:1,
                inputValue:'', //搜索的keyword,
                choList:[],//用户选择的列表
            }
        },
        computed: mapGetters(['loginMsg']),
        mounted() {
            console.log(this.$route.params.id);
        },
        methods:{
            choDabe(ite){
                let index = this.choList.indexOf(ite);
              if(index===-1){
                  this.choList.push(ite)
              }else{
                  this.choList.splice(index,1)
              }

            },
            handleIconClick(){
                this.$message({
                    message: '你成功的点击了搜索按钮',
                    type: 'success'
                });
            },
            goback(){
                this.$router.go(-1);
            },
            pageGoStep(){
                if(this.choList.length){
                    this.$router.push("/groupListAddStep")
                }
                else{
                    this.$message.error('你至少得选择一个表吧');
                }
            }
        }

    };
</script>

<style lang="scss" scoped>
    .elContainer{
        width:100%;
        overflow: hidden;

        height:100%;
        .left{
            padding-top:0.1rem;
            height:100%;
            overflow-y: auto;
        }
        .right{
            margin-top:0.02rem;
            position:relative;
            left:-10px;
            border-left:10px solid #eee;
            z-index:2;
            background:#fff;
            height:100%;
            overflow-y: auto;
            .header{
                padding-right:0.2rem;
                display: flex;
                flex-flow: row-reverse;
                .el-input{
                    width:150px;
                    height:40px;
                    line-height: 40px;
                }
            }
            .dabeList{
                height:450px;
                width:95%;
                overflow-y: auto;
                padding:0 0.2rem;
                .span{
                    cursor: pointer;
                    border:1px solid #ddd;
                    margin-right:1.9%;
                    margin-top:5px;
                    display: inline-block;
                    width:10.1%;
                    padding-right:0.02rem;
                    height:25px;
                    line-height: 25px;
                    overflow-x: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    &.active{
                        color:#fff;
                    }
                    img{
                        width:16px;
                        height:16px;
                        vertical-align: middle ;
                        margin:0 4px;
                    }

                }
            }
            .paginationContainer{
                position: absolute;
                width:96%;
                right:20px;
                bottom:10px;
                text-align: right;
                .footer{
                    margin-top:0.1rem;
                    display: flex;
                    justify-content: space-between;
                    span{
                        padding-right:0.2rem;
                        color:#666;
                    }
                }
            }
        }
        .sql_list{
            padding:0 0.2rem;
            h5{
                color:gray;
                padding-bottom:0.1rem;
                border-bottom:1px solid #ddd;
                margin:0;
            }
        }
        .pack_list{
            margin-top:0.3rem;
            padding:0 0.2rem;
            h5{
                margin:0;
                color:gray;
                padding-bottom:0.1rem;
                border-bottom:1px solid #ddd;
            }
        }

        .item{
            width:100%;
            list-style: none;
            color:#333;
            height:30px;
            line-height:40px;
            padding-left:0.1rem;
        }
        .item.active{
            color:#fff;
        }

    }

</style>
