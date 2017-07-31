

<template>
  <div class="page" ref="el">
    <div></div>
    <div>
      <el-form label-position="right" label-width="90px" class="confirmAdd">
        <el-form-item label="任务名称：">
          <el-input  v-model="group_name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dabeList">
      <span v-for="item,key in choList" :key="key"
            :title="item">
          <img src="./img/download.png" alt="" style="" />
          {{item}}
      </span>
    </div>
    <div class="footer">
      <el-button size="small">上一步</el-button>
      <div>
        <el-button type="primary" size="small" @click="pageGoStep()">保存</el-button>

      </div>
    </div>
  </div>
</template>

<script>
    import AJAX from './../../assets/js/ajax';
    export default {
        data() {
            return {
                msg:[],
                height:0,
                value:'',
                group_name:'',
                choList:[],
                groupCode:'',  //是否已经分组
                status:0    //不重复点击
            }
        },
        computed:{

        },
        created(){
            let tableDataList = this.$route.query.tableDataList;
            console.log(tableDataList)
            tableDataList.map((item,key)=>{
                this.choList.push(item.split("-")[0])
            })

        },
        mounted(){

        },
        watch:{
            'value':'abc'
        },
        methods:{
            asdf(){
                alert(111);
            },
            pageGoStep(){
                if(this.status==1){
                    return;
                }
                this.status = 1;
                let name = this.group_name;
                console.log(name)
                console.log(this.$route.query.tableDataList)
                console.log(this.$route.query.groupCode)
                if(this.$route.query.groupCode!=null){
                    this.groupCode = this.$route.query.groupCode;
                }
                let tabArr = this.$route.query.tableDataList;
                if(name.trim()!=""){
                 AJAX.post('website/packadd/addTable',{name:name,tabArr:tabArr,groupCode:this.groupCode},(res)=>{
                        console.log(res)
                        this.$router.push('/pack/groupList')
                    })
                 this.status = 1;
                }else{
                    this.status = 0;
                    this.$message.error('请填写业务表名');
                }

            },
            abc(){
                console.log("sss")
            }
        },

    };
</script>

<style lang="scss" scoped>
.confirmAdd{
  width:400px;
  position:relative;
}
.dabeList{
  height:450px;
  width:95%;
  overflow-y: auto;
  padding:0 0.2rem;
  .span {
    cursor: pointer;
    border: 1px solid #ddd;
    margin-right: 1.9%;
    margin-top: 5px;
    display: inline-block;
    width: 10.1%;
    padding-right: 0.02rem;
    height: 25px;
    line-height: 25px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.active {
      color: #fff;
    }
  }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin: 0 4px;
    }
  }
.footer{
  margin-top:0.1rem;
  display: flex;
  justify-content: space-between;
  padding:0 20px 0 10px;
  width:100%;
  position:absolute;
  bottom:45px;
  span{
    color:#666;
  }
}
</style>
