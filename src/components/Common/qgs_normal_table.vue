<template>
  <div class="mormal_qgs_tableList">
    <scrollBar
      :scroll_bar_style="'width:100%;height:'+(screenHeight-top-80)+'px;border-bottom:1px solid #ddd'"
      :status="page"
    >
      <el-table
        :data="tableList"
        border
        tooltip-effect="dark"
        :resizable="true"
        @selection-change="handleSelectionChange"
        style="width:100%"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="70">
          <template scope="scope">
            {{scope.$index+1+page}}
          </template>
        </el-table-column>
        <el-table-column
          v-for="(column, index) in propsName"
          :key="column.dat"
          width="120"
          :label="column.label"
        >
          <template scope="scope" >
               <span :title="scope.row[column.dat]"
                     :class="'scopetext'+index"
               >{{scope.row[column.dat]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template scope="scope" class="icon_edit">
            <i class=" icon iconfont icon-edit1" @click="handleEdit(scope.row)"></i>
            <i class=" icon iconfont icon-delete1" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </scrollBar>
    <slot></slot>
    <!--确认删除-->
    <qgsDeleteDialog
      :dialog="dialogDeleteVisible"
      :content="'确认删除该商品吗'"
      @cancle="dialogDeleteVisible=false"
      @submit="submitDelete"
    >

    </qgsDeleteDialog>

  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import qgs_scrollBar from '@/components/Common/qgs_scrollBar.vue'
  import qgs_model from '@/components/Common/qgs-dialog.vue'
  import qgsDeleteDialog  from './qgs-delete-dialog'


  export default {
    props:['tableList','propsName','page','top'],
    computed:{...mapState(['screenHeight'])},
    components:{
      'scrollBar':qgs_scrollBar,
      'qgs_model':qgs_model,
        qgsDeleteDialog
    },
    data(){
      return {
        dialogDeleteVisible:false,
        temp:'', //删除需要临时保存的值
        searchId:'',//查询详情的id
      }
    },
    methods:{
      handleSelectionChange(val){
        let temp =[];
        val.map((item,key)=>{
            temp.push(item.id)
        })
        this.$emit('deletegroup',temp)
      },
      handleEdit(list){
        this.$emit('edit',list)
      },
      handleDelete(val){
        this.temp=val;
        this.dialogDeleteVisible=true;
      },
      //确认删除
      submitDelete(){
        this.dialogDeleteVisible=false;
        let temp=[];
          temp.push(this.temp.id);
        this.$emit('handleDeleteVal',temp)
      },
    },
    mounted(){
      this.$nextTick(()=>{
        $('.mormal_qgs_tableList .el-table__header-wrapper').css('top',this.top+'px');
        $('.mormal_qgs_tableList .el-table__body-wrapper').css('margin-top',(this.top-140)+'px')
      })
    }
  }

</script>

<style lang="scss">
  .mormal_qgs_tableList{
    width:100%;
    .model_body_detail{
      width:451px;
      padding:20px 30px 100px;
      font-size: 14px;
      p{
        padding:10px 0 0;
        span{
          display: inline-block;
          font-size:12px;
        }
        span:nth-child(2){
          position:relative;
          max-width: 350px;
          top:1px;
          white-space: normal;
          vertical-align: top;
          display: inline-block;

        }
      }
      .country_list{
        white-space: normal;
        .budget-btn-country{
          display: inline-block;
          padding:5px 15px;
          margin-right:5px;
          margin-bottom:5px;
          font-size: 12px;
          border:1px solid #5bc1ec;
          color:#5bc1ec
        }
      }
    }
    .el-table__header-wrapper{
      position: fixed;
      width:100%;
      z-index: 10;
      .el-table th{
        background:#f1f1f1 !important;
      }
    }
    .el-table__body-wrapper{
      /*margin-top:40px;*/
      tr:hover{
        background:#e7f8ff !important;
      }
    },
  .scopetext0{

    display: inline-block;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
    .scopetext1{
      color:#00a9f1;
      display: inline-block;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .scopetext2{
      color:#00a9f1;
      display: inline-block;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .scopetext3{
      color:#00a9f1;
      display: inline-block;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .cell i{
      color:#00a9f1;
      font-size:14px;
      padding:0 5px;
    }
    .el-checkbox__inner{
      border-radius:0;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
      background:#76c988;
      border-color:#75c988;
    }
    .el-pager li.active{
      background:#9fd8fb;
      border-color:#9fd8fb;
    }

  }
</style>

