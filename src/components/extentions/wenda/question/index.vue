<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">全部问题</span>
    </div>
    <div class="h-panel-body">
      <Form ref="form" :labelWidth="110">
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="filter.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem label="状态">
          <Select
            v-model="filter.status"
            :datas="statusOptions"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">过滤</Button>
          <Button @click="resetFilter()">重置</Button>
        </FormItem>
      </Form>

      <div class="mb-10">
        <p-button
          glass="h-btn h-btn-s h-btn-primary"
          permission="addons.Wenda.category.list"
          text="分类管理"
          @click="showCategoryPage()"
        ></p-button>

        <p-del-button permission="addons.Wenda.question.delete" text="批量删除" @click="deleteSubmit()"></p-del-button>
      </div>

      <Table ref="table" :checkbox="true" :loading="loading" :datas="datas">
        <TableItem title="分类" align="center">
          <template slot-scope="{ data }">
            <span>{{data.category.name}}</span>
          </template>
        </TableItem>
        <TableItem title="用户" align="center">
          <template slot-scope="{ data }">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem prop="title" title="标题"></TableItem>
        <TableItem prop="view_times" title="浏览" unit="次"></TableItem>
        <TableItem prop="answer_count" title="答案" unit="个"></TableItem>
        <TableItem title="状态" align="center">
          <template slot-scope="{ data }">
            <span v-if="data.status === 1">已解决</span>
            <span v-else>未解决</span>
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
      loading: false,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      filter: {
        category_id: null,
        status: null
      },
      statusOptions: [
        {
          id: 0,
          name: '未解决'
        },
        {
          id: 1,
          name: '已解决'
        }
      ],
      categories: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    deleteSubmit() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的问题');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.Extentions.wenda.Question.Delete({ ids: ids }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
        this.loading = false;
      });
    },
    resetFilter() {
      this.filter = {
        category_id: null,
        status: null
      };
      this.getData();
    },
    changePage() {
      this.getData();
    },
    getData() {
      this.loading = true;
      let data = this.pagination;
      data.category_id = this.filter.category_id;
      data.status = this.filter.status;
      R.Extentions.wenda.Question.List(data).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
        this.categories = resp.data.categories;
      });
    },
    showCategoryPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../category/index'], resolve);
          }
        }
      });
    }
  }
};
</script>
