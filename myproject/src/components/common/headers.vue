<template>
    <header>
        <div class="headImg">

        </div>
        <h1>只因人在风中，聚散不由你我</h1>
    </header>
</template>
<script>
    export default {
        name: 'headers',
        data(){
            return {
                
            }
        }
    }
</script>
<style scoped>
    header{
        width:100%;
        height:300px;
        background:#21292f;
        position:relative;
    }
    .headImg{
        width:160px;
        height:160px;
        background:url("../../../static/images/user.jpeg") no-repeat;
        background-origin: center;
        background-size: 100%;
        border-radius:50%;
        position:absolute;
        left:50%;
        top:50%;
        margin-top:-120px;
        margin-left:-80px;
    }
    h1{
        width:100%;
        height:20px;
        position:absolute;
        bottom:30px;
        left:0px;
        font-size:16px;
        text-align:center;
        color: #ffffff;
    }
</style>