<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">全部视频</span>
    </div>
    <div class="h-panel-bar">
      <Form :labelWidth="110">
        <FormItem label="关键字搜索">
          <input type="text" v-model="cond.keywords" placeholder="视频标题" />
        </FormItem>
        <FormItem label="课程">
          <template v-slot:label>课程</template>
          <Select
            v-model="cond.course_id"
            :filterable="true"
            :datas="courses"
            keyName="id"
            titleName="title"
          ></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
          <Button class="h-btn" @click="reset">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-del-button permission="video.destroy.multi" text="批量删除" @click="deleteSubmit()"></p-del-button>
        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          icon="h-icon-plus"
          permission="video.store"
          text="添加"
          @click="create()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          permission="video.aliyun_hls.list"
          text="阿里云视频HLS转码"
          @click="showHlsPage()"
        ></p-button>
        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          permission="addons.TencentCloudHls.videos"
          text="腾讯云视频HLS转码"
          @click="showTencentHlsPage()"
        ></p-button>

        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          permission="video.aliyun_videos_import"
          text="视频批量导入"
          @click="showVideosImport()"
        ></p-button>
      </div>
      <Table :loading="loading" :checkbox="true" :datas="datas" ref="table" @sort="sortEvt">
        <TableItem prop="id" title="ID" :sort="true" :width="80"></TableItem>
        <TableItem title="课程">
          <template slot-scope="{ data }">{{data.course.title}}</template>
        </TableItem>
        <TableItem prop="title" title="视频"></TableItem>
        <TableItem prop="charge" title="价格" unit="元" :sort="true" :width="80"></TableItem>
        <TableItem prop="published_at" title="上线时间" :sort="true"></TableItem>
        <TableItem title="操作" align="center" :width="100">
          <template slot-scope="{ data }">
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="video.edit"
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
        size: 10,
        total: 0
      },
      cond: {
        keywords: '',
        sort: 'created_at',
        order: 'desc',
        course_id: null
      },
      datas: [],
      loading: false,
      courses: []
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
    reset() {
      this.cond.keywords = '';
      this.cond.course_id = null;
      this.getData(true);
    },
    sortEvt(sort) {
      this.cond.sort = sort.prop;
      this.cond.order = sort.type;
      this.getData();
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let cond = Object.assign(this.cond, this.pagination);
      R.Video.List(cond).then(resp => {
        this.datas = resp.data.videos.data;
        this.pagination.total = resp.data.videos.total;
        this.loading = false;
        this.courses = resp.data.courses;
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
            R.Video.Store(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    deleteSubmit() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的视频');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.Video.MultiDelete({ ids: ids }).then(resp => {
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
            R.Video.Update(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData();
            });
          }
        }
      });
    },
    showHlsPage() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../extentions/aliyunHls/video/index'], resolve);
          }
        }
      });
    },
    showTencentHlsPage() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['@/components/extentions/tencentCloudHls/video/index'], resolve);
          }
        }
      });
    },
    showVideosImport() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../extentions/aliyunVideosImport/import'], resolve);
          }
        }
      });
    }
  }
};
</script>
