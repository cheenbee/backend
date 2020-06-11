<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">优惠码</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110">
        <FormItem label="搜索">
          <input type="text" v-model="filter.key" placeholder="搜索" />
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
          <Button @click="reset">重置</Button>
        </FormItem>
      </Form>
      <div class="mb-10">
        <p-del-button permission="promoCode.destroy.multi" @click="deleteSubmit()"></p-del-button>
        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          icon="h-icon-plus"
          permission="promoCode.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas" :checkbox="true" ref="table" class="mb-10">
        <TableItem prop="code" title="优惠码"></TableItem>
        <TableItem prop="invited_user_reward" title="优惠金额" unit="元"></TableItem>
        <TableItem prop="invite_user_reward" title="所属用户奖励" unit="元"></TableItem>
        <TableItem prop="use_times" title="次数限制" unit="次"></TableItem>
        <TableItem prop="used_times" title="已使用次数" unit="次"></TableItem>
        <TableItem prop="expired_at" title="过期时间"></TableItem>
      </Table>
      <div class="mt-10">
        <Pagination
          v-if="pagination.total > 0"
          align="right"
          v-model="pagination"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      datas: [],
      loading: false,
      filter: {
        key: null
      }
    };
  },
  mounted() {
    this.getData(true);
  },
  methods: {
    reset() {
      this.filter.key = null;
      this.getData(true);
    },
    changePage() {
      this.getData();
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let data = this.pagination;
      data.key = this.filter.key;
      R.PromoCode.List(data).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    create() {
      this.$Modal({
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            R.PromoCode.Create(data).then(resp => {
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    deleteSubmit() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的数据');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.PromoCode.Delete({ ids: ids }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
