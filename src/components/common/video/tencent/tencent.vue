<template>
  <div>
    <div class="h-input-group">
      <input type="text" v-model="vid" />
      <Button color="primary" @click="selectVideo"><i class="h-icon-upload"></i> 选择视频</Button>
    </div>
    <input type="file" ref="tencentfile" v-show="false" @change="fileChange" />
    <p v-show="process">
      上传进度：<span>{{ process }}</span>
    </p>
  </div>
</template>

<script>
import TcVod from 'vod-js-sdk-v6';

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      vid: this.value,
      process: '',
      uploader: null
    };
  },
  methods: {
    fileChange(event) {
      var files = event.target.files;
      if (files.length === 0) {
        return;
      }
      this.uploadFile(files[0]);
    },
    uploadFile(videoFile) {
      const tcVod = new TcVod({
        getSignature: function () {
          return R.VideoUpload.TencentAuthToken().then(response => {
            if (response.status !== 0) {
              HeyUI.$Message.error(response.message);
              return null;
            }
            return response.data.signature;
          });
        }
      });
      const uploader = tcVod.upload({
        mediaFile: videoFile
      });
      uploader.on('media_progress', info => {
        this.process = info.percent * 100 + '%';
      });

      // 回调结果说明
      // type doneResult = {
      //   fileId: string,
      //   video: {
      //     url: string
      //   },
      //   cover: {
      //     url: string
      //   }
      // }
      uploader
        .done()
        .then(doneResult => {
          console.log(doneResult);
          this.process = '上传成功';
          this.vid = doneResult.fileId;
        })
        .catch(function (err) {
          console.log(err);
          HeyUI.$Message.error('上传错误');
        });
    },
    selectVideo() {
      this.$refs.tencentfile.click();
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.vid = newVal;
    },
    vid(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
