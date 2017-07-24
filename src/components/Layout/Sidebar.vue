<template>
    <!--导航菜单-->
        <!--<div>
            <template v-for="(route,index) in $router.options.routes" v-if="!route.hidden&& $route.matched.length && $route.matched[0].path===route.path" >
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
                         unique-opened router v-for="(item,index1) in route.children" :key="index1">
                    <el-submenu :index="item.path" v-if="!item.leaf&&!item.hidden">
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf&&!item.hidden" :index="item.path"><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>

                </el-menu>
            </template>
        </div>-->
    <div id='left-menu'>
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
            console.log("ddsr"+this.$route.path);
        }
    }
</script>

<style lang="scss">
    $color1:#1f2c33;
    .el-menu-vertical-demo {
        background: $color1;
        .header_title {
            color: #aab1b5;

        }
        .el-submenu__title {
            color: #aab1b5;
            height: 49px;
        }
        .el-submenu:hover .el-submenu__title {
            background: $color1;
        }
        .el-menu-item {
            background: $color1;
            color: #aab1b5;
             &:hover{
                 background: $color1;
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
