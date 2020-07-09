<template>
  <div>
    <mavon-editor v-model="data" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" @change="valChange"></mavon-editor>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: this.value
    };
  },
  methods: {
    valChange(oVal, rVal) {
      localStorage.setItem('meedu_books_md_val', rVal);
    },
    imgAdd(pos, $file) {
      var xhr;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '/backend/api/v1/upload/image/tinymce');
      xhr.setRequestHeader('Authorization', 'Bearer ' + Utils.getLocal('token'));

      xhr.onload = () => {
        var json = JSON.parse(xhr.responseText);

        if (xhr.status !== 200) {
          HeyUI.$Message.warn('HTTP Error: ' + xhr.status);
          return;
        }

        this.$refs.md.$img2Url(pos, json.location);
      };

      var formdata = new FormData();
      formdata.append('file', $file);
      xhr.send(formdata);
    },
    imgDel(filename) {
      console.log(filename);
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.data = newVal;
    },
    data(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
