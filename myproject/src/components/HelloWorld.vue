<template>
    <div class="mainPart">
        <headers></headers>
        <navs :oneClass="oneClassList"></navs>
        <div class="middlePart">
            <router-view class="middle_left" style="width:600px;"></router-view>
            <div class="middle_right">
                <div class="small">
                    <h1 class="h1">全站搜索</h1>
                    <div class="search">
                        <el-input v-model="input" style="width:205px" placeholder="请输入内容"></el-input>
                        <el-button type="primary" icon="search" style="margin-left:0px" @click="searchTit">搜索</el-button>
                    </div>
                </div>
                <div class="small">
                    <!-- <h1>排行</h1> -->
                    <el-table :data="tableData" class="soft" style="width: 360px;height:163px" :default-sort="{prop: 'visitors', order: 'descending'}">
                        <el-table-column class="h1" prop="soft" label="排行：" width="80" style="">
                        </el-table-column>
                        <el-table-column prop="article_name" width="140">
                        </el-table-column>
                        <el-table-column prop="visitors">
                        </el-table-column>
                    </el-table>

                </div>
                <div class="small">
                    <!-- <h1>最新文章"★  "</h1> -->
                    <el-table :data="tableData" class="soft" style="width: 360px;height:163px" :default-sort="{prop: 'time', order: 'descending'}">
                        <el-table-column class="h1" prop="soft" label="最新文章:" width="95">
                        </el-table-column>
                        <el-table-column prop="article_name" style="text-align:center;font-size:10px" width="100">
                        </el-table-column>
                        <el-table-column prop="time" width="170" style="font-size:10px">
                        </el-table-column>
                    </el-table>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import headers from "./common/headers"
import navs from "./common/navs"
import { mapState } from "vuex"
export default {
    name: 'main',
    data() {
        return {
            oneClassList: [],
            tableData: [],
            input: "",
            searchArt: []
        }
    },
    computed: {
        ...mapState(["artData", "navData"])
    },
    components: {
        headers: headers,
        navs: navs,
    },
    created() {
        this.axios.get("/api/front_article/getNav").then((data) => {
            this.oneClassList = data.data.data;
        })
        this.axios.get("/api/front_article/getArticleAll").then((data)=>{
                this.tableData = data.data.data;
            })
    },


    methods: {
        formatter_tit(row, column) {
            return row.article_name;
        },
        searchTit() {
            this.searchArt = [];
            
            this.tableData.forEach((val, i)=>{
                if (this.input == "") {
                    alert("请输入搜索内容")
                }
                else{
                    if(val.article_name.indexOf(this.input) != -1) {
                        alert("成功")
                        this.searchArt.push(val)
                        this.$router.push({ path: "/detail", query: { data: this.searchArt } })
                    }
                    else{
                        alert("你搜索的内容不存在")
                    }
                }
            });
        },
        
    }
}
</script>
<style scoped>
.mainPart {
    width: 100%;
    height: 100%;
    /* background:url("../../static/images/banner.gif") no-repeat; */
    background-size: 100%;
}

.small {
    margin-bottom: 20px;
    border: 1px solid red;
}

.soft {
    background: #ffffff;
    font-size: 13px;

    overflow: hidden;
}

.middle_right {
    width: 360px;
    height: 240px;
    background: #fff;
}


.middlePart {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.middle_left {
    width: 600px;
}

.contentList h1 {
    padding: 10px 15px;
    margin: 40px 0 10px 0;
    border-left: 2px solid #eb374b;
    font-size: 16px;
}

.contentList time {
    position: absolute;
    width: 150px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #eb374b;
    left: -25px;
    top: 5px;
}

.contentList p {
    line-height: 28px;
    font-size: 14px;
    height: 100px;
    background: #eeeeee;
    padding: 15px 10px;
    text-indent: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.contentList h2 {
    margin-top: 10px;
    font-size: 14px;
}

.contentList h2 span {
    float: left;
    margin-left: 30px;
}

.contentList h2 code {
    float: right;
    margin-right: 15px;
}

.middle_right h1 {
    width: 100%;
    height: 30px;
    background: #404a58;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    line-height: 25px;
}
</style>
