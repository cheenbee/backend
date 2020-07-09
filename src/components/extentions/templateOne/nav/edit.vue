<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="nav"
    >
      <FormItem label="导航名" prop="name">
        <template v-slot:label>导航名</template>
        <input type="text" v-model="nav.name" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <template v-slot:label>排序</template>
        <input type="number" v-model="nav.sort" placeholder="小的数靠前" />
      </FormItem>
      <FormItem label="图标" prop="icon">
        <template v-slot:label>图标</template>
        <image-upload v-model="nav.icon" name="图标"></image-upload>
      </FormItem>
      <FormItem label="地址" prop="route">
        <template v-slot:label>地址</template>
        <input type="text" v-model="nav.route" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      nav: {
        type: 0,
        name: null,
        sort: 0,
        icon: null
      },
      rules: {
        required: ['name', 'sort', 'icon', 'route']
      }
    };
  },
  mounted() {
    R.Extentions.templateOne.Nav.Edit({ id: this.id }).then(res => {
      this.nav = res.data.data;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.nav);
      }
    }
  }
};
</script>
