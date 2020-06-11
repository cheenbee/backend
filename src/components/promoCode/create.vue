<style lang="less"></style>
<template>
  <div>
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">添加优惠码</span>
      </div>
      <div class="h-panel-body">
        <Form
          v-width="400"
          mode="block"
          ref="form"
          :validOnChange="true"
          :showErrorTip="true"
          :labelWidth="110"
          :rules="rules"
          :model="PromoCode"
        >
          <FormItem label="优惠码" prop="code">
            <template v-slot:label>优惠码</template>
            <input type="text" v-model="PromoCode.code" />
          </FormItem>

          <FormItem label="到期时间" prop="expired_at">
            <template v-slot:label>到期时间</template>
            <DatePicker v-model="PromoCode.expired_at" type="datetime"></DatePicker>
          </FormItem>

          <FormItem label="抵扣金额" prop="invited_user_reward">
            <template v-slot:label>抵扣金额</template>
            <div class="h-input-group" v-width="200">
              <input type="text" v-model="PromoCode.invited_user_reward" />
              <span class="h-input-addon">元</span>
            </div>
          </FormItem>

          <FormItem label="可使用次数" prop="use_times">
            <template v-slot:label>可使用次数</template>
            <div class="h-input-group" v-width="200">
              <input type="text" v-model="PromoCode.use_times" />
              <span class="h-input-addon">次</span>
            </div>
            <p style="margin-top: 3p;x">0=不限制</p>
          </FormItem>

          <FormItem>
            <Button color="primary" @click="create">添加</Button>
            <Button @click="close()">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import PromoCode from 'model/PromoCode';

export default {
  data() {
    return {
      PromoCode: PromoCode.parse({}),
      rules: {
        required: ['code', 'expired_at', 'invited_user_reward', 'use_times']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.PromoCode);
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
