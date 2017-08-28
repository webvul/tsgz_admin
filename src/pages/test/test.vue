<template>
        <scroll_bar
           :scroll_bar_style="'width:50%;height:100px;border:1px solid red'"
        >
          <div>
            <p v-for="item in 30">{{item}}</p>
          </div>
        </scroll_bar>
</template>
<script>
    import qgs_scrollBar from '@/components/Common/qgs_scrollBar.vue'
    export default {
        data() {
            return{

              }
        },
        components:{
          'scroll_bar':qgs_scrollBar
        },
      created(){

      },
        methods: {


        }
    };
</script>
