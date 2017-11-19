<template>
    <div class="detailList">
        <el-table
            @row-dblclick="enterDetail"
            :data="tableData"
            style="width: 600px;"
            class="detail_left">
            <el-table-column
                prop="article_name"
                label="标题"
                width="120">
            </el-table-column>
            <el-table-column
                prop="cnname_one"
                label="分类"
                width="120">
            </el-table-column>
            <el-table-column
                prop="editer"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="time"
                label="发布时间"
                width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
<style scoped>
    .detailList{
        width: 100%;
    }
    .detailList .detail_left{
        width: 700px;
    }
</style>
<script>
export default {
  data(){
      return {
          tableData:[],
          contentForm:[]
      }
  },
  watch:{
      $route(){
          this.tableData=this.$route.query.data
      }
  },
  created(){
      this.axios.get("/api/front_article/getArticleAll").then((data)=>{
        this.contentForm = data.data.data;
        this.contentForm.forEach((val,i)=> {
            if(val.cnname_one == this.$route.query.data){
                this.tableData.push(val)
                console.log()
            }
        });
    })
  },
  methods:{
      enterDetail(row){
          this.$router.push({path:"/contentDetail",query:{data:row}})
      }
  }
}
</script>
