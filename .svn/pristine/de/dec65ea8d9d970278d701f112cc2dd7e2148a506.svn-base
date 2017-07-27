<template>
    <!--导航菜单-->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
             unique-opened router>
        <router-link to="/" class="logo block">
            <img src="./../../assets/img/login/logo.png" alt="AdminX">
        </router-link>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
    </el-menu>
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
