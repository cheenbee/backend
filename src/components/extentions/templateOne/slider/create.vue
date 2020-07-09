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
      <FormItem label="排序" prop="sort">
        <template v-slot:label>排序</template>
        <input type="number" v-model="slider.sort" placeholder="小的数靠前" />
      </FormItem>
      <FormItem label="图片" prop="thumb">
        <template v-slot:label>图片</template>
        <image-upload v-model="slider.thumb" name="图片"></image-upload>
      </FormItem>
      <FormItem label="地址" prop="url">
        <template v-slot:label>地址</template>
        <input type="text" v-model="slider.url" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slider: {
        sort: 0,
        thumb: null,
        url: null
      },
      rules: {
        required: ['url', 'sort', 'thumb']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.slider);
      }
    }
  }
};
</script>
