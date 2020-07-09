<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">电子书</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.meedu_books.book_category.list"
          text="电子书分类"
          @click="showCategoriesPage()"
        ></p-button>
        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.meedu_books.book.comments.list"
          text="评论"
          @click="showCommentsPage()"
        ></p-button>
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.meedu_books.book.store"
          text="添加"
          @click="create()"
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
        <TableItem prop="name" title="名字"></TableItem>
        <TableItem prop="charge" title="价格" unit="元"></TableItem>
        <TableItem prop="view_times" title="浏览次数" unit="次"></TableItem>
        <TableItem prop="published_at" title="上架时间"></TableItem>
        <TableItem title="操作" align="center" :width="300">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.meedu_books.book.delete" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.meedu_books.book.update"
              text="编辑"
              @click="edit(data)"
            ></p-button>

            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.meedu_books.book_chapter.list"
              text="章节"
              @click="goChapter(data)"
            ></p-button>

            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.meedu_books.book_article.list"
              text="文章"
              @click="showArticlesPage(data)"
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
      R.Extentions.meeduBooks.Book.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    showCategoriesPage() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../category/index'], resolve);
          }
        }
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
            R.Extentions.meeduBooks.Book.Store(data).then(() => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.Extentions.meeduBooks.Book.Delete({ id: item.id }).then(resp => {
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
            R.Extentions.meeduBooks.Book.Update(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    goChapter(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../chapter/index'], resolve);
          },
          datas: {
            bid: item.id
          }
        }
      });
    },
    showCommentsPage(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../book_comment/index'], resolve);
          }
        }
      });
    },
    showArticlesPage(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../article/index'], resolve);
          },
          datas: {
            bid: item.id
          }
        }
      });
    }
  }
};
</script>
