<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">全部评论</span>
    </div>
    <div class="h-panel-body">
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="文章">
          <template slot-scope="{data}">
            <span v-if="data.topic">{{data.topic.title}}</span>
            <span v-else class="red">已删除</span>
          </template>
        </TableItem>
        <TableItem title="用户">
          <template slot-scope="{data}">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem title="评论内容">
          <template slot-scope="{data}">
            <div v-html="data.content"></div>
          </template>
        </TableItem>
        <TableItem prop="created_at" title="时间"></TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button
              permission="addons.meedu_topics.topic.comment.delete"
              @click="remove(datas, data)"
            ></p-del-button>
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
      R.Extentions.meeduTopics.Comment.Index(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
      });
    },
    remove(data, item) {
      R.Extentions.meeduTopics.Comment.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
