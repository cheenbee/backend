<style lang="less">
.selected-box,
.wait-box {
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px 15px;
}
.course-item {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 8px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 2px;
  cursor: pointer;
}
</style>
<template>
  <div style="padding: 15px;width: 800px;">
    <div class="mb-10">
      <Button color="primary" @click="create">保存</Button>
      <p>
        <warn text="请左右拖拽课程名字以添加或删除课程。"></warn>
      </p>
    </div>
    <Row>
      <Cell width="12">
        <h3 class="mb-10">已选择课程</h3>
        <div class="selected-box">
          <draggable style="min-height: 470px" :list="selectedCourses" group="courses">
            <div
              class="course-item"
              v-for="element in selectedCourses"
              :key="element.id"
            >{{ element.title }}</div>
          </draggable>
        </div>
      </Cell>
      <Cell width="12">
        <h3 class="mb-10">待选择课程</h3>
        <div class="wait-box">
          <draggable :list="courses" group="courses">
            <div
              class="course-item"
              v-for="element in courses"
              :key="element.id"
            >{{ element.title }}</div>
          </draggable>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  props: ['id'],
  mounted() {
    R.Extentions.learningPaths.Steps.relationCourseParams({ id: this.id }).then(res => {
      this.paths = res.data.paths;
      this.courses = res.data.courses;
      this.selectedCourses = res.data.relationCourses;
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
      selectedCourses: [],
      paths: [],
      courses: []
    };
  },
  methods: {
    create() {
      let courseIds = [];
      for (let i = 0; i < this.selectedCourses.length; i++) {
        courseIds.push(this.selectedCourses[i].id);
      }
      this.$emit('success', courseIds);
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
