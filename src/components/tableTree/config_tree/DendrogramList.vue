<!--自制树结构
   接收参数 data：[] 接收过来的树结构

-->
<template>
  <div class="stepItem">
      <div v-for="item,key in data">
          <div class="stepItemList"
               :style="item._expanded?('background:'+configColor.activeColor):'background:'+configColor.color[item._level]"
               :title="item[propNames.label]"
               @click="toggleExpand(key)">
            <span>{{item[propNames.label]}}</span>
           <div :class="item._expanded?'single_down':'single_up'"
                :style="item._expanded?'':'border-bottom: 7.5px solid '+configColor.tiggerColor[item._level]+';'"
           ></div>
            <div class="line_up"></div>
            <div class="line_left" v-if="key>0"></div>
            <div class="line_right" v-if="key<data.length-1"></div>
          </div>
        <!--<dendrogram-list
          :propNames="propNames"
          :data="item[propNames.children]"
        >
        </dendrogram-list>-->
      </div>
  </div>
</template>
<script>

  export default {
    name: 'DendrogramList',
    props: {
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
        },
      configColor:{
          type:Object,
      }
    },
    data() {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods:{
      toggleExpand(treIndex){

        let _this = this
        _this.data.map((item,key)=>{
             item._expanded=false;
        });
        let record = _this.data[treIndex];
        record._expanded = !record._expanded
      }
    }

  }
</script>
<style scoped lang="scss">
    .stepItem{
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      .stepItemList{
        position:relative;
        margin-top:40px;
        color:#fff;
        width:130px;
        height:35px;
        margin-right:10px;
        text-align: center;
        vertical-align: middle;
        padding:10px;
        .span{
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
          z-index: 2;
        }
        .single_up{
          position:absolute;
          left:0;
          top:-7.5px;
          width: 0;
          height: 0;
          z-index: 1;
          border-left: 65px solid transparent;
          border-right: 65px solid transparent;

        }
        .single_down{
          position:absolute;
          width: 0;
          height: 0;
          border-left: 65px solid transparent;
          border-right: 65px solid transparent;
          border-top: 7.5px solid #e46463;
          bottom:-7.5px;
          left:0;
        }
        .line_up{
          width:1px;
          height:20px;
          background:#e0dbce;
          position:absolute;
          top:-20px;
          left:50%;
        }
        .line_left{
          width:75px;
          height:1px;
          background:#e0dbce;
          position:absolute;
          top:-20px;
          left:0;
        }
        .line_right{
          top:-20px;
          width:75px;
          height:1px;
          background:#e0dbce;
          position:absolute;
          left:50%;
        }
        .line_left:nth-last-child(1){
          left:-10px;
        }
      }
    }
</style>
