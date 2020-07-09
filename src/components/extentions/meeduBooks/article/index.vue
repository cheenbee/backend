<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">文章</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.meedu_books.book.store"
          text="添加"
          @click="create()"
        ></p-button>
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.meedu_books.book_article.comments.list"
          text="评论"
          @click="showCommentsPage()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="电子书">
          <template slot-scope="{data}">
            <span v-if="data.book">{{ data.book.name }}</span>
            <span class="c-red" v-else>已删除</span>
          </template>
        </TableItem>
        <TableItem title="章节">
          <template slot-scope="{data}">
            <span v-if="data.chapter">{{ data.chapter.name }}</span>
            <span class="c-red" v-else>已删除</span>
          </template>
        </TableItem>
        <TableItem prop="title" title="标题"></TableItem>
        <TableItem prop="view_times" title="浏览" unit="次"></TableItem>
        <TableItem title="显示">
          <template slot-scope="{data}">
            <span>{{ data.is_show === 1 ? '是' : '否' }}</span>
          </template>
        </TableItem>
        <TableItem prop="published_at" title="上架时间"></TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.meedu_books.book.delete" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.meedu_books.book.update"
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
  props: ['bid'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        total: 0,
        book_id: this.bid
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
      R.Extentions.meeduBooks.Article.List(this.pagination).then(resp => {
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
            R.Extentions.meeduBooks.Article.Store(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.Extentions.meeduBooks.Article.Delete({ id: item.id }).then(resp => {
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
            R.Extentions.meeduBooks.Article.Update(data).then(resp => {
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
            require(['../article_comment/index'], resolve);
          }
        }
      });
    }
  }
};
</script>
