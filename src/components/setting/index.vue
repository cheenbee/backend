<style lang="less">
.body {
  border: 1px solid rgb(240, 246, 255);
}
.mt-2 {
  margin-top: 2px;
}
.left-menu-item {
  border-bottom: 1px solid rgb(240, 246, 255);
  cursor: pointer;
  font-size: 1rem;
  &.active {
    background-color: rgb(240, 246, 255);
    color: @primary-color;
    border-right: 5px solid @primary-color;
  }
  &:hover {
    background-color: rgb(245, 245, 245);
  }
  span {
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
  }
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">系统配置</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <p-button glass="h-btn h-btn-primary" permission="setting.save" text="保存" @click="save()"></p-button>
      </div>
      <Row class="body">
        <Cell width="4" style="border-right: 1px solid rgb(238, 238, 238);">
          <Row>
            <Cell
              v-for="(item, index) in items"
              :key="index"
              width="24"
              class="left-menu-item"
              :class="{ active: item.key === activeItem }"
            >
              <span
                style="display: inline-block; width: 100%"
                @click="switchItem(item)"
              >{{ item.name }}</span>
            </Cell>
          </Row>
        </Cell>
        <Cell width="20" v-if="activeItem === 'system'">
          <Form mode="block" class="p-20">
            <FormItem label="网站名">
              <input type="text" v-model="setting.app.name" />
            </FormItem>
            <FormItem>
              <template v-slot:label>网站地址</template>
              <input type="text" v-model="setting.app.url" />
            </FormItem>
            <FormItem>
              <template v-slot:label>DEBUG模式</template>
              <h-switch v-model="setting.app.debug"></h-switch>
              <warn text="不清楚具体功能请勿开启"></warn>
            </FormItem>
            <FormItem>
              <template v-slot:label>网站Logo</template>
              <image-upload v-model="setting.meedu.system.logo" name="网站Logo"></image-upload>
            </FormItem>
            <FormItem>
              <template v-slot:label>白色logo</template>
              <image-upload v-model="setting.meedu.system.white_logo" name="会员中心logo"></image-upload>
            </FormItem>
            <FormItem>
              <template v-slot:label>网站备案信息</template>
              <input type="text" v-model="setting.app.icp" />
            </FormItem>
            <FormItem>
              <template v-slot:label>网站统计js</template>
              <textarea v-model="setting.meedu.system.js" rows="3"></textarea>
            </FormItem>
            <FormItem>
              <template v-slot:label>关于我们</template>
              <tinymce-editor v-model="setting.meedu.aboutus"></tinymce-editor>
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'cache'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>开启缓存</template>
              <h-switch v-model="setting.meedu.system.cache.status" :trueValue="1" :falseValue="-1"></h-switch>
              <warn text="开启可以明显加快网站速度"></warn>
            </FormItem>
            <FormItem>
              <template v-slot:label>缓存时间</template>
              <div class="h-input-group" v-width="200">
                <input type="text" v-model="setting.meedu.system.cache.expire" />
                <span class="h-input-addon">秒</span>
              </div>
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'wechatMini'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>AppId</template>
              <input type="text" v-model="setting.tencent.wechat.mini.app_id" />
            </FormItem>
            <FormItem>
              <template v-slot:label>AppSecret</template>
              <input type="text" v-model="setting.tencent.wechat.mini.secret" />
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'sociallogin'">
          <Tabs :datas="tab.socialLogin" v-model="tabSeleted.socialLogin"></Tabs>

          <div class="pt-15" v-if="tabSeleted.socialLogin === 'github'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.member.socialite.github.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>Github ClientId</template>
                <input type="text" v-model="setting.services.github.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>Github ClientSecret</template>
                <input type="text" v-model="setting.services.github.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>Github Redirect</template>
                <input type="text" v-model="setting.services.github.redirect" />
              </FormItem>
            </Form>
          </div>
          <div class="pt-15" v-if="tabSeleted.socialLogin === 'qq'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.member.socialite.qq.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ ClientId</template>
                <input type="text" v-model="setting.services.qq.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ ClientSecret</template>
                <input type="text" v-model="setting.services.qq.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ Redirect</template>
                <input type="text" v-model="setting.services.qq.redirect" />
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.socialLogin === 'weixin'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.member.socialite.weixinweb.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 ClientId</template>
                <input type="text" v-model="setting.services.weixinweb.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 ClientSecret</template>
                <input type="text" v-model="setting.services.weixinweb.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 Redirect</template>
                <input type="text" v-model="setting.services.weixinweb.redirect" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'sms'">
          <Tabs :datas="tab.sms" v-model="tabSeleted.sms"></Tabs>

          <div class="pt-15" v-if="tabSeleted.sms === 'service'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>选择短信服务商</template>
                <Select v-model="setting.meedu.system.sms" :datas="smsServices"></Select>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.sms === 'aliyun'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>AccessKeyId</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.access_key_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeySecret</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.access_key_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>短信签名</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.sign_name" />
              </FormItem>
              <FormItem>
                <template v-slot:label>密码重置模板ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.password_reset" />
              </FormItem>
              <FormItem>
                <template v-slot:label>注册模板ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.register" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号绑定ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.mobile_bind" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号登陆ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.login" />
              </FormItem>
            </Form>
          </div>
          <div class="pt-15" v-if="tabSeleted.sms === 'yunpian'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>ApiKey</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.api_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>密码重置模板</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.password_reset" />
                <warn text="注意：云片短信不是填写模板ID，而是填写模板内容"></warn>
              </FormItem>
              <FormItem>
                <template v-slot:label>注册模板</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.register" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号绑定</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.mobile_bind" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号登陆</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.login" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'image'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>图片存储驱动</template>
              <Select v-model="setting.meedu.upload.image.disk" :datas="disks"></Select>
            </FormItem>

            <template v-if="setting.meedu.upload.image.disk == 'public'">
              <FormItem>
                <template v-slot:label>图片URL前缀</template>
                <input type="text" v-model="setting.filesystems.disks.public.url" />
                <warn text="不清楚具体功能请勿变动"></warn>
              </FormItem>
            </template>

            <template v-if="setting.meedu.upload.image.disk == 'qiniu'">
              <FormItem>
                <template v-slot:label>七牛访问域名</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.domains.default" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛访问域名(https)</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.domains.https" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛AccessKey</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.access_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛SecretKey</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.secret_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛Bucket</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.bucket" />
              </FormItem>
            </template>

            <template v-if="setting.meedu.upload.image.disk == 'oss'">
              <FormItem>
                <template v-slot:label>阿里云OSS AccessKeyId</template>
                <input type="text" v-model="setting.filesystems.disks.oss.access_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>阿里云OSS AccessKeySecret</template>
                <input type="text" v-model="setting.filesystems.disks.oss.access_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>阿里云OSS Bucket</template>
                <input type="text" v-model="setting.filesystems.disks.oss.bucket" />
              </FormItem>
              <FormItem>
                <template v-slot:label>阿里云OSS Endpoint</template>
                <input type="text" v-model="setting.filesystems.disks.oss.endpoint" />
                <warn text="必须配置，否则无法上传图片"></warn>
              </FormItem>
              <FormItem>
                <template v-slot:label>阿里云OSS CDN加速域名</template>
                <input type="text" v-model="setting.filesystems.disks.oss.cdnDomain" />
                <warn text="必须配置，否则无法上传图片"></warn>
              </FormItem>
            </template>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'pay'">
          <Tabs :datas="tab.pay" v-model="tabSeleted.pay"></Tabs>

          <div class="pt-15" v-if="tabSeleted.pay === 'alipay'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.payment.alipay.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>AppId</template>
                <input type="text" v-model="setting.pay.alipay.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>公钥(RSA2加密方式)</template>
                <textarea v-model="setting.pay.alipay.ali_public_key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>私钥(RSA2加密方式)</template>
                <textarea v-model="setting.pay.alipay.private_key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>返回地址</template>
                <input type="text" v-model="setting.pay.alipay.return_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
              <FormItem>
                <template v-slot:label>回调地址</template>
                <input type="text" v-model="setting.pay.alipay.notify_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.pay === 'wechat'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.payment.wechat.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>公众号AppId</template>
                <input type="text" v-model="setting.pay.wechat.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>小程序AppId</template>
                <input type="text" v-model="setting.pay.wechat.miniapp_id" />
                <warn text="小程序支付必须填写"></warn>
              </FormItem>
              <FormItem>
                <template v-slot:label>MchId</template>
                <input type="text" v-model="setting.pay.wechat.mch_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>私钥</template>
                <textarea v-model="setting.pay.wechat.key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>回调地址</template>
                <input type="text" v-model="setting.pay.wechat.notify_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.pay === 'handPay'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch
                  v-model="setting.meedu.payment.handPay.enabled"
                  :trueValue="1"
                  :falseValue="-1"
                ></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>手动打款说明</template>
                <tinymce-editor v-model="setting.meedu.payment.handPay.introduction"></tinymce-editor>
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'video'">
          <Tabs :datas="tab.video" v-model="tabSeleted.video"></Tabs>

          <div class="pt-15" v-if="tabSeleted.video === 'aliyun'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>Region</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.region" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeyId</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.access_key_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeySecret</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.access_key_secret" />
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.video === 'tencent'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>AppId</template>
                <input type="text" v-model="setting.tencent.vod.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>SecretId</template>
                <input type="text" v-model="setting.tencent.vod.secret_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>SecretKey</template>
                <input type="text" v-model="setting.tencent.vod.secret_key" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'member'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>手机号强制绑定</template>
              <h-switch
                v-model="setting.meedu.member.enabled_mobile_bind_alert"
                :trueValue="1"
                :falseValue="0"
              ></h-switch>
              <br />
              <warn text="开启此选项，用户通过第三方登录进入站点会强制提醒提醒绑定手机号"></warn>
            </FormItem>
            <FormItem>
              <template v-slot:label>会员注册默认激活</template>
              <h-switch
                v-model="setting.meedu.member.is_active_default"
                :trueValue="1"
                :falseValue="-1"
              ></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>会员注册默认锁定</template>
              <h-switch
                v-model="setting.meedu.member.is_lock_default"
                :trueValue="1"
                :falseValue="-1"
              ></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>默认头像</template>
              <image-upload v-model="setting.meedu.member.default_avatar" name="默认头像"></image-upload>
            </FormItem>
            <FormItem>
              <template v-slot:label>会员协议</template>
              <tinymce-editor v-model="setting.meedu.member.protocol"></tinymce-editor>
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'seo'">
          <Tabs :datas="tab.seo" v-model="tabSeleted.seo"></Tabs>

          <div class="pt-15" v-if="tabSeleted.seo === 'indexPage'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>首页标题</template>
                <textarea v-model="setting.meedu.seo.index.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>首页关键字</template>
                <textarea v-model="setting.meedu.seo.index.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>首页描述</template>
                <textarea v-model="setting.meedu.seo.index.description"></textarea>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.seo === 'coursePage'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>课程列表页标题</template>
                <textarea v-model="setting.meedu.seo.course_list.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>课程列表页关键字</template>
                <textarea v-model="setting.meedu.seo.course_list.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>课程列表页描述</template>
                <textarea v-model="setting.meedu.seo.course_list.description"></textarea>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-if="tabSeleted.seo === 'rolePage'">
            <Form mode="block" class="p-20">
              <FormItem>
                <template v-slot:label>订阅页标题</template>
                <textarea v-model="setting.meedu.seo.role_list.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>订阅页关键字</template>
                <textarea v-model="setting.meedu.seo.role_list.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>订阅页描述</template>
                <textarea v-model="setting.meedu.seo.role_list.description"></textarea>
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'other'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>课程列表页每页数</template>
              <input type="text" v-model="setting.meedu.other.course_list_page_size" />
            </FormItem>
            <FormItem>
              <template v-slot:label>视频列表页每页数</template>
              <input type="text" v-model="setting.meedu.other.video_list_page_size" />
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'MeEduCloud'">
          <Form mode="block" class="p-20">
            <p>
              <a href="https://www.yuque.com/meedu/yr7rek/adc5ca" target="_blank">点我配置教程？</a>
            </p>
            <FormItem>
              <template v-slot:label>服务地址</template>
              <input type="text" v-model="setting.meedu.meeducloud.domain" />
            </FormItem>
            <FormItem>
              <template v-slot:label>UserID</template>
              <input type="text" v-model="setting.meedu.meeducloud.user_id" />
            </FormItem>
            <FormItem>
              <template v-slot:label>用户密码</template>
              <input type="text" v-model="setting.meedu.meeducloud.password" />
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'player'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>播放器封面</template>
              <image-upload v-model="setting.meedu.system.player_thumb" name="播放器封面"></image-upload>
            </FormItem>
            <FormItem>
              <template v-slot:label>跑马灯（防止录屏）</template>
              <h-switch
                v-model="setting.meedu.system.player.enabled_bullet_secret"
                :trueValue="1"
                :falseValue="0"
              ></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>阿里云播放器私密播放</template>
              <h-switch
                v-model="setting.meedu.system.player.enabled_aliyun_private"
                :trueValue="1"
                :falseValue="0"
              ></h-switch>
              <warn text="如果开启了HLS私密加密，必须开启次选项。"></warn>
            </FormItem>
            <FormItem>
              <template v-slot:label>
                腾讯云播放key(
                <a href="https://www.yuque.com/meedu/yr7rek/it8g8z" target="_blank">配置教程?</a>)
              </template>
              <input type="text" v-model="setting.meedu.system.player.tencent_play_key" />
              <warn text="不填写表示不开启"></warn>
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'invite'">
          <Form mode="block" class="p-20">
            <FormItem>
              <template v-slot:label>免费会员是否可以生成邀请码</template>
              <h-switch
                v-model="setting.meedu.member.invite.free_user_enabled"
                :trueValue="1"
                :falseValue="-1"
              ></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>邀请人奖励</template>
              <div class="h-input-group" v-width="200">
                <input type="text" v-model="setting.meedu.member.invite.invite_user_reward" />
                <span class="h-input-addon">元</span>
              </div>
            </FormItem>

            <FormItem>
              <template v-slot:label>被邀请人奖励</template>
              <div class="h-input-group" v-width="200">
                <input type="text" v-model="setting.meedu.member.invite.invited_user_reward" />
                <span class="h-input-addon">元</span>
              </div>
            </FormItem>

            <FormItem>
              <template v-slot:label>邀请关系维系时间</template>
              <div class="h-input-group" v-width="200">
                <input type="text" v-model="setting.meedu.member.invite.effective_days" />
                <span class="h-input-addon">天</span>
              </div>
            </FormItem>

            <FormItem>
              <template v-slot:label>邀请余额是否可以支付</template>
              <h-switch
                v-model="setting.meedu.member.invite.invite_balance_can_pay"
                :trueValue="1"
                :falseValue="-1"
              ></h-switch>
            </FormItem>

            <FormItem>
              <template v-slot:label>订单抽成</template>
              <input type="text" v-model="setting.meedu.member.invite.per_order_draw" />
            </FormItem>
          </Form>
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce';

export default {
  components: { TinymceEditor },
  data() {
    return {
      loading: false,
      activeItem: 'system',
      items: [
        {
          name: '网站',
          key: 'system'
        },
        {
          name: '缓存',
          key: 'cache'
        },
        {
          name: '登录',
          key: 'sociallogin'
        },

        {
          name: '短信',
          key: 'sms'
        },
        {
          name: '图片',
          key: 'image'
        },
        {
          name: '支付',
          key: 'pay'
        },
        {
          name: '视频',
          key: 'video'
        },
        {
          name: '会员',
          key: 'member'
        },
        {
          name: 'SEO',
          key: 'seo'
        },
        {
          name: '邀请',
          key: 'invite'
        },
        {
          name: '微信小程序',
          key: 'wechatMini'
        },
        {
          name: '插件配置',
          key: 'MeEduCloud'
        },
        {
          name: '播放器配置',
          key: 'player'
        },
        {
          name: '其它',
          key: 'other'
        }
      ],
      setting: {
        app: {
          name: '',
          url: '',
          debug: false
        },
        meedu: {
          system: {
            logo: '',
            white_logo: '',
            player_thumb: '',
            js: '',
            icp: '',
            aboutus: ''
          }
        }
      },
      tab: {
        socialLogin: {
          github: 'Github',
          qq: 'QQ',
          weixin: '微信'
        },
        sms: {
          service: '服务商',
          aliyun: '阿里云短信',
          yunpian: '云片短信'
        },
        pay: {
          alipay: '支付宝',
          wechat: '微信支付',
          handPay: '手动打款'
        },
        video: {
          aliyun: '阿里云视频',
          tencent: '腾讯云视频'
        },
        seo: {
          indexPage: '首页',
          coursePage: '课程列表',
          rolePage: '订阅界面'
        }
      },
      tabSeleted: {
        socialLogin: 'github',
        sms: 'service',
        pay: 'alipay',
        video: 'aliyun',
        seo: 'indexPage'
      },
      smsServices: [
        {
          title: '阿里云短信',
          key: 'aliyun'
        },
        {
          title: '云片短信',
          key: 'yunpian'
        }
      ],
      disks: [
        {
          title: '本地',
          key: 'public'
        },
        {
          title: '七牛云',
          key: 'qiniu'
        },
        {
          title: '阿里云OSS',
          key: 'oss'
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      R.Setting.Get().then(resp => {
        this.setting = resp.data;
        this.loading = false;
      });
    },
    switchItem(item) {
      this.activeItem = item.key;
    },
    save() {
      R.Setting.Save(this.setting).then(resp => {
        HeyUI.$Message.success('成功');
        this.init();
      });
    }
  }
};
</script>
