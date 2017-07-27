<template>
    <div class="page goodsPage">
        <el-table
                :data="goodsList"
                border
                style="width: 99%">
            <el-table-column
                    label="名称"
                    width="180"
                    >
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="id"
                    >
                <template scope="scope">
                    <p>{{ scope.row.id }}</p>
                </template>
            </el-table-column>
            <el-table-column label="排序"
                             width="75"
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
    import {mapState,mapActions} from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed:{
            ...mapState(['goodsList']),
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            ...mapActions(['getGoodsList']),
        },

    };
</script>

<style lang="scss" scoped>
    .goodsPage{
        padding:0.1rem;
    }
</style>
