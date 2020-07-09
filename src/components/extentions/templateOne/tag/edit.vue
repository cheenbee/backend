<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="tag"
    >
      <FormItem label="标签名" prop="name">
        <template v-slot:label>标签名</template>
        <input type="text" v-model="tag.name" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <template v-slot:label>排序</template>
        <input type="number" v-model="tag.sort" placeholder="小的数靠前" />
      </FormItem>
      <FormItem label="热门" prop="is_hot">
        <template v-slot:label>热门</template>
        <h-switch v-model="tag.is_hot" :trueValue="1" :falseValue="0"></h-switch>
      </FormItem>
      <FormItem label="关联分类" prop="categories">
        <template v-slot:label>关联分类</template>
        <Select
          v-model="tag.categories_rows"
          :multiple="true"
          :datas="categories"
          keyName="id"
          titleName="name"
        ></Select>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      tag: {
        name: null,
        sort: 0,
        categories: [],
        is_hot: null
      },
      rules: {
        required: ['name', 'sort', 'is_hot', 'categories']
      },
      categories: []
    };
  },
  mounted() {
    R.Extentions.templateOne.Tag.Create().then(res => {
      this.categories = res.data.categories;
    });
    R.Extentions.templateOne.Tag.Edit({ id: this.id }).then(res => {
      this.tag = res.data.data;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.tag.categories = this.tag.categories_rows;
        this.$emit('success', this.tag);
      }
    }
  }
};
</script>
