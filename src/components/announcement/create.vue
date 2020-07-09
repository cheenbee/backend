<template>
  <div style="padding: 15px;">
    <Form
      v-width="600"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="announcement"
    >
      <FormItem label="标题" prop="title">
        <template v-slot:label>标题</template>
        <input type="text" v-model="announcement.title" />
      </FormItem>
      <FormItem label="内容" prop="content">
        <template v-slot:label>内容</template>
        <tinymce-editor v-model="announcement.announcement"></tinymce-editor>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
        <Button @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce';

export default {
  components: { TinymceEditor },
  data() {
    return {
      announcement: {
        title: '',
        announcement: ''
      },
      rules: {
        required: ['title', 'announcement']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.announcement);
        this.close();
      }
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
