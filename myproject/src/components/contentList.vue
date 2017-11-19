<template>
    <div class="left">
            <!-- <div class="middle_left"> -->
                <div class="contentList" v-for="(item,index) in contentForm" :key="index">
                    <time>{{item.TIME.slice(0,10)}}</time>
                    <h1>{{item.article_name}}</h1>
                    <p>{{item.content}}</p>
                    <h2><span>{{item.editer}}</span><span>浏览次数:{{item.visitors}}</span><code @click="clickFn(item.content)">点击阅读-></code></h2>
                </div>
            <!-- </div> -->
           
        </div>
</template>
<style scoped>
    .contentList h1{
        padding:10px 15px;
        margin: 40px 0 10px 0;
        border-left:2px solid #eb374b;
        font-size:16px;
    }
    .contentList time{
        position:absolute;
        width:150px;
        height:40px;
        line-height:40px;
        color:#fff;
        text-align:center;
        background:#eb374b;
        left:-25px;
        top:5px;
    }
    .contentList {
    width: 700px;
    height: 240px;
    padding: 20px 15px;
    background: #fff;
    border: 1px solid #ccc;
    position: relative;
    margin-top: 20px;
}

    .contentList p{
        line-height:28px;
        font-size:14px;
        height:100px;
        background:#eeeeee;
        padding:15px 10px;
        text-indent:2em;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:4;
        -webkit-box-orient:vertical;
        overflow:hidden;
    }
    .contentList h2{
        margin-top:10px;
        font-size:14px;
    }
    .contentList h2 span{
        float:left;
        margin-left:30px;
    }
    .contentList h2 code{
        float:right;
        margin-right:15px;
    }
    code{
        cursor: pointer;
    }
</style>
<script>
    import {mapState} from "vuex"
    export default {
        data(){
            return{
                name:"mag",
                contentForm:[]
            }
        },
        computed:{
            ...mapState(["artData","navData"])
        },
        created(){
            if(!this.artData){
                this.$router.push({path:"/loading",query:{path:"/contentList"}})
            }else{
                this.contentForm = this.artData
            }
        },
        methods:{
            clickFn(tit){
                this.$router.push({path:"/contentDetail",query:{data:tit}})
            }
        }
    }
</script>