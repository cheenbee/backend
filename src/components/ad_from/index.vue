<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">推广链接</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="ad_from.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem prop="from_name" title="Name"></TableItem>
        <TableItem prop="url" title="推广地址"></TableItem>
        <TableItem title="操作" align="center" :width="240">
          <template slot-scope="{ data }">
            <p-del-button permission="ad_from.destroy" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="ad_from.edit"
              text="编辑"
              @click="edit(data)"
            ></p-button>
            <p-button
              glass="h-btn h-btn-s"
              permission="ad_from.number"
              text="数据"
              @click="goNumber(data)"
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
      R.AdFrom.List(this.pagination).then(resp => {
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
            R.AdFrom.Store(data).then(resp => {
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.AdFrom.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$Modal({
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
            R.AdFrom.Update(data).then(resp => {
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    goNumber(item) {
      this.$Modal({
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./statistics'], resolve);
          },
          datas: {
            id: item.id
          }
        }
      });
    }
  }
};
</script>
