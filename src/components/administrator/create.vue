<style lang="less"></style>
<template>
  <div style="padding: 20px">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :labelWidth="110"
      :rules="rules"
      :model="administrator"
    >
      <FormItem label="角色" prop="roles">
        <template v-slot:label>角色</template>
        <Select
          v-model="administrator.role_id"
          :datas="roles"
          keyName="id"
          titleName="display_name"
          :filterable="true"
          :multiple="true"
        ></Select>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <template v-slot:label>姓名</template>
        <input type="text" v-model="administrator.name" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <template v-slot:label>邮箱</template>
        <input type="text" v-model="administrator.email" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <template v-slot:label>密码</template>
        <input type="text" v-model="administrator.password" />
      </FormItem>
      <FormItem label="禁止登录" prop="is_ban_login">
        <template v-slot:label>禁止登录</template>
        <h-switch v-model="administrator.is_ban_login" :trueValue="1" :falseValue="0"></h-switch>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Administrator from 'model/Administrator';

export default {
  data() {
    return {
      administrator: Administrator.parse({}),
      rules: {
        required: ['name', 'email', 'password']
      },
      roles: []
    };
  },
  mounted() {
    R.Administrator.Create().then(res => {
      this.roles = res.data.roles;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.administrator;
        data.password_confirmation = data.password;
        this.$emit('success', data);
      }
    }
  }
};
</script>
