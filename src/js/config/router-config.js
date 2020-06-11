import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthPage } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
    const routerParam = {
        routes: [{
            path: '/login',
            name: 'Login',
            component: (resolve) => require(['components/login/index'], resolve)
        }, {
            path: '/',
            component: (resolve) => require(['components/app/app-frame'], resolve),
            children: [{
                path: '',
                name: 'Home',
                component: (resolve) => require(['components/home/index'], resolve),
                meta: { title: '首页', icon: 'icon-monitor' }
            }, {
                path: '/system-error',
                name: 'SystemError',
                component: (resolve) => require(['components/error-pages/500'], resolve),
                meta: { title: '系统错误' }
            }, {
                path: '/permission-error',
                name: 'PermissionError',
                component: (resolve) => require(['components/error-pages/403'], resolve),
                meta: { title: '权限错误' }
            },
            {
                path: '/notfound-error',
                name: 'NotfoundError',
                component: (resolve) => require(['components/error-pages/404'], resolve),
                meta: { title: '页面找不到' }
            },
            {
                path: '/announcement',
                name: 'Announcement',
                component: (resolve) => require(['components/announcement/index'], resolve),
                meta: { title: '公告' }
            },
            {
                path: '/statistic',
                name: 'Statistic',
                component: (resolve) => require(['components/statistic/index'], resolve),
                meta: { title: '公告' }
            },
            {
                path: '/role',
                name: 'Role',
                component: (resolve) => require(['components/role/index'], resolve),
                meta: { title: 'VIP角色' }
            }, {
                path: '/slider',
                name: 'Slider',
                component: (resolve) => require(['components/slider/index'], resolve),
                meta: { title: '幻灯片' }
            }, {
                path: '/indexBanner',
                name: 'IndexBanner',
                component: (resolve) => require(['components/index_banner/index'], resolve),
                meta: { title: '首页推荐' }
            },
            {
                path: '/link',
                name: 'Link',
                component: (resolve) => require(['components/link/index'], resolve),
                meta: { title: '友情链接' }
            },
            {
                path: '/ad_from',
                name: 'AdFrom',
                component: (resolve) => require(['components/ad_from/index'], resolve),
                meta: { title: '推广链接' }
            },
            {
                path: '/ad_from/create',
                name: 'AdFromCreate',
                component: (resolve) => require(['components/ad_from/create'], resolve),
                meta: { title: '添加推广链接' },
            },
            {
                path: '/ad_from/:id/edit',
                name: 'AdFromEdit',
                component: (resolve) => require(['components/ad_from/edit'], resolve),
                meta: { title: '编辑推广链接' },
                props: true
            },
            {
                path: '/ad_from/:id/number',
                name: 'AdFromNumber',
                component: (resolve) => require(['components/ad_from/statistics'], resolve),
                meta: { title: '推广链接数据' },
                props: true
            },
            {
                path: '/course_comment',
                name: 'CourseComment',
                component: (resolve) => require(['components/course_comment/index'], resolve),
                meta: { title: '课程评论' }
            },
            {
                path: '/video_comment',
                name: 'VideoComment',
                component: (resolve) => require(['components/video_comment/index'], resolve),
                meta: { title: '视频评论' }
            },
            {
                path: '/order',
                name: 'Order',
                component: (resolve) => require(['components/order/index'], resolve),
                meta: { title: '视频评论' }
            },
            {
                path: '/member',
                name: 'Member',
                component: (resolve) => require(['components/member/index'], resolve),
                meta: { title: '用户' }
            }, {
                path: '/member/create',
                name: 'MemberCreate',
                component: (resolve) => require(['components/member/create'], resolve),
                meta: { title: '用户' }
            },
            {
                path: '/member/InviteBalanceWithdrawOrders',
                name: 'InviteBalanceWithdrawOrders',
                component: (resolve) => require(['components/member/inviteBalanceWithdrawOrders'], resolve),
                meta: { title: '邀请余额提现' }
            },
            {
                path: '/course',
                name: 'Course',
                component: (resolve) => require(['components/course/index'], resolve),
                meta: { title: '课程' }
            },
            {
                path: '/course/create',
                name: 'CourseCreate',
                component: (resolve) => require(['components/course/create'], resolve),
                meta: { title: '添加课程' },
            },
            {
                path: '/course/:id/edit',
                name: 'CourseEdit',
                component: (resolve) => require(['components/course/edit'], resolve),
                meta: { title: '编辑课程' },
                props: true
            },
            {
                path: '/video',
                name: 'Video',
                component: (resolve) => require(['components/video/index'], resolve),
                meta: { title: '视频' }
            },
            {
                path: '/video/create',
                name: 'VideoCreate',
                component: (resolve) => require(['components/video/create'], resolve),
                meta: { title: '添加视频' },
            },
            {
                path: '/video/:id/edit',
                name: 'VideoEdit',
                component: (resolve) => require(['components/video/edit'], resolve),
                meta: { title: '编辑视频' },
                props: true
            },
            {
                path: '/setting',
                name: 'Setting',
                component: (resolve) => require(['components/setting/index'], resolve),
                meta: { title: '系统配置' }
            },
            {
                path: '/administrator/password',
                name: 'AdministratorPassword',
                component: (resolve) => require(['components/administrator/password'], resolve),
                meta: { title: '修改密码' }
            },
            {
                path: '/administrator',
                name: 'Administrator',
                component: (resolve) => require(['components/administrator/index'], resolve),
                meta: { title: '管理员' }
            },
            {
                path: '/administrator/create',
                name: 'AdministratorCreate',
                component: (resolve) => require(['components/administrator/create'], resolve),
                meta: { title: '添加管理员' },
            },
            {
                path: '/administrator/:id/edit',
                name: 'AdministratorEdit',
                component: (resolve) => require(['components/administrator/edit'], resolve),
                meta: { title: '编辑管理员' },
                props: true
            },
            {
                path: '/nav',
                name: 'Nav',
                component: (resolve) => require(['components/nav/index'], resolve),
                meta: { title: '首页导航' }
            },
            {
                path: '/promoCode',
                name: 'PromoCode',
                component: (resolve) => require(['components/promoCode/index'], resolve),
                meta: { title: '优惠码' }
            },
            {
                path: '/administrator_role',
                name: 'AdministratorRole',
                component: (resolve) => require(['components/administrator_role/index'], resolve),
                meta: { title: '角色' }
            },
            {
                path: '/administrator_permission',
                name: 'AdministratorPermission',
                component: (resolve) => require(['components/administrator_permission/index'], resolve),
                meta: { title: '权限' }
            },
            {
                path: '/administrator_permission/create',
                name: 'AdministratorPermissionCreate',
                component: (resolve) => require(['components/administrator_permission/create'], resolve),
                meta: { title: '添加权限' },
            },
            {
                path: '/administrator_permission/:id/edit',
                name: 'AdministratorPermissionEdit',
                component: (resolve) => require(['components/administrator_permission/edit'], resolve),
                meta: { title: '编辑权限' },
                props: true
            },
            {
                path: '/addons',
                name: 'Addons',
                component: (resolve) => require(['components/addons/index'], resolve),
                meta: { title: '插件' },
                props: true
            },
            {
                path: '/courseCategory',
                name: 'CourseCategory',
                component: (resolve) => require(['components/courseCategory/index'], resolve),
                meta: { title: '课程分类' }
            },
            {
                path: '*',
                name: 'CommonNotfoundError',
                component: (resolve) => require(['components/error-pages/404'], resolve),
                meta: { title: '页面找不到' }
            },
            ]
        }]
    };

    let router = new VueRouter(routerParam);
    let isFirstRouter = true;

    router.beforeEach((to, from, next) => {
        if (to.name !== 'Login' && !Utils.getLocal('token')) {
            next({ name: 'Login' });
            return;
        }
        if (!isFirstRouter && !isAuthPage(to.name)) {
            next({ name: 'PermissionError' });
            return;
        }
        HeyUI.$LoadingBar.start();
        if (to.meta && to.meta.title) {
            document.title = to.meta.title;
        }
        isFirstRouter = false;
        next();
    });
    router.afterEach(() => {
        HeyUI.$LoadingBar.success();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        let layoutContent = document.querySelector('.h-layout-content');
        if (layoutContent) {
            layoutContent.scrollTop = 0;
        }
    });
    return router;
};

export default initRouter;