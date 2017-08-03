<template>
    <div class="page goodsPage">
        <div class="tableTree">
            <el-input
                    placeholder="查询"
                    v-model="filterText"
                    size="small"
            >
            </el-input>

            <el-tree
                    :highlight-current="true"
                    :class="'filter-tree'"
                    :data="gccList"
                    :props="defaultProps"
                    default-expand-all
                    style="font-size:12px;"
                    node-key="name"
                    current-node-key="name"
                    :filter-node-method="filterNode"
                    @node-click="choNodeKey"
                    ref="goodsTableTree">
            </el-tree>
        </div>
        <div class="content" @click="getCheckNode">2</div>
    </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    import {tranlateDataTree} from '../../utils'
    export default {
        data() {
            return {
                gccList:[],
                height:0,
                defaultProps: {
                    children: 'child',
                    label: 'name'
                },
                filterText:'',
                detaillData:{}

            }
        },
        watch: {
            filterText(val) {
                this.$refs.goodsTableTree.filter(val);
            }
        },
        computed:{

        },
        created(){
            let _this = this;
            AJAX.get('website/gcc/gccContror/findGccList',{},function(data){
                _this.gccList =tranlateDataTree(data);
                _this.detaillData=_this.gccList[0]
            })
        },
        mounted(){
            let _this =this;
            this.height=$(window).height()-150;
            $(window).resize(function(){
                _this.height=$(window).height()-150;
            });
            //设置首行高亮
            window.setTimeout(function(){
                $('.filter-tree .el-tree-node').eq(0).addClass("is-current")
            },100)


        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            choNodeKey(obj,node,self){
                $('.filter-tree .el-tree-node').eq(0).removeClass("is-current");
                console.log(self);
            },
            getCheckNode(){
                console.log(this.$refs.goodsTableTree.getCheckedNodes());
            }

        },

    };
</script>

<style lang="scss">
    .goodsPage{
        display: flex;
        padding-bottom:44px;
        .tableTree{
            height:100%;
            width: 200px;
            overflow-x: auto;
            position: relative;
            z-index: 1;

            .el-input{
                width:175px;
                margin:10px 5px;

            }
            .el-tree{
                border:none;
                .el-tree-node__label{
                    font-size:12px;
                }
            }
        }
        .content{
            position: relative;
            margin-left:-15px;
            height:100%;
            z-index:2;
            background:#fff;
            flex:4;
            border-left:1px solid #ddd;
        }
        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: #ddd !important;
        }
        .goodsPage .el-tree .el-tree-node > .el-tree-node__content {
            background-color: #ddd !important;
        }
    }

</style>
