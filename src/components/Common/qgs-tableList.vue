<template>
   <div class="qgs_tableList">
     <scrollBar
       :scroll_bar_style="'width:100%;height:'+(screenHeight-240)+'px;border-bottom:1px solid #ddd'"
       :status="page"
     >
         <el-table
           :data="tableList"
           border
            @row-dblclick="handleDBC"
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
             width="150"
             :label="column.label"
           >
             <template scope="scope" >
               <span :title="scope.row[column.dat]"
                 @click="handleShowDetail(index,scope.row)"
                 @dblclick="handleDBC(index,scope.row)"
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
     <qgs_model
       :title="'商品详情'"
       :dialog="dialogshowVisible"
       @cancle="dialogshowVisible=false"
       :hideFooter="true"
     >
      <div class="model_body_detail">
         <p v-if="formList.hsCode"><span>HS编码：</span><span>{{formList.hsCode}}</span></p>
        <p v-if="formList.hsName"><span>HS名称：</span><span>{{formList.hsName}}</span></p>
        <p v-if="formList.supCond"><span>监管条件：</span><span>{{formList.supCond}}</span></p>
        <p v-if="formList.inspquaType"><span>检验检疫：</span><span>{{formList.inspquaType}}</span></p>
          <p v-if="formList.name"><span>商品名称：</span><span>{{formList.name}}</span></p>
          <p v-if="formList.productName"><span>品名：</span><span>{{formList.productName}}</span></p>
          <!--<p v-if="formList.hsName"><span>HS名称：</span><span>{{formList.hsName}}</span></p>-->
          <p v-if="formList.alias"><span>别名：</span><span>{{formList.alias}}</span></p>
        <!--限制类商品-->
          <p v-if="formList.certificate"><span>证书名称：</span><span>{{formList.certificate}}</span></p>
          <p v-if="formList.standard"><span>适用环境保护控制标准：</span><span>{{formList.standard}}</span></p>
          <p v-if="formList.remarks"><span>备注：</span><span>{{formList.remarks}}</span></p>
        <!--限制类商品结束-->
        <p v-if="formList.cas"><span>CAS号：</span><span>{{formList.cas}}</span></p>
          <p v-if="formList.remark"><span>备注：</span><span>{{formList.remark}}</span></p>
          <p v-if="formList.productAllowSons" class="country_list"><span>准入国家：</span>
            <span class="budget-btn-country" v-for="item in formList.productAllowSons?formList.productAllowSons:[]">{{item.conContent}}</span>
          </p>
      </div>
     </qgs_model>
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
       props:['tableList','propsName','page','type'],
      computed:{...mapState(['screenHeight'])},
      components:{
           'scrollBar':qgs_scrollBar,
           'qgs_model':qgs_model,
            qgsDeleteDialog
      },
      data(){
        return {
          dialogshowVisible:false,
          dialogDeleteVisible:false,
          temp:'', //删除需要临时保存的值
          formList:{}, //用户临时保存的row值
          searchId:'',//查询详情的id
        }
      },
      watch:{

      },
      methods:{
        ...mapActions(['getCatalogueById','getadmittanceGoodsById']),
        handleSelectionChange(val){
          let temp =[];
          val.map((item,key)=>{
              if(this.type==1){
                temp.push(item.hsCode)
              }else{
                temp.push(item.id)
              }
          })
          this.$emit('deletegroup',temp)
        },
        handleEdit(list){
            this.$emit('edit',list)
        },
        handleDelete(val){
          this.temp=val
          this.dialogDeleteVisible=true;
        },
        handleShowDetail(index,row){
            if(index===1){
                this.dialogshowVisible=true;
              this.handleDBC(row);
            }
        },
        handleDBC(row,event){
          this.dialogshowVisible=true;
          console.log(row);
          this.searchId=row.id;
          this.formList={};
          switch (this.type){
            case 1:{
                this.getCatalogueById(this);
                break;
            }
            case 2:{
                this.getadmittanceGoodsById(this);
                break;
            }
            default:{
                console.log(row);
              this.formList=Object.assign(row);
              break
            }
          }

        },
        //确认删除
        submitDelete(){
          this.dialogDeleteVisible=false;
          let temp=[];
          if(this.type==1){
            temp.push(this.temp.hsCode);
          }else{
            temp.push(this.temp.id);
          }

          this.$emit('handleDeleteVal',temp)
        }
      },
      mounted(){

      }
    }

</script>

<style lang="scss">
  .qgs_tableList{
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
      top:140px;
      width:100%;
      z-index: 10;
      .el-table th{
        background:#f1f1f1 !important;
      }
    }
    .el-table__body-wrapper{
      margin-top:40px;
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
