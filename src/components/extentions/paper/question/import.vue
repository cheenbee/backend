<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 400px">
    <div class="h-panel-bar">
      <span class="h-panel-title">导入试题</span>
    </div>
    <div class="h-panel-body">
      <div style="margin-bottom: 15px;">
        <a :href="url + '?token=' + token" target="_blank">导入模板下载</a>
      </div>
      <div style="color: orange; font-weight: 700">
        <p>类型：单选题，多选题，判断题，填空题，问答题</p>
        <p>难度：简单，中等，难，特别难</p>
        <p>判断题答案：正确请填写1，错误请填写0</p>
      </div>
      <div>
        <input type="file" ref="file" />
        <Button @click="submitImport" color="primary">导入</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['url'],
  data() {
    return {
      file: null,
      token: ''
    };
  },
  mounted() {
    this.token = Utils.getLocal('token');
    this.init();
  },
  methods: {
    init() {},
    submitImport() {
      if (this.$refs.file.files.length === 0) {
        this.$Message.error('请选择文件');
        return;
      }
      let file = this.$refs.file.files[0];
      var form = new FormData();
      form.append('file', file);
      var xhr = new XMLHttpRequest();
      var action = '/backend/addons/Paper/question/import/csv?token=' + Utils.getLocal('token');
      xhr.open('POST', action);
      xhr.send(form);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var resultObj = JSON.parse(xhr.responseText);
          if (resultObj.status === 0) {
            this.$Message.success('成功');
            this.$emit('success');
          } else {
            this.$Message.error(resultObj.message);
          }
        }
      };
    }
  }
};
</script>
