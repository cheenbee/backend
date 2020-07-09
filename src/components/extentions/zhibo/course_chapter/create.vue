<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="chapter"
    >
      <FormItem label="章节名" prop="name">
        <template v-slot:label>章节名</template>
        <input type="text" v-model="chapter.name" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <template v-slot:label>排序</template>
        <input type="number" v-model="chapter.sort" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['course_id'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        course_id: this.course_id
      },
      rules: {
        required: ['name', 'sort']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.chapter);
      }
    }
  }
};
</script>
