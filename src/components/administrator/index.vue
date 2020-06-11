<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">管理员</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="administrator.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem prop="name" title="姓名"></TableItem>
        <TableItem prop="email" title="邮箱"></TableItem>
        <TableItem prop="created_at" title="创建时间"></TableItem>
        <TableItem :render="logShow" title="最近日志"></TableItem>
        <TableItem title="禁止登录">
          <template slot-scope="{ data }">{{data.is_ban_login === 1 ? '是' : '否'}}</template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="administrator.destroy" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="administrator.edit"
              text="编辑"
              @click="edit(data)"
            ></p-button>
          </template>
        </TableItem>
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
      loading: false
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
      R.Administrator.List(this.pagination).then(resp => {
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
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            R.Administrator.Store(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.Administrator.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
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
            R.Administrator.Update(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    logShow(item) {
      return item.last_login_date + '|' + item.last_login_ip;
    }
  }
};
</script>
