<style lang="less"></style>
<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加课程</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="course"
      >
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="course.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem label="讲师" prop="teacher_id">
          <template v-slot:label>讲师</template>
          <Select
            v-model="course.teacher_id"
            :datas="teachers"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem label="课程标题" prop="title">
          <template v-slot:label>课程标题</template>
          <input type="text" v-model="course.title" />
        </FormItem>
        <FormItem label="课程封面" prop="thumb">
          <template v-slot:label>课程封面</template>
          <image-upload v-model="course.thumb" name="课程封面"></image-upload>
        </FormItem>
        <FormItem label="价格" prop="charge">
          <template v-slot:label>价格</template>
          <div class="h-input-group" v-width="200">
            <input type="text" v-model="course.charge" />
            <span class="h-input-addon">元</span>
          </div>
        </FormItem>
        <FormItem label="简短介绍" prop="short_description">
          <template v-slot:label>简短介绍</template>
          <textarea v-model="course.short_description"></textarea>
        </FormItem>
        <FormItem label="详细介绍" prop="description">
          <template v-slot:label>详细介绍</template>
          <tinymce-editor v-model="course.original_desc"></tinymce-editor>
        </FormItem>
        <FormItem label="上架时间" prop="published_at">
          <template v-slot:label>上架时间</template>
          <DatePicker v-model="course.published_at" v-width="200" type="datetime"></DatePicker>
        </FormItem>
        <FormItem label="会员免费" prop="vip_can_view">
          <template v-slot:label>会员免费</template>
          <h-switch v-model="course.vip_can_view" :trueValue="1" :falseValue="0"></h-switch>
        </FormItem>
        <FormItem label="是否显示" prop="is_show">
          <template v-slot:label>是否显示</template>
          <h-switch v-model="course.is_show" :trueValue="1" :falseValue="0"></h-switch>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="create">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '@/components/common/tinymce';

export default {
  props: ['id'],
  components: {
    TinymceEditor
  },
  data() {
    return {
      course: {
        category_id: null,
        teacher_id: null,
        title: '',
        thumb: '',
        charge: null,
        short_description: '',
        original_desc: '',
        published_at: '',
        is_show: 1,
        vip_can_view: 0
      },
      rules: {
        required: [
          'category_id',
          'teacher_id',
          'title',
          'thumb',
          'charge',
          'short_description',
          'original_desc',
          'published_at',
          'is_show',
          'vip_can_view'
        ]
      },
      teachers: [],
      categories: []
    };
  },
  mounted() {
    R.Extentions.zhibo.Course.Create().then(res => {
      this.teachers = res.data.teachers;
      this.categories = res.data.categories;
    });
    R.Extentions.zhibo.Course.Edit({ id: this.id }).then(res => {
      this.course = res.data;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.course.render_desc = this.course.original_desc;
        R.Extentions.zhibo.Course.Update(this.course).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
