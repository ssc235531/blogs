<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">个人博客</el-menu-item>
        <el-submenu v-for="(items,index) in oneClass" :index="items.onedata.cnname" :key="index">
            <template slot="title">{{items.onedata.cnname}}</template>
            <el-menu-item v-for='(item,idx) in items.twodata' :index='item.cnname' :key="idx">{{item.cnname}}</el-menu-item>
        </el-submenu>
        </el-menu>
        <el-breadcrumb separator="/" class="crumbBox">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/oneDetail',query:{data:oneCru}}">{{oneCru}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/detail',query:{data:ruleForm}}">{{twoCru}}</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import { mapState } from "vuex"
    export default {
        name: 'nav',
        data(){
            return {
                activeIndex: '1',
                classIdx : [],
                oneCru:"技术",
                twoCru:"vue",
                ruleForm:[],
                contentForm:[],
            }
        },
        mounted(){
            this.oneClass.forEach(function(i,idx) {
                this.classIdx.push(idx+2)
            });
            console.log(this.classIdx)
        },
         computed: {
            ...mapState(["artData", "navData"])
        },
        created(){
             this.axios.get("/api/front_article/getArticleAll").then((data)=>{
                this.contentForm = data.data.data;
            })
        },
        props:["oneClass"],
        methods:{
            handleSelect(key, keyPath) {
                this.oneCru = keyPath[0];
                this.twoCru = keyPath[1];
                this.getData(keyPath[0],keyPath[1])
                this.$router.push({path:"/detail",query:{data:this.ruleForm}})
            },
            getData(one,two){
                this.ruleForm = [];
                this.contentForm.forEach((val,i)=>{
                    if(val.cnname_one == one && val.cnname_two==two){
                        this.ruleForm.push(val)
                    }
                })
            },
           
        }
    }
</script>
<style scoped>
    .crumbBox{
        font-size:14px;
        padding:20px;
    }
</style>