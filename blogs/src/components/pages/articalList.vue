<template>
  <div>
    <el-table :data="tableData2" style="width: 861px" :row-class-name="tableRowClassName">
      <el-table-column prop="article_name" label="标题" width="180"></el-table-column>
      <el-table-column prop="editer" label="作者" width="180"></el-table-column>
      <el-table-column prop="TIME" label="时间"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="width: 861px">
      <el-pagination :current-page="currentPage" :page-sizes="[2, 5, 10, 15]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="8">
      </el-pagination>
    </div>
  </div>
</template>

<style>
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData2: null,
      currentPage: 1,
      size:2
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
    handleEdit() {
      console.log("编辑")
    },
    handleDelete(index, row) {
      // console.log("删除")
      var deleteArt = {
        enname_one: row.enname_one,
        id: row.id
      }
      this.axios.post('/api/back_article/deleteOne', deleteArt, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function(response) {
          console.log(response)
          switch (response.data.code) {
            case "3040": alert("删除失败")
              break;
              case "3041": alert("删除成功")
              break;
            // default: alert("删除成功")
          }
        })
        .catch(function(error) {
          console.log(error);
        });

    }
  },
  computed: {
    total() {
      return this.tableData2.length
    }
  },
  created() {
    var _this = this;
    this.axios.get('/api/back_article/getArticle').then(function(data) {
      _this.tableData2 = data.data.data
    }).catch(function(err) {
      console.log(err)
    })
  },
}
</script>