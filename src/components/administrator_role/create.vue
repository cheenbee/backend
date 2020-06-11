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
      :model="role"
    >
      <FormItem label="权限" prop="permission_ids">
        <template v-slot:label>权限</template>
        <Select
          v-model="role.permission_ids"
          :datas="permissions"
          :filterable="true"
          :multiple="true"
        ></Select>
      </FormItem>
      <FormItem label="角色名" prop="display_name">
        <template v-slot:label>角色名</template>
        <input type="text" v-model="role.display_name" />
      </FormItem>
      <FormItem label="Slug" prop="slug">
        <template v-slot:label>Slug</template>
        <input type="text" v-model="role.slug" />
      </FormItem>
      <FormItem label="描述" prop="description">
        <template v-slot:label>描述</template>
        <input type="text" v-model="role.description" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">创建</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Role from 'model/AdministratorRole';

export default {
  data() {
    return {
      role: Role.parse({}),
      rules: {
        required: ['display_name', 'slug', 'description']
      },
      permissions: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.AdministratorRole.Create().then(res => {
        let data = res.data.permissions;
        let permissions = [];
        for (let key in data) {
          permissions.push({
            title: key,
            isLabel: true
          });
          data[key].forEach(item => {
            permissions.push({
              title: item.display_name,
              key: item.id
            });
          });
        }
        this.permissions = permissions;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.role);
      }
    }
  }
};
</script>
