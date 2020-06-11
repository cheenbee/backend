<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="slider"
    >
      <FormItem label="封面" prop="thumb">
        <template v-slot:label>封面</template>
        <image-upload v-model="slider.thumb" name="封面"></image-upload>
      </FormItem>
      <FormItem label="URL" prop="url">
        <template v-slot:label>URL</template>
        <input type="text" v-model="slider.url" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="slider.sort" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
        <Button @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slider: {
        thumb: '',
        url: '',
        sort: 0
      },
      rules: {
        required: ['thumb', 'url', 'sort']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.slider);
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
