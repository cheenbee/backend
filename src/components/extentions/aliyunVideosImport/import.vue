<style lang="less"></style>
<template>
  <div class>
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">视频批量导入</span>
      </div>
      <div class="h-panel-body">
        <div class="mb-10">
          <a :href="templateUrl" target="_blank">模板下载</a>
        </div>
        <div class="mb-10">
          <input type="file" name="file" ref="file" />
        </div>
        <div class="mb-10 text-right">
          <Button color="primary" @click="importFile()">立即导入</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      templateUrl: ''
    };
  },
  mounted() {
    R.Extentions.aliyunVideosImport.Params().then(res => {
      this.templateUrl = res.data.template_url + '?token=' + Utils.getLocal('token');
    });
  },
  methods: {
    importFile() {
      if (this.$refs.file.files.length === 0) {
        HeyUI.$Message.warn('请选择文件');
        return;
      }
      let file = this.$refs.file.files[0];
      if (file.type !== 'text/csv') {
        HeyUI.$Message.warn('请上传csv格式文件');
        return;
      }
      let formData = new FormData();
      formData.set('file', file);
      let instance = axios.create({
        headers: {
          Authorization: 'Bearer ' + Utils.getLocal('token')
        }
      });
      instance.post('/backend/addons/aliyun_videos_import/import', formData).then(res => {
        if (res.data.status === 1) {
          HeyUI.$Message.warn(res.data.message);
        } else {
          HeyUI.$Message.success('导入成功');
        }
      });
    }
  }
};
</script>
