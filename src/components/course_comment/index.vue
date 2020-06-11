<style lang="less" scoped>
.avatar {
  border-radius: 16px;
}
.red {
  color: red;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">课程评论</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110">
        <FormItem label="课程">
          <template v-slot:label>课程</template>
          <Select
            v-model="filter.course_id"
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

      <div style="margin-bottom: 15px;">
        <p-del-button permission="course_comment.destroy" @click="deleteSubmit()"></p-del-button>
      </div>

      <Table :loading="loading" :datas="datas" :checkbox="true" ref="table">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <span v-if="users[data.user_id]">{{users[data.user_id].nick_name}}</span>
            <span class="red" v-else>不存在</span>
          </template>
        </TableItem>
        <TableItem title="课程">
          <template slot-scope="{ data }">
            <a
              v-if="data.course"
              :href="'/course/' + data.course.id + '/' + data.course.slug"
              target="_blank"
            >{{data.course.title}}</a>
            <span class="red" v-else>已删除</span>
          </template>
        </TableItem>
        <TableItem title="内容">
          <template slot-scope="{ data }">
            <p v-html="data.render_content"></p>
          </template>
        </TableItem>
        <TableItem prop="created_at" title="时间"></TableItem>
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
      datas: [],
      loading: false,
      filter: {
        course_id: null
      },
      courses: [],
      users: []
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
      let data = this.pagination;
      data.course_id = this.filter.course_id;
      R.CourseComment.List(data).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.courses = resp.data.courses;
        this.users = resp.data.users;
        this.loading = false;
      });
    },
    reset() {
      this.filter = {
        course_id: null
      };
      this.getData(true);
    },
    deleteSubmit() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的评论');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.CourseComment.Delete({ ids: ids }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
