<template>
    <div>
      <tr>
        <td>{{itemData.name}}</td>
        <td>{{itemData.name}}</td>
        <td>{{itemData.name}}</td>
        <td>{{itemData.name}}</td>
        <td>{{itemData.name}}</td>
        <td>{{itemData.name}}</td>
      </tr>
    </div>



    <!--<template v-show="open" v-if="isFolder">
      <TreeItem
        v-for='cel in itemData.children' :itemData='cel'
      >
      </TreeItem>
    </template>-->

</template>
<script>
    export default {
      name: 'TreeItem',
      props:['itemData'],
        data() {
            return {
               open:true,
               isFolder:true
            }
        },
        computed: {
        },
        watch: {

        },
        mounted() {
          console.log(this.treeData);
            /*this.getTreeData=tranlateDataTreeTable(this.treeData);*/

        },

        beforeDestroy() {
            window.onresize = null
        }
    }
</script>
<style scoped>
    .autoTbale {

    }

    table {
        width: 98%;
        margin-left:12px;
        border-spacing: 0;
        border-collapse: collapse;
    }

    .table-bordered {
        border: 1px solid #EBEBEB;
    }

    .table>tbody>tr>td,
    .table>tbody>tr>th,
    .table>thead>tr>td,
    .table>thead>tr>th {
        border-top: 1px solid #e7eaec;
        line-height: 1.42857;
        padding: 8px;
        vertical-align: middle;
    }

    .table-bordered>tbody>tr>td,
    .table-bordered>tbody>tr>th,
    .table-bordered>tfoot>tr>td,
    .table-bordered>tfoot>tr>th,
    .table-bordered>thead>tr>td,
    .table-bordered>thead>tr>th {
        border: 1px solid #e7e7e7;
    }

    .table>thead>tr>th {
        border-bottom: 1px solid #DDD;
    }

    .table-bordered>thead>tr>td,
    .table-bordered>thead>tr>th {
        background-color: #F5F5F6;
    }

    #hl-tree-table>tbody>tr {
        background-color: #fbfbfb;
    }

    #hl-tree-table>tbody>.child-tr {
        background-color: #fff;
    }

    label {
        margin: 0 8px;
    }

    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 14px;
        height: 14px;
    }

    .ms-tree-space::before {
        content: ""
    }

    #hl-tree-table th>label {
        margin: 0;
    }
</style>
