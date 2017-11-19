<template>
    <div id="main">
        <h1>个人博客
            <span>当前登录用户：<input type="text" v-model="user" readonly></span>
        </h1>
        <div class="changePart">
            <el-collapse class="main_left" style="border:1px solid #dfe6ec;width:200px;">
                <el-collapse-item class="border_bg">
                    <template slot="title">
                        <i class="header-icon el-icon-menu"></i>
                        文章管理
                    </template>
                    <router-link tag="div" :to="{name:'addArtical'}">添加文章</router-link>
                    <router-link tag="div" :to="{name:'articalList'}">文章列表</router-link>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="header-icon el-icon-setting"></i>
                        分类管理
                    </template>
                    <router-link tag="div" :to="{name:'addClassOne'}">增加一级列表</router-link>
                    <router-link tag="div" :to="{name:'addClassTwo'}">增加二级列表</router-link>
                    <router-link tag="div" :to="{name:'classList'}">分类列表</router-link>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="header-icon el-icon-setting"></i>
                        接口管理
                    </template>
                    <router-link tag="div" :to="{name:'addApi'}">增加接口文档</router-link>
                    <router-link tag="div" :to="{name:'apiListFont',params:{type:'font'}}">前台接口列表</router-link>
                    <router-link tag="div" :to="{name:'apiListBack',params:{type:'back'}}">后台接口列表</router-link>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <i class="header-icon el-icon-setting"></i>
                        留言板管理
                    </template>
                    <router-link tag="div" :to="{name:'resumeMsg'}">个人简介留言</router-link>
                    <router-link tag="div" :to="{name:'blogMsg'}">博客留言</router-link>                    
                </el-collapse-item>
            </el-collapse>
            
            <router-view class="main_right"></router-view>
        </div>

    </div>
</template>
<style scoped>
#main {
    width: 100%;
    height: 100%;
}
input{
    background: #5f9ea0;
    border:none;
}
.changePart {
    width: 100%;
    display: flex;
}
h2{
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    padding-left: 20px;
}
.main_left{
    width: 200px;
}
.el-collapse {
    width: 200px;
    /* height: 400px; */
}
.main_right {
    flex: 1;
}
.el-collapse-item__content div{
    height: 30px;
}
#main h1 {
    height: 50px;
    background: #5f9ea0;
    line-height: 50px;
    padding: 0 10px;
}

#main h1 span {
    float: right;
}
.main_left .el-icon-arrow-right{
    float: right;
    margin-top: 20px;
}
.main_left .el-collapse-item__header__arrow {
    margin-right: 8px;
    transition: transform .3s;
    float: right;
}




</style>
<script>
export default {
    data() {
        return {
            activeNames: ['1'],
            
        }
    },
    computed:{
        user(){
            var ss = window.sessionStorage;
            return ss.getItem("loginname")
        }
    }
}
</script>
