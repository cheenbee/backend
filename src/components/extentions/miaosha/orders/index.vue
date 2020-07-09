<style lang="less" scoped>
.red {
  color: red;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">秒杀订单</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110">
        <FormItem>
          <template v-slot:label>课程</template>
          <Select
            v-model="filter.gid"
            :filterable="true"
            :datas="goods"
            keyName="id"
            titleName="goods_title"
          ></Select>
        </FormItem>
        <FormItem>
          <template v-slot:label>状态</template>
          <Select
            v-model="filter.status"
            :filterable="true"
            :datas="statusMap"
            keyName="id"
            titleName="text"
          ></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
          <Button class="h-btn" @click="reset">重置</Button>
        </FormItem>
      </Form>

      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="商品">
          <template slot-scope="{ data }">{{data.goods.goods_title}}</template>
        </TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <span v-if="data.user">{{data.user.nick_name}}</span>
            <span class="red" v-else>用户不存在</span>
          </template>
        </TableItem>
        <TableItem title="价格">
          <template slot-scope="{ data }">{{data.charge}}元</template>
        </TableItem>
        <TableItem title="状态">
          <template slot-scope="{ data }">
            <span v-if="data.status === 1">已支付</span>
            <span v-else>未支付</span>
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
      filter: {
        gid: null,
        status: -1
      },
      statusMap: [
        {
          id: -1,
          text: '全部'
        },
        {
          id: 0,
          text: '未支付'
        },
        {
          id: 1,
          text: '已支付'
        }
      ],
      goods: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    reset() {
      this.filter = {
        gid: null,
        status: -1
      };
      this.getData();
    },
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
      let data = this.pagination;
      data.gid = this.filter.gid;
      data.status = this.filter.status;
      R.Extentions.miaoSha.Orders.Index(data).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.goods = resp.data.goods;
        this.loading = false;
      });
    }
  }
};
</script>
