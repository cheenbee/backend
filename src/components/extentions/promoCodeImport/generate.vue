<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :labelWidth="110"
      :rules="rules"
      :model="promoCode"
    >
      <FormItem label="统一前缀" prop="prefix">
        <template v-slot:label>统一前缀</template>
        <input type="text" v-model="promoCode.prefix" />
      </FormItem>
      <FormItem label="生成数量" prop="num">
        <template v-slot:label>生成数量</template>
        <input type="number" v-model="promoCode.num" />
      </FormItem>
      <FormItem label="到期时间" prop="expired_at">
        <template v-slot:label>到期时间</template>
        <DatePicker v-model="promoCode.expired_at" type="datetime"></DatePicker>
      </FormItem>
      <FormItem label="面值" prop="money">
        <template v-slot:label>面值</template>
        <input type="number" v-model="promoCode.money" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">确认生成</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      promoCode: {
        prefix: null,
        num: null,
        expired_at: null,
        money: null
      },
      rules: {
        required: ['money', 'expired_at', 'num', 'prefix']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.promoCodeImport.Generate(this.promoCode).then(() => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
