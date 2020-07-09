<style lang="less"></style>
<template>
  <div class>
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑课程分类</span>
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
          :model="category"
        >
          <FormItem label="图标" prop="icon">
            <template v-slot:label>图标</template>
            <image-upload v-model="category.icon" name="图标"></image-upload>
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input type="number" v-model="category.sort" />
          </FormItem>
          <FormItem label="分类名" prop="name">
            <template v-slot:label>分类名</template>
            <input type="text" v-model="category.name" />
          </FormItem>
          <FormItem label="显示" prop="is_show">
            <template v-slot:label>显示</template>
            <h-switch v-model="category.is_show" :trueValue="1" :falseValue="0"></h-switch>
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      category: {
        icon: null,
        sort: null,
        name: null,
        is_show: null
      },
      rules: {
        required: ['sort', 'name', 'is_show', 'icon']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Extentions.templateOne.CourseCategory.Edit({ id: this.id }).then(resp => {
        this.category = resp.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.category);
      }
    }
  }
};
</script>
