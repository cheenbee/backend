<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :labelWidth="110"
      :rules="rules"
      :model="link"
    >
      <FormItem label="链接名" prop="name">
        <template v-slot:label>链接名</template>
        <input type="text" v-model="link.name" />
      </FormItem>
      <FormItem label="URL" prop="url">
        <template v-slot:label>URL</template>
        <input type="text" v-model="link.url" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="link.sort" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
        <Button @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Link from 'model/Link';

export default {
  data() {
    return {
      link: Link.parse({}),
      rules: {
        required: ['name', 'url', 'sort']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.link.sort = 1;
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.link);
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
