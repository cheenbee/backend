<style lang="less">
.avatar {
  border-radius: 9px;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">订单</span>
    </div>
    <div class="h-panel-bar">
      <Form :labelWidth="110">
        <FormItem label="关键字搜索" prop="avatar">
          <input type="text" v-model="cond.keywords" placeholder="用户昵称/手机号" />
        </FormItem>
        <FormItem label="状态" prop="avatar">
          <Select v-model="cond.status" :datas="statusArr"></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <Table :loading="loading" :datas="datas" :stripe="true">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem prop="order_id" title="订单号"></TableItem>
        <TableItem prop="charge" title="价格" unit="元"></TableItem>
        <TableItem prop="status_text" title="状态"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <span>{{users[data.user_id].nick_name}}</span>
          </template>
        </TableItem>
        <TableItem title="商品">
          <template slot-scope="{ data }">
            <ul>
              <li v-for="goods in data.goods" :key="goods.id">{{ goods.goods_text }}x{{ goods.num }}</li>
            </ul>
          </template>
        </TableItem>
        <TableItem title="支付记录">
          <template slot-scope="{ data }">
            <ul>
              <li
                v-for="record in data.paid_records"
                :key="record.id"
              >{{record.paid_type_text}}:￥{{record.paid_total}}</li>
            </ul>
          </template>
        </TableItem>
        <TableItem prop="created_at" title="时间"></TableItem>
        <TableItem :width="200" title="操作" align="center">
          <template slot-scope="{ data }">
            <p-del-button
              permission="order.finish"
              text="改为已支付"
              @click="finishOrder(datas, data)"
              v-if="data.status === 1 || data.status === 5"
            ></p-del-button>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination
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
        size: 20,
        total: 0
      },
      cond: {
        keywords: null,
        status: null
      },
      statusArr: [
        {
          title: '未支付',
          key: 1
        },
        {
          title: '支付中',
          key: 5
        },
        {
          title: '已支付',
          key: 9
        },
        {
          title: '已取消',
          key: 7
        }
      ],
      datas: [],
      loading: false,
      users: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
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
      let cond = Object.assign(this.cond, this.pagination);
      R.Order.List(cond).then(resp => {
        this.datas = resp.data.orders.data;
        this.pagination.total = resp.data.orders.total;
        this.loading = false;
        this.users = resp.data.users;
      });
    },
    finishOrder(orders, order) {
      R.Order.Finish(order).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(false);
      });
    }
  }
};
</script>
