<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h1>一级分类修改</h1>
        <el-form-item label="中文类名" prop="cnname">
            <el-input style="width:200px" v-model="ruleForm.cnname"></el-input>
        </el-form-item>
        <el-form-item label="英文类名" prop="enname">
            <el-input style="width:200px" v-model="ruleForm.enname"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped>
h1 {
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
    line-height: 50px;
}

.el-button {
    margin-left: 20px;
}
</style>
<script>
export default {
    data() {
        var englishTest = (rule, value, callback) => {
            // console.log(rule)
            if (value === '') {
                callback(new Error('请输入英文'));
            } else {
                if (!/^[a-zA-Z]{3,15}$/.test(value)) {
                    // this.$refs.ruleForm2.validateField('checkPass');
                   callback(new Error('请输入正确的英文'));
                }
                callback();
            }
        };
        return {
            ruleForm: {

            },
            changeForm: {
                oldenname_one:"",
                enname_one:"",
                cnname_one:""
            },
            rules: {
                enname: [
                    { validator: englishTest, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.ruleForm = this.$route.params.data.onedata
        this.changeForm.oldenname_one = this.ruleForm.enname;
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.changeForm.enname_one = this.ruleForm.enname
                    this.changeForm.cnname_one = this.ruleForm.cnname
                    var _this = this;
                    this.axios.post('/api/back_class/amend_class_one', this.changeForm)
                        .then(function(response) {
                            console.log(response)
                            switch (response.data.code) {
                                case "1501":
                                    _this.$message({
                                        type: "error",
                                        message: "修改表失败"
                                    })
                                    break;
                                case "1053":
                                    _this.$message({
                                        type: "error",
                                        message: "更新类名失败"
                                    })
                                    break;
                                case "1050":
                                    // alert("添加成功")
                                    _this.$message({
                                        type: "error",
                                        message: "英文标识冲突"
                                    })
                                    break;
                                case "1052":
                                    _this.$message({
                                        type: "success",
                                        message: "成功"
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
        },
    }
}
</script>
