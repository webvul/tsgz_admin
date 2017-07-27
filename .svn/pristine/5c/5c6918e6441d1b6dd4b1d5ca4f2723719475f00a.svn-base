
<template>
  <div class="page" ref="el">
    <div></div>
    <div>
      <el-button @click="asdf">ceshi</el-button>
      <el-input v-model="value"></el-input>
    </div>
    <header>
      <el-table
              :data="msg"
              :height="height"
              border
              style="width: 100%">
        <el-table-column
                prop="id"
                label="日期"
                >
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
               >
        </el-table-column>
        <el-table-column
                prop="comments"
                label="地址">
        </el-table-column>
      </el-table>
    </header>
  </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                msg:[],
                height:0,
                value:''
            }
        },
        computed:{

        },
        created(){
            let _this = this;
            AJAX.get('website/gen/findAllList',{},function(data){
                _this.msg = data.data;
            })

        },
        mounted(){
            console.log(`钙元素${this.$refs.el.offsetHeight}`)
            this.height=this.$refs.el.offsetHeight;
        },
        watch:{
            'value':'abc'
        },
        methods:{
            asdf(){
                alert(111);
            },
            abc(){
                console.log("sss")
            }
        },

    };
</script>

<style lang="scss" scoped>

</style>
