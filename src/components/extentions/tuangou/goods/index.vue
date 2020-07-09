<style lang="less" scoped>
.red {
  color: red;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">团购商品</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110">
        <FormItem>
          <template v-slot:label>课程</template>
          <Select
            v-model="filter.goods_id"
            :filterable="true"
            :datas="courses"
            keyName="id"
            titleName="title"
          ></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
          <Button class="h-btn" @click="reset">重置</Button>
        </FormItem>
      </Form>

      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.TuanGou.goods.store"
          text="添加"
          @click="create()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.TuanGou.orders"
          text="订单"
          @click="showOrdersPage()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.TuanGou.refund"
          text="退款"
          @click="showRefundPage()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="课程">
          <template slot-scope="{ data }">
            <span v-if="data.course">{{data.course.title}}</span>
            <span v-else class="red">已删除</span>
          </template>
        </TableItem>
        <TableItem prop="charge" title="团购价" unit="元"></TableItem>
        <TableItem prop="original_charge" title="原价" unit="元"></TableItem>
        <TableItem prop="people_num" title="团购人数" unit="人"></TableItem>
        <TableItem prop="time_limit" title="有效天数" unit="天"></TableItem>
        <TableItem prop="started_at" title="开始"></TableItem>
        <TableItem prop="ended_at" title="结束"></TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.TuanGou.goods.delete" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.TuanGou.goods.edit"
              text="编辑"
              @click="edit(data)"
            ></p-button>

            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.TuanGou.goods.items"
              text="团列表"
              @click="showItems(data)"
            ></p-button>
          </template>
        </TableItem>
      </Table>

      <Pagination
        class="mt-10"
        v-if="pagination.total > 0"
        align="right"
        v-model="pagination"
        @change="changePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false,
      courses: [],
      filter: {
        goods_id: null
      }
    };
  },
  mounted() {
    this.getData(true);
  },
  methods: {
    reset() {
      this.filter = {
        goods_id: null
      };
      this.getData();
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
      data.goods_id = this.filter.goods_id;
      R.Extentions.tuanGou.Goods.List(data).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.courses = resp.data.courses;
        this.loading = false;
      });
    },
    create() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData(true);
          }
        }
      });
    },
    remove(data, item) {
      R.Extentions.tuanGou.Goods.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./edit'], resolve);
          },
          datas: {
            id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData();
          }
        }
      });
    },
    showItems(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./items'], resolve);
          },
          datas: {
            id: item.id
          }
        }
      });
    },
    showOrdersPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../orders/index'], resolve);
          }
        }
      });
    },
    showRefundPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../refund/index'], resolve);
          }
        }
      });
    }
  }
};
</script>
