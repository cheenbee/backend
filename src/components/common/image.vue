<template>
  <div>
    <div class="h-input-group">
      <input type="text" placeholder="您也可以手动输入图片URL地址" v-model="image" />
      <Button color="primary" @click="selectImage">
        <i class="h-icon-upload"></i>
        {{ this.name }}
      </Button>
    </div>
    <div style="background-color: #f2f2f2">
      <img :src="image" width="200px" v-if="image" style="margin-top: 10px;" />
      <input type="file" v-show="false" @change="change" ref="file" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '选择图片'
    }
  },
  data() {
    return {
      image: this.value
    };
  },
  methods: {
    selectImage() {
      this.$refs.file.click();
    },
    change(event) {
      let file = event.target.files[0];
      this.upload(file);
    },
    upload(file) {
      let xhr = new XMLHttpRequest();
      xhr.open('post', '/backend/api/v1/upload/image/tinymce', true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + Utils.getLocal('token'));
      let formData = new FormData();
      formData.set('file', file);
      xhr.send(formData);
      xhr.onload = () => {
        var json;
        if (xhr.status !== 200) {
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location !== 'string') {
          return;
        }
        this.image = json.location;
      };
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.image = newVal;
    },
    image(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
