<style lang="less"></style>
<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="video"
      >
        <FormItem label="课程" prop="course_id">
          <template v-slot:label>课程</template>
          <Select
            v-model="video.course_id"
            :datas="courses"
            keyName="id"
            titleName="title"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem label="章节" prop="chapter_id">
          <template v-slot:label>章节</template>
          <Select
            v-model="video.chapter_id"
            :datas="chapters[video.course_id]"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem label="标题" prop="title">
          <template v-slot:label>标题</template>
          <input type="text" v-model="video.title" />
        </FormItem>
        <FormItem label="直播时间" prop="published_at">
          <template v-slot:label>直播时间</template>
          <DatePicker v-model="video.published_at" v-width="200" type="datetime"></DatePicker>
        </FormItem>
        <FormItem label="是否显示" prop="is_show">
          <template v-slot:label>是否显示</template>
          <h-switch v-model="video.is_show" :trueValue="1" :falseValue="0"></h-switch>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="create">添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video: {
        course_id: null,
        chapter_id: null,
        title: '',
        published_at: '',
        is_show: 1
      },
      rules: {
        required: ['course_id', 'chapter_id', 'title', 'published_at', 'is_show']
      },
      courses: [],
      chapters: []
    };
  },
  mounted() {
    R.Extentions.zhibo.CourseVideo.Create().then(res => {
      this.courses = res.data.courses;
      this.chapters = res.data.chapters;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.zhibo.CourseVideo.Store(this.video).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
