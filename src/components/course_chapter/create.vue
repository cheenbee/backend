<style lang="less"></style>
<template>
  <div>
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">添加课程章节</span>
      </div>
      <div class="h-panel-body">
        <Form
          v-width="400"
          ref="form"
          :validOnChange="true"
          :showErrorTip="true"
          :labelWidth="110"
          :rules="rules"
          :model="chapter"
        >
          <FormItem label="章节名" prop="title">
            <template v-slot:label>章节名</template>
            <input type="text" v-model="chapter.title" />
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input type="number" v-model="chapter.sort" />
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">添加</Button>
            <Button @click="close">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Course from 'model/Course';
import Chapter from 'model/CourseChapter';

export default {
  props: ['cid'],
  data() {
    return {
      course: Course.parse({}),
      chapter: Chapter.parse({}),
      rules: {
        required: ['title', 'sort']
      }
    };
  },
  mounted() {
    this.course.id = this.cid;
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.chapter;
        data.course_id = this.course.id;
        this.$emit('success', data);
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
