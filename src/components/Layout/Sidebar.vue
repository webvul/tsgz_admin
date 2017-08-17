<template>
    <div id='left-menu'>
        <div class="logo" style="padding-bottom:10px;border-bottom:1px solid rgba(0,0,0,0.1)">
            <img src="./../../assets/img/login/logo.png" alt="" style="width:190px;height:85px;margin:15px;" >
        </div>
        <el-row class='tac'
                v-for="(route,index) in $router.options.routes"
                :key='route.path'
                v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
            <el-col :span="24">
                <el-menu
                        class="el-menu-vertical-demo"
                        :default-active="$route.path"
                        unique-opened
                        router>
                    <template
                            v-for="(item,index) in route.children"
                            v-if="!item.hidden &&!item.leaf">
                        <el-submenu :index="item.path">
                            <template slot="title">
                                <i :class="item.iconCls"></i>
                                <span class='menu-name'>{{item.name}}</span>
                            </template>
                            <el-menu-item
                                    v-for='(child,cindex) in item.children'
                                    :key='child.path'
                                    v-if="!child.hidden"
                                    :index='$route.matched[0].path+"/"+item.path+"/"+child.path'>
                                <span class='menu-name'>{{child.name}}</span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template
                            v-for="(item,index) in route.children"
                            v-if="!item.hidden &&item.leaf">
                            <el-menu-item
                                    :key='item.path'
                                    v-if="!item.hidden"
                                    :index='$route.matched[0].path+"/"+item.path'>
                                <i :class="item.iconCls"></i>
                                <span class='menu-name'>{{item.name}}</span>
                            </el-menu-item>
                    </template>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
    $color1:#1f2c33;
    .el-menu-vertical-demo {
        .header_title {
            color: #aab1b5;

        }
        .el-submenu__title {
            color: #aab1b5;
            height: 49px;
        }
        .el-menu-item {
            color: #aab1b5;
            border-bottom:1px solid rgba(0,0,0,0.5);
             &:hover{

                 color: #fff;
            }
        }
        .el-menu-item-group__title {
            background: $color1;
        }
        .fa{
            margin-right:5px;
        }

    }
</style>
