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
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="chapter.sort" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['id', 'bid'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        bid: this.bid
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
      R.Extentions.meeduBooks.Chapter.Edit({ id: this.id }).then(res => {
        this.chapter = res.data;
      });
    },
    create() {
      this.$emit('success', this.chapter);
    }
  }
};
</script>
