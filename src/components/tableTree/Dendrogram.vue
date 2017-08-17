<!--自制树结构
   接收参数 data：[] 接收过来的树结构

-->
<template>
  <div class="dendrogram">
      <div v-for="item in transdata">
        <div class="step1">
          <header class="headTitle" :style="'background:'+configColor.color[0]">
            {{item[propNames.label]}}
            <div class="single">
            </div>
            <div class="line"></div>

          </header>
        </div>
        <div class="step_child">
          <dendrogram-list
            :propNames="propNames"
            :data="item[propNames.children]"
            :configColor="configColor"
          >
          </dendrogram-list>
        </div>

      </div>
  </div>
</template>
<script>
  import DendrogramList from './config_tree/DendrogramList.vue'
  import Utils from './../../utils/dataTranslate';
  export default {
    name: 'Dendrogram',
    components:{
      DendrogramList
    },
    props: {
        watchData:{
          default:true
        },
        data:{
            type:Array,
            default:[]
        },
        propNames:{
          type:Object,
          default:{
            label:'label',
            children:'children'
          }
        },
        level:{
            type:Number,
            default:4
        }
    },
    data() {
      return {
          configColor:{
            color:['#2078e5','#38acee','#37dbdc','#73dcc9'],
            tiggerColor:['#186acf','#319edc','#3ebcca','#5eccb8'],
            activeColor:'#f56e6d',
            activeTriggerColor:'#e46463'
          }
      }
    },
    computed: {
      transdata () {
          if(this.watchData){
            this.watchData=false;
            console.log(this.watchData)
            console.log(Utils.setData(this.data, null, null, true));
          }
          return this.data
      }
    },
    watch: {

    },
    mounted() {

    },

  }
</script>
<style scoped lang="scss">
    .dendrogram{
      width:100%;
      height:380px;
      background:#fef8f0;
      overflow-x: auto;
      .step1{
        width:100%;
        display: flex;
        justify-content: center;
      }
      .headTitle{
        margin-top:90px;
        width:320px;
        height:40px;
        line-height: 40px;
        text-align: center;
        position:relative;
        color:#fff;
        font-weight: bold;
        .single{
          position:absolute;
          top:-7.5px;
          width: 0;
          height: 0;
          border-left: 160px solid transparent;
          border-right: 160px solid transparent;
          border-bottom: 7.5px solid #186acf;
        }
        .line{
          width:1px;
          height:20px;
          background:#e0dbce;
          position:absolute;
          bottom:-20px;
          left:50%;
        }

      }
    }
</style>
