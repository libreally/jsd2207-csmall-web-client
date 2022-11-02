<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>相册列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--分割线-->
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="150" align="center"></el-table-column>
      <el-table-column prop="description" label="简介" header-align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete"
                     circle size="mini" @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {}
    }
  },
  methods:{
    loadAlbumList(){
      console.log("loadAlbumList");
      let url='http://localhost:9080/album';
      console.log('url='+url);
      this.axios.get(url).then((response) => {
        let responseBody = response.data;
        this.tableData = responseBody.data;
      });
    },
    handleEdit(album) {
      let message = '您正在尝试编辑【' + album.id + '-' + album.name + '】的相册详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(album) {
      let url = 'http://localhost:9080/albums/' + album.id + '/delete';
      console.log('url = ' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state !== 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state === 20000 || responseBody.state === 40400) {
          this.loadAlbumList();
        }
      });
    },
    openDeleteConfirm(album) {
      let message = '此操作将永久删除【' + album.name + '】相册，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(album);
      }).catch(() => {
      });
    },
  },
  mounted(){
    console.log("mounted");
    this.loadAlbumList();
  }
}
</script>
