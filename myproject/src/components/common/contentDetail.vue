<template>
  <div class="content-detail">
    <h1>{{detail.article_name}}</h1>
    <p v-html="detail.content"></p>
    <h2><span>浏览量：{{detail.visitors}}</span><span>作者：{{detail.editer}}</span></h2>
  </div>
</template>
<script>
export default {
  data(){
      return{
          detail:[]
      }
  },
  created(){
    this.detail = this.$route.query.data
  }
}
</script>

<style scoped>
.content-detail{
  width: 600px;
}
  h1{
    width: 100%;
    background: #404a58;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    padding:0 10px;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  p{
    width: 100%;
    background: #eeeeee;
    min-width: 50px;;
    line-height: 25px;
    text-indent: 2rem;
    font-size: 14px;
    height:400px;
    padding: 0 10px;
  }
  h2{
    height: 25px;
    background: #404a58;
    color: #ffffff;
    line-height: 25px;
    width: 100%;
    padding: 0 10px;
    
  }
  h2 span:nth-child(1){
    float: left;
  }
  h2 span:nth-child(2){
    float: right;
  }
</style>
