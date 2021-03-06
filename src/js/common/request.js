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
    }
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
    Credit1Records(param) {
      return Ajax.get('/member/' + param.id + '/detail/credit1Records', param);
    },
    Credit1Change(param) {
      return Ajax.postJson('/member/credit1/change', param);
    }
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
    }
  },
  CourseAttach: {
    List(param) {
      return Ajax.get('/course_attach', param);
    },
    Store(param) {
      return Ajax.postJson('/course_attach', param);
    },
    Delete(param) {
      return Ajax.delete('/course_attach/' + param.id, param);
    }
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
    },
    MultiDelete(param) {
      return Ajax.post('/video/delete/multi', param);
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
    }
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
  },
  Extentions: {
    aliyunHls: {
      Setting: {
        Get() {
          return Ajax.get('/backend/addons/AliyunHls/setting');
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/AliyunHls/setting', param);
        }
      },
      Videos: {
        All(param) {
          return Ajax.get('/backend/addons/AliyunHls/videos', param);
        },
        SubmitTransTask(param) {
          return Ajax.postJson('/backend/addons/AliyunHls/videos/submitTransTask', param);
        }
      }
    },
    aliyunVideosImport: {
      Params() {
        return Ajax.get('/backend/addons/aliyun_videos_import/params');
      },
      Import(params) {
        return Ajax.post('/backend/addons/aliyun_videos_import/import', params);
      }
    },
    learningPaths: {
      Paths: {
        List(param) {
          return Ajax.get('/backend/addons/LearningPaths/path/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/LearningPaths/path/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/LearningPaths/path/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/LearningPaths/path/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/LearningPaths/path/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/LearningPaths/path/' + param.id, param);
        }
      },
      Steps: {
        List(param) {
          return Ajax.get('/backend/addons/LearningPaths/step/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/LearningPaths/step/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/LearningPaths/step/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/LearningPaths/step/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/LearningPaths/step/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/LearningPaths/step/' + param.id, param);
        },
        relationCourseParams(param) {
          return Ajax.get('/backend/addons/LearningPaths/step/' + param.id + '/relationCourseParams', param);
        },
        relationCourseSave(param) {
          return Ajax.postJson('/backend/addons/LearningPaths/step/' + param.id + '/relationCourseParams', param);
        }
      }
    },
    meeduBooks: {
      BookComment: {
        Index(param) {
          return Ajax.get('/backend/addons/meedu_books/book_comment/index', param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/book_comment/' + param.id, param);
        }
      },
      ArticleComment: {
        Index(param) {
          return Ajax.get('/backend/addons/meedu_books/article_comment/index', param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/article_comment/' + param.id, param);
        }
      },
      Category: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_books/book_category/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_books/book_category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_books/book_category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_books/book_category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_books/book_category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/book_category/' + param.id, param);
        }
      },
      Chapter: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_books/book_chapter/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_books/book_chapter/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_books/book_chapter/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_books/book_chapter/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_books/book_chapter/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/book_chapter/' + param.id, param);
        }
      },
      Article: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_books/book_article/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_books/book_article/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_books/book_article/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_books/book_article/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_books/book_article/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/book_article/' + param.id, param);
        }
      },
      Book: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_books/book/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_books/book/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_books/book/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_books/book/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_books/book/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_books/book/' + param.id, param);
        }
      }
    },
    meeduTopics: {
      Category: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_topics/category/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_topics/category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_topics/category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_topics/category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_topics/category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_topics/category/' + param.id, param);
        }
      },
      Topic: {
        List(param) {
          return Ajax.get('/backend/addons/meedu_topics/topic/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/meedu_topics/topic/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/meedu_topics/topic/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/meedu_topics/topic/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/meedu_topics/topic/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_topics/topic/' + param.id, param);
        }
      },
      Comment: {
        Index(param) {
          return Ajax.get('/backend/addons/meedu_topics/comment', param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/meedu_topics/comment/' + param.id, param);
        }
      },
      Order: {
        Index(param) {
          return Ajax.get('/backend/addons/meedu_topics/orders', param);
        }
      }
    },
    miaoSha: {
      Goods: {
        List(param) {
          return Ajax.get('/backend/addons/MiaoSha/goods/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/MiaoSha/goods/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/MiaoSha/goods/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/MiaoSha/goods/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/MiaoSha/goods/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/MiaoSha/goods/' + param.id, param);
        }
      },
      Orders: {
        Index(param) {
          return Ajax.get('/backend/addons/MiaoSha/orders/index', param);
        }
      }
    },
    paper: {
      Paper: {
        List(param) {
          return Ajax.get('/backend/addons/Paper/paper/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/Paper/paper/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/Paper/paper/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/Paper/paper/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/Paper/paper/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/Paper/paper/' + param.id, param);
        },
        Users(param) {
          return Ajax.get('/backend/addons/Paper/paper/' + param.id + '/user', param);
        },
        UserAdd(param) {
          return Ajax.postJson('/backend/addons/Paper/paper/' + param.id + '/user', param);
        },
        UserDel(param) {
          return Ajax.delete('/backend/addons/Paper/paper/' + param.id + '/user/' + param.user_id);
        },
        Questions(param) {
          return Ajax.get('/backend/addons/Paper/paper/' + param.id + '/questions', param);
        },
        AddQuestions(param) {
          return Ajax.postJson('/backend/addons/Paper/paper/' + param.id + '/questions', param);
        },
        DelQuestion(param) {
          return Ajax.delete('/backend/addons/Paper/paper/' + param.id + '/questions/' + param.question_id);
        },
        UserPapers(param) {
          return Ajax.get(`/backend/addons/Paper/paper/${param.id}/userPaper`, param);
        },
        UserPaperInfo(param) {
          return Ajax.get(`/backend/addons/Paper/paper/${param.id}/userPaper/${param.user_paper_id}`, param);
        },
        SubmitScore(param) {
          return Ajax.postJson(`/backend/addons/Paper/paper/${param.id}/userPaper/${param.user_paper_id}`, param);
        }
      },
      Question: {
        List(param) {
          return Ajax.get('/backend/addons/Paper/question/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/Paper/question/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/Paper/question/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/Paper/question/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/Paper/question/' + param.id, param);
        },
        Delete(param) {
          return Ajax.postJson('/backend/addons/Paper/question/destroy/multi', param);
        }
      },
      QuestionCategory: {
        List(param) {
          return Ajax.get('/backend/addons/Paper/question_category/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/Paper/question_category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/Paper/question_category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/Paper/question_category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/Paper/question_category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/Paper/question_category/' + param.id, param);
        }
      },
      PaperCategory: {
        List(param) {
          return Ajax.get('/backend/addons/Paper/paper_category/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/Paper/paper_category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/Paper/paper_category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/Paper/paper_category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/Paper/paper_category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/Paper/paper_category/' + param.id, param);
        }
      }
    },
    promoCodeImport: {
      Generate(params) {
        return Ajax.postJson('/backend/addons/promo_code_multi_import/tools/generate', params);
      }
    },
    singlePage: {
      Page: {
        List(param) {
          return Ajax.get('/backend/addons/single_page/page/index', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/single_page/page/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/single_page/page/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/single_page/page/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/single_page/page/' + param.id, param);
        }
      }
    },
    templateOne: {
      Nav: {
        List(param) {
          return Ajax.get('/backend/addons/TemplateOne/nav/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/TemplateOne/nav/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/TemplateOne/nav/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/TemplateOne/nav/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TemplateOne/nav/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/TemplateOne/nav/' + param.id, param);
        }
      },
      Tag: {
        List(param) {
          return Ajax.get('/backend/addons/TemplateOne/tag/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/TemplateOne/tag/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/TemplateOne/tag/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/TemplateOne/tag/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TemplateOne/tag/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/TemplateOne/tag/' + param.id, param);
        }
      },
      Slider: {
        List(param) {
          return Ajax.get('/backend/addons/TemplateOne/slider/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/TemplateOne/slider/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/TemplateOne/slider/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/TemplateOne/slider/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TemplateOne/slider/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/TemplateOne/slider/' + param.id, param);
        }
      },
      CourseCategory: {
        List(param) {
          return Ajax.get('/backend/addons/TemplateOne/courseCategory', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/TemplateOne/courseCategory', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/TemplateOne/courseCategory', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/TemplateOne/courseCategory/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TemplateOne/courseCategory/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/TemplateOne/courseCategory/' + param.id, param);
        }
      }
    },
    tencentCloudHls: {
      Setting: {
        Get() {
          return Ajax.get('/backend/addons/TencentCloudHls/setting');
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TencentCloudHls/setting', param);
        },
        createTemplate(param) {
          return Ajax.get('/backend/addons/TencentCloudHls/createTemplate', param);
        }
      },
      Videos: {
        All(param) {
          return Ajax.get('/backend/addons/TencentCloudHls/videos', param);
        },
        SubmitTransTask(param) {
          return Ajax.get('/backend/addons/TencentCloudHls/videos/submitTransTask', param);
        }
      }
    },
    tuanGou: {
      Goods: {
        List(param) {
          return Ajax.get('/backend/addons/TuanGou/goods/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/TuanGou/goods/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/TuanGou/goods/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/TuanGou/goods/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/TuanGou/goods/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/TuanGou/goods/' + param.id, param);
        },
        Items(param) {
          return Ajax.get('/backend/addons/TuanGou/goods/' + param.id + '/items', param);
        },
        CompleteItem(param) {
          return Ajax.get('/backend/addons/TuanGou/goods/item/complete', param);
        }
      },
      Orders: {
        Index(param) {
          return Ajax.get('/backend/addons/TuanGou/orders/index', param);
        }
      },
      Refunds: {
        Index(param) {
          return Ajax.get('/backend/addons/TuanGou/refunds/index', param);
        },
        Handler(param) {
          return Ajax.get('/backend/addons/TuanGou/refunds/' + param.id + '/handler', param);
        }
      }
    },
    wenda: {
      Category: {
        List(param) {
          return Ajax.get('/backend/addons/Wenda/category/index', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/Wenda/category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/Wenda/category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/Wenda/category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/Wenda/category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/Wenda/category/' + param.id, param);
        }
      },
      Question: {
        List(param) {
          return Ajax.get('/backend/addons/Wenda/question/index', param);
        },
        Delete(param) {
          return Ajax.postJson('/backend/addons/Wenda/question/delete', param);
        }
      }
    },
    zhibo: {
      CourseCategory: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course_category', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/course_category/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/zhibo/course_category/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/zhibo/course_category/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/zhibo/course_category/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course_category/' + param.id, param);
        }
      },
      Course: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/course/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/zhibo/course/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/zhibo/course/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/zhibo/course/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course/' + param.id, param);
        }
      },
      CourseChapter: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course_chapter', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/course_chapter/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/zhibo/course_chapter/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/zhibo/course_chapter/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/zhibo/course_chapter/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course_chapter/' + param.id, param);
        }
      },
      Teacher: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/teacher', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/teacher/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/zhibo/teacher/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/zhibo/teacher/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/zhibo/teacher/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/teacher/' + param.id, param);
        }
      },
      CourseVideo: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course_video', param);
        },
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/course_video/create', param);
        },
        Store(param) {
          return Ajax.postJson('/backend/addons/zhibo/course_video/create', param);
        },
        Edit(param) {
          return Ajax.get('/backend/addons/zhibo/course_video/' + param.id);
        },
        Update(param) {
          return Ajax.putJson('/backend/addons/zhibo/course_video/' + param.id, param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course_video/' + param.id, param);
        }
      },
      CourseComment: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course_comment', param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course_comment/' + param.id, param);
        }
      },
      CourseChat: {
        List(param) {
          return Ajax.get('/backend/addons/zhibo/course_chat', param);
        },
        Delete(param) {
          return Ajax.delete('/backend/addons/zhibo/course_chat/' + param.id, param);
        }
      },
      Zhibo: {
        Create(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/create', param);
        },
        getParams(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/getParams', param);
        },
        pause(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/pause', param);
        },
        resume(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/resume', param);
        },
        pauseChat(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/pauseChat', param);
        },
        resumeChat(param) {
          return Ajax.get('/backend/addons/zhibo/zhibo/resumeChat', param);
        }
      }
    }
  }
};

export default Request;
