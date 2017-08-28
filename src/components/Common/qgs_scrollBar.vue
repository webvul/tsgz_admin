<!--封装vue-scrollBar插件
-->
<template>
  <ScrollBar
    :style="scroll_bar_style"
    class="scroll_style"
    ref="Scrollbar1"
  >
    <div style="min-width: 35%;min-height:10px;">
      <slot>

      </slot>
    </div>
  </ScrollBar>
</template>

<script>
//  import "vue2-scrollbar/style/vue2-scrollbar.css"
  import ScrollBar from 'vue2-scrollbar'
  export default {
      props:['scroll_bar_style','status'],
      components: { ScrollBar},
      watch:{
        status(val){
            if(val) this.$refs.Scrollbar1.scrollToY(0)
        }
      },
    beforeDestroy(){

    },
      methods:{

      }
  }

</script>

<style>
  .scroll_style{
    width:100%;
    height:200px;
  }
  .vue-scrollbar-transition, .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
    transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
  }
  .vue-scrollbar-transition--scrollbar {
    transition: opacity 0.5s linear;
    -moz-transition: opacity 0.5s linear;
    -webkit-transition: opacity 0.5s linear;
    -o-transition: opacity 0.5s linear;
  }

  .vue-scrollbar__wrapper {
    /*margin: 0 auto;*/
    overflow: hidden;
    position: relative;
    background: white;
  }
  .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-horizontal {
    opacity: 1;
  }
  .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
    opacity: 0.5;
    position: absolute;
    background: transparent;
  }
  .vue-scrollbar__scrollbar-vertical:hover, .vue-scrollbar__scrollbar-horizontal:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    cursor: default;
  }
  .vue-scrollbar__scrollbar-vertical {
    width: 5px;
    height: 100%;
    top: 0;
    right: 0;
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar {
    width: 5px;
  }
  .vue-scrollbar__scrollbar-horizontal {
    height: 10px;
    width: 100%;
    bottom: 0;
    right: 0;
  }
  .vue-scrollbar__scrollbar-horizontal .scrollbar {
    height: 10px;
  }

</style>
