<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 800px">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑试题</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="question"
      >
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="question.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
          <warn text="注意，这里只能选择二级分类，一级分类无法选择。"></warn>
        </FormItem>
        <FormItem label="类型" prop="type">
          <template v-slot:label>类型</template>
          <Select v-model="question.type" :datas="types" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="难度" prop="level">
          <template v-slot:label>难度</template>
          <Select v-model="question.level" :datas="levels" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="分数" prop="score">
          <template v-slot:label>分数</template>
          <input type="number" v-model="question.score" min="0" />
        </FormItem>
        <FormItem label="问题内容" prop="content">
          <template v-slot:label>问题内容</template>
          <tinymce-editor v-model="question.content"></tinymce-editor>
        </FormItem>

        <FormItem label="答案" prop="answer" v-if="question.type !== 5">
          <template v-slot:label>答案</template>
          <textarea v-model="question.answer" rows="2"></textarea>
          <warn text="如果是多选的话，多个答案请用英文逗号分开。如果是问答题的话，则无标准答案，需要人工阅卷。"></warn>
        </FormItem>
        <FormItem label="答案" prop="answer" v-else>
          <template v-slot:label>答案</template>
          <h-switch v-model="question.answer" trueValue="1" falseValue="0"></h-switch>
        </FormItem>

        <FormItem label="答案解析" prop="remark">
          <template v-slot:label>答案解析</template>
          <tinymce-editor v-model="question.remark"></tinymce-editor>
        </FormItem>

        <template v-if="question.type === 1 || question.type === 2">
          <FormItem prop="option1">
            <template v-slot:label>选项一</template>
            <input type="text" v-model="question.option1" />
          </FormItem>
          <FormItem prop="option2">
            <template v-slot:label>选项二</template>
            <input type="text" v-model="question.option2" />
          </FormItem>
          <FormItem prop="option3">
            <template v-slot:label>选项三</template>
            <input type="text" v-model="question.option3" />
          </FormItem>
          <FormItem prop="option4">
            <template v-slot:label>选项四</template>
            <input type="text" v-model="question.option4" />
          </FormItem>
          <FormItem prop="option5">
            <template v-slot:label>选项五</template>
            <input type="text" v-model="question.option5" />
          </FormItem>
          <FormItem prop="option6">
            <template v-slot:label>选项六</template>
            <input type="text" v-model="question.option6" />
          </FormItem>
          <FormItem prop="option7">
            <template v-slot:label>选项七</template>
            <input type="text" v-model="question.option7" />
          </FormItem>
          <FormItem prop="option8">
            <template v-slot:label>选项八</template>
            <input type="text" v-model="question.option8" />
          </FormItem>
          <FormItem prop="option9">
            <template v-slot:label>选项九</template>
            <input type="text" v-model="question.option9" />
          </FormItem>
          <FormItem prop="option10">
            <template v-slot:label>选项十</template>
            <input type="text" v-model="question.option10" />
          </FormItem>
        </template>

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
  components: { TinymceEditor },
  props: ['id'],
  data() {
    return {
      question: {
        category_id: null,
        type: null,
        level: null,
        content: null,
        answer: null,
        score: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        option6: null,
        option7: null,
        option8: null,
        option9: null,
        option10: null,
        remark: null
      },
      rules: {
        required: ['category_id', 'type', 'level', 'content', 'answer', 'score']
      },
      levels: [],
      types: [],
      categories: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.paper.Question.Edit({ id: this.id }).then(res => {
        this.question = res.data.data;
        this.levels = res.data.levels;
        this.types = res.data.types;
        this.categories = res.data.categories;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.paper.Question.Update(this.question).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
