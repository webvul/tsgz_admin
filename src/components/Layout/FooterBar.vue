<template>
    <div class="pageFooter_title">
        <div class="footer_content">
             <span class="text-left">
                <a href="http://www.changzhouciq.gov.cn" target="_blank">业务分析平台</a> &copy; 2017 版权所有.
            </span>
            <span class="float-xs-right">
                技术支持： <a href="http://www.qgs-china.com/jad/" target="_blank">杭州中检杰德信息科技有限公司</a>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {}
    }
</script>
<style scoped>
    .pageFooter_title {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 45px;
        left: 0;
        z-index:22;
        overflow: hidden;
    }

    .pageFooter_title .float-xs-right {
        float: right;
    }

    .footer_content {
        margin-top: 2px;
        border-top: 1px solid #cfd8dc;
        height: 43px;
        line-height: 43px;
        font-size: 0.2rem;
        background: #eceff1;
        padding: 0 0.2rem;
    }

    .footer_content span {
        font-size: 0.16rem;
    }

    .footer_content span a {
        color: #20a8d8
    }
</style>
