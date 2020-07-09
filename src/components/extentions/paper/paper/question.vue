<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 800px">
    <div class="h-panel-bar">
      <span class="h-panel-title">指定试题</span>
    </div>
    <div class="h-panel-body">
      <div>
        <Form mode="block">
          <FormItem label="试题分类">
            <template v-slot:label>试题分类</template>
            <Select
              v-model="category_id"
              :datas="categories"
              keyName="id"
              titleName="name"
              :filterable="true"
              @change="categoryChange"
            ></Select>
          </FormItem>
          <FormItem>
            <template v-slot:label>请选择试题</template>
            <Select
              v-model="s"
              :datas="questions"
              keyName="id"
              titleName="content"
              :filterable="true"
              :multiple="true"
            ></Select>
          </FormItem>
          <FormItem>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.Paper.paper.questions.add"
              text="添加"
              @click="create()"
            ></p-button>
          </FormItem>
        </Form>
      </div>
      <Table ref="table" :loading="loading" :datas="data">
        <TableItem title="类型" prop="type_text"></TableItem>
        <TableItem title="难度" prop="level_text"></TableItem>
        <TableItem title="分数" prop="score"></TableItem>
        <TableItem title="试题">
          <template slot-scope="{ data }">
            <div v-html="data.content"></div>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.Paper.paper.questions.delete" @click="remove(data)"></p-del-button>
          </template>
        </TableItem>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      questions: [],
      s: [],
      category_id: null,
      categories: [],
      data: [],
      loading: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    categoryChange() {
      this.getData();
    },
    getData() {
      R.Extentions.paper.Paper.Questions({
        id: this.id,
        category_id: this.category_id
      }).then(res => {
        this.questions = res.data.questions;
        this.categories = res.data.categories;
        this.data = res.data.data;
      });
    },
    create() {
      if (this.s.length === 0) {
        this.$Message.error('请选择试题');
        return;
      }
      R.Extentions.paper.Paper.AddQuestions({ id: this.id, s: this.s }).then(res => {
        this.$Message.success('成功');
        this.getData();
        this.s = [];
      });
    },
    remove(item) {
      R.Extentions.paper.Paper.DelQuestion({ id: this.id, question_id: item.id }).then(res => {
        this.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
