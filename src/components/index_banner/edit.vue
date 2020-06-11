<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="banner"
    >
      <FormItem label="Banner名" prop="name">
        <template v-slot:label>Banner名</template>
        <input type="text" v-model="banner.name" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="banner.sort" />
      </FormItem>
      <FormItem label="升序" prop="course_ids">
        <template v-slot:label>关联课程</template>
        <Select
          v-model="banner.course_ids"
          :datas="courses"
          keyName="id"
          titleName="title"
          :multiple="true"
        ></Select>
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
      banner: {
        name: '',
        sort: 0,
        course_ids: []
      },
      rules: {
        required: ['name', 'course_ids', 'sort']
      },
      courses: []
    };
  },
  mounted() {
    R.IndexBanner.Edit({ id: this.id }).then(res => {
      this.banner = res.data;
      this.banner.course_ids = this.banner.course_ids.split(',');
    });
    R.IndexBanner.Create().then(res => {
      this.courses = res.data.courses;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.banner);
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
