<!--此组件的作用是使表格随着窗口该表而改变，并且可以暴露组件的高度-->
<template>
    <div :style="'height:'+boxHeight+'px;border:1px solid red'">
      <slot :boxHeight="boxHeight"></slot>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                boxHeight:0
            }
        },
        props:{
          ruleNum:{
            type: Number,
            default :0
          }
        },
        created(){
            let _this = this;
            this.boxHeight=$(window).height()-this.ruleNum;
            $(window).resize(function(){
              _this.boxHeight=$(window).height()-_this.ruleNum;
            })
        }
    }
</script>
<style scoped>

</style>
