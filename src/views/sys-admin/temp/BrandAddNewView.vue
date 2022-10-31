<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加品牌</el-breadcrumb-item>
    </el-breadcrumb>
<!--分割线-->
    <el-divider></el-divider>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="pinyin" prop="pinyin">
        <el-input v-model="ruleForm.pinyin"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="logo">
        <el-input v-model="ruleForm.logo"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="state">
      <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949">
      </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      ruleForm: {
        name: '',
        pinyin:'',
        logo:'',
        description: '',
        keywords:'',
        sort: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入商品简介', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
        pinyin: [
          {required: true, message: '请输入商品拼音', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/brand/add-newBrand';
          console.log('url=' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData=' + formData);
          this.axios.post(url, formData).then((response) => {
            let responseBody = response.data;
            console.log('responseBody =');
            console.log(responseBody)
            if (responseBody.state===1){
              this.$message({
                    message: responseBody.message,
                    type:'success'
                  }
              )
              this.resetForm(formName);
            }else{
              this.$message.error(responseBody.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>