<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h1>一级类名设置</h1>
        <el-form-item label="中文类名" prop="cnname_one">
            <el-input style="width:200px" v-model="ruleForm.cnname_one"></el-input>
        </el-form-item>
        <el-form-item label="英文类名" prop="enname_one">
            <el-input style="width:200px" v-model="ruleForm.enname_one"></el-input>
        </el-form-item>
        <h1>二级类名设置</h1>
        <el-form-item label="中文类名" prop="cnname_two">
            <el-input style="width:200px" v-model="ruleForm.cnname_two"></el-input>
        </el-form-item>
        <el-form-item label="英文类名" prop="enname_two">
            <el-input style="width:200px" v-model="ruleForm.enname_two"></el-input>
        </el-form-item>
        <el-form-item>
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
                enname_one: "",
                cnname_one: "",
                enname_two: "",
                cnname_two: "",
            },
            rules: {
                enname_one: [
                    { validator: englishTest, trigger: 'blur' }
                ],
                enname_two: [
                    { validator: englishTest, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var _this = this;
                    this.axios.post('/api/back_class/add_class_one', this.ruleForm)
                        .then(function(response) {
                            switch (response.data.code) {
                                case "1010":
                                    _this.$message({
                                        type: "error",
                                        message: "不好意思，添加一级类名冲突"
                                    })
                                    break;
                                case "1012":
                                    _this.$message({
                                        type: "error",
                                        message: "不好意思，添加二级类名冲突"
                                    })
                                    break;
                                case "1011":
                                    _this.$message({
                                        type: "error",
                                        message: "分类一插入数据库失败"
                                    })
                                    break;
                                case "1013":
                                    _this.$message({
                                        type: "error",
                                        message: "分类二插入数据库失败"
                                    })
                                    break;
                                case "1014":
                                    _this.$message({
                                        type: "success",
                                        message: "添加成功"
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
