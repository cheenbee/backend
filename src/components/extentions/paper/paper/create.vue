<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加试卷</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="paper"
        v-width="500"
      >
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="paper.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
          <warn text="注意，这里只能选择二级分类，一级分类无法选择。"></warn>
        </FormItem>
        <FormItem label="标题" prop="title">
          <template v-slot:label>标题</template>
          <input type="text" v-model="paper.title" />
        </FormItem>
        <FormItem label="封面" prop="thumb">
          <template v-slot:label>封面</template>
          <image-upload v-model="paper.thumb" name="封面"></image-upload>
        </FormItem>
        <FormItem label="分数" prop="score">
          <template v-slot:label>分数</template>
          <input type="number" v-model="paper.score" />
        </FormItem>
        <FormItem label="及格分" prop="pass_score">
          <template v-slot:label>及格分</template>
          <input type="number" v-model="paper.pass_score" />
        </FormItem>
        <FormItem label="时间" prop="expired_minutes">
          <template v-slot:label>时间</template>
          <input type="number" v-model="paper.expired_minutes" min="0" />
          <warn text="单位：分钟"></warn>
        </FormItem>
        <FormItem label="可重复考试次数" prop="try_times">
          <template v-slot:label>可重复考试次数</template>
          <input type="number" v-model="paper.try_times" min="0" />
          <warn text="填写0意味着不限制，也就是用户可以一直考试，建议配置随机试题使用。"></warn>
        </FormItem>
        <FormItem label="仅邀请" prop="enabled_invite">
          <template v-slot:label>仅邀请</template>
          <h-switch v-model="paper.enabled_invite" :trueValue="1" :falseValue="0"></h-switch>
          <warn text="配置此选项的话，只有在后台添加的用户才可以参与考试。"></warn>
        </FormItem>
        <template v-if="paper.enabled_invite === 0">
          <FormItem label="免费" prop="is_free">
            <template v-slot:label>免费</template>
            <h-switch v-model="paper.is_free" :trueValue="1" :falseValue="0"></h-switch>
            <warn text="配置该选项的话所有人都可以参与考试。"></warn>
          </FormItem>
          <FormItem label="会员免费" prop="is_vip_free" v-if="paper.is_free === 0">
            <template v-slot:label>会员免费</template>
            <h-switch v-model="paper.is_vip_free" :trueValue="1" :falseValue="0"></h-switch>
            <warn text="配置该选项的话购买VIP会员的用户都可以参与考试。"></warn>
          </FormItem>
          <FormItem label="必须购买课程" prop="required_courses" v-if="paper.is_free === 0">
            <template v-slot:label>必须购买课程</template>
            <Select
              v-model="paper.required_courses"
              :datas="courses"
              :multiple="true"
              keyName="id"
              titleName="title"
              :filterable="true"
            ></Select>
            <warn text="配置该选项的话，参与考试的用户必须购买其中至少一个课程。"></warn>
          </FormItem>
        </template>
        <FormItem label="试题随机" prop="is_random">
          <template v-slot:label>试题随机</template>
          <h-switch v-model="paper.is_random" :trueValue="1" :falseValue="0"></h-switch>
        </FormItem>
        <FormItem label="试题随机范围" prop="random_category_id" v-if="paper.is_random === 1">
          <template v-slot:label>试题随机范围</template>
          <Select
            v-model="paper.random_category_id"
            :datas="questionCategories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
          <warn text="试题随机的话，将会按照试卷的总分随机抽出一定的试题。"></warn>
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
      paper: {
        category_id: null,
        title: null,
        thumb: null,
        score: null,
        pass_score: null,
        expired_minutes: null,
        is_random: 0,
        try_times: null,
        is_vip_free: 0,
        is_free: 0,
        charge: null,
        random_rule: null,
        random_category_id: null,
        required_courses: [],
        enabled_invite: 0
      },
      rules: {
        required: [
          'category_id',
          'title',
          'thumb',
          'score',
          'pass_score',
          'expired_minutes',
          'is_random',
          'try_times',
          'is_vip_free',
          'is_free',
          'enabled_invite'
        ]
      },
      createParams: {},
      categories: [],
      questionCategories: [],
      courses: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.paper.Paper.Create().then(res => {
        this.categories = res.data.categories;
        this.questionCategories = res.data.questionCategories;
        this.courses = res.data.courses;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.paper;
        data.required_courses && (data.required_courses = data.required_courses.join(','));
        R.Extentions.paper.Paper.Store(data).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
