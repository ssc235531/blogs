<template>
    <div>
        <h1>增加文章</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:800px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="article_name">
                <el-input v-model="ruleForm.article_name"></el-input>
            </el-form-item>
            <el-form-item label="一级类名" prop="oneId">
                <el-select v-model="ruleForm.oneId" placeholder="请选择"  @change="changeClassOne()">
                    <el-option v-for="items in oneClass" :key="items.id" :label="items.cnname" :value="items.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级类名" prop="twoId">
                <el-select v-model="ruleForm.twoId" placeholder="请选择" :clearable="true"> 
                    <el-option v-for="item in twoClass" :label="item.cnname" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否显示" prop="art_show">
                <el-radio-group v-model="ruleForm.art_show">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0" is-checked>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否推荐" prop="recommend">
                <el-radio-group v-model="ruleForm.recommend">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0" is-checked>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="作者" prop="editer" style="width:600px">
                <el-input v-model="ruleForm.editer"></el-input>
            </el-form-item>
            <el-form-item label="导读" style="width:800px" prop="daodu">
                <el-input type="textarea" :row="2" :autosize='{minRows:2,maxRows:10}' v-model="ruleForm.daodu" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="时间" class="block" prop="time">
                <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间" class="data" @change="timefn" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- <el-col :span="18" :offset="0"> -->
                    <div id="editor"></div>
                <!-- </el-col> -->
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

.el-input {
    width: 600px;
}

.block {
    margin-bottom: 20px;
}

.demonstration {
    font-size: 14px;
    margin-right: 8px;
}

.data {
    width: 217px;
}

#edui1_iframeholder {
    height: 100px;
}
</style>
<script>
export default {
    data() {
        return {
            editor:null,
            oneClass:[],
            twoClass:[],
            twoClasAll:[],
            oneClassDate:{},
            ruleForm: {
                article_name: '',
                oneId: '',
                twoId: '',
                art_show: "0",
                recommend: "0",
                editer: '',
                daodu: '',
                time: '',
                content: '',
               imgsrc:'',
                enname_one:''
            },
            rules: {
                article_name: [
                    { required: true, message: '请输入文章名称', trigger: 'blur' },
                    { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
                ],
                oneId: [
                    { required: true, message: '请选择一级类名' }
                ],
                twoId: [
                    { required: true, message: '请选择二级类名' }
                ],
                 times: [
                    { required: true, message: '请选择时间', }
                ],
                editer: [
                    { required: true, message: '请输入作者名称', trigger: 'blur' },
                    { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
                ],
                daodu: [
                    { required: true, message: '请输入导读', trigger: 'blur' }
                ],
                content: [
                    { required: false, message: '请输入内容', trigger: 'blur' }
                ]
            },
            editor: null,

        }
    },
    created(){
        // var _this = this;
        this.axios.get("/api/back_article/getClass").then((data)=>{
            this.oneClass = data.data.data[0];
            this.twoClasAll = data.data.data[1]
            console.log(this.oneClass)
        },this)
    },
    methods: {
        timefn(timedata){
            console.log(timedata)
            this.ruleForm.time = timedata
        },
        changeClassOne(){
            this.twoClass = [];
            var oneItem = null;
            this.oneClass.forEach(function(i) {
                if(i.id == this.ruleForm.oneId){
                    oneItem = i;
                   
                }
            }, this);
             console.log(oneItem.enname)
            this.twoClasAll.forEach(function(i,index){
                if(i.parent_id == this.ruleForm.oneId){
                    this.twoClass.push(i)
                }
            },this)
            this.ruleForm.twoId = "";
            this.ruleForm.enname_one = oneItem.enname;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
            console.log(this.ruleForm)
                    this.axios.post('/api/back_article/addArticle', this.ruleForm)
                        .then(function(response) {
                            console.log(response)
                            switch(response.data.code){
                                case "3010" : 
                                // alert("添加失败")
                                this.$message({
                                    showClose:true,
                                    message:"不好意思，插入数据失败",
                                    type:"error",
                                })
                                break;
                               case "3011" :
                               this.$message({
                                   showClose:true,
                                   message:"恭喜你，添加成功",
                                   type:"success",
                                   
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
            // console.log(this.ruleForm)

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

    },
    mounted() {
        // 实例化editor编辑器
        this.editor = UE.getEditor('editor');
        // console.log(this.editor.getContent())
    },
    destroyed() {
        // 将editor进行销毁
        this.editor.destroy();
    }
}
</script>
