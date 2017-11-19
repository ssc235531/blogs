<template>
    <div>
        <el-table class="tab" :data="formData" style="width: 900px;margin-left:20px;margin-top:20px" :row-class-name="tableRowClassName" @row-dblclick="dbclick">
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="backorfont" label="前后端分类" width="180">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="nowpage" :page-sizes="[2,5,10,15,20]" :page-size="everyrows" layout="total, sizes, prev, pager, next, jumper" :total="oldData.length">
        </el-pagination>
        <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <span>确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style scoped>
h1 {
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
    line-height: 50px;
}

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.pagination {
    text-align: center;
    width: 900px;
    margin-top: 20px;
}
</style>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            nowpage: 1,
            deteleId:"",
            formData: [],
            everyrows:2,
            oldData:[],
            id:""
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData(){
        this.axios.get("/api/apilist/list?type=font").then((data)=>{
          if(data.data.code=="2010"){
            this.oldData=data.data.data;
            console.log(data)
            this.formData=this.oldData.slice(0,this.everyrows)
          }        
        })
      },
      dbclick(row){
        this.$router.push({path:"/Hello/api_list_detail",query:{data:row}})
      },
        tableRowClassName(row, index) {
            if (index === 1) {
                return 'info-row';
            } else if (index === 3) {
                return 'positive-row';
            }
            return '';
        },
        handleSizeChange(val) {
        this.everyrows=val;
        this.formData=this.oldData.slice((this.nowpage-1)*this.everyrows,this.nowpage*this.everyrows)
      },
      handleCurrentChange(val) {
        this.nowpage=val;
        this.formData=this.oldData.slice((val-1)*this.everyrows,val*this.everyrows)
      },
        handleEdit(index, data) {
            this.$router.push({ name: "apiAmend", query: { data: data } })
        },
        handleDelete: function(index, data) {
            this.dialogVisible = true;
            this.deteleId = data.id
        },
        handleOk() {
            var _this = this;
            this.dialogVisible = false;
            var _this = this;
            this.axios.post("/api/apilist/delete",{
                id: _this.deteleId   //删除接口的id
            }).then((response)=>{
                switch(response.data.code){
                    case "2032":
                        this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                    break;
                    case "2031":
                        this.$message({
                                message: '删除失败',
                                type: 'error'
                            })
                    break;
                }
            })
        },
        handlerror() {
            this.dialogVisible = false;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }

    }
}
</script>
