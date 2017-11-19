<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h1>一级类名选择</h1>
        <el-form-item label="类名选择" prop="region">
            <el-select v-model="ruleForm.oneId" placeholder="请选择">
                <el-option v-for="items in oneClass" :key="items.id" :label="items.cnname" :value="items.id"></el-option>
            </el-select>
        </el-form-item>
        <h1>二级类名设置</h1>
        <el-form-item label="中文类名" prop="cnname_two">
            <el-input style="width:200px"  v-model="ruleForm.cnname_two"></el-input>
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
            if (value === '') {
                callback(new Error('请输入英文'));
            } else {
                if (!/^[a-zA-Z]{3,15}$/.test(value)) {
                   callback(new Error('请输入正确的英文'));
                }
                callback();
            }
        };
        return {
            oneClass: [],
            ruleForm: {
                oneId: "",
                enname_two: "",
                cnname_two:"",
            },
            rules: {
                enname_two: [
                    { validator: englishTest, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.axios.get("/api/back_article/getClass").then((data) => {
            this.oneClass = data.data.data[0];
        }, this)
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var _this = this;
                    this.axios.post('/api/back_class/add_two_class', this.ruleForm)
                        .then(function(response) {
                            switch (response.data.code) {
                                case "1030":
                                    _this.$message({
                                        type: "error",
                                        message: "英文标识冲突"
                                    })
                                    break;
                                case "1031":
                                    _this.$message({
                                        type: "error",
                                        message: "数据库错误"
                                    })
                                    break;
                                case "1032":
                                    _this.$message({
                                        type: "success",
                                        message: "数据插入成功"
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
