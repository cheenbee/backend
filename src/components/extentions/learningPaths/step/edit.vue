<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="steps"
    >
      <FormItem label="学习路径" prop="path_id">
        <template v-slot:label>学习路径</template>
        <Select
          v-model="steps.path_id"
          :datas="paths"
          keyName="id"
          titleName="name"
          :filterable="true"
        ></Select>
      </FormItem>
      <FormItem label="步骤名" prop="name">
        <template v-slot:label>步骤名</template>
        <input type="text" v-model="steps.name" />
      </FormItem>
      <FormItem label="描述" prop="desc">
        <template v-slot:label>描述</template>
        <textarea v-model="steps.desc"></textarea>
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="steps.sort" />
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
  mounted() {
    R.Extentions.learningPaths.Steps.Create().then(res => {
      this.paths = res.data.paths;
      this.courses = res.data.courses;
    });
    R.Extentions.learningPaths.Steps.Edit({ id: this.id }).then(res => {
      this.steps = res.data;
    });
  },
  data() {
    return {
      steps: {
        name: '',
        sort: 0,
        decs: '',
        path_id: null
      },
      rules: {
        required: ['name', 'desc', 'sort', 'path_id']
      },
      paths: [],
      courses: []
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.steps);
      }
    }
  }
};
</script>
