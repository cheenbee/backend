<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="category"
    >
      <FormItem label="分类名" prop="name">
        <template v-slot:label>分类名</template>
        <input type="text" v-model="category.name" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="category.sort" />
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
      category: {
        name: '',
        sort: 0
      },
      rules: {
        required: ['name', 'sort']
      }
    };
  },
  methods: {
    create() {
      this.$emit('success', this.category);
    }
  }
};
</script>
