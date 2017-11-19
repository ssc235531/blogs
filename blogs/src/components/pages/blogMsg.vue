<template>
  <div>
      <el-table class="tab" :data="tableData2" style="width: 900px;margin-left:20px;margin-top:20px" :row-class-name="tableRowClassName">
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="name" label="作者" width="180">
            </el-table-column>
            <el-table-column prop="date" label="时间" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[1, 2, 3, 4]" :page-size="4" layout="total, sizes, prev, pager, next, jumper" :total="4">
        </el-pagination>
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
.pagination{
    text-align: center;
    width: 900px;
    margin-top: 20px;
}
</style>
<script>
export default {
    data() {
        return {
            currentPage1: 5,
            tableData2: [{
                date: '2016-05-02 10:28:26',
                name: '王小虎',
                title: '堆内存',
            }, {
                date: '2016-05-04 10:28:26',
                name: '王小虎',
                title: '堆内存'
            }, {
                date: '2016-05-01 10:28:26',
                name: '王小虎',
                title: '堆内存',
            }, {
                date: '2016-05-03 10:28:26',
                name: '王小虎',
                title: '堆内存'
            }]
        }
    },
    methods: {
        tableRowClassName(row, index) {
            if (index === 1) {
                return 'info-row';
            } else if (index === 3) {
                return 'positive-row';
            }
            return '';
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
