<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加属性</el-breadcrumb-item>
    </el-breadcrumb>
<!--分割线-->
    <el-divider></el-divider>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="属性模板" prop="name">
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="description">
        <el-radio v-model="radio" label="1">非销售属性</el-radio>
        <el-radio v-model="radio" label="2">销售属性</el-radio>
      </el-form-item>
      <el-form-item label="输入类型" prop="description">
        <el-radio v-model="radio" label="1">手动录入</el-radio>
        <el-radio v-model="radio" label="2">单选</el-radio>
        <el-radio v-model="radio" label="3">多选</el-radio>
        <el-radio v-model="radio" label="4">单选(下拉列表)</el-radio>
        <el-radio v-model="radio" label="5">多选(下拉列表)</el-radio>
      </el-form-item>
      <el-form-item label="备选值列表" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
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
      radio: '1',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      ruleForm: {
        name: '',
        description: '',
        sort: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入相册名称', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/attribute/add-new';
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
}
</script>

