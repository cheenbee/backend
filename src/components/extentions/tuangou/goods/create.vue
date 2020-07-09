<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加团购商品</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="page"
      >
        <FormItem prop="goods_id">
          <template v-slot:label>课程</template>
          <Select
            v-model="goods.course_id"
            :datas="createParams.courses"
            :filterable="true"
            keyName="id"
            titleName="title"
          ></Select>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>团购价格</template>
          <input type="text" v-model="goods.charge" min="0" />
          <warn text="单位：元"></warn>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>原价</template>
          <input type="text" v-model="goods.original_charge" min="0" />
          <warn text="单位：元"></warn>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>团购人数</template>
          <input type="number" v-model="goods.people_num" min="0" />
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>团购有效天数</template>
          <input type="number" v-model="goods.time_limit" min="0" />
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>团购开始时间</template>
          <DatePicker v-model="goods.started_at" type="datetime"></DatePicker>
        </FormItem>
        <FormItem prop="charge">
          <template v-slot:label>团购结束时间</template>
          <DatePicker v-model="goods.ended_at" type="datetime"></DatePicker>
        </FormItem>
        <FormItem prop="page_title">
          <template v-slot:label>团购页面标题</template>
          <input type="text" v-model="goods.page_title" />
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
      goods: {
        course_id: null,
        charge: null,
        original_charge: null,
        people_num: null,
        started_at: null,
        ended_at: null,
        page_title: null
      },
      rules: {
        required: ['course_id', 'num', 'charge', 'started_at', 'end_at', 'page_title']
      },
      createParams: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.tuanGou.Goods.Create().then(res => {
        this.createParams = res.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.tuanGou.Goods.Store(this.goods).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
