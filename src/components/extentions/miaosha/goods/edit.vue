<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="goods"
      >
        <FormItem prop="goods_id">
          <template v-slot:label>课程</template>
          <Select
            v-model="goods.goods_id"
            :datas="createParams.courses"
            :filterable="true"
            keyName="id"
            titleName="title"
          ></Select>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>秒杀价格</template>
          <input type="number" v-model="goods.charge" min="0" />
          <warn text="单位：元"></warn>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>秒杀数量</template>
          <input type="number" v-model="goods.num" min="0" />
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>秒杀开始时间</template>
          <DatePicker v-model="goods.started_at" type="datetime"></DatePicker>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>秒杀结束时间</template>
          <DatePicker v-model="goods.end_at" type="datetime"></DatePicker>
        </FormItem>
        <FormItem prop="page_title">
          <template v-slot:label>秒杀页面标题</template>
          <input type="text" v-model="goods.page_title" />
        </FormItem>

        <FormItem>
          <Button color="primary" @click="create">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      goods: {
        goods_id: null,
        goods_type: null,
        goods_title: null,
        goods_thumb: null,
        goods_charge: null,
        charge: null,
        num: null,
        started_at: null,
        end_at: null,
        page_title: null
      },
      rules: {
        required: ['goods_id', 'num', 'charge', 'started_at', 'end_at', 'page_title']
      },
      createParams: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.miaoSha.Goods.Edit({ id: this.id }).then(res => {
        this.goods = res.data;
      });
      R.Extentions.miaoSha.Goods.Create().then(res => {
        this.createParams = res.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.goods;
        let course = this.createParams.courses[this.goods.goods_id];
        data.goods_type = 'course';
        data.goods_title = course.title;
        data.goods_thumb = course.thumb;
        data.goods_charge = course.charge * 100;
        this.$emit('success', data);
      }
    }
  }
};
</script>
