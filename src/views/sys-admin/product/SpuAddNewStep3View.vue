<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-breadcrumb-item>第3步：选择商品图片</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品相册" prop="albumId">
        <el-select v-model="ruleForm.albumId" placeholder="请选择">
          <el-option
              v-for="item in albumListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="backToPreStep()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albumListOptions: [],
      ruleForm: {
        albumId: '',
        albumName: ''
      },
      rules: {
        albumId: [
          {required: true, message: '请选择相册', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    backToPreStep() {
      this.$router.push('spu-add-new2');
    },
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString) {
        let localRuleForm = JSON.parse(localRuleFormString);
        this.ruleForm = localRuleForm;
      }
    },
    loadAlbumList() {
      console.log('loadAlbumList');
      let url = 'http://localhost:9080/albums';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        this.albumListOptions = responseBody.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/albums/' + this.ruleForm.albumId;
          console.log('url = ' + url);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .get(url).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.ruleForm.albumName = responseBody.data.name;
              let ruleFormString = JSON.stringify(this.ruleForm);
              console.log('ruleFormString >>> ' + ruleFormString);
              localStorage.setItem('ruleForm', ruleFormString);
              this.$router.push('spu-add-new4');
            } else {
              this.$message.error(responseBody.message);
            }
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
  },
  mounted() {
    this.loadLocalRuleForm();
    this.loadAlbumList();
  }
}
</script>