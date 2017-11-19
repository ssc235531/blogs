<template>
  <div class="mian">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  name:'index',
  data(){
      return {
          ruleForm:{
              name:"",
              email:"",
              tel:"",
              content:""
          }
      }
  },
  methods:{
      submitForm(formName){
           this.$refs[formName].validate((valid) => {

                if (valid) {

                    //通过调用新浪
                    // $.get
                    this.axios.post('/api/myresume/insertmsg', this.ruleForm)
                        .then(function(response) {
                            console.log(response)
                            switch(response.data.code){
                                case "3010" : alert("添加失败")
                                break;
                               case "3011" : alert("添加成功")
                                break;
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            // console.log(this.ruleForm)

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
      
  }
}
</script>
<style scoped>
    .main{
        width: 500px;
        margin: 50px auto;
    }
</style>
