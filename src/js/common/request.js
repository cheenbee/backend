import Ajax from './ajax';

const Request = {
    Dashboard: {
        index() {
            return Ajax.get('/dashboard');
        },
        check() {
            return Ajax.get('/dashboard/check');
        },
        systemInfo() {
            return Ajax.get('/dashboard/system/info');
        }
    },
    Addons: {
        index() {
            return Ajax.get('/addons');
        },
        repository(param) {
            return Ajax.get('/addons/repository', param);
        },
        user(param) {
            return Ajax.get('/addons/repository/user', param);
        },
        buy(param) {
            return Ajax.get('/addons/repository/buy', param);
        },
        install(param) {
            return Ajax.get('/addons/repository/install', param);
        },
        upgrade(param) {
            return Ajax.get('/addons/repository/upgrade', param);
        },
        switchHandler(param) {
            return Ajax.postJson('/addons/switch', param);
        }
    },
    User: {
        info() {
            return Ajax.get('/user');
        },
        menus() {
            return Ajax.get('/menus');
        }
    },
    Login: {
        login(param) {
            return Ajax.postJson('/login', param);
        }
    },
    Announcement: {
        List(param) {
            return Ajax.get('/announcement', param);
        },
        Store(param) {
            return Ajax.postJson('/announcement', param);
        },
        Edit(param) {
            return Ajax.get('/announcement/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/announcement/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/announcement/' + param.id, param);
        }
    },
    CourseCategory: {
        List(param) {
            return Ajax.get('/courseCategory', param);
        },
        Create(param) {
            return Ajax.postJson('/courseCategory', param);
        },
        Edit(param) {
            return Ajax.get('/courseCategory/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/courseCategory/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/courseCategory/' + param.id, param);
        }
    },
    Role: {
        List(param) {
            return Ajax.get('/role', param);
        },
        All(param) {
            return Ajax.get('/role/all', param);
        },
        Store(param) {
            return Ajax.postJson('/role', param);
        },
        Edit(param) {
            return Ajax.get('/role/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/role/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/role/' + param.id, param);
        }
    },
    Link: {
        List(param) {
            return Ajax.get('/link', param);
        },
        Store(param) {
            return Ajax.postJson('/link', param);
        },
        Edit(param) {
            return Ajax.get('/link/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/link/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/link/' + param.id, param);
        }
    },
    Slider: {
        List(param) {
            return Ajax.get('/slider', param);
        },
        Store(param) {
            return Ajax.postJson('/slider', param);
        },
        Edit(param) {
            return Ajax.get('/slider/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/slider/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/slider/' + param.id, param);
        }
    },
    IndexBanner: {
        List(param) {
            return Ajax.get('/indexBanner', param);
        },
        Create() {
            return Ajax.get('/indexBanner/create');
        },
        Store(param) {
            return Ajax.postJson('/indexBanner', param);
        },
        Edit(param) {
            return Ajax.get('/indexBanner/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/indexBanner/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/indexBanner/' + param.id, param);
        }
    },
    AdFrom: {
        List(param) {
            return Ajax.get('/ad_from', param);
        },
        Store(param) {
            return Ajax.postJson('/ad_from', param);
        },
        Edit(param) {
            return Ajax.get('/ad_from/' + param.id);
        },
        Number(param) {
            return Ajax.get('/ad_from/' + param.id + '/number');
        },
        Update(param) {
            return Ajax.putJson('/ad_from/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/ad_from/' + param.id, param);
        }
    },
    CourseComment: {
        List(param) {
            return Ajax.get('/course_comment', param);
        },
        Delete(param) {
            return Ajax.postJson('/course_comment/delete', param);
        }
    },
    VideoComment: {
        List(param) {
            return Ajax.get('/video_comment', param);
        },
        Delete(param) {
            return Ajax.postJson('/video_comment/delete', param);
        }
    },
    Order: {
        List(param) {
            return Ajax.get('/order', param);
        },
        Finish(param) {
            return Ajax.get('/order/' + param.id + '/finish', param);
        },
    },
    Member: {
        List(param) {
            return Ajax.get('/member', param);
        },
        Create() {
            return Ajax.get('/member');
        },
        Store(param) {
            return Ajax.postJson('/member', param);
        },
        Edit(param) {
            return Ajax.get('/member/' + param.id, param);
        },
        Update(param) {
            return Ajax.putJson('/member/' + param.id, param);
        },
        InviteBalanceWithdrawOrders(param) {
            return Ajax.get('/member/inviteBalance/withdrawOrders', param);
        },
        CreateInviteBalanceWithdrawOrder(param) {
            return Ajax.postJson('/member/inviteBalance/withdrawOrders', param);
        },
        Detail(param) {
            return Ajax.get('/member/' + param.id + '/detail', param);
        },
        Courses(param) {
            return Ajax.get('/member/' + param.id + '/detail/userCourses', param);
        },
        Videos(param) {
            return Ajax.get('/member/' + param.id + '/detail/userVideos', param);
        },
        Roles(param) {
            return Ajax.get('/member/' + param.id + '/detail/userRoles', param);
        },
        Collect(param) {
            return Ajax.get('/member/' + param.id + '/detail/userCollect', param);
        },
        History(param) {
            return Ajax.get('/member/' + param.id + '/detail/userHistory', param);
        },
        Orders(param) {
            return Ajax.get('/member/' + param.id + '/detail/userOrders', param);
        },
        Invite(param) {
            return Ajax.get('/member/' + param.id + '/detail/userInvite', param);
        },
    },
    Course: {
        List(param) {
            return Ajax.get('/course', param);
        },
        All(param) {
            return Ajax.get('/course/all', param);
        },
        CreateParams(param) {
            return Ajax.get('/course/create', param);
        },
        Create(param) {
            return Ajax.postJson('/course', param);
        },
        Edit(param) {
            return Ajax.get('/course/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/course/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/course/' + param.id, param);
        },
        SubscribeUsers(param) {
            return Ajax.get('/course/' + param.id + '/subscribe/users', param);
        },
    },
    Video: {
        List(param) {
            return Ajax.get('/video', param);
        },
        Create() {
            return Ajax.get('/video/create');
        },
        Store(param) {
            return Ajax.postJson('/video', param);
        },
        Edit(param) {
            return Ajax.get('/video/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/video/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/video/' + param.id, param);
        }
    },
    CourseChapter: {
        List(param) {
            return Ajax.get('/course_chapter/' + param.course_id, param);
        },
        Create(param) {
            return Ajax.postJson('/course_chapter/' + param.course_id, param);
        },
        Edit(param) {
            return Ajax.get('/course_chapter/' + param.course_id + '/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/course_chapter/' + param.course_id + '/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/course_chapter/' + param.course_id + '/' + param.id);
        }
    },
    Setting: {
        Get() {
            return Ajax.get('/setting');
        },
        Save(param) {
            return Ajax.postJson('/setting', param);
        }
    },
    Administrator: {
        List(param) {
            return Ajax.get('/administrator', param);
        },
        Create(param) {
            return Ajax.get('/administrator/create', param);
        },
        Store(param) {
            return Ajax.postJson('/administrator', param);
        },
        Edit(param) {
            return Ajax.get('/administrator/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator/' + param.id, param);
        },
        ChangePassword(param) {
            return Ajax.putJson('/administrator/password', param);
        }
    },
    AdministratorRole: {
        List(param) {
            return Ajax.get('/administrator_role', param);
        },
        Create(param) {
            return Ajax.get('/administrator_role/create', param);
        },
        Store(param) {
            return Ajax.postJson('/administrator_role', param);
        },
        Edit(param) {
            return Ajax.get('/administrator_role/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator_role/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator_role/' + param.id, param);
        }
    },
    AdministratorPermission: {
        List(param) {
            return Ajax.get('/administrator_permission', param);
        },
        Create(param) {
            return Ajax.postJson('/administrator_permission', param);
        },
        Edit(param) {
            return Ajax.get('/administrator_permission/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator_permission/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator_permission/' + param.id, param);
        }
    },
    Nav: {
        List(param) {
            return Ajax.get('/nav', param);
        },
        Create(param) {
            return Ajax.postJson('/nav', param);
        },
        Edit(param) {
            return Ajax.get('/nav/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/nav/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/nav/' + param.id, param);
        }
    },
    Statistic: {
        userRegister(param) {
            return Ajax.get('/statistic/userRegister', param);
        },
        orderCreated(param) {
            return Ajax.get('/statistic/orderCreated', param);
        },
        orderPaidCount(param) {
            return Ajax.get('/statistic/orderPaidCount', param);
        },
        orderPaidSum(param) {
            return Ajax.get('/statistic/orderPaidSum', param);
        },
        courseSell(param) {
            return Ajax.get('/statistic/courseSell', param);
        },
        roleSell(param) {
            return Ajax.get('/statistic/roleSell', param);
        },
        videoWatchDuration(param) {
            return Ajax.get('/statistic/videoWatchDuration', param);
        },
        courseWatchDuration(param) {
            return Ajax.get('/statistic/courseWatchDuration', param);
        },
    },
    PromoCode: {
        List(param) {
            return Ajax.get('/promoCode', param);
        },
        Create(param) {
            return Ajax.postJson('/promoCode', param);
        },
        Edit(param) {
            return Ajax.get('/promoCode/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/promoCode/' + param.id, param);
        },
        Delete(param) {
            return Ajax.postJson('/promoCode/delete/multi', param);
        }
    },
    VideoUpload: {
        AliyunAuthTokenRefresh(param) {
            return Ajax.postJson('/video/token/aliyun/refresh', param);
        },
        AliyunAuthTokenCreate(param) {
            return Ajax.postJson('/video/token/aliyun/create', param);
        },
        TencentAuthToken(param) {
            return Ajax.postJson('/video/token/tencent', param);
        }
    }
};

export default Request;