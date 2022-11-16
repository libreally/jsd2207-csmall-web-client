<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-breadcrumb-item>第1步：选择类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品类别" prop="categoryId">
        <el-input v-model="ruleForm.categoryId" placeholder="请输入商品类别的ID"></el-input>
      </el-form-item>
      <el-form-item>
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
      ruleForm: {
        categoryId: '',
        categoryName: ''
      },
      rules: {
        categoryId: [
          {required: true, message: '请输入商品类别的ID', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString) {
        let localRuleForm = JSON.parse(localRuleFormString);
        this.ruleForm.categoryId = localRuleForm.categoryId;
      }
    },
    submitForm(formName) {
      // 【不推荐】方案A：什么都不检查，直接将类别ID保存在本地，到下一步，最后，4步全部完成统一检查
      // 【推  荐】方案B：连接服务器检查，类别ID有效时将其保存在本地，到下一步
      // 【不推荐】方案C：连接服务器检查，类别ID有效时将其保存到服务器端的SPU数据表，到下一步
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 向 /categories/1 发请求，获取类别详情，如果类别存在，且isParent为0，则保存类别ID，下一步，否则，报错
          let url = 'http://localhost:9080/categories/' + this.ruleForm.categoryId;
          console.log('url = ' + url);
          this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .get(url).then((response) => {
              let responseBody = response.data;
              if (responseBody.state == 20000) {
                if (responseBody.data.isParent == 1) {
                  this.$message.error('错误：选择的类别必须不包含子级类别！');
                } else {
                  this.ruleForm.categoryName = responseBody.data.name;
                  let ruleFormString = JSON.stringify(this.ruleForm);
                  localStorage.setItem('ruleForm', ruleFormString);
                  this.$router.push('spu-add-new2');
                }
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
  }
}
</script>