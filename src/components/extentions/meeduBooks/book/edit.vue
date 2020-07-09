<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑电子书</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="book"
      >
        <FormItem label="分类" prop="cid">
          <template v-slot:label>分类</template>
          <Select v-model="book.cid" :datas="categories" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="名字" prop="name">
          <template v-slot:label>名字</template>
          <input type="text" v-model="book.name" />
        </FormItem>
        <FormItem label="封面" prop="thumb">
          <template v-slot:label>封面</template>
          <image-upload v-model="book.thumb" name="封面"></image-upload>
        </FormItem>
        <FormItem label="价格" prop="charge">
          <template v-slot:label>价格</template>
          <div class="h-input-group" v-width="200">
            <input type="text" v-model="book.charge" />
            <span class="h-input-addon">元</span>
          </div>
        </FormItem>
        <FormItem label="简短介绍" prop="short_desc">
          <template v-slot:label>简短介绍</template>
          <textarea v-model="book.short_desc"></textarea>
        </FormItem>
        <FormItem label="详情介绍" prop="original_desc">
          <template v-slot:label>详情介绍</template>
          <tinymce-editor v-model="book.original_desc"></tinymce-editor>
        </FormItem>
        <FormItem label="显示" prop="is_show">
          <template v-slot:label>显示</template>
          <h-switch v-model="book.is_show"></h-switch>
        </FormItem>
        <FormItem label="上架时间" prop="published_at">
          <template v-slot:label>上架时间</template>
          <DatePicker v-model="book.published_at" v-width="200" type="datetime"></DatePicker>
        </FormItem>

        <FormItem label="SEO描述" prop="seo_description">
          <template v-slot:label>SEO描述</template>
          <textarea v-model="book.seo_description"></textarea>
        </FormItem>
        <FormItem label="SEO关键字" prop="seo_keywords">
          <template v-slot:label>SEO关键字</template>
          <textarea v-model="book.seo_keywords"></textarea>
        </FormItem>

        <FormItem>
          <Button color="primary" @click="update">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../../../common/tinymce';

export default {
  props: ['id'],
  components: {
    TinymceEditor
  },
  data() {
    return {
      book: {
        cid: '',
        name: '',
        is_show: 0,
        original_desc: '',
        thumb: '',
        charge: 0,
        short_desc: '',
        published_at: '',
        seo_description: '',
        seo_keywords: ''
      },
      rules: {
        required: ['cid', 'name', 'is_show', 'original_desc', 'thumb', 'charge', 'short_desc', 'published_at']
      },
      categories: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.meeduBooks.Book.Create().then(res => {
        this.categories = res.data.categories;
      });
      R.Extentions.meeduBooks.Book.Edit({ id: this.id }).then(res => {
        this.book = res.data;
      });
    },
    update() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.book.render_desc = this.book.original_desc;
        this.$emit('success', this.book);
      }
    }
  }
};
</script>
