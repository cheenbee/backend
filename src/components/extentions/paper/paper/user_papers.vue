<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 800px">
    <div class="h-panel-bar">
      <span class="h-panel-title">考试记录</span>
    </div>
    <div class="h-panel-body">
      <Table ref="table" :loading="loading" :datas="datas">
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <span v-if="data.user">{{data.user.nick_name}}</span>
            <span v-else class="red">用户不存在</span>
          </template>
        </TableItem>
        <TableItem title="分数">
          <template slot-scope="{ data }">
            <span v-if="data.status === 2">{{data.score}}分</span>
            <span v-else></span>
          </template>
        </TableItem>
        <TableItem title="状态">
          <template slot-scope="{ data }">
            <span>{{data.status_text}}</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="100">
          <template slot-scope="{ data }">
            <p-button
              glass="h-btn"
              :class="data.status === 3 ? 'h-btn-red' : 'h-btn-yellow'"
              permission="addons.Paper.paper.userPaper.submit"
              :text="data.status === 3 ? '阅卷' : '详情'"
              @click="showScore(data)"
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
  props: ['paper_id'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false,
      statusMap: [],
      filter: {
        status: -1
      }
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
    getData() {
      this.loading = true;
      let data = this.pagination;
      data.id = this.paper_id;
      data.status = this.filter.status;
      R.Extentions.paper.Paper.UserPapers(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
        this.statusMap = resp.data.statusMap;
      });
    },
    showScore(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./score'], resolve);
          },
          datas: {
            paper_id: item.paper_id,
            user_paper_id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData();
          }
        }
      });
    }
  }
};
</script>
