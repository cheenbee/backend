<style lang="less" scoped>
.container {
  width: 1123px;
  height: auto;
  float: left;
  padding: 15px 30px;
}
.base-info {
  width: 100%;
  height: auto;
  float: left;
  line-height: 36px;
}

.red {
  color: red;
}
</style>
<template>
  <div class="container">
    <h2 class="mb-10">用户基本信息</h2>
    <Row class="base-info mb-10" v-if="user">
      <Cell width="6">昵称：{{user.nick_name}}</Cell>
      <Cell width="6">手机号：{{user.mobile}}</Cell>
      <Cell width="6">
        锁定：
        <span v-if="user.is_lock === 1">是</span>
        <span v-else>否</span>
      </Cell>
      <Cell width="6">
        激活：
        <span v-if="user.is_active === 1">是</span>
        <span v-else>否</span>
      </Cell>
      <Cell width="6">
        会员：
        <span v-if="user.role">{{user.role.name}}</span>
        <span v-else>暂无</span>
      </Cell>
      <Cell width="6">会员到期时间：{{user.role_expired_at || '无'}}</Cell>
      <Cell width="6">
        邀请人：
        <span v-if="user.invitor">{{user.invitor.nick_name}}</span>
        <span v-else>无</span>
      </Cell>
      <Cell width="6">邀请关系过期：{{user.invite_user_expired_at || '无'}}</Cell>
      <Cell width="6">邀请余额：{{user.invite_balance}}元</Cell>
      <Cell width="6">
        设置密码：
        <span v-if="user.is_password_set === 1">已设置</span>
        <span v-else>未设置</span>
      </Cell>
      <Cell width="6">
        设置昵称：
        <span v-if="user.is_set_nickname === 1">已设置</span>
        <span v-else>未设置</span>
      </Cell>
      <Cell width="6">
        用户邀请码：
        <span v-if="user.is_used_promo_code === 1">已使用</span>
        <span v-else>未使用</span>
      </Cell>
      <Cell width="6">注册IP：{{user.register_ip || '未记录'}}</Cell>
      <Cell width="6">注册地址：{{user.register_area || '未记录'}}</Cell>
    </Row>

    <h2 class="mb-10">详细记录</h2>
    <Row class="mb-10">
      <Cell width="24">
        <Tabs :datas="tabs" v-model="selectTab" @change="tabChange"></Tabs>
      </Cell>
    </Row>

    <Row v-show="selectTab === 'collect'">
      <Cell width="24">
        <Table :datas="userCollect" class="mb-10">
          <TableItem title="课程">
            <template slot-scope="{ data }">
              <span v-if="userCollectMap[data.course_id]">{{userCollectMap[data.course_id].title}}</span>
              <span class="red" v-else>已删除</span>
            </template>
          </TableItem>
          <TableItem prop="created_at" title="时间"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.collect" @change="paginateChange('collect')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'invite'">
      <Cell width="24">
        <Table :datas="userInvite" class="mb-10">
          <TableItem prop="id" title="ID"></TableItem>
          <TableItem prop="nick_name" title="昵称"></TableItem>
          <TableItem prop="mobile" title="手机号"></TableItem>
          <TableItem prop="invite_user_expired_at" title="维系过期时间"></TableItem>
          <TableItem prop="created_at" title="注册时间"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.invite" @change="paginateChange('invite')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'history'">
      <Cell width="24">
        <Table :datas="userHistory" class="mb-10">
          <TableItem title="课程">
            <template slot-scope="{ data }">
              <span v-if="userHistoryMap[data.course_id]">{{userHistoryMap[data.course_id].title}}</span>
              <span class="red" v-else>已删除</span>
            </template>
          </TableItem>
          <TableItem title="看完">
            <template slot-scope="{ data }">
              <span v-if="data.is_watched">是</span>
              <span v-else>否</span>
            </template>
          </TableItem>
          <TableItem prop="watched_at" title="看完的时间"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.history" @change="paginateChange('history')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'courses'">
      <Cell width="24">
        <Table :datas="userCourses" class="mb-10">
          <TableItem title="课程">
            <template slot-scope="{ data }">
              <span v-if="userCoursesMap[data.course_id]">{{userCoursesMap[data.course_id].title}}</span>
              <span class="red" v-else>已删除</span>
            </template>
          </TableItem>
          <TableItem prop="charge" title="购买价格" unit="元"></TableItem>
          <TableItem prop="created_at" title="购买时间"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.courses" @change="paginateChange('courses')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'videos'">
      <Cell width="24">
        <Table :datas="userVideos" class="mb-10">
          <TableItem title="视频">
            <template slot-scope="{ data }">
              <span v-if="userVideosMap[data.video_id]">{{userVideosMap[data.video_id].title}}</span>
              <span class="red" v-else>已删除</span>
            </template>
          </TableItem>
          <TableItem prop="charge" title="购买价格" unit="元"></TableItem>
          <TableItem prop="created_at" title="购买时间"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.videos" @change="paginateChange('videos')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'roles'">
      <Cell width="24">
        <Table :datas="userRoles" class="mb-10">
          <TableItem title="会员">
            <template slot-scope="{ data }">
              <span v-if="data.role">{{data.role.name}}</span>
              <span class="red" v-else>已删除</span>
            </template>
          </TableItem>
          <TableItem prop="charge" title="购买价格" unit="元"></TableItem>
          <TableItem prop="created_at" title="购买时间"></TableItem>
          <TableItem prop="started_at" title="开始"></TableItem>
          <TableItem prop="expired_at" title="结束"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.roles" @change="paginateChange('roles')" />
      </Cell>
    </Row>

    <Row v-show="selectTab === 'orders'">
      <Cell width="24">
        <Table :datas="userOrders" class="mb-10">
          <TableItem prop="id" title="ID"></TableItem>
          <TableItem prop="order_id" title="订单号"></TableItem>
          <TableItem prop="charge" title="价格" unit="元"></TableItem>
          <TableItem prop="status_text" title="状态"></TableItem>
          <TableItem title="商品">
            <template slot-scope="{ data }">
              <ul>
                <li
                  v-for="goods in data.goods"
                  :key="goods.id"
                >{{ goods.goods_text }}x{{ goods.num }}</li>
              </ul>
            </template>
          </TableItem>
          <TableItem prop="created_at" title="创建"></TableItem>
        </Table>
        <Pagination align="right" v-model="paginate.orders" @change="paginateChange('orders')" />
      </Cell>
    </Row>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      user: null,
      tabs: {
        courses: '订阅课程',
        videos: '订阅视频',
        roles: '订阅会员',
        orders: '订单',
        collect: '收藏',
        history: '观看历史',
        invite: '邀请'
      },
      selectTab: 'courses',
      paginate: {
        courses: {
          page: 1,
          size: 10,
          total: 0
        },
        videos: {
          page: 1,
          size: 10,
          total: 0
        },
        roles: {
          page: 1,
          size: 10,
          total: 0
        },
        orders: {
          page: 1,
          size: 10,
          total: 0
        },
        collect: {
          page: 1,
          size: 10,
          total: 0
        },
        history: {
          page: 1,
          size: 10,
          total: 0
        },
        invite: {
          page: 1,
          size: 10,
          total: 0
        }
      },
      userCourses: [],
      userCoursesMap: [],
      userVideos: [],
      userVideosMap: [],
      userOrders: [],
      userRoles: [],
      userCollect: [],
      userCollectMap: [],
      userHistory: [],
      userHistoryMap: [],
      userInvite: []
    };
  },
  mounted() {
    R.Member.Detail({ id: this.id }).then(res => {
      this.user = res.data.data;
    });

    this.getUserCourses();
  },
  methods: {
    tabChange(data) {
      let key = data.key;
      if (key === 'courses') {
        this.getUserCourses(true);
      } else if (key === 'videos') {
        this.getUserVideos(true);
      } else if (key === 'roles') {
        this.getUserRoles(true);
      } else if (key === 'orders') {
        this.getUserOrders(true);
      } else if (key === 'collect') {
        this.getUserCollect(true);
      } else if (key === 'history') {
        this.getUserHistory(true);
      } else if (key === 'invite') {
        this.getUserInvite(true);
      }
    },
    getUserCourses(reset = false) {
      if (reset === true) {
        this.paginate.courses.page = 1;
      }
      let data = this.paginate.courses;
      data.id = this.id;
      R.Member.Courses(data).then(res => {
        this.userCourses = res.data.data.data;
        this.paginate.courses.total = res.data.data.total;
        this.userCoursesMap = res.data.courses;
      });
    },
    getUserVideos(reset = false) {
      if (reset === true) {
        this.paginate.videos.page = 1;
      }
      let data = this.paginate.videos;
      data.id = this.id;
      R.Member.Videos(data).then(res => {
        this.userVideos = res.data.data.data;
        this.paginate.videos.total = res.data.data.total;
        this.userVideosMap = res.data.videos;
      });
    },
    getUserRoles(reset = false) {
      if (reset === true) {
        this.paginate.roles.page = 1;
      }
      let data = this.paginate.roles;
      data.id = this.id;
      R.Member.Roles(data).then(res => {
        this.userRoles = res.data.data.data;
        this.paginate.roles.total = res.data.data.total;
      });
    },
    getUserOrders(reset = false) {
      if (reset === true) {
        this.paginate.orders.page = 1;
      }
      let data = this.paginate.orders;
      data.id = this.id;
      R.Member.Orders(data).then(res => {
        this.userOrders = res.data.data.data;
        this.paginate.orders.total = res.data.data.total;
      });
    },
    getUserCollect(reset = false) {
      if (reset === true) {
        this.paginate.collect.page = 1;
      }
      let data = this.paginate.collect;
      data.id = this.id;
      R.Member.Collect(data).then(res => {
        this.userCollect = res.data.data.data;
        this.paginate.collect.total = res.data.data.total;
        this.userCollectMap = res.data.courses;
      });
    },
    getUserHistory(reset = false) {
      if (reset === true) {
        this.paginate.history.page = 1;
      }
      let data = this.paginate.history;
      data.id = this.id;
      R.Member.History(data).then(res => {
        this.userHistory = res.data.data.data;
        this.paginate.history.total = res.data.data.total;
        this.userHistoryMap = res.data.courses;
      });
    },
    getUserInvite(reset = false) {
      if (reset === true) {
        this.paginate.invite.page = 1;
      }
      let data = this.paginate.invite;
      data.id = this.id;
      R.Member.Invite(data).then(res => {
        this.userInvite = res.data.data.data;
        this.paginate.invite.total = res.data.data.total;
      });
    },
    paginateChange(t) {
      if (t === 'courses') {
        this.getUserCourses();
      } else if (t === 'videos') {
        this.getUserVideos();
      } else if (t === 'roles') {
        this.getUserRoles();
      } else if (t === 'orders') {
        this.getUserOrders();
      } else if (t === 'collect') {
        this.getUserCollect();
      } else if (t === 'history') {
        this.getUserHistory();
      } else if (t === 'invite') {
        this.getUserInvite();
      }
    }
  }
};
</script>