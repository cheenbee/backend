<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">团购订单</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110">
        <FormItem>
          <template v-slot:label>课程</template>
          <Select
            v-model="pagination.course_id"
            :filterable="true"
            :datas="courses"
            keyName="id"
            titleName="title"
          ></Select>
        </FormItem>
        <FormItem>
          <template v-slot:label>状态</template>
          <Select v-model="pagination.status" :datas="status" keyName="id" titleName="title"></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(false)">搜索</Button>
          <Button class="h-btn" @click="reset">重置</Button>
        </FormItem>
      </Form>

      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="商品">
          <template slot-scope="{ data }">
            <span v-if="data.goods">{{data.goods.course.title}}</span>
            <span style="color:red" v-else>已删除</span>
          </template>
        </TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">{{data.user.nick_name}}</template>
        </TableItem>
        <TableItem title="价格">
          <template slot-scope="{ data }">{{data.charge}}元</template>
        </TableItem>
        <TableItem title="状态">
          <template slot-scope="{ data }">{{data.status_text}}</template>
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
        total: 0,
        status: null,
        course_id: null
      },
      datas: [],
      loading: false,
      courses: [],
      status: [
        {
          id: null,
          title: '全部'
        },
        {
          id: 0,
          title: '未支付'
        },
        {
          id: 1,
          title: '已支付'
        }
      ]
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
      this.getData(false);
    },
    reset() {
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
        this.pagination.status = null;
        this.pagination.course_id = null;
      }
      this.loading = true;
      R.Extentions.tuanGou.Orders.Index(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
        this.courses = resp.data.courses;
      });
    }
  }
};
</script>
