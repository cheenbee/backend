<template>
  <div class="table-basic-vue frame-page h-panel" style="width: 800px">
    <div class="h-panel-bar">
      <span class="h-panel-title">考试用户</span>
    </div>
    <div class="h-panel-body">
      <div>
        <Form mode="block">
          <FormItem>
            <template v-slot:label>添加用户</template>
            <textarea v-model="mobiles" placeholder="一行一个手机号"></textarea>
          </FormItem>
          <FormItem>
            <p-button
              glass="h-btn h-btn-primary"
              permission="addons.Paper.paper.users.add"
              text="添加"
              @click="userAdd()"
            ></p-button>

            <a
              :href="'/backend/addons/Paper/paper/'+id+'/user/export?token='+token"
              target="_blank"
              class="h-btn h-primary"
            >导出学生成绩</a>
          </FormItem>
        </Form>
      </div>
      <Table ref="table" :loading="loading" :datas="datas">
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem title="最大分数">
          <template slot-scope="{ data }">
            <span>{{typeof userScores[data.user.id] === 'undefined' ? 0 : userScores[data.user.id]}}分</span>
          </template>
        </TableItem>
        <TableItem title="是否及格">
          <template slot-scope="{ data }">
            <span v-if="typeof userScores[data.user.id] === 'undefined'">否</span>
            <span v-else>{{userScores[data.user.id] >= passScore ? '是' : '否' }}</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <Poptip content="确认删除？" @confirm="remove(data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
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
  props: ['id'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      datas: [],
      loading: false,
      mobiles: [],
      userScores: {},
      token: '',
      passScore: 0
    };
  },
  mounted() {
    this.init();
    this.token = Utils.getLocal('token');
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
      data.id = this.id;
      R.Extentions.paper.Paper.Users(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
        this.userScores = resp.data.user_score;
        this.passScore = resp.data.pass_score;
      });
    },
    userAdd() {
      let mobiles = this.mobiles.split('\n');
      if (mobiles.length === 0) {
        this.$Message.error('请输入用户手机号');
        return;
      }
      R.Extentions.paper.Paper.UserAdd({ mobiles: mobiles, id: this.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    remove(item) {
      R.Extentions.paper.Paper.UserDel({ id: this.id, user_id: item.user_id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    }
  }
};
</script>
