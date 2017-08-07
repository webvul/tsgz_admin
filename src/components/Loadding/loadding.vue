<template>
  <div class="loadding_img">
    <img src="./lg.double-ring-spinner.gif" alt="" style="width:5rem;height:5rem;max-height:100%;"/>
  </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
    }
</script>

<style>
  .loadding_img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:999;
  }
</style>
