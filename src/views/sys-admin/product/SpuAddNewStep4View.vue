<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-breadcrumb-item>第4步：填写商品详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="基本信息">
        <el-descriptions :title="this.ruleForm.name">
          <el-descriptions-item label="品牌" span="1">
            <el-tag size="small">{{this.ruleForm.brandName}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="类别" span="2">{{this.ruleForm.categoryName}}</el-descriptions-item>
          <el-descriptions-item label="标题" span="3">{{this.ruleForm.title}}</el-descriptions-item>
          <el-descriptions-item label="简介" span="3">{{this.ruleForm.description}}</el-descriptions-item>
          <el-descriptions-item label="相册" span="3">{{this.ruleForm.albumName}}</el-descriptions-item>
          <el-descriptions-item label="货号">{{this.ruleForm.typeNumber}}</el-descriptions-item>
          <el-descriptions-item label="售价">{{this.ruleForm.listPrice}}</el-descriptions-item>
          <el-descriptions-item label="计件单位">{{this.ruleForm.unit}}</el-descriptions-item>
          <el-descriptions-item label="库存">{{this.ruleForm.stock}}</el-descriptions-item>
          <el-descriptions-item label="库存阈警值">{{this.ruleForm.stockThreshold}}</el-descriptions-item>
          <el-descriptions-item label="排序序号">{{this.ruleForm.sort}}</el-descriptions-item>
          <el-descriptions-item label="关键词">{{this.ruleForm.keywords}}</el-descriptions-item>
          <el-descriptions-item label="标签">{{this.ruleForm.tags}}</el-descriptions-item>
        </el-descriptions>
      </el-form-item>
      <el-form-item label="商品详情">
        <div id="wangEditor"></div>
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
      editor: {},
      ruleForm: {
      },
      rules: {
      }
    };
  },
  methods: {
    backToPreStep() {
      this.$router.push('spu-add-new3');
    },
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString) {
        let localRuleForm = JSON.parse(localRuleFormString);
        this.ruleForm = localRuleForm;
      }
    },
    initWangEditor() {
      this.editor = new this.wangEditor('#wangEditor');
      this.editor.create();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.detail=this.editor.txt.html();
          console.log(this.ruleForm);
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
    this.initWangEditor();
    this.loadLocalRuleForm();
  }
}
</script>