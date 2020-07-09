<style lang="less">
.body {
  border: 1px solid rgb(240, 246, 255);
}
.mt-2 {
  margin-top: 2px;
}
.left-menu-item {
  border-bottom: 1px solid rgb(240, 246, 255);
  cursor: pointer;
  font-size: 1rem;
  &.active {
    background-color: rgb(240, 246, 255);
    color: @primary-color;
    border-right: 5px solid @primary-color;
  }
  &:hover {
    background-color: rgb(245, 245, 245);
  }
  span {
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
  }
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">系统配置</span>
    </div>
    <div class="h-panel-body" v-if="!loading">
      <div class="mb-10">
        <p-button glass="h-btn h-btn-primary" permission="setting.save" text="保存" @click="save()"></p-button>
      </div>
      <Row class="body">
        <Cell width="4" style="border-right: 1px solid rgb(238, 238, 238);">
          <Row>
            <Cell
              v-for="(item, index) in setting"
              :key="index"
              width="24"
              class="left-menu-item"
              :class="{ active: index === activeItem }"
            >
              <span
                style="display: inline-block; width: 100%"
                @click="switchItem(index)"
              >{{ index }}</span>
            </Cell>
          </Row>
        </Cell>
        <Cell
          width="20"
          v-show="activeItem === index"
          v-for="(item, index) in setting"
          :key="'tab'+index"
        >
          <Form mode="block" class="p-20">
            <template v-for="c in item">
              <FormItem :key="c.id">
                <template v-slot:label>{{c.name}}</template>

                <input type="text" v-model="c.value" v-if="c.field_type === 'text'" />
                <input type="number" v-model="c.value" v-else-if="c.field_type === 'number'" />
                <textarea v-model="c.value" v-else-if="c.field_type === 'textarea'" rows="3"></textarea>
                <h-switch v-model="c.value" v-else-if="c.field_type === 'switch'"></h-switch>
                <wang-editor v-model="c.value" v-else-if="c.field_type === 'longtext'"></wang-editor>
                <image-upload v-model="c.value" :name="c.name" v-else-if="c.field_type === 'image'"></image-upload>
                <Select
                  v-model="c.value"
                  :datas="c.option_value"
                  v-else-if="c.field_type === 'select'"
                ></Select>

                <warn :text="c.help" v-if="c.help"></warn>
              </FormItem>
            </template>
          </Form>
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
import WangEditor from '../common/wangEditor';

export default {
  components: { WangEditor },
  data() {
    return {
      loading: true,
      activeItem: '系统',
      setting: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Setting.Get().then(resp => {
        this.loading = false;
        this.setting = resp.data;
      });
    },
    switchItem(item) {
      this.activeItem = item;
    },
    save() {
      let data = {};
      for (let index in this.setting) {
        for (let index2 in this.setting[index]) {
          let item = this.setting[index][index2];
          data[item.key] = item.value;
        }
      }
      R.Setting.Save({ config: data }).then(resp => {
        HeyUI.$Message.success('成功');
        this.init();
      });
    }
  }
};
</script>
