<template>
  <dendrogram
       :data="resData"
       :propNames="defaultProps"
       :level="4"
  >

  </dendrogram>
</template>
<script>
    import Dendrogram from '@/components/tableTree/Dendrogram'
    import {tranlateDataTreeManagement} from '@/utils'
    import AJAX from '@/assets/js/ajax';
    export default {
        data() {
            return{
                resData:[],
              defaultProps: {
                children: 'children',
                label: 'name',
                id: "id",
              },
            }
        },
        components:{
          Dendrogram
        },
      created(){
        this.getAjax();
      },
        methods: {
            getAjax(){
                AJAX.get('website/sys/office/treeData',{},(res)=>{
                    this.resData=tranlateDataTreeManagement(res);
                })

            }

        }
    };
</script>
