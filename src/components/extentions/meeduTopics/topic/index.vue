<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">话题</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.meedu_topics.topic.store"
          text="添加"
          @click="create()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.meedu_topics.comments"
          text="评论"
          @click="showCommentsPage()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.meedu_topics.orders"
          text="订单"
          @click="showOrdersPage()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="分类">
          <template slot-scope="{data}">
            <span v-if="data.category">{{ data.category.name }}</span>
            <span class="c-red" v-else>已删除</span>
          </template>
        </TableItem>
        <TableItem prop="title" title="标题"></TableItem>
        <TableItem prop="view_times" title="浏览次数" unit="次"></TableItem>
        <TableItem prop="charge" title="价格" unit="元"></TableItem>
        <TableItem title="登录查看">
          <template slot-scope="{data}">
            <span>{{ data.is_need_login === 1 ? '是' : '否' }}</span>
          </template>
        </TableItem>
        <TableItem title="显示">
          <template slot-scope="{data}">
            <span>{{ data.is_show === 1 ? '是' : '否' }}</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button
              permission="addons.meedu_topics.topic.delete"
              @click="remove(datas, data)"
            ></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.meedu_topics.topic.update"
              text="编辑"
              @click="edit(data)"
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
      R.Extentions.meeduTopics.Topic.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
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
            R.Extentions.meeduTopics.Topic.Store(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.Extentions.meeduTopics.Topic.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
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
            R.Extentions.meeduTopics.Topic.Update(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    showCommentsPage() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../comment/index'], resolve);
          }
        }
      });
    },
    showOrdersPage() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./user'], resolve);
          }
        }
      });
    }
  }
};
</script>
