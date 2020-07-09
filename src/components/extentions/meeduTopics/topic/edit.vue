<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑文章</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="topic"
      >
        <FormItem label="免费内容" prop="free_content">
          <template v-slot:label>免费内容</template>
          <markdown v-model="topic.free_content"></markdown>
          <warn text="该内容所有用户都可以看到，不管是文章收费还是需要登录查看。"></warn>
        </FormItem>
        <FormItem label="文章内容" prop="original_content">
          <template v-slot:label>内容</template>
          <markdown v-model="topic.original_content"></markdown>
        </FormItem>
        <FormItem label="分类" prop="cid">
          <template v-slot:label>分类</template>
          <Select v-model="topic.cid" :datas="categories" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="标题" prop="title">
          <template v-slot:label>标题</template>
          <input type="text" v-model="topic.title" />
        </FormItem>
        <FormItem label="显示" prop="is_show">
          <template v-slot:label>显示</template>
          <h-switch v-model="topic.is_show"></h-switch>
        </FormItem>
        <FormItem label="登录查看" prop="is_need_login">
          <template v-slot:label>登录查看</template>
          <h-switch v-model="topic.is_need_login"></h-switch>
        </FormItem>
        <FormItem label="价格" prop="charge">
          <template v-slot:label>价格</template>
          <input type="number" min="0" max="2000" v-model="topic.charge" />
        </FormItem>
        <FormItem label="会员免费" prop="is_vip_free" v-if="topic.charge > 0">
          <template v-slot:label>会员免费</template>
          <h-switch v-model="topic.is_vip_free"></h-switch>
        </FormItem>
        <FormItem label="排序时间" prop="sorted_at">
          <template v-slot:label>排序时间</template>
          <DatePicker v-model="topic.sorted_at" v-width="200" type="datetime"></DatePicker>
          <br />
          <warn text="文章会按照这个字段进行降序排序，不填写默认取当前时间。"></warn>
        </FormItem>

        <FormItem>
          <Button color="primary" @click="create">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import markdown from '@/components/common/markdown';
const marked = require('marked');

export default {
  props: ['id'],
  components: {
    markdown
  },
  data() {
    return {
      topic: {
        cid: '',
        title: '',
        is_show: 0,
        is_need_login: 0,
        is_vip_free: 0,
        free_content: '',
        free_content_render: '',
        charge: 0,
        original_content: '',
        sorted_at: null
      },
      rules: {
        required: ['cid', 'title', 'is_show', 'original_content']
      },
      categories: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.meeduTopics.Topic.Edit({ id: this.id }).then(res => {
        this.topic = res.data;
      });
      R.Extentions.meeduTopics.Category.List().then(res => {
        this.categories = res.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.topic.render_content = marked(this.topic.original_content);
        this.topic.free_content_render = marked(this.topic.free_content);
        this.$emit('success', this.topic);
      }
    }
  }
};
</script>
