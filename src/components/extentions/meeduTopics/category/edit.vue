<template>
  <div style="padding: 15px;">
    <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :rules="rules" :model="category">
      <FormItem label="分类名" prop="name">
        <template v-slot:label>分类名</template>
        <input type="text" v-model="category.name" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <Slider v-model="category.sort" :range="{ start: 1, end: 2000 }"></Slider>
        <p>{{ category.sort }}</p>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">保存</Button>
        <Button @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['id'],
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Category.Edit({ id: this.id }).then(res => {
        this.category = res.data;
      });
    },
    create() {
      this.$emit('success', this.category);
      this.close();
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
