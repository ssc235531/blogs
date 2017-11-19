<template>
<div>
  <el-table :data="tableData5" style="width: 861px">
    <el-table-column type="expand">
      <template scope="props">
        <el-table :data="props.row.twodata" style="width: 600px">
          <el-table-column prop="cnname" label="中文" width="180">
          </el-table-column>
          <el-table-column prop="enname" label="英文" width="180">
          </el-table-column>
          <el-table-column label="编辑">
            <template scope="scope">
              <el-button  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column prop="onedata.cnname" label="中文类名">
    </el-table-column>
    <el-table-column prop="onedata.enname" label="英文类名">
    </el-table-column>
    <el-table-column label="编辑">
      <template scope="scope">
        <el-button  @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </span>
   </el-dialog>
</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}

#el-part {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

#el-part span {
  margin: 20px;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData5: [
      ],
      dialogVisible: false,
      oneId:"",
      one_enname:"",
      twoId:"" 
    }
  },
  methods: {
    handleEdit(index,data,state) {
      if(state == "one"){
        this.$router.push({name:"amendOneClass",params:{data:data}})
      }
      else{
        this.$router.push({name:"amendTwoClass",params:{data:data}})
      }
    },
    handleDelete:function(index,data,state){
      this.dialogVisible=true;
        if(state=="one"){
          this.oneId=data.onedata.id;
          this.one_enname=data.onedata.enname;
        }else{
        var onename=null;
        this.tableData5.forEach(function(i){
          if(data.parent_id==i.onedata.id){
            onename=i.onedata.enname;
          }
        })
        this.twoId=data.id;
        this.one_enname=onename;
        this.oneId=data.parent_id;
      }
    },
    handleOk(){
      var _this=this;
      this.dialogVisible=false;
        if(this.state=="one"){
          this.axios.post("/api/back_class/delete_one",{id:this.oneId,enname_one:this.one_enname}).then((data)=>{
            if(data.data.code=="1071"){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
            });
              _this.$router.go(0);
            }else{
              this.$message({
                showClose: true,
                message: '删除失败',
                type: 'error'
            });
            }
          })
        }else{
          var _this=this;
          this.axios.post("/api/back_class/delete_two",{oneId:this.oneId,twoId:this.twoId,enname_one:this.one_enname}).then((data)=>{
            if(data.data.code=="1071"){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
            });
                _this.$router.go(0);
            }else{
              this.$message({
                showClose: true,
                message: '删除失败',
                type: 'error'
            });
            }
          })
        }
    },
    handlerror(){
      this.dialogVisible=false;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    this.axios.get('/api/back_class/class_list').then((data) => {
      console.log(data.data.data)
      this.tableData5 = data.data.data;
    }).catch(function(err) {
      console.log(err)
    })
  },
}
</script>