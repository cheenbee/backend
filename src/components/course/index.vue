<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">课程</span>
    </div>
    <div class="h-panel-bar">
      <Form :labelWidth="110">
        <FormItem label="关键字搜索">
          <input type="text" v-model="cond.keywords" placeholder="课程标题" />
        </FormItem>
        <FormItem label="分类">
          <template v-slot:label>分类</template>
          <Select
            v-model="cond.cid"
            :filterable="true"
            :datas="categories"
            keyName="id"
            titleName="name"
          ></Select>
        </FormItem>
        <FormItem>
          <Button class="h-btn h-btn-primary" @click="getData(true)">搜索</Button>
          <Button class="h-btn" @click="reset()">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="course.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <Table :loading="loading" :datas="datas" @sort="sortEvt">
        <TableItem prop="id" title="ID" :sort="true"></TableItem>
        <TableItem title="封面">
          <template slot-scope="{ data }">
            <img :src="data.thumb" width="100" height="75" />
          </template>
        </TableItem>
        <TableItem prop="title" title="课程"></TableItem>
        <TableItem prop="charge" title="价格" unit="元" :sort="true"></TableItem>
        <TableItem prop="published_at" title="上线时间" :sort="true"></TableItem>
        <TableItem title="订阅人数" prop="user_count" unit="人" :sort="true"></TableItem>
        <TableItem title="显示">
          <template slot-scope="{ data }">
            <span v-if="data.is_show === 1">是</span>
            <span v-else>否</span>
          </template>
        </TableItem>
        <TableItem title="推荐">
          <template slot-scope="{ data }">
            <span v-if="data.is_rec === 1">是</span>
            <span v-else>否</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="300">
          <template slot-scope="{ data }">
            <p-del-button permission="course.destroy" @click="remove(datas, data)"></p-del-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="course.edit"
              text="编辑"
              @click="edit(data)"
            ></p-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="course_chapter"
              text="章节"
              @click="goChapter(data)"
            ></p-button>
            <p-button
              glass="h-btn h-btn-s h-btn-primary"
              permission="course.subscribe_users"
              text="订阅用户"
              @click="showSubscribeUsers(data)"
            ></p-button>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination
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
      cond: {
        keywords: '',
        cid: null,
        sort: 'created_at',
        order: 'desc'
      },
      datas: [],
      loading: false,
      categories: []
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
    sortEvt(sort) {
      this.cond.sort = sort.prop;
      this.cond.order = sort.type;
      this.getData();
    },
    reset() {
      this.cond.keywords = '';
      this.cond.cid = null;
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let cond = Object.assign(this.cond, this.pagination);
      R.Course.List(cond).then(resp => {
        this.datas = resp.data.courses.data;
        this.pagination.total = resp.data.courses.total;
        this.loading = false;
        this.categories = resp.data.categories;
      });
    },
    create() {
      this.$router.push({ name: 'CourseCreate' });
    },
    remove(data, item) {
      R.Course.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$router.push({ name: 'CourseEdit', params: { id: item.id } });
    },
    goChapter(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['../course_chapter/index'], resolve);
          },
          datas: {
            cid: item.id
          }
        }
      });
    },
    showSubscribeUsers(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./subscribe_users'], resolve);
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
