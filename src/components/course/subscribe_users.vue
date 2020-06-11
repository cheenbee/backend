<style lang="less">
</style>
<template>
  <div style="padding: 30px">
    <div style="margin-bottom: 15px;">
      <Table :loading="loading" :datas="list">
        <TableItem title="ID" prop="id"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">{{users[data.user_id].nick_name}}</template>
        </TableItem>
        <TableItem title="看完">
          <template slot-scope="{ data }">{{data.is_watched === 1 ? '是' : '否'}}</template>
        </TableItem>
        <TableItem title="看完时间">
          <template slot-scope="{ data }">{{data.watched_at}}</template>
        </TableItem>
      </Table>
    </div>

    <Pagination
      v-if="pagination.total > 0"
      align="right"
      v-model="pagination"
      @change="changePage"
    />
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      list: [],
      users: [],
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      let p = this.pagination;
      p.id = this.id;
      R.Course.SubscribeUsers(p).then(res => {
        this.list = res.data.data.data;
        this.users = res.data.users;
        this.pagination.total = res.data.data.total;
        this.pagination.page = res.data.data.current_page;
        this.pagination.size = res.data.data.per_page;
        this.loading = false;
      });
    },
    changePage() {
      this.pagination.page = 1;
      this.init();
    }
  }
};
</script>