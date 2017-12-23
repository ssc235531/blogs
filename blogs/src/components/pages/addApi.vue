<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h1>增加接口文档</h1>

            <el-form-item label="标题555" prop="title">
                <el-input style="width:200px" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="接口地址777" prop="url">
                <el-input style="width:200px" v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="类型jjjj" prop="backorfont">
                <el-select v-model="ruleForm.backorfont" placeholder="请选择">
                    <el-option label="前台接口" value="前台接口"></el-option>
                    <el-option label="后台接口" value="后台接口"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option label="get" value="get"></el-option>
                    <el-option label="post" value="post"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求参数" prop="sendparams">
                <el-input type="textarea" v-model="ruleForm.sendparams"></el-input>
            </el-form-item>
            <el-form-item label="返回数据" prop="getparams">
                <el-input type="textarea" v-model="ruleForm.getparams"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
h1 {
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
    line-height: 50px;
}
</style>
<script>
export default {
    data() {
        return {
            ruleForm: {
                title:"",  //接口标题
                url:"",  //接口地址
                type:"", //接口类型
                sendparams:"", //发送的参数
                getparams:"", //响应参数
                backorfont:"", //前台或后台接口
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: '请输入接口地址', trigger: 'blur' },
                ],
                backorfont: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择请求类型', trigger: 'change' }
                ],
                sendparams: [
                    { required: true, message: '请填写请求参数', trigger: 'blur' }
                ],
                getparams: [
                    { required: true, message: '请填写返回数据', trigger: 'blur' }
                ]

            }
        }
    },

    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
            console.log(this.ruleForm)
            var _this = this;
                    this.axios.post('/api/apilist/', this.ruleForm)
                        .then(function(response) {
                            switch(response.data.code){
                                case "2001" :
                                // alert("添加失败")
                                _this.$message({
                                    showClose:true,
                                    message:"失败",
                                    type:"error",
                                })
                                break;
                               case "2000" :
                               _this.$message({
                                   showClose:true,
                                   message:"成功",
                                   type:"success"
                               })
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
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
