<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">直播课程</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.Zhibo.course_category.list"
          text="课程分类"
          @click="showCategoryPage()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.Zhibo.teacher.list"
          text="讲师"
          @click="showTeacherPage()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="addons.Zhibo.course.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID" :width="80"></TableItem>
        <TableItem title="分类">
          <template slot-scope="{ data }">
            <span v-if="data.category">{{data.category.name}}</span>
            <span v-else class="red">已删除</span>
          </template>
        </TableItem>
        <TableItem prop="title" title="课程名"></TableItem>
        <TableItem prop="charge" title="价格" unit="元"></TableItem>
        <TableItem prop="published_at" title="上线时间"></TableItem>
        <TableItem prop="views_times" title="浏览次数" :width="100" unit="次"></TableItem>
        <TableItem prop="join_user_times" title="学员" :width="100" unit="人"></TableItem>
        <TableItem title="显示" :width="50">
          <template slot-scope="{ data }">
            <span v-if="data.is_show === 1">是</span>
            <span v-else>否</span>
          </template>
        </TableItem>
        <TableItem title="会员免费" :width="50">
          <template slot-scope="{ data }">
            <span v-if="data.vip_can_view === 1">是</span>
            <span v-else>否</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="300">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.Zhibo.course.delete" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.Zhibo.course.update"
              text="编辑"
              @click="edit(data)"
            ></p-button>

            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.Zhibo.course_chapter.list"
              text="章节"
              @click="goChapters(data)"
            ></p-button>

            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="addons.Zhibo.course_video.list"
              text="内容安排"
              @click="goVideosPage(data)"
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
      datas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 0,
        keywords: ''
      },
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    changePage() {
      this.getData();
    },
    getData(reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.keywords = '';
      }
      this.loading = true;
      R.Extentions.zhibo.Course.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
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
      R.Extentions.zhibo.Course.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
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
    goChapters(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_chapter/index'], resolve);
          },
          datas: {
            course_id: item.id
          }
        }
      });
    },
    showCategoryPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_category/index'], resolve);
          }
        }
      });
    },
    showTeacherPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../teacher/index'], resolve);
          }
        }
      });
    },
    goVideosPage(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_video/index'], resolve);
          },
          datas: {
            course_id: item.id
          }
        }
      });
    }
  }
};
</script>
